#!/usr/bin/env python3
"""Build World Bank WDI environmental indicators for unit 04-02."""

from __future__ import annotations

import json
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
WORLD_BANK_CATALOG_URL = (
    "https://datacatalog.worldbank.org/infrastructure-data/search/dataset/"
    "0037712/world-development-indicators"
)
COUNTRY_URL = "https://api.worldbank.org/v2/country?format=json&per_page=400"
SOURCE_URLS = {
    "forest": (
        "https://api.worldbank.org/v2/country/all/indicator/AG.LND.FRST.ZS"
        "?format=json&per_page=20000&date=1990:2024"
    ),
    "pm25": (
        "https://api.worldbank.org/v2/country/all/indicator/EN.ATM.PM25.MC.M3"
        "?format=json&per_page=20000&date=2023"
    ),
    "renewable": (
        "https://api.worldbank.org/v2/country/all/indicator/EG.FEC.RNEW.ZS"
        "?format=json&per_page=20000&date=2021"
    ),
}
BASE_GEOJSON = "public/data/base/countries-110m.geojson"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/04-02"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"

FOREST_YEARS = list(range(1990, 2025))
FOREST_COUNTRIES = [
    ("BRA", "브라질"),
    ("IDN", "인도네시아"),
    ("COD", "콩고민주공화국"),
    ("CHN", "중국"),
    ("IND", "인도"),
    ("KOR", "대한민국"),
]
MAP_FILES = {
    "pm25": "pm25-annual-exposure-map-2023.json",
    "renewable": "renewable-energy-consumption-map-2021.json",
}


def fetch_json(url: str):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.load(response)


def write_json(path: Path, data: dict) -> int:
    payload = (json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n").encode("utf-8")
    if len(payload) > MAX_BYTES:
        raise ValueError(f"Output exceeds 1 MB: {path} ({len(payload)} bytes)")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(payload)
    print(f"{path}: {len(payload)} bytes")
    return len(payload)


def get_map_iso3s() -> list[str]:
    base = json.loads((ROOT / BASE_GEOJSON).read_text(encoding="utf-8"))
    codes = {
        feature.get("properties", {}).get("iso_a3")
        for feature in base.get("features", [])
    }
    codes = {code for code in codes if isinstance(code, str) and len(code) == 3}
    if not codes:
        raise ValueError("Base country GeoJSON contains no ISO3 codes")
    return sorted(codes)


def fetch_indicator(source_name: str) -> list[dict]:
    response = fetch_json(SOURCE_URLS[source_name])
    if not isinstance(response, list) or len(response) < 2 or not isinstance(response[1], list):
        raise ValueError(f"Unexpected World Bank response for {source_name}")
    return response[1]


def build_forest_series() -> None:
    rows = fetch_indicator("forest")
    by_country: dict[str, dict[int, float | None]] = {}
    for row in rows:
        code = row.get("countryiso3code")
        if code not in {iso3 for iso3, _ in FOREST_COUNTRIES}:
            continue
        year = int(row["date"])
        if year in FOREST_YEARS:
            by_country.setdefault(code, {})[year] = row.get("value")

    series = []
    for iso3, name in FOREST_COUNTRIES:
        observations = by_country.get(iso3, {})
        if observations.get(1990) is None or observations.get(2024) is None:
            raise ValueError(f"{iso3} lacks a 1990 or 2024 forest-area value")
        series.append(
            {
                "name": name,
                "iso3": iso3,
                "values": [observations.get(year) for year in FOREST_YEARS],
            }
        )

    write_json(
        OUT_DIR / "forest-area-selected-countries-1990-2024.json",
        {
            "unit": "% of land area",
            "years": FOREST_YEARS,
            "series": series,
        },
    )
    sample = {
        f"{iso3}-{year}": by_country[iso3].get(year)
        for iso3, year in (("BRA", 1990), ("BRA", 2024), ("CHN", 2024), ("IDN", 2024))
    }
    print(f"AG.LND.FRST.ZS: series={len(series)}; years=1990-2024; samples={sample}")


def build_map(source_name: str, year: int, indicator: str, unit: str) -> None:
    rows = fetch_indicator(source_name)
    map_iso3s = get_map_iso3s()
    by_iso3: dict[str, float | None] = {}
    for row in rows:
        iso3 = row.get("countryiso3code")
        if iso3 in map_iso3s and row.get("date") == str(year):
            by_iso3[iso3] = row.get("value")

    values = {iso3: by_iso3.get(iso3) for iso3 in map_iso3s}
    filename = MAP_FILES[source_name]
    write_json(
        OUT_DIR / filename,
        {"year": year, "unit": unit, "values": values},
    )
    observed = sum(value is not None for value in values.values())
    sample_codes = ("IND", "KOR", "USA") if source_name == "pm25" else ("KOR", "BRA", "USA")
    sample = {code: values.get(code) for code in sample_codes}
    print(
        f"{indicator}: year={year}; observed={observed}/{len(values)}; "
        f"samples={sample}"
    )


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    build_forest_series()
    build_map("pm25", 2023, "EN.ATM.PM25.MC.M3", "µg/m³")
    build_map(
        "renewable",
        2021,
        "EG.FEC.RNEW.ZS",
        "% of total final energy consumption",
    )
    print(
        f"retrievedAt={RETRIEVED_AT}; WDI license=CC BY 4.0; "
        f"mapBoundary={BASE_GEOJSON}"
    )


if __name__ == "__main__":
    build()
