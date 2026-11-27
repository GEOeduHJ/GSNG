#!/usr/bin/env python3
"""Build WDI tourism-arrival and terrestrial-protection materials for unit 02-02."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
WDI_API_URL = "https://api.worldbank.org/v2"
COUNTRY_URL = f"{WDI_API_URL}/country?format=json&per_page=400"
TOURISM_SOURCE_URL = "https://data.worldbank.org/indicator/ST.INT.ARVL"
PROTECTED_AREA_SOURCE_URL = "https://data.worldbank.org/indicator/ER.LND.PTLD.ZS"
WDI_LICENSE_URL = "https://datacatalog.worldbank.org/public-licenses"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/02-02"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"

TOURISM_INDICATOR = "ST.INT.ARVL"
TOURISM_YEARS = list(range(1995, 2021))
TOURISM_COUNTRIES = [
    ("NPL", "네팔"),
    ("ISL", "아이슬란드"),
    ("NZL", "뉴질랜드"),
    ("ZMB", "잠비아"),
]
PROTECTED_AREA_INDICATOR = "ER.LND.PTLD.ZS"
PROTECTED_AREA_YEAR = 2025


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


def fetch_indicator_rows(indicator: str, date: str) -> list[dict]:
    url = (
        f"{WDI_API_URL}/country/all/indicator/"
        f"{urllib.parse.quote(indicator, safe='.') }"
        f"?format=json&per_page=20000&date={urllib.parse.quote(date, safe=':')}"
    )
    response = fetch_json(url)
    if (
        not isinstance(response, list)
        or len(response) < 2
        or not isinstance(response[1], list)
    ):
        raise ValueError(f"Unexpected World Bank response for {indicator}")
    return response[1]


def build_tourism_arrivals() -> None:
    rows = fetch_indicator_rows(
        TOURISM_INDICATOR, f"{TOURISM_YEARS[0]}:{TOURISM_YEARS[-1]}"
    )
    years = list(TOURISM_YEARS)
    series = []
    for iso3, korean_name in TOURISM_COUNTRIES:
        values_by_year = {
            int(row["date"]): row.get("value")
            for row in rows
            if row.get("countryiso3code") == iso3
            and row.get("date", "").isdigit()
        }
        series.append(
            {
                "name": korean_name,
                "iso3": iso3,
                "values": [values_by_year.get(year) for year in years],
            }
        )

    write_json(
        OUT_DIR / "international-tourism-arrivals-1995-2020.json",
        {"unit": "visitors", "years": years, "series": series},
    )
    for item in series:
        values_2020 = item["values"][years.index(2020)]
        print(f"tourism arrivals {item['iso3']} 2020={values_2020}")


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


def build_protected_area_map(country_iso3s: set[str]) -> None:
    rows = fetch_indicator_rows(PROTECTED_AREA_INDICATOR, str(PROTECTED_AREA_YEAR))
    observed = {
        row["countryiso3code"]: row.get("value")
        for row in rows
        if row.get("countryiso3code") in country_iso3s
        and row.get("date") == str(PROTECTED_AREA_YEAR)
    }
    values = {iso3: observed.get(iso3) for iso3 in sorted(country_iso3s)}
    write_json(
        OUT_DIR / "terrestrial-protected-areas-map-2025.json",
        {"year": PROTECTED_AREA_YEAR, "unit": "%", "values": values},
    )
    valid = sum(value is not None for value in values.values())
    print(
        f"{PROTECTED_AREA_INDICATOR} {PROTECTED_AREA_YEAR}: "
        f"observed={valid}/{len(values)}; "
        f"samples={ {iso3: values.get(iso3) for iso3 in ('NPL', 'NZL', 'ZMB')} }"
    )


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    build_tourism_arrivals()
    build_protected_area_map(get_country_iso3s())
    print(
        f"retrievedAt={RETRIEVED_AT}; source=World Bank WDI; "
        f"license=CC BY 4.0; tourismYears={TOURISM_YEARS[0]}–{TOURISM_YEARS[-1]}; "
        f"protectedAreaYear={PROTECTED_AREA_YEAR}"
    )


if __name__ == "__main__":
    build()
