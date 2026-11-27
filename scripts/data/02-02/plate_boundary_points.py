#!/usr/bin/env python3
"""Build a compact point trace from the USGS tectonic-boundary line service."""

from __future__ import annotations

import json
import math
import urllib.parse
import urllib.request
from collections import Counter
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
USGS_QUERY_URL = (
    "https://earthquake.usgs.gov/arcgis/rest/services/eq/"
    "map_plateboundaries/MapServer/1/query"
)
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/02-02"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"
SAMPLE_SPACING_KM = 350.0
EARTH_RADIUS_KM = 6371.0088
QUERY_BATCH_SIZE = 50

BOUNDARY_LABELS = {
    "Convergent Boundary": ("수렴 경계", "#c44536"),
    "Divergent Boundary": ("발산 경계", "#2f6f5e"),
    "Transform Boundary": ("변환 경계", "#345f86"),
    "Other": ("기타 경계", "#8a5a2b"),
}


def fetch_json(url: str):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.load(response)


def query(params: dict[str, str]):
    return fetch_json(f"{USGS_QUERY_URL}?{urllib.parse.urlencode(params)}")


def haversine_km(first: list[float], second: list[float]) -> float:
    lon1, lat1 = map(math.radians, first[:2])
    lon2, lat2 = map(math.radians, second[:2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    return 2 * EARTH_RADIUS_KM * math.asin(math.sqrt(min(1.0, a)))


def sample_path(path: list[list[float]]) -> list[list[float]]:
    coordinates = [
        [float(point[0]), float(point[1])]
        for point in path
        if isinstance(point, list)
        and len(point) >= 2
        and isinstance(point[0], (int, float))
        and isinstance(point[1], (int, float))
    ]
    if len(coordinates) < 2:
        return coordinates

    cumulative = [0.0]
    for index in range(1, len(coordinates)):
        cumulative.append(
            cumulative[-1] + haversine_km(coordinates[index - 1], coordinates[index])
        )
    total = cumulative[-1]
    if total == 0:
        return [coordinates[0]]

    interval_count = max(1, math.ceil(total / SAMPLE_SPACING_KM))
    targets = [total * (index + 0.5) / interval_count for index in range(interval_count)]
    sampled = []
    next_vertex = 0
    for target in targets:
        while next_vertex + 1 < len(cumulative) and cumulative[next_vertex + 1] < target:
            next_vertex += 1
        if next_vertex + 1 < len(cumulative):
            left = abs(cumulative[next_vertex] - target)
            right = abs(cumulative[next_vertex + 1] - target)
            selected = next_vertex if left <= right else next_vertex + 1
        else:
            selected = len(coordinates) - 1
        sampled.append(coordinates[selected])
    return sampled


def feature_paths(geometry: dict) -> list[list[list[float]]]:
    geometry_type = geometry.get("type")
    coordinates = geometry.get("coordinates") or []
    if geometry_type == "LineString":
        return [coordinates]
    if geometry_type == "MultiLineString":
        return coordinates
    return []


def fetch_boundaries() -> tuple[list[dict], int]:
    ids_payload = query({"where": "1=1", "returnIdsOnly": "true", "f": "json"})
    object_ids = ids_payload.get("objectIds") or []
    if not object_ids:
        raise ValueError("USGS returned no plate-boundary feature IDs")

    features = []
    seen = set()
    for offset in range(0, len(object_ids), QUERY_BATCH_SIZE):
        batch = object_ids[offset : offset + QUERY_BATCH_SIZE]
        payload = query(
            {
                "objectIds": ",".join(str(value) for value in batch),
                "outFields": "OBJECTID,NAME,LABEL",
                "returnGeometry": "true",
                "outSR": "4326",
                "f": "geojson",
            }
        )
        for feature in payload.get("features", []):
            properties = feature.get("properties") or {}
            boundary_label = properties.get("LABEL")
            category = BOUNDARY_LABELS.get(boundary_label)
            source_id = properties.get("OBJECTID")
            if category is None or source_id is None:
                continue
            category_name, color = category
            for path in feature_paths(feature.get("geometry") or {}):
                for coordinate in sample_path(path):
                    key = (round(coordinate[0], 4), round(coordinate[1], 4), category_name)
                    if key in seen:
                        continue
                    seen.add(key)
                    features.append(
                        {
                            "type": "Feature",
                            "properties": {
                                "name": "",
                                "category": category_name,
                                "color": color,
                                "source_objectid": source_id,
                            },
                            "geometry": {"type": "Point", "coordinates": coordinate},
                        }
                    )
    return features, len(object_ids)


def write_geojson(path: Path, data: dict) -> int:
    path.write_text(
        json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    print(f"{path}: {size} bytes")
    return size


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    features, source_feature_count = fetch_boundaries()
    write_geojson(
        OUT_DIR / "plate-boundary-points.geojson",
        {"type": "FeatureCollection", "features": features},
    )
    counts = Counter(feature["properties"]["category"] for feature in features)
    print(
        f"USGS source features sampled: {source_feature_count}; "
        f"spacing≈{SAMPLE_SPACING_KM:g} km; "
        f"points={len(features)}; categories={dict(counts)}"
    )
    for feature in features[:5]:
        print(
            f"sample category={feature['properties']['category']} "
            f"source_objectid={feature['properties']['source_objectid']} "
            f"coordinates={feature['geometry']['coordinates']}"
        )
    print(f"retrievedAt={RETRIEVED_AT}; USGS Tectonic Plate Boundaries")


if __name__ == "__main__":
    build()
