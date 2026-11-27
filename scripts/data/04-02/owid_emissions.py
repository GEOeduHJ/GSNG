#!/usr/bin/env python3
"""Build carbon and greenhouse-gas emissions data for unit 04-02."""

from __future__ import annotations

import csv
import io
import json
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
PER_CAPITA_SOURCE_URL = (
    "https://ourworldindata.org/grapher/co-emissions-per-capita.csv"
    "?v=1&csvType=full&useColumnShortNames=false"
)
ANNUAL_CO2_SOURCE_URL = (
    "https://ourworldindata.org/grapher/annual-co2-emissions-per-country.csv"
    "?v=1&csvType=full&useColumnShortNames=false"
)
KOREA_GHG_SOURCE_URL = (
    "https://ourworldindata.org/grapher/total-ghg-emissions.csv"
    "?v=1&csvType=full&useColumnShortNames=false"
)
GCP_LICENSE_URL = "https://zenodo.org/records/23667912"
JONES_LICENSE_URL = "https://zenodo.org/records/16640595"
BASE_GEOJSON = "public/data/base/countries-110m.geojson"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/04-02"
MAX_BYTES = 1_000_000
USER_AGENT = "Our World In Data data fetch/1.0"

CARBON_YEAR = 2024
GHG_FIRST_YEAR = 1990
GHG_LAST_YEAR = 2024
COUNTRY_NAMES_KO = {
    "USA": "미국",
    "CHN": "중국",
    "RUS": "러시아",
    "DEU": "독일",
    "GBR": "영국",
    "JPN": "일본",
    "IND": "인도",
    "FRA": "프랑스",
    "CAN": "캐나다",
    "POL": "폴란드",
    "UKR": "우크라이나",
    "ITA": "이탈리아",
    "MEX": "멕시코",
    "KOR": "대한민국",
    "BRA": "브라질",
    "COD": "콩고민주공화국",
}


def fetch_csv_rows(url: str) -> list[dict[str, str]]:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept": "text/csv,*/*"},
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        text = response.read().decode("utf-8-sig")
    rows = list(csv.DictReader(io.StringIO(text)))
    if not rows:
        raise ValueError(f"Empty CSV response: {url}")
    return rows


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


def parse_value(value: str | None) -> float | None:
    if value is None or value.strip() == "":
        return None
    return float(value)


def build_per_capita_map(map_iso3s: list[str]) -> None:
    rows = fetch_csv_rows(PER_CAPITA_SOURCE_URL)
    field = "CO₂ emissions per capita"
    by_iso3: dict[str, float | None] = {}
    for row in rows:
        iso3 = row.get("Code")
        if iso3 in map_iso3s and row.get("Year") == str(CARBON_YEAR):
            by_iso3[iso3] = parse_value(row.get(field))

    values = {iso3: by_iso3.get(iso3) for iso3 in map_iso3s}
    write_json(
        OUT_DIR / "co2-per-capita-map-2024.json",
        {"year": CARBON_YEAR, "unit": "t CO₂/person/year", "values": values},
    )
    sample = {code: values.get(code) for code in ("USA", "CHN", "KOR")}
    observed = sum(value is not None for value in values.values())
    print(f"co-emissions-per-capita: year={CARBON_YEAR}; observed={observed}/{len(values)}; samples={sample}")


def build_cumulative_top10() -> None:
    rows = fetch_csv_rows(ANNUAL_CO2_SOURCE_URL)
    field = "Annual CO₂ emissions"
    totals: dict[str, float] = {}
    names: dict[str, str] = {}
    for row in rows:
        iso3 = row.get("Code") or ""
        try:
            year = int(row["Year"])
        except (KeyError, ValueError):
            continue
        if len(iso3) != 3 or not iso3.isalpha() or not (1850 <= year <= CARBON_YEAR):
            continue
        value = parse_value(row.get(field))
        if value is None:
            continue
        totals[iso3] = totals.get(iso3, 0.0) + value
        names[iso3] = row.get("Entity", iso3)

    top10 = sorted(totals, key=lambda code: totals[code], reverse=True)[:10]
    if len(top10) != 10:
        raise ValueError(f"Expected 10 country rows, got {len(top10)}")
    base_iso3s = set(get_map_iso3s())
    top10 = [code for code in top10 if code in base_iso3s]
    if len(top10) != 10:
        raise ValueError("Top 10 country set contains a code absent from the Natural Earth base map")
    output_rows = [
        {
            "iso3": code,
            "name": COUNTRY_NAMES_KO.get(code, names.get(code, code)),
            "value": round(totals[code] / 1_000_000_000, 6),
        }
        for code in top10
    ]
    write_json(
        OUT_DIR / "cumulative-co2-top10-1850-2024.json",
        {
            "year": CARBON_YEAR,
            "unit": "Gt CO₂ (누적, 1850–2024)",
            "rows": output_rows,
        },
    )
    print(
        "annual-co2-emissions-per-country: cumulative=1850-2024; "
        f"top10={[(row['iso3'], row['value']) for row in output_rows]}"
    )


def build_korea_ghg_series() -> None:
    rows = fetch_csv_rows(KOREA_GHG_SOURCE_URL)
    field = "Annual greenhouse gas emissions including land use"
    by_year: dict[int, float | None] = {}
    for row in rows:
        if row.get("Code") != "KOR":
            continue
        try:
            year = int(row["Year"])
        except (KeyError, ValueError):
            continue
        if GHG_FIRST_YEAR <= year <= GHG_LAST_YEAR:
            value = parse_value(row.get(field))
            by_year[year] = None if value is None else round(value / 1_000_000, 6)

    years = list(range(GHG_FIRST_YEAR, GHG_LAST_YEAR + 1))
    if by_year.get(GHG_FIRST_YEAR) is None or by_year.get(GHG_LAST_YEAR) is None:
        raise ValueError("KOR greenhouse-gas series lacks a 1990 or 2024 value")
    values = [by_year.get(year) for year in years]
    write_json(
        OUT_DIR / "south-korea-ghg-1990-2024.json",
        {
            "unit": "Mt CO₂e/year",
            "years": years,
            "series": [{"name": "대한민국", "iso3": "KOR", "values": values}],
        },
    )
    sample = {year: by_year.get(year) for year in (1990, 2018, 2024)}
    print(f"total-ghg-emissions: years=1990-2024; samples(Mt CO2e)={sample}")


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    map_iso3s = get_map_iso3s()
    build_per_capita_map(map_iso3s)
    build_cumulative_top10()
    build_korea_ghg_series()
    print(
        f"retrievedAt={RETRIEVED_AT}; GCP license=CC BY 4.0 ({GCP_LICENSE_URL}); "
        f"Jones license=CC BY 4.0 ({JONES_LICENSE_URL}); "
        f"mapBoundary={BASE_GEOJSON}"
    )


if __name__ == "__main__":
    build()
