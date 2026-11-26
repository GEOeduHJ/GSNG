#!/usr/bin/env python3
"""Build 2022 country maps for water stress and irrigated agricultural land."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-26"
WORLD_BANK_API_BASE = "https://api.worldbank.org/v2"
WORLD_BANK_COUNTRIES_URL = f"{WORLD_BANK_API_BASE}/country?format=json&per_page=400"
WATER_STRESS_PAGE_URL = "https://data.worldbank.org/indicator/ER.H2O.FWST.ZS"
IRRIGATED_LAND_PAGE_URL = "https://data.worldbank.org/indicator/AG.LND.IRIG.AG.ZS"
FAO_WATER_STRESS_URL = (
    "https://www.fao.org/sustainable-development-goals-data-portal/data/"
    "indicators/642-water-stress/sdg-6-indicators-of-water-use-efficiency-and-water-stress/"
)
FAO_DB_TERMS_URL = "https://www.fao.org/contact-us/terms/db-terms-of-use/"
CC_BY_URL = "https://creativecommons.org/licenses/by/4.0/"

ROOT = Path(__file__).resolve().parents[3]
OUTPUT_DIR = ROOT / "public/data/02-01"
MAX_BYTES = 1_000_000
YEAR = 2022
INDICATORS = (
    {
        "code": "ER.H2O.FWST.ZS",
        "slug": "water-stress-map",
        "label": "물 스트레스 수준",
    },
    {
        "code": "AG.LND.IRIG.AG.ZS",
        "slug": "irrigated-land-map",
        "label": "농업용 관개 토지 비율",
    },
)


def fetch_json(url: str) -> list | dict:
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    with urllib.request.urlopen(request, timeout=180) as response:
        return json.loads(response.read().decode("utf-8"))


def country_iso3s() -> list[str]:
    response = fetch_json(WORLD_BANK_COUNTRIES_URL)
    if not isinstance(response, list) or len(response) < 2 or response[1] is None:
        raise ValueError("Unexpected World Bank country response")
    return sorted(
        row["id"]
        for row in response[1]
        if len(row.get("id", "")) == 3
        and row.get("region", {}).get("id") != "NA"
    )


def indicator_url(code: str) -> str:
    params = {"format": "json", "per_page": 20000, "date": str(YEAR)}
    return (
        f"{WORLD_BANK_API_BASE}/country/all/indicator/{code}?"
        + urllib.parse.urlencode(params)
    )


def indicator_values(code: str, country_codes: set[str]) -> dict[str, float]:
    response = fetch_json(indicator_url(code))
    if not isinstance(response, list) or len(response) < 2 or response[1] is None:
        raise ValueError(f"Unexpected World Bank response for {code}")
    values = {}
    for row in response[1]:
        iso3 = row.get("countryiso3code")
        if (
            iso3 in country_codes
            and int(row["date"]) == YEAR
            and row.get("value") is not None
        ):
            values[iso3] = round(float(row["value"]), 1)
    return values


def write_json(path: Path, data: dict) -> None:
    encoded = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    path.write_text(encoded, encoding="utf-8")
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    print(f"{path}: {size} bytes")


def build() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    iso3s = country_iso3s()
    iso3_set = set(iso3s)
    for indicator in INDICATORS:
        known_values = indicator_values(indicator["code"], iso3_set)
        values = {iso3: known_values.get(iso3) for iso3 in iso3s}
        path = OUTPUT_DIR / f"{indicator['slug']}.json"
        write_json(path, {"year": YEAR, "unit": "%", "values": values})
        print(
            f"  {indicator['code']}: {len(known_values)}/{len(iso3s)} values; "
            f"source={indicator_url(indicator['code'])}"
        )
    print(
        f"Sources retrieved {RETRIEVED_AT}: {WORLD_BANK_COUNTRIES_URL}; "
        f"{WATER_STRESS_PAGE_URL}; {IRRIGATED_LAND_PAGE_URL}; {FAO_WATER_STRESS_URL}; "
        f"license/terms={FAO_DB_TERMS_URL}; CC BY={CC_BY_URL}"
    )


if __name__ == "__main__":
    build()
