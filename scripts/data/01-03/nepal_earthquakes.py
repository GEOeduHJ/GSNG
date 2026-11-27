#!/usr/bin/env python3
"""Build a USGS earthquake point layer for Nepal and nearby areas in Apr–May 2015."""

from __future__ import annotations

import json
import tempfile
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

SOURCE_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2015-04-01T00:00:00&endtime=2015-05-31T23:59:59&eventtype=earthquake&minmagnitude=4.5&minlatitude=24&maxlatitude=34&minlongitude=79&maxlongitude=90&orderby=time-asc&limit=2000"
API_DOC_URL = "https://earthquake.usgs.gov/fdsnws/event/1/"
LICENSE_URL = "https://www.usgs.gov/faqs/are-usgs-reportspublications-copyrighted"
RETRIEVED_AT = "2026-11-27"
MAX_BYTES = 1_000_000
QUERY_LIMIT = 2000
ROOT = Path(__file__).resolve().parents[3]
OUTPUT = ROOT / "public/data/01-03/nepal-earthquakes-apr-may-2015.geojson"

CATEGORY_COLORS = {
    "규모 4.5–4.9": "#4F7CAC",
    "규모 5.0–5.9": "#E09F3E",
    "규모 6.0 이상": "#C44536",
}


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read()


def category_for_magnitude(magnitude: float) -> str:
    if magnitude < 5.0:
        return "규모 4.5–4.9"
    if magnitude < 6.0:
        return "규모 5.0–5.9"
    return "규모 6.0 이상"


def write_json(path: Path, payload: dict) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    return size


def build() -> int:
    with tempfile.TemporaryDirectory(prefix="usgs-nepal-01-03-") as temp_dir:
        raw_path = Path(temp_dir) / "earthquakes.geojson"
        raw_path.write_bytes(fetch_bytes(SOURCE_URL))
        source = json.loads(raw_path.read_text(encoding="utf-8"))

    source_features = source.get("features", [])
    if len(source_features) >= QUERY_LIMIT:
        raise ValueError("USGS result reached the API limit; narrow or page the query")

    features = []
    for source_feature in source_features:
        properties = source_feature.get("properties", {})
        geometry = source_feature.get("geometry") or {}
        coordinates = geometry.get("coordinates") or []
        magnitude = properties.get("mag")
        event_time = properties.get("time")
        if magnitude is None or event_time is None or len(coordinates) < 2:
            continue
        if magnitude < 4.5:
            continue

        event_datetime = datetime.fromtimestamp(event_time / 1000, tz=timezone.utc)
        if not (datetime(2015, 4, 1, tzinfo=timezone.utc) <= event_datetime <= datetime(2015, 5, 31, 23, 59, 59, tzinfo=timezone.utc)):
            continue
        longitude, latitude = coordinates[:2]
        if not (79 <= longitude <= 90 and 24 <= latitude <= 34):
            continue

        category = category_for_magnitude(float(magnitude))
        features.append(
            {
                "type": "Feature",
                "id": source_feature.get("id"),
                "properties": {
                    "category": category,
                    "color": CATEGORY_COLORS[category],
                    "mag": magnitude,
                    "date": event_datetime.date().isoformat(),
                },
                "geometry": {"type": "Point", "coordinates": coordinates[:2]},
            }
        )

    if not features:
        raise ValueError("USGS returned no events for the requested range")

    output = {"type": "FeatureCollection", "features": features}
    size = write_json(OUTPUT, output)
    counts = Counter(feature["properties"]["category"] for feature in features)
    print(f"{OUTPUT}: {len(features)} features, {size} bytes, categories={dict(counts)}")
    print(f"source={SOURCE_URL} retrievedAt={RETRIEVED_AT} license=public domain")
    return size


if __name__ == "__main__":
    build()
