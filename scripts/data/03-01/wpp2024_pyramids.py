#!/usr/bin/env python3
"""Build three 2024 population pyramids from UN DESA WPP 2024."""

from __future__ import annotations

import csv
import gzip
import json
import shutil
import tempfile
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
WPP_AGE_SEX_CSV_URL = (
    "https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/"
    "CSV_FILES/WPP2024_PopulationByAge5GroupSex_Medium.csv.gz"
)
WPP_SOURCE_PAGE_URL = "https://population.un.org/wpp/"
WPP_2024_DATA_SOURCES_URL = (
    "https://population.un.org/wpp/assets/Excel%20Files/4_Metadata/"
    "WPP2024_Data_Sources.pdf"
)
WPP_LICENSE_URL = "https://creativecommons.org/licenses/by/3.0/igo/"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/03-01"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"
SNAPSHOT_YEAR = 2024

COUNTRIES = {
    "KOR": "대한민국",
    "JPN": "일본",
    "UGA": "우간다",
}
EXPECTED_GROUPS = [
    "0-4",
    "5-9",
    "10-14",
    "15-19",
    "20-24",
    "25-29",
    "30-34",
    "35-39",
    "40-44",
    "45-49",
    "50-54",
    "55-59",
    "60-64",
    "65-69",
    "70-74",
    "75-79",
    "80-84",
    "85-89",
    "90-94",
    "95-99",
    "100+",
]


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
    request = urllib.request.Request(
        WPP_AGE_SEX_CSV_URL,
        headers={"User-Agent": USER_AGENT},
    )
    with urllib.request.urlopen(request, timeout=180) as response, path.open("wb") as output:
        shutil.copyfileobj(response, output, length=1024 * 1024)
    size = path.stat().st_size
    if size == 0:
        raise ValueError("Downloaded WPP source is empty")
    return size


def read_2024_rows(raw_path: Path) -> dict[str, list[dict[str, str]]]:
    selected = {iso3: [] for iso3 in COUNTRIES}
    with gzip.open(raw_path, "rt", encoding="utf-8-sig", newline="") as source:
        reader = csv.DictReader(source)
        required_columns = {
            "ISO3_code",
            "Location",
            "Variant",
            "Time",
            "AgeGrp",
            "AgeGrpStart",
            "PopMale",
            "PopFemale",
            "PopTotal",
        }
        if not reader.fieldnames or not required_columns.issubset(reader.fieldnames):
            raise ValueError("Unexpected WPP 2024 age-group file columns")
        for row in reader:
            iso3 = row.get("ISO3_code")
            if (
                iso3 in selected
                and row.get("Time") == str(SNAPSHOT_YEAR)
                and row.get("Variant", "").casefold() == "medium"
            ):
                selected[iso3].append(row)

    for iso3, rows in selected.items():
        rows.sort(key=lambda row: int(row["AgeGrpStart"]))
        groups = [row["AgeGrp"] for row in rows]
        if groups != EXPECTED_GROUPS:
            raise ValueError(f"Unexpected {SNAPSHOT_YEAR} age groups for {iso3}: {groups}")
    return selected


def build_pyramid(iso3: str, rows: list[dict[str, str]]) -> dict:
    total_population_thousands = sum(float(row["PopTotal"]) for row in rows)
    if total_population_thousands <= 0:
        raise ValueError(f"Invalid WPP total population for {iso3}")

    male = [
        round(float(row["PopMale"]) / total_population_thousands * 100, 6)
        for row in rows
    ]
    female = [
        round(float(row["PopFemale"]) / total_population_thousands * 100, 6)
        for row in rows
    ]
    if any(value <= 0 for value in male + female):
        raise ValueError(f"WPP 2024 pyramid for {iso3} contains a non-positive sex-age value")

    country = COUNTRIES[iso3]
    data = {
        "country": country,
        "year": SNAPSHOT_YEAR,
        "unit": "%",
        "groups": EXPECTED_GROUPS,
        "male": male,
        "female": female,
    }
    write_json(OUT_DIR / f"pyramid-{iso3.lower()}-2024.json", data)
    return data


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="unit03-wpp2024-") as temp_dir:
        raw_path = Path(temp_dir) / "WPP2024_PopulationByAge5GroupSex_Medium.csv.gz"
        source_bytes = download_source(raw_path)
        rows_by_country = read_2024_rows(raw_path)
        outputs = {
            iso3: build_pyramid(iso3, rows_by_country[iso3])
            for iso3 in COUNTRIES
        }

    verification = {}
    for iso3, data in outputs.items():
        group_index = {group: index for index, group in enumerate(data["groups"])}
        verification[iso3] = {
            "0-4_male": data["male"][group_index["0-4"]],
            "0-4_female": data["female"][group_index["0-4"]],
            "65-69_male": data["male"][group_index["65-69"]],
        }
    print(
        f"retrievedAt={RETRIEVED_AT}; sourceBytes={source_bytes}; year={SNAPSHOT_YEAR}; "
        f"countries={list(COUNTRIES)}; verification={verification}; "
        f"license=CC BY 3.0 IGO; source={WPP_SOURCE_PAGE_URL}; "
        f"licenseInfo={WPP_2024_DATA_SOURCES_URL}; licenseUrl={WPP_LICENSE_URL}"
    )


if __name__ == "__main__":
    build()
