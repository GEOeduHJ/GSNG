#!/usr/bin/env python3
"""Build a small-scale world map of Natural Earth airport locations."""

from __future__ import annotations

import io
import tempfile
import urllib.request
import zipfile
from pathlib import Path

from natural_earth_places import read_dbf, read_shapefile_points, write_json

SOURCE_PAGE_URL = "https://www.naturalearthdata.com/downloads/10m-cultural-vectors/airports/"
SOURCE_URL = "https://naciscdn.org/naturalearth/10m/cultural/ne_10m_airports.zip"
LICENSE_URL = "https://www.naturalearthdata.com/about/terms-of-use/"
RETRIEVED_AT = "2026-11-27"
MAX_SCALERANK = 3
MAX_BYTES = 1_000_000
ROOT = Path(__file__).resolve().parents[3]
OUTPUT = ROOT / "public/data/01-03/world-major-airports.geojson"

CATEGORY_COLORS = {"주요 공항": "#B84A3A", "중간 규모 공항": "#477A69"}


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read()


def build() -> int:
    with tempfile.TemporaryDirectory(prefix="natural-earth-airports-01-03-") as temp_dir:
        archive_path = Path(temp_dir) / "airports.zip"
        archive_path.write_bytes(fetch_bytes(SOURCE_URL))
        with zipfile.ZipFile(archive_path) as archive:
            dbf = archive.read("ne_10m_airports.dbf")
            shp = archive.read("ne_10m_airports.shp")
            encoding = archive.read("ne_10m_airports.cpg").decode("ascii").strip()
            encoding = "utf-8" if "utf" in encoding.lower() else encoding

    rows = read_dbf(dbf, encoding)
    coordinates = read_shapefile_points(shp)
    if len(rows) != len(coordinates):
        raise ValueError("Natural Earth airport DBF and SHP record counts differ")

    features = []
    for row, point in zip(rows, coordinates):
        if row is None or point is None:
            continue
        try:
            scale_rank = int(row.get("scalerank", ""))
        except ValueError:
            continue
        if scale_rank > MAX_SCALERANK or row.get("location") == "approximate":
            continue

        source_type = row.get("type", "")
        if "major" in source_type:
            category = "주요 공항"
        elif "mid" in source_type:
            category = "중간 규모 공항"
        else:
            continue

        iata_code = (row.get("iata_code") or "").strip()
        if not iata_code:
            continue
        longitude, latitude = point
        features.append(
            {
                "type": "Feature",
                "id": row.get("ne_id") or iata_code,
                "properties": {
                    "name": f"{iata_code} 공항",
                    "category": category,
                    "color": CATEGORY_COLORS[category],
                    "iata": iata_code,
                    "location": row.get("location", ""),
                },
                "geometry": {"type": "Point", "coordinates": [longitude, latitude]},
            }
        )

    if not features:
        raise ValueError("No airports remain after the documented scale and location filters")

    payload = {"type": "FeatureCollection", "features": features}
    size = write_json(OUTPUT, payload)
    categories = {}
    for feature in features:
        category = feature["properties"]["category"]
        categories[category] = categories.get(category, 0) + 1
    print(f"{OUTPUT}: {len(features)} features, {size} bytes, categories={categories}")
    print(f"source={SOURCE_URL} retrievedAt={RETRIEVED_AT} scaleRank<={MAX_SCALERANK}")
    return size


if __name__ == "__main__":
    build()
