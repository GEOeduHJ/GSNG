#!/usr/bin/env python3
"""Build renewable electricity and installed-capacity data for unit 04-01."""

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
    "https://files.ember-energy.org/public-downloads/generation/outputs/"
    "release_generation_yearly_global.csv"
)
SOURCE_PAGE_URL = "https://ember-energy.org/data/yearly-electricity-data/"
LICENSE_URL = "https://ember-energy.org/creative-commons/"
MAP_BOUNDARIES = "public/data/base/countries-110m.geojson"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/04-01"
MAX_BYTES = 1_000_000
MAP_YEAR = 2024
CAPACITY_YEAR = 2024
KOREA_SERIES_START_YEAR = 1985


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


def read_source() -> list[dict[str, str]]:
    with tempfile.TemporaryDirectory(prefix="u0401-ember-") as temporary_dir:
        raw_path = Path(temporary_dir) / "ember-yearly-electricity.csv"
        fetch_to_path(SOURCE_URL, raw_path)
        with raw_path.open(encoding="utf-8-sig", newline="") as source:
            return list(csv.DictReader(source))


def build_renewables_map(rows: list[dict[str, str]], country_codes: set[str]) -> int:
    by_iso3 = {}
    for row in rows:
        if (
            row.get("Year") == str(MAP_YEAR)
            and row.get("Area type") == "Country or economy"
            and row.get("Electricity source") == "Renewables"
            and row.get("Is aggregated source", "").lower() == "true"
            and row.get("ISO 3 code") in country_codes
        ):
            by_iso3[row["ISO 3 code"]] = number_or_none(row.get("Share of generation (%)"))
    values = {iso3: by_iso3.get(iso3) for iso3 in sorted(country_codes)}
    write_json(
        OUT_DIR / "renewable-electricity-share-map.json",
        {
            "year": MAP_YEAR,
            "unit": "% of electricity generation",
            "values": values,
        },
    )
    return sum(value is not None for value in values.values())


def build_capacity_bar(
    rows: list[dict[str, str]], country_names: dict[str, str], source: str
) -> list[dict]:
    ranked = []
    for row in rows:
        iso3 = row.get("ISO 3 code", "")
        capacity = number_or_none(row.get("Capacity (GW)"))
        if (
            row.get("Year") != str(CAPACITY_YEAR)
            or row.get("Area type") != "Country or economy"
            or row.get("Electricity source") != source
            or iso3 not in country_names
            or capacity is None
        ):
            continue
        ranked.append({"iso3": iso3, "name": country_names[iso3], "value": capacity})
    ranked.sort(key=lambda item: item["value"], reverse=True)
    top = ranked[:10]
    if len(top) < 10:
        raise ValueError(f"Expected at least 10 countries for {source} capacity in {CAPACITY_YEAR}")
    slug = source.lower()
    write_json(
        OUT_DIR / f"{slug}-capacity-top10.json",
        {"year": CAPACITY_YEAR, "unit": "GW", "rows": top},
    )
    return top


def build_korea_series(rows: list[dict[str, str]]) -> tuple[int, list[float | None]]:
    by_year = {
        int(row["Year"]): number_or_none(row.get("Share of generation (%)"))
        for row in rows
        if row.get("Area type") == "Country or economy"
        and row.get("ISO 3 code") == "KOR"
        and row.get("Electricity source") == "Renewables"
        and row.get("Year", "").isdigit()
    }
    if not by_year:
        raise ValueError("No Ember renewable generation share series for KOR")
    end_year = max(by_year)
    years = list(range(KOREA_SERIES_START_YEAR, end_year + 1))
    values = [by_year.get(year) for year in years]
    write_json(
        OUT_DIR / "korea-renewable-electricity-share-series.json",
        {
            "unit": "% of electricity generation",
            "years": years,
            "series": [
                {
                    "name": "재생 에너지 발전 비중",
                    "iso3": "KOR",
                    "values": values,
                }
            ],
        },
    )
    return end_year, values


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    country_names, country_codes = read_boundaries()
    rows = read_source()
    map_coverage = build_renewables_map(rows, country_codes)
    solar = build_capacity_bar(rows, country_names, "Solar")
    wind = build_capacity_bar(rows, country_names, "Wind")
    korea_end_year, korea_values = build_korea_series(rows)
    korea_index = 2024 - KOREA_SERIES_START_YEAR
    print(
        f"mapYear={MAP_YEAR}; mapCoverage={map_coverage}/{len(country_codes)}; "
        f"capacityYear={CAPACITY_YEAR}; koreaYears={KOREA_SERIES_START_YEAR}-{korea_end_year}; "
        f"retrievedAt={RETRIEVED_AT}; page={SOURCE_PAGE_URL}; license={LICENSE_URL}"
    )
    print(f"solarTopThree={solar[:3]}")
    print(f"windTopThree={wind[:3]}")
    print(f"KOR share 2024={korea_values[korea_index]}; 2025={korea_values[-1]}")


if __name__ == "__main__":
    build()
