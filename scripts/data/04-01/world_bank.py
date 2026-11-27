#!/usr/bin/env python3
"""Build the net energy imports choropleth for unit 04-01."""

from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
MAP_YEAR = 2024
SOURCE_URL_TEMPLATE = (
    "https://api.worldbank.org/v2/country/all/indicator/{indicator}"
    "?format=json&per_page=20000&date=2024"
)
INDICATOR_PAGE = "https://data.worldbank.org/indicator/EG.IMP.CONS.ZS"
LICENSE_URL = "https://datacatalog.worldbank.org/public-licenses"
MAP_BOUNDARIES = "public/data/base/countries-110m.geojson"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/04-01"
MAX_BYTES = 1_000_000
INDICATOR = "EG.IMP.CONS.ZS"


def fetch_json(url: str):
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.load(response)


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    print(f"{path.relative_to(ROOT)}: {size} bytes")


def read_boundary_codes() -> set[str]:
    with (ROOT / MAP_BOUNDARIES).open(encoding="utf-8") as source:
        geojson = json.load(source)
    country_codes = set()
    for feature in geojson.get("features", []):
        iso3 = feature.get("properties", {}).get("iso_a3")
        if isinstance(iso3, str) and re.fullmatch(r"[A-Z]{3}", iso3):
            country_codes.add(iso3)
    return country_codes


def build() -> None:
    country_codes = read_boundary_codes()
    url = SOURCE_URL_TEMPLATE.format(indicator=INDICATOR)
    response = fetch_json(url)
    if not isinstance(response, list) or len(response) < 2 or not isinstance(response[1], list):
        raise ValueError(f"Unexpected World Bank response for {INDICATOR}")

    records = response[1]
    by_iso3_year = {
        (row.get("countryiso3code"), int(row["date"])): row.get("value")
        for row in records
        if row.get("countryiso3code") and row.get("date", "").isdigit()
    }
    values = {
        iso3: by_iso3_year.get((iso3, MAP_YEAR)) for iso3 in sorted(country_codes)
    }
    write_json(
        OUT_DIR / "energy-net-imports-map.json",
        {
            "year": MAP_YEAR,
            "unit": "% of energy use",
            "values": values,
        },
    )
    covered = sum(value is not None for value in values.values())
    print(
        f"indicator={INDICATOR}; year={MAP_YEAR}; mapCoverage={covered}/{len(country_codes)}; "
        f"retrievedAt={RETRIEVED_AT}; page={INDICATOR_PAGE}; license={LICENSE_URL}"
    )
    for iso3 in ("KOR", "CHN", "USA"):
        print(f"  {iso3} {MAP_YEAR}: {by_iso3_year.get((iso3, MAP_YEAR))}")


if __name__ == "__main__":
    build()
