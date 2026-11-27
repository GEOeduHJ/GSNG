#!/usr/bin/env python3
"""Build Korean-labeled city points and a top-ten population chart from Natural Earth."""

from __future__ import annotations

import io
import json
import struct
import tempfile
import urllib.request
import zipfile
from pathlib import Path

SOURCE_PAGE_URL = "https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/"
SOURCE_URL = "https://naciscdn.org/naturalearth/10m/cultural/ne_10m_populated_places.zip"
LICENSE_URL = "https://www.naturalearthdata.com/about/terms-of-use/"
RETRIEVED_AT = "2026-11-27"
CITY_COUNT = 32
CHART_COUNT = 10
MAX_BYTES = 1_000_000
ROOT = Path(__file__).resolve().parents[3]
POINTS_OUTPUT = ROOT / "public/data/01-03/populated-places-top32.geojson"
CHART_OUTPUT = ROOT / "public/data/01-03/populated-places-top10.json"

COUNTRY_KO = {
    "ARG": "아르헨티나",
    "BGD": "방글라데시",
    "BRA": "브라질",
    "CHN": "중국",
    "COD": "콩고민주공화국",
    "COL": "콜롬비아",
    "EGY": "이집트",
    "FRA": "프랑스",
    "GBR": "영국",
    "IDN": "인도네시아",
    "IND": "인도",
    "IRN": "이란",
    "JPN": "일본",
    "KOR": "대한민국",
    "MEX": "멕시코",
    "NGA": "나이지리아",
    "PAK": "파키스탄",
    "PER": "페루",
    "PHL": "필리핀",
    "RUS": "러시아",
    "TUR": "튀르키예",
    "USA": "미국",
}

CATEGORY_COLORS = {
    "1,000만 명 이상": "#B84A3A",
    "800만~1,000만 명 미만": "#D28E3D",
    "500만~800만 명 미만": "#477A69",
}


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read()


def decode_text(value: bytes, encoding: str) -> str:
    return value.decode(encoding).strip().strip("\x00")


def read_dbf(data: bytes, encoding: str) -> list[dict[str, str] | None]:
    record_count = struct.unpack("<I", data[4:8])[0]
    header_length = struct.unpack("<H", data[8:10])[0]
    record_length = struct.unpack("<H", data[10:12])[0]

    fields: list[tuple[str, int, int]] = []
    cursor = 32
    field_offset = 1
    while cursor < header_length and data[cursor] != 0x0D:
        descriptor = data[cursor : cursor + 32]
        field_name = descriptor[:11].split(b"\x00", 1)[0].decode("ascii")
        field_length = descriptor[16]
        fields.append((field_name, field_offset, field_length))
        field_offset += field_length
        cursor += 32

    if field_offset != record_length:
        raise ValueError("Unexpected DBF record layout")

    records: list[dict[str, str] | None] = []
    for index in range(record_count):
        start = header_length + index * record_length
        record = data[start : start + record_length]
        if len(record) != record_length:
            raise ValueError("Truncated DBF record")
        if record[0:1] == b"*":
            records.append(None)
            continue

        values = {
            name: decode_text(record[offset : offset + length], encoding)
            for name, offset, length in fields
        }
        records.append(values)
    return records


def read_shapefile_points(data: bytes) -> list[tuple[float, float] | None]:
    points: list[tuple[float, float] | None] = []
    cursor = 100
    while cursor < len(data):
        if cursor + 8 > len(data):
            raise ValueError("Truncated shapefile record header")
        content_length = struct.unpack(">i", data[cursor + 4 : cursor + 8])[0] * 2
        content_start = cursor + 8
        content_end = content_start + content_length
        content = data[content_start:content_end]
        if len(content) != content_length or content_length < 4:
            raise ValueError("Truncated shapefile record")
        shape_type = struct.unpack("<i", content[:4])[0]
        if shape_type == 0:
            points.append(None)
        elif shape_type == 1:
            if content_length < 20:
                raise ValueError("Point record is shorter than its coordinates")
            points.append(struct.unpack("<dd", content[4:20]))
        else:
            raise ValueError(f"Expected point geometry, received shape type {shape_type}")
        cursor = content_end
    return points


def population_category(population: int) -> str:
    if population >= 10_000_000:
        return "1,000만 명 이상"
    if population >= 8_000_000:
        return "800만~1,000만 명 미만"
    if population >= 5_000_000:
        return "500만~800만 명 미만"
    raise ValueError(f"Population below the selected threshold: {population}")


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


def build() -> tuple[int, int]:
    with tempfile.TemporaryDirectory(prefix="natural-earth-01-03-") as temp_dir:
        archive_path = Path(temp_dir) / "populated-places.zip"
        archive_path.write_bytes(fetch_bytes(SOURCE_URL))
        with zipfile.ZipFile(archive_path) as archive:
            dbf = archive.read("ne_10m_populated_places.dbf")
            shp = archive.read("ne_10m_populated_places.shp")
            encoding = archive.read("ne_10m_populated_places.cpg").decode("ascii").strip()
            encoding = "utf-8" if "utf" in encoding.lower() else encoding

    attributes = read_dbf(dbf, encoding)
    coordinates = read_shapefile_points(shp)
    if len(attributes) != len(coordinates):
        raise ValueError("Natural Earth DBF and SHP record counts differ")

    places: list[dict] = []
    for attributes_row, point in zip(attributes, coordinates):
        if attributes_row is None or point is None:
            continue
        if not attributes_row.get("POP_MAX"):
            continue
        population = int(attributes_row["POP_MAX"])
        if population < 5_000_000:
            continue
        city_name = attributes_row.get("NAME_KO")
        country_code = attributes_row.get("ADM0_A3")
        if not city_name or country_code not in COUNTRY_KO:
            continue
        longitude, latitude = point
        category = population_category(population)
        places.append(
            {
                "name": city_name,
                "country": COUNTRY_KO[country_code],
                "pop_max": population,
                "category": category,
                "color": CATEGORY_COLORS[category],
                "coordinates": [longitude, latitude],
            }
        )

    places.sort(key=lambda place: (-place["pop_max"], place["name"]))
    selected = places[:CITY_COUNT]
    if len(selected) != CITY_COUNT:
        raise ValueError(f"Expected {CITY_COUNT} translated cities, found {len(selected)}")

    point_collection = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "name": place["name"],
                    "category": place["category"],
                    "color": place["color"],
                    "pop_max": place["pop_max"],
                    "country": place["country"],
                },
                "geometry": {"type": "Point", "coordinates": place["coordinates"]},
            }
            for place in selected
        ],
    }
    chart = {
        "year": None,
        "unit": "명 (Natural Earth POP_MAX; 기준 연도 미표기)",
        "rows": [
            {"name": place["name"], "value": place["pop_max"]}
            for place in selected[:CHART_COUNT]
        ],
    }

    points_size = write_json(POINTS_OUTPUT, point_collection)
    chart_size = write_json(CHART_OUTPUT, chart)
    print(f"{POINTS_OUTPUT}: {len(selected)} features, {points_size} bytes")
    print(f"{CHART_OUTPUT}: {len(chart['rows'])} rows, {chart_size} bytes")
    print(f"source={SOURCE_URL} retrievedAt={RETRIEVED_AT} version=5.1.2 license=public domain")
    return points_size, chart_size


if __name__ == "__main__":
    build()
