#!/usr/bin/env python3
"""Build World Bank WDI artifacts for unit 03-03."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

RETRIEVED_AT = "2026-11-27"
SOURCE_URL_TEMPLATE = (
    "https://api.worldbank.org/v2/country/all/indicator/{indicator}"
    "?format=json&per_page=20000&date={start}:{end}"
)
COUNTRY_URL = "https://api.worldbank.org/v2/country?format=json&per_page=400"
CATALOG_URL = (
    "https://datacatalog.worldbank.org/infrastructure-data/search/dataset/"
    "0037712/world-development-indicators"
)
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/03-03"
MAX_BYTES = 1_000_000
SERIES_START_YEAR = 1990
COMPARISON_END_YEAR = 2024
ODA_END_YEAR = 2023
POVERTY_START_YEAR = 2015
POVERTY_END_YEAR = 2023
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"

INDICATORS = {
    "fdi_gdp": "BX.KLT.DINV.WD.GD.ZS",
    "fdi_current_usd": "BX.KLT.DINV.CD.WD",
    "gdp_ppp_current": "NY.GDP.PCAP.PP.CD",
    "gdp_ppp_constant": "NY.GDP.PCAP.PP.KD",
    "poverty": "SI.POV.DDAY",
    "oda_gni": "DT.ODA.ODAT.GN.ZS",
    "oda_constant_usd": "DT.ODA.ODAT.KD",
}

GDP_SERIES = [
    ("USA", "미국"),
    ("DEU", "독일"),
    ("KOR", "대한민국"),
    ("CHN", "중국"),
    ("BRA", "브라질"),
    ("IND", "인도"),
    ("MWI", "말라위"),
]
ODA_SERIES = [
    ("BGD", "방글라데시"),
    ("ETH", "에티오피아"),
    ("MWI", "말라위"),
    ("PAK", "파키스탄"),
    ("NPL", "네팔"),
    ("RWA", "르완다"),
]


def fetch_json(url: str) -> Any:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.load(response)


def source_url(indicator: str, start: int, end: int) -> str:
    return SOURCE_URL_TEMPLATE.format(
        indicator=urllib.parse.quote(indicator, safe="."), start=start, end=end
    )


def fetch_records(indicator: str, start: int, end: int) -> list[dict[str, Any]]:
    response = fetch_json(source_url(indicator, start, end))
    if (
        not isinstance(response, list)
        or len(response) < 2
        or not isinstance(response[1], list)
    ):
        raise ValueError(f"Unexpected World Bank response for {indicator}")
    return response[1]


def country_codes() -> set[str]:
    response = fetch_json(COUNTRY_URL)
    if not isinstance(response, list) or len(response) < 2 or not response[1]:
        raise ValueError("Unexpected World Bank country response")
    codes = {
        row["id"]
        for row in response[1]
        if len(row.get("id", "")) == 3 and row.get("region", {}).get("id") != "NA"
    }
    if not codes:
        raise ValueError("World Bank country response contains no ISO3 codes")
    return codes


def write_json(filename: str, payload: dict[str, Any]) -> int:
    path = OUT_DIR / filename
    path.write_text(
        json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    print(f"{filename}: {size} bytes")
    return size


def value_index(records: list[dict[str, Any]]) -> dict[tuple[str, int], Any]:
    return {
        (row.get("countryiso3code"), int(row["date"])): row.get("value")
        for row in records
        if row.get("countryiso3code") and row.get("date")
    }


def build_map(
    filename: str,
    indicator: str,
    year: int,
    unit: str,
    codes: set[str],
) -> dict[str, Any]:
    records = fetch_records(indicator, year, year)
    index = value_index(records)
    values = {iso3: index.get((iso3, year)) for iso3 in sorted(codes)}
    build_payload: dict[str, Any] = {"year": year, "unit": unit, "values": values}
    write_json(filename, build_payload)
    observed = sum(value is not None for value in values.values())
    print(f"  indicator={indicator}; year={year}; observed={observed}/{len(codes)}")
    return values


def build_series(
    filename: str,
    indicator: str,
    end_year: int,
    unit: str,
    selections: list[tuple[str, str]],
) -> dict[tuple[str, int], Any]:
    records = fetch_records(indicator, SERIES_START_YEAR, end_year)
    index = value_index(records)
    years = list(range(SERIES_START_YEAR, end_year + 1))
    series = [
        {
            "name": name,
            "iso3": iso3,
            "values": [index.get((iso3, year)) for year in years],
        }
        for iso3, name in selections
    ]
    write_json(filename, {"unit": unit, "years": years, "series": series})
    return index


def build_poverty_map(codes: set[str]) -> tuple[dict[str, Any], dict[str, int]]:
    records = fetch_records(INDICATORS["poverty"], POVERTY_START_YEAR, POVERTY_END_YEAR)
    latest: dict[str, tuple[int, Any]] = {}
    for row in records:
        iso3 = row.get("countryiso3code")
        if iso3 not in codes or row.get("value") is None:
            continue
        year = int(row["date"])
        if year < POVERTY_START_YEAR or year > POVERTY_END_YEAR:
            continue
        if iso3 not in latest or year > latest[iso3][0]:
            latest[iso3] = (year, row["value"])

    values = {iso3: latest.get(iso3, (0, None))[1] for iso3 in sorted(codes)}
    observation_years = {
        iso3: latest[iso3][0] for iso3 in sorted(latest)
    }
    payload = {
        "year": None,
        "unit": "% of population below $3.00/day (2021 PPP)",
        "values": values,
        "observationYears": observation_years,
        "observationPeriod": f"{POVERTY_START_YEAR}–{POVERTY_END_YEAR}; latest available value per country",
    }
    write_json("extreme-poverty-latest-map.json", payload)
    counts: dict[int, int] = {}
    for year, _value in latest.values():
        counts[year] = counts.get(year, 0) + 1
    print(
        f"  indicator={INDICATORS['poverty']}; observed={len(latest)}/{len(codes)}; "
        f"yearCounts={dict(sorted(counts.items()))}"
    )
    return values, observation_years


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    codes = country_codes()
    print(f"World Bank WDI; retrievedAt={RETRIEVED_AT}; license=CC BY 4.0")
    print(f"Source catalog: {CATALOG_URL}")

    fdi_map = build_map(
        "fdi-net-inflows-gdp-map.json",
        INDICATORS["fdi_gdp"],
        COMPARISON_END_YEAR,
        "% of GDP",
        codes,
    )
    fdi_index = build_series(
        "fdi-global-net-inflows-series.json",
        INDICATORS["fdi_current_usd"],
        COMPARISON_END_YEAR,
        "current US$",
        [("WLD", "세계")],
    )

    gdp_map = build_map(
        "gdp-ppp-per-capita-map.json",
        INDICATORS["gdp_ppp_current"],
        COMPARISON_END_YEAR,
        "current international $ per person",
        codes,
    )
    gdp_index = build_series(
        "gdp-ppp-constant-country-series.json",
        INDICATORS["gdp_ppp_constant"],
        COMPARISON_END_YEAR,
        "constant 2021 international $ per person",
        GDP_SERIES,
    )

    poverty_values, poverty_years = build_poverty_map(codes)

    oda_map = build_map(
        "oda-received-gni-map.json",
        INDICATORS["oda_gni"],
        ODA_END_YEAR,
        "% of GNI",
        codes,
    )
    oda_index = build_series(
        "oda-received-constant-series.json",
        INDICATORS["oda_constant_usd"],
        ODA_END_YEAR,
        "constant 2023 US$",
        ODA_SERIES,
    )

    print("Representative values for README source checks:")
    for iso3 in ("USA", "CHN", "KOR"):
        print(f"  FDI/GDP {iso3} 2024: {fdi_map.get(iso3)}")
    for iso3 in ("USA", "CHN", "IND"):
        print(f"  GDP PPP {iso3} 2024: {gdp_map.get(iso3)}")
    for iso3 in ("IND", "ZAF", "BGD"):
        print(f"  Poverty {iso3}: {poverty_values.get(iso3)} ({poverty_years.get(iso3)})")
    for iso3 in ("MWI", "RWA", "ETH"):
        print(f"  ODA/GNI {iso3} 2023: {oda_map.get(iso3)}")
    print("  FDI series WLD 1990/2000/2024:", [fdi_index.get(("WLD", y)) for y in (1990, 2000, 2024)])
    print("  GDP series USA 1990, CHN 2000, KOR 2024:", [gdp_index.get((iso, year)) for iso, year in (("USA", 1990), ("CHN", 2000), ("KOR", 2024))])
    print("  ODA series BGD 1990, ETH 2000, PAK 2023:", [oda_index.get((iso, year)) for iso, year in (("BGD", 1990), ("ETH", 2000), ("PAK", 2023))])


if __name__ == "__main__":
    build()
