#!/usr/bin/env python3
"""Build energy-supply mix, per-capita and fossil-production data for unit 04-01."""

from __future__ import annotations

import csv
import json
import re
import shutil
import tempfile
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
SOURCE_URL = (
    "https://catalog.ourworldindata.org/garden/energy/2026-09-10/"
    "owid_energy/owid_energy.csv"
)
SOURCE_PAGE_URL = "https://catalog.ourworldindata.org/energy/owid_energy/"
MAP_BOUNDARIES = "public/data/base/countries-110m.geojson"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/04-01"
MAX_BYTES = 1_000_000
MIX_START_YEAR = 1980
PER_CAPITA_YEAR = 2024
MIX_COLUMNS = [
    ("석탄", "coal_energy_share_pct"),
    ("석유", "oil_energy_share_pct"),
    ("천연가스", "gas_energy_share_pct"),
    ("원자력", "nuclear_energy_share_pct"),
    ("수력", "hydro_energy_share_pct"),
    ("기타 재생에너지", "other_renewables"),
]
PRODUCTION_COLUMNS = {
    "oil": ("oil_production_twh", "석유 생산량", "TWh"),
    "gas": ("gas_production_twh", "천연가스 생산량", "TWh"),
    "coal": ("coal_production_twh", "석탄 생산량", "TWh"),
}


def fetch_to_path(url: str, path: Path) -> None:
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    with urllib.request.urlopen(request, timeout=120) as response, path.open("wb") as output:
        shutil.copyfileobj(response, output)


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    print(f"{path.relative_to(ROOT)}: {size} bytes")


def read_boundaries() -> tuple[dict[str, str], set[str]]:
    with (ROOT / MAP_BOUNDARIES).open(encoding="utf-8") as source:
        geojson = json.load(source)
    names = {}
    for feature in geojson.get("features", []):
        properties = feature.get("properties", {})
        iso3 = properties.get("iso_a3")
        if isinstance(iso3, str) and re.fullmatch(r"[A-Z]{3}", iso3):
            names[iso3] = properties.get("name_ko") or properties.get("name") or iso3
    return names, set(names)


def number_or_none(value: str | None) -> float | None:
    if value is None or value.strip() == "":
        return None
    return float(value)


def value_for(row: dict[str, str] | None, column: str) -> float | None:
    if row is None:
        return None
    if column == "other_renewables":
        total = number_or_none(row.get("renewables_energy_share_pct"))
        hydro = number_or_none(row.get("hydro_energy_share_pct"))
        if total is None or hydro is None:
            return None
        return total - hydro
    return number_or_none(row.get(column))


def build_mix_series(rows: list[dict[str, str]], country: str, filename: str) -> int:
    country_rows = {
        int(row["year"]): row
        for row in rows
        if row.get("country") == country and row.get("year", "").isdigit()
    }
    observed_years = sorted(country_rows)
    if not observed_years:
        raise ValueError(f"No observations for {country}")
    end_year = max(observed_years)
    years = list(range(MIX_START_YEAR, end_year + 1))
    series = []
    for name, column in MIX_COLUMNS:
        series.append(
            {
                "name": name,
                "values": [value_for(country_rows.get(year), column) for year in years],
            }
        )
    write_json(
        OUT_DIR / filename,
        {"unit": "% of total energy supply", "years": years, "series": series},
    )
    return end_year


def latest_year_with_values(rows: list[dict[str, str]], column: str) -> int:
    years: dict[int, int] = {}
    for row in rows:
        if row.get("year", "").isdigit() and len(row.get("iso_code", "")) == 3:
            if number_or_none(row.get(column)) is not None:
                year = int(row["year"])
                years[year] = years.get(year, 0) + 1
    eligible = [year for year, count in years.items() if count >= 10]
    if not eligible:
        raise ValueError(f"No recent country data for {column}")
    return max(eligible)


def build_production(
    rows: list[dict[str, str]], country_names: dict[str, str], slug: str, column: str
) -> tuple[int, list[dict]]:
    year = latest_year_with_values(rows, column)
    ranked = []
    for row in rows:
        iso3 = row.get("iso_code", "")
        value = number_or_none(row.get(column))
        if int(row.get("year", "0")) != year or iso3 not in country_names or value is None:
            continue
        ranked.append(
            {
                "iso3": iso3,
                "name": country_names[iso3],
                "value": value,
            }
        )
    ranked.sort(key=lambda item: item["value"], reverse=True)
    top = ranked[:10]
    if len(top) < 10:
        raise ValueError(f"Expected at least 10 countries for {column} in {year}")
    write_json(
        OUT_DIR / f"{slug}-production-top10.json",
        {"year": year, "unit": "TWh", "rows": top},
    )
    return year, top


def build_per_capita_map(rows: list[dict[str, str]], country_codes: set[str]) -> int:
    by_country_year = {
        (row.get("iso_code"), int(row["year"])): number_or_none(
            row.get("total_energy_per_capita_kwh")
        )
        for row in rows
        if row.get("iso_code") and row.get("year", "").isdigit()
    }
    values = {
        iso3: by_country_year.get((iso3, PER_CAPITA_YEAR)) for iso3 in sorted(country_codes)
    }
    write_json(
        OUT_DIR / "energy-use-per-capita-map.json",
        {
            "year": PER_CAPITA_YEAR,
            "unit": "kWh per person",
            "values": values,
        },
    )
    return sum(value is not None for value in values.values())


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    country_names, country_codes = read_boundaries()
    with tempfile.TemporaryDirectory(prefix="u0401-owid-") as temporary_dir:
        raw_path = Path(temporary_dir) / "owid_energy.csv"
        fetch_to_path(SOURCE_URL, raw_path)
        with raw_path.open(encoding="utf-8", newline="") as source:
            rows = list(csv.DictReader(source))

    world_year = build_mix_series(rows, "World", "energy-mix-world-series.json")
    korea_year = build_mix_series(rows, "South Korea", "energy-mix-korea-series.json")
    covered = build_per_capita_map(rows, country_codes)
    print(
        f"mixYears={MIX_START_YEAR}-{world_year}; koreaEndYear={korea_year}; "
        f"perCapitaYear={PER_CAPITA_YEAR}; mapCoverage={covered}/{len(country_codes)}; "
        f"sourceRetrievedAt={RETRIEVED_AT}"
    )
    for slug, (column, _title, _unit) in PRODUCTION_COLUMNS.items():
        year, top = build_production(rows, country_names, slug, column)
        print(f"{slug}ProductionYear={year}; topThree={top[:3]}")


if __name__ == "__main__":
    build()
