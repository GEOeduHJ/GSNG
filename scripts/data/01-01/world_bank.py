#!/usr/bin/env python3
"""Build WDI map snapshots and comparison series for unit 01-01."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-26"
SOURCE_URL_TEMPLATE = (
    "https://api.worldbank.org/v2/country/all/indicator/{indicator}"
    "?format=json&per_page=20000&date=1990:2025"
)
COUNTRY_URL = "https://api.worldbank.org/v2/country?format=json&per_page=400"
LICENSE_URL = "https://datacatalog.worldbank.org/search/dataset/0037712/world-development-indicators"
MAP_MIN_COVERAGE = 0.80
MAP_START_YEAR = 2016
SERIES_START_YEAR = 1990
SERIES_ISO3 = ["WLD", "KOR", "USA", "CHN", "DEU", "BGD", "IND"]
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/01-01"
MAX_BYTES = 1_000_000

INDICATORS = {
    "trade-share": {
        "id": "NE.TRD.GNFS.ZS",
        "unit": "% of GDP",
        "title": "Trade (% of GDP)",
    },
    "internet-use": {
        "id": "IT.NET.USER.ZS",
        "unit": "% of population",
        "title": "Individuals using the Internet (% of population)",
    },
}


def fetch_json(url: str):
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.load(response)


def write_json(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    print(f"{path}: {size} bytes")


def get_country_names() -> tuple[dict[str, str], set[str]]:
    response = fetch_json(COUNTRY_URL)
    names: dict[str, str] = {}
    for row in response[1]:
        iso3 = row.get("id")
        if len(iso3 or "") == 3 and row.get("region", {}).get("id") != "NA":
            names[iso3] = row["name"]
    return names, set(names)


def map_year(records: list[dict], country_iso3: set[str]) -> tuple[int, int]:
    available: dict[int, set[str]] = {}
    for row in records:
        iso3 = row.get("countryiso3code")
        year = int(row["date"])
        if iso3 in country_iso3 and row.get("value") is not None:
            available.setdefault(year, set()).add(iso3)
    eligible = [
        year
        for year, values in available.items()
        if year >= MAP_START_YEAR and len(values) / len(country_iso3) >= MAP_MIN_COVERAGE
    ]
    if eligible:
        year = max(eligible)
    elif available:
        year = max(available, key=lambda candidate: (len(available[candidate]), candidate))
    else:
        raise ValueError("WDI response contains no country observations")
    return year, len(available.get(year, set()))


def build_indicator(config: dict, country_names: dict[str, str], country_iso3: set[str]) -> None:
    indicator = config["id"]
    source_url = SOURCE_URL_TEMPLATE.format(indicator=urllib.parse.quote(indicator, safe="."))
    response = fetch_json(source_url)
    if not isinstance(response, list) or len(response) < 2 or not isinstance(response[1], list):
        raise ValueError(f"Unexpected World Bank response for {indicator}")
    records = response[1]

    by_iso3_year = {
        (row.get("countryiso3code"), int(row["date"])): row.get("value")
        for row in records
        if row.get("countryiso3code")
    }
    year, covered = map_year(records, country_iso3)
    values = {iso3: by_iso3_year.get((iso3, year)) for iso3 in sorted(country_iso3)}
    write_json(
        OUT_DIR / f"{config['slug']}-map.json",
        {"year": year, "unit": config["unit"], "values": values},
    )

    max_year = max(int(row["date"]) for row in records)
    years = list(range(SERIES_START_YEAR, max_year + 1))
    series = []
    for iso3 in SERIES_ISO3:
        name = country_names.get(iso3)
        if not name:
            name = next(
                (row["country"]["value"] for row in records if row.get("countryiso3code") == iso3),
                iso3,
            )
        series.append(
            {
                "name": name,
                "iso3": iso3,
                "values": [by_iso3_year.get((iso3, item_year)) for item_year in years],
            }
        )
    write_json(
        OUT_DIR / f"{config['slug']}-series.json",
        {"unit": config["unit"], "years": years, "series": series},
    )
    print(
        f"{indicator}: mapYear={year}; coverage={covered}/{len(country_iso3)}; "
        f"seriesYears={years[0]}-{years[-1]}"
    )
    for iso3 in ["WLD", "KOR", "USA", "CHN"]:
        print(f"  {iso3} {year}: {by_iso3_year.get((iso3, year))}")


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    country_names, country_iso3 = get_country_names()
    for slug, config in INDICATORS.items():
        config["slug"] = slug
        build_indicator(config, country_names, country_iso3)
    print(f"sourceDate={RETRIEVED_AT}; mapCoverageThreshold={MAP_MIN_COVERAGE:.0%}")


if __name__ == "__main__":
    build()
