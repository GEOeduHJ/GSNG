#!/usr/bin/env python3
"""Build representative points for selected Natural Earth landform regions."""

from __future__ import annotations

import io
import json
import math
import struct
import urllib.request
import zipfile
from collections import Counter
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
NATURAL_EARTH_ZIP_URL = (
    "https://naturalearth.s3.amazonaws.com/10m_physical/"
    "ne_10m_geography_regions_polys.zip"
)
NATURAL_EARTH_PAGE = (
    "https://www.naturalearthdata.com/downloads/10m-physical-vectors/"
    "10m-physical-labels/"
)
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/02-02"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"
SHAPE_STEM = "ne_10m_geography_regions_polys"

CATEGORY_BY_CLASS = {
    "Range/mtn": ("산지", "#c44536"),
    "Plateau": ("고원", "#345f86"),
    "Plain": ("평야", "#2f6f5e"),
    "Basin": ("분지·저지대", "#8a5a2b"),
    "Lowland": ("분지·저지대", "#8a5a2b"),
    "Depression": ("분지·저지대", "#8a5a2b"),
    "Delta": ("하구 평야", "#9a7b2f"),
    "Valley": ("계곡·협곡", "#7a4f7d"),
    "Gorge": ("계곡·협곡", "#7a4f7d"),
}

LABEL_FEATURE_NAMES = {
    "그랜드 캐니언",
    "그레이트플레인스",
    "그레이트베이슨",
    "티베트고원",
    "데칸고원",
    "히말라야산맥",
    "알프스산맥",
    "안데스산맥",
    "로키산맥",
    "우랄산맥",
    "동아프리카 지구대",
    "그레이트디바이딩산맥",
    "갠지스 삼각주",
    "나일강 삼각주",
    "메콩 삼각주",
    "아마존 분지",
}


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read()


def dbf_rows(dbf: bytes, encoding: str) -> list[dict]:
    if len(dbf) < 33:
        raise ValueError("Natural Earth DBF is truncated")
    row_count = struct.unpack_from("<I", dbf, 4)[0]
    header_length = struct.unpack_from("<H", dbf, 8)[0]
    row_length = struct.unpack_from("<H", dbf, 10)[0]
    fields = []
    offset = 32
    while offset < header_length:
        if dbf[offset] == 0x0D:
            break
        descriptor = dbf[offset : offset + 32]
        name = descriptor[:11].split(b"\0", 1)[0].decode("ascii").strip()
        field_type = chr(descriptor[11])
        length = descriptor[16]
        decimals = descriptor[17]
        fields.append((name, field_type, length, decimals))
        offset += 32

    rows = []
    offset = header_length
    for _ in range(row_count):
        record = dbf[offset : offset + row_length]
        if len(record) != row_length:
            raise ValueError("Natural Earth DBF record is truncated")
        cursor = 1
        row = {}
        for name, field_type, length, decimals in fields:
            raw = record[cursor : cursor + length]
            cursor += length
            value = raw.decode(encoding, errors="replace").strip()
            if field_type in ("N", "F") and value:
                try:
                    row[name] = float(value) if decimals else int(value)
                except ValueError:
                    row[name] = None
            else:
                row[name] = value
        rows.append(row)
        offset += row_length
    return rows


def shapefile_rings(shp: bytes) -> list[list[list[list[float]]]]:
    if len(shp) < 100 or struct.unpack_from("<i", shp, 32)[0] != 5:
        raise ValueError("Expected a Polygon shapefile")
    records = []
    offset = 100
    while offset < len(shp):
        if offset + 8 > len(shp):
            raise ValueError("Natural Earth SHP record header is truncated")
        _record_number, content_length_words = struct.unpack_from(">ii", shp, offset)
        content_start = offset + 8
        content_end = content_start + content_length_words * 2
        content = shp[content_start:content_end]
        if len(content) != content_length_words * 2:
            raise ValueError("Natural Earth SHP record is truncated")
        shape_type = struct.unpack_from("<i", content, 0)[0]
        rings = []
        if shape_type == 5:
            part_count, point_count = struct.unpack_from("<ii", content, 36)
            parts_offset = 44
            point_offset = parts_offset + part_count * 4
            starts = list(struct.unpack_from(f"<{part_count}i", content, parts_offset))
            starts.append(point_count)
            points = [
                list(struct.unpack_from("<dd", content, point_offset + index * 16))
                for index in range(point_count)
            ]
            for index in range(part_count):
                rings.append(points[starts[index] : starts[index + 1]])
        elif shape_type != 0:
            raise ValueError(f"Unexpected Natural Earth polygon shape type: {shape_type}")
        records.append(rings)
        offset = content_end
    return records


def unwrap_ring(ring: list[list[float]]) -> list[list[float]]:
    if not ring:
        return []
    unwrapped = [[float(ring[0][0]), float(ring[0][1])]]
    for longitude, latitude in ring[1:]:
        longitude = float(longitude)
        prior = unwrapped[-1][0]
        while longitude - prior > 180:
            longitude -= 360
        while longitude - prior < -180:
            longitude += 360
        unwrapped.append([longitude, float(latitude)])
    return unwrapped


def ring_centroid(ring: list[list[float]]) -> tuple[float, float] | None:
    if len(ring) < 4:
        return None
    cross_sum = 0.0
    x_sum = 0.0
    y_sum = 0.0
    for index in range(len(ring) - 1):
        x1, y1 = ring[index]
        x2, y2 = ring[index + 1]
        cross = x1 * y2 - x2 * y1
        cross_sum += cross
        x_sum += (x1 + x2) * cross
        y_sum += (y1 + y2) * cross
    if abs(cross_sum) < 1e-12:
        return None
    return x_sum / (3 * cross_sum), y_sum / (3 * cross_sum)


def point_in_ring(point: tuple[float, float], ring: list[list[float]]) -> bool:
    x, y = point
    inside = False
    for index in range(len(ring) - 1):
        x1, y1 = ring[index]
        x2, y2 = ring[index + 1]
        if (y1 > y) != (y2 > y):
            crossing_x = (x2 - x1) * (y - y1) / (y2 - y1) + x1
            if x < crossing_x:
                inside = not inside
    return inside


def representative_point(rings: list[list[list[float]]]) -> list[float] | None:
    usable = [unwrap_ring(ring) for ring in rings if len(ring) >= 4]
    if not usable:
        return None
    # The largest ring is the feature's outer boundary in this generalized source.
    ring = max(usable, key=lambda item: abs(sum(
        item[index][0] * item[index + 1][1] - item[index + 1][0] * item[index][1]
        for index in range(len(item) - 1)
    )))
    centroid = ring_centroid(ring)
    if centroid and point_in_ring(centroid, ring):
        candidate = centroid
    else:
        min_x = min(point[0] for point in ring)
        max_x = max(point[0] for point in ring)
        min_y = min(point[1] for point in ring)
        max_y = max(point[1] for point in ring)
        center = ((min_x + max_x) / 2, (min_y + max_y) / 2)
        if point_in_ring(center, ring):
            candidate = center
        else:
            candidates = [
                (
                    min_x + (max_x - min_x) * column / 32,
                    min_y + (max_y - min_y) * row / 32,
                )
                for row in range(1, 32)
                for column in range(1, 32)
            ]
            candidates.sort(
                key=lambda value: (value[0] - center[0]) ** 2 + (value[1] - center[1]) ** 2
            )
            candidate = next((value for value in candidates if point_in_ring(value, ring)), None)
            if candidate is None:
                return None
    longitude = ((candidate[0] + 180) % 360) - 180
    return [longitude, candidate[1]]


def load_zip() -> tuple[list[dict], list[list[list[list[float]]]]]:
    payload = fetch_bytes(NATURAL_EARTH_ZIP_URL)
    with zipfile.ZipFile(io.BytesIO(payload)) as archive:
        dbf = archive.read(f"{SHAPE_STEM}.dbf")
        shp = archive.read(f"{SHAPE_STEM}.shp")
        cpg = archive.read(f"{SHAPE_STEM}.cpg").decode("ascii", errors="ignore").strip()
    encoding = "utf-8" if "utf" in cpg.lower() else "cp1252"
    return dbf_rows(dbf, encoding), shapefile_rings(shp)


def build_features() -> list[dict]:
    rows, shapes = load_zip()
    if len(rows) != len(shapes):
        raise ValueError("Natural Earth DBF and SHP record counts differ")
    features = []
    counts = Counter()
    labelled_names = set()
    for row, rings in zip(rows, shapes):
        feature_class = row.get("FEATURECLA")
        category = CATEGORY_BY_CLASS.get(feature_class)
        name_ko = row.get("NAME_KO")
        if category is None or not name_ko:
            continue
        coordinate = representative_point(rings)
        if coordinate is None:
            continue
        category_name, color = category
        counts[category_name] += 1
        map_label = ""
        if name_ko in LABEL_FEATURE_NAMES and name_ko not in labelled_names:
            map_label = name_ko
            labelled_names.add(name_ko)
        features.append(
            {
                "type": "Feature",
                "properties": {
                    "name": map_label,
                    "category": category_name,
                    "color": color,
                    "feature_name_ko": name_ko,
                    "feature_class": feature_class,
                    "region": row.get("REGION", ""),
                    "source_ne_id": row.get("NE_ID"),
                },
                "geometry": {"type": "Point", "coordinates": coordinate},
            }
        )
    features.sort(
        key=lambda feature: (
            feature["properties"]["category"],
            feature["properties"]["feature_name_ko"],
        )
    )
    print(f"Natural Earth selected feature counts: {dict(counts)}")
    return features


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
    features = build_features()
    write_geojson(
        OUT_DIR / "major-landforms.geojson",
        {"type": "FeatureCollection", "features": features},
    )
    print(f"Natural Earth physical features: {len(features)}; retrievedAt={RETRIEVED_AT}")
    for feature in features[:3]:
        print(
            f"sample={feature['properties']['feature_name_ko']} "
            f"class={feature['properties']['feature_class']} "
            f"coordinates={feature['geometry']['coordinates']}"
        )


if __name__ == "__main__":
    build()
