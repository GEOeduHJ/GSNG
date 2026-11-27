#!/usr/bin/env python3
"""Build population-growth and continental-share datasets from WPP 2024."""

from __future__ import annotations

import csv
import gzip
import json
import shutil
import tempfile
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
WPP_DEMOGRAPHIC_CSV_URL = (
    "https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/"
    "CSV_FILES/WPP2024_Demographic_Indicators_Medium.csv.gz"
)
WPP_SOURCE_PAGE_URL = "https://population.un.org/wpp/"
WPP_COUNTRY_PROFILE_URL = (
    "https://population.un.org/dataportal/countryProfiles/types/1/topics/1/"
    "coreThemes/7/locations/231"
)
WPP_DATA_SOURCES_URL = (
    "https://population.un.org/wpp/assets/Excel%20Files/4_Metadata/"
    "WPP2024_Data_Sources.pdf"
)
WPP_LICENSE_URL = "https://creativecommons.org/licenses/by/3.0/igo/"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/03-01"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"
START_YEAR = 1950
END_YEAR = 2100
YEARS = list(range(START_YEAR, END_YEAR + 1))
WORLD_LOC_ID = "900"
CONTINENT_LOCATIONS = {
    "903": "아프리카",
    "935": "아시아",
    "908": "유럽",
    "904": "라틴아메리카·카리브",
    "905": "북아메리카",
    "909": "오세아니아",
}
EXPECTED_LOCATION_NAMES = {
    "900": "World",
    "903": "Africa",
    "935": "Asia",
    "908": "Europe",
    "904": "Latin America and the Caribbean",
    "905": "Northern America",
    "909": "Oceania",
}
REQUIRED_COLUMNS = {"LocID", "Location", "LocTypeName", "Variant", "Time", "TPopulation1July"}


def write_json(path: Path, data: dict) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
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


def download_source(path: Path) -> int:
    request = urllib.request.Request(WPP_DEMOGRAPHIC_CSV_URL, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=180) as response, path.open("wb") as output:
        shutil.copyfileobj(response, output, length=1024 * 1024)
    size = path.stat().st_size
    if size == 0:
        raise ValueError("Downloaded WPP demographic-indicators file is empty")
    return size


def read_population_rows(raw_path: Path) -> dict[str, dict[int, float | None]]:
    location_ids = {WORLD_LOC_ID, *CONTINENT_LOCATIONS}
    selected = {location_id: {} for location_id in location_ids}
    location_types: dict[str, str] = {}

    with gzip.open(raw_path, "rt", encoding="utf-8-sig", newline="") as source:
        reader = csv.DictReader(source)
        if not reader.fieldnames or not REQUIRED_COLUMNS.issubset(reader.fieldnames):
            raise ValueError("Unexpected WPP 2024 demographic-indicators CSV columns")

        for row in reader:
            location_id = row.get("LocID")
            if (
                location_id not in selected
                or row.get("Variant") != "Medium"
                or not row.get("Time", "").isdigit()
            ):
                continue
            year = int(row["Time"])
            if year < START_YEAR or year > END_YEAR:
                continue
            expected_type = "World" if location_id == WORLD_LOC_ID else "Geographic region"
            if (
                row.get("LocTypeName") != expected_type
                or row.get("Location") != EXPECTED_LOCATION_NAMES[location_id]
            ):
                continue
            if year in selected[location_id]:
                raise ValueError(f"Duplicate WPP row for location {location_id}, year {year}")
            value = row.get("TPopulation1July", "").strip()
            selected[location_id][year] = float(value) if value else None
            location_types[location_id] = row.get("LocTypeName", "")

    for location_id, values in selected.items():
        missing_years = sorted(set(YEARS) - set(values))
        if missing_years:
            raise ValueError(f"Missing WPP years for location {location_id}: {missing_years[:5]}")
    if location_types.get(WORLD_LOC_ID) != "World":
        raise ValueError("WPP World aggregate was not found")
    return selected


def build_datasets(population: dict[str, dict[int, float | None]]) -> tuple[dict, dict]:
    world_values = population[WORLD_LOC_ID]
    population_series = {
        "unit": "thousands of persons (1 July)",
        "years": YEARS,
        "series": [
            {
                "name": "세계",
                "values": [world_values[year] for year in YEARS],
            }
        ],
    }

    continent_series = []
    for location_id, label in CONTINENT_LOCATIONS.items():
        values = []
        for year in YEARS:
            continent_population = population[location_id][year]
            world_population = world_values[year]
            if continent_population is None or world_population is None or world_population == 0:
                values.append(None)
            else:
                values.append(round(continent_population / world_population * 100, 6))
        continent_series.append({"name": label, "values": values})

    continent_shares = {
        "unit": "% of world population",
        "years": YEARS,
        "series": continent_series,
    }
    return population_series, continent_shares


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="unit03-wpp2024-population-") as temp_dir:
        raw_path = Path(temp_dir) / "WPP2024_Demographic_Indicators_Medium.csv.gz"
        source_bytes = download_source(raw_path)
        population = read_population_rows(raw_path)
        population_series, continent_shares = build_datasets(population)
        write_json(OUT_DIR / "world-population-wpp2024-1950-2100.json", population_series)
        write_json(OUT_DIR / "continent-population-share-wpp2024-1950-2100.json", continent_shares)

    continent_share_2024 = {
        series["name"]: series["values"][2024 - START_YEAR]
        for series in continent_shares["series"]
    }
    print(
        f"retrievedAt={RETRIEVED_AT}; sourceBytes={source_bytes}; "
        f"years={START_YEAR}-{END_YEAR}; world1950={population_series['series'][0]['values'][0]}; "
        f"world2024={population_series['series'][0]['values'][2024 - START_YEAR]}; "
        f"world2100={population_series['series'][0]['values'][-1]}; "
        f"continentShare2024={continent_share_2024}; source={WPP_SOURCE_PAGE_URL}; "
        f"license=CC BY 3.0 IGO; licenseInfo={WPP_DATA_SOURCES_URL}; "
        f"profileLicense={WPP_COUNTRY_PROFILE_URL}; licenseUrl={WPP_LICENSE_URL}"
    )


if __name__ == "__main__":
    build()
