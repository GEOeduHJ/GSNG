#!/usr/bin/env python3
"""Build WDI country maps for population and land below 5 m elevation."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-26"
SOURCE_URL_TEMPLATE = (
    "https://api.worldbank.org/v2/country/all/indicator/{indicator}"
    "?format=json&per_page=20000&date=2015"
)
COUNTRY_URL = "https://api.worldbank.org/v2/country?format=json&per_page=400"
WDI_CATALOG_URL = (
    "https://datacatalog.worldbank.org/infrastructure-data/search/dataset/"
    "0037712/world-development-indicators"
)
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/02-02"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"

INDICATORS = {
    "low-elevation-population-map": {
        "id": "EN.POP.EL5M.ZS",
        "unit": "% of total population",
        "title": "Population living in areas where elevation is below 5 meters",
    },
    "low-elevation-land-area-map": {
        "id": "AG.LND.EL5M.ZS",
        "unit": "% of total land area",
        "title": "Land area where elevation is below 5 meters",
    },
}


def fetch_json(url: str):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.load(response)


def write_json(path: Path, data: dict) -> int:
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


def get_country_iso3s() -> set[str]:
    response = fetch_json(COUNTRY_URL)
    if not isinstance(response, list) or len(response) < 2 or not response[1]:
        raise ValueError("Unexpected World Bank country response")
    country_codes = set()
    for row in response[1]:
        iso3 = row.get("id")
        if len(iso3 or "") == 3 and row.get("region", {}).get("id") != "NA":
            country_codes.add(iso3)
    if not country_codes:
        raise ValueError("World Bank country response contains no ISO3 codes")
    return country_codes


def build_indicator(slug: str, config: dict, country_iso3s: set[str]) -> None:
    indicator = config["id"]
    url = SOURCE_URL_TEMPLATE.format(
        indicator=urllib.parse.quote(indicator, safe=".")
    )
    response = fetch_json(url)
    if not isinstance(response, list) or len(response) < 2 or not isinstance(response[1], list):
        raise ValueError(f"Unexpected World Bank response for {indicator}")

    values_by_iso3 = {}
    for row in response[1]:
        iso3 = row.get("countryiso3code")
        if iso3 in country_iso3s and row.get("date") == "2015":
            values_by_iso3[iso3] = row.get("value")
    values = {iso3: values_by_iso3.get(iso3) for iso3 in sorted(country_iso3s)}
    write_json(
        OUT_DIR / f"{slug}.json",
        {"year": 2015, "unit": config["unit"], "values": values},
    )
    observed = sum(value is not None for value in values.values())
    print(
        f"{indicator}: 2015 observed={observed}/{len(values)}; "
        f"samples="
        f"{ {iso3: values.get(iso3) for iso3 in ('BGD', 'IDN', 'NLD', 'USA')} }"
    )


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    country_iso3s = get_country_iso3s()
    for slug, config in INDICATORS.items():
        build_indicator(slug, config, country_iso3s)
    print(
        f"retrievedAt={RETRIEVED_AT}; snapshotYear=2015; "
        f"countries={len(country_iso3s)}; license=CC BY 4.0"
    )


if __name__ == "__main__":
    build()
