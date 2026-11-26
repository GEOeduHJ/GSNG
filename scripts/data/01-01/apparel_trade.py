#!/usr/bin/env python3
"""Aggregate official U.S. Census imports of apparel (HS 61-62) by origin."""

from __future__ import annotations

import argparse
import json
import tempfile
import urllib.request
import zipfile
from pathlib import Path

RETRIEVED_AT = "2026-11-26"
YEAR = 2025
SOURCE_URL = "https://www.census.gov/trade/downloads/2025/Merch/im_m/IMDB2512.ZIP"
CATALOG_URL = (
    "https://catalog.data.gov/dataset/beta-"
    "time-series-international-trade-monthly-u-s-imports-by-harmonized-system-hs-code"
)
LICENSE_URL = "https://creativecommons.org/publicdomain/zero/1.0/"
WB_COUNTRIES_URL = "https://api.worldbank.org/v2/country?format=json&per_page=400"
ROOT = Path(__file__).resolve().parents[3]
OUTPUT = ROOT / "public/data/01-01/apparel-trade.json"
MAX_BYTES = 1_000_000
HS_CHAPTERS = {"61", "62"}

COUNTRY_ALIASES = {
    "koreasouth": "KOR", "korearepublic": "KOR", "korearep": "KOR", "koreanorth": "PRK",
    "turkey": "TUR", "turkiye": "TUR", "taiwan": "TWN", "taiwanchina": "TWN",
    "hongkong": "HKG", "hongkongsarchina": "HKG", "macao": "MAC", "macaosarchina": "MAC", "macau": "MAC",
    "czechrepublic": "CZE", "russia": "RUS", "laos": "LAO", "iran": "IRN",
    "syria": "SYR", "brunei": "BRN", "bolivia": "BOL", "venezuela": "VEN",
    "moldova": "MDA", "tanzania": "TZA", "micronesia": "FSM",
    "congodemocraticrepublic": "COD", "democraticrepublicofthecongo": "COD",
    "congorepublic": "COG", "ivorycoast": "CIV", "cotedivoire": "CIV",
    "capeverde": "CPV", "swaziland": "SWZ", "burma": "MMR", "easttimor": "TLS",
    "palestine": "PSE", "westbank": "PSE", "unitedarabemirates": "ARE",
    "unitedstates": "USA", "unitedkingdom": "GBR",
    "slovakia": "SVK", "slovakrepublic": "SVK", "egypt": "EGY", "egyptarabrep": "EGY",
    "yemen": "YEM", "yemenrep": "YEM", "reunion": "REU", "cookislands": "COK",
    "bahamas": "BHS", "kyrgyzstan": "KGZ", "guadeloupe": "GLP",
    "martinique": "MTQ", "westbankadministeredbyisrael": "PSE",
    "gazastripadministeredbyisrael": "PSE", "sintmaarten": "SXM", "nauru": "NRU",
    "gambia": "GMB",
}


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    with urllib.request.urlopen(request, timeout=180) as response:
        return response.read()


def download_to_path(url: str, path: Path) -> None:
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    with urllib.request.urlopen(request, timeout=300) as response, path.open("wb") as target:
        while True:
            chunk = response.read(1024 * 1024)
            if not chunk:
                break
            target.write(chunk)


def normalize_name(value: str) -> str:
    return "".join(character.lower() for character in value if character.isalnum())


def world_bank_name_codes() -> dict[str, str]:
    response = json.loads(fetch_bytes(WB_COUNTRIES_URL).decode("utf-8"))
    return {
        normalize_name(row["name"]): row["id"]
        for row in response[1]
        if len(row.get("id") or "") == 3 and row.get("region", {}).get("id") != "NA"
    }


def census_countries(archive: zipfile.ZipFile) -> dict[str, str]:
    member = next(name for name in archive.namelist() if name.lower() == "country.txt")
    countries = {}
    for line in archive.read(member).decode("latin-1").splitlines():
        if len(line) >= 61:
            code, name = line[0:4].strip(), line[11:61].strip()
            if code and name:
                countries[code] = name
    return countries


def country_iso3(name: str, wb_names: dict[str, str]) -> str | None:
    normalized = normalize_name(name)
    return COUNTRY_ALIASES.get(normalized) or wb_names.get(normalized)


def aggregate_apparel(archive: zipfile.ZipFile, year: int) -> dict[str, int]:
    member = next(name for name in archive.namelist() if name.lower() == "imp_detl.txt")
    totals: dict[str, int] = {}
    with archive.open(member) as records:
        for raw_line in records:
            line = raw_line.decode("ascii", "ignore").rstrip("\r\n")
            if len(line) < 523 or line[22:26] != str(year) or line[26:28] != "12":
                continue
            if line[0:2] not in HS_CHAPTERS:
                continue
            country_code = line[10:14].strip()
            value = line[508:523].strip()
            if country_code and value:
                totals[country_code] = totals.get(country_code, 0) + int(value)
    return totals


def build_from_zip(zip_path: Path) -> dict:
    wb_names = world_bank_name_codes()
    with zipfile.ZipFile(zip_path) as archive:
        country_names = census_countries(archive)
        totals = aggregate_apparel(archive, YEAR)
    rows, unmapped = [], []
    for code, value in totals.items():
        name = country_names.get(code)
        iso3 = country_iso3(name or "", wb_names)
        if name and iso3:
            rows.append({"iso3": iso3, "name": name, "value": value})
        elif name and value:
            unmapped.append((code, name, value))
    if unmapped:
        raise ValueError(f"Country codes need an ISO3 mapping before publication: {unmapped[:12]}")
    rows.sort(key=lambda row: (-row["value"], row["iso3"]))
    top = rows[:10]
    korea = next((row for row in rows if row["iso3"] == "KOR"), None)
    if korea is None:
        raise ValueError("No reported Korea, South value found for HS 61-62 in 2025")
    if all(row["iso3"] != "KOR" for row in top):
        top.append(korea)
    return {
        "year": YEAR,
        "unit": "USD",
        "flow": "U.S. general imports by country of origin",
        "hs": "HS chapters 61-62 (apparel)",
        "rows": top,
    }


def write_output(data: dict) -> None:
    OUTPUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    size = OUTPUT.stat().st_size
    if size > MAX_BYTES:
        OUTPUT.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {size} bytes")
    print(f"{OUTPUT}: {len(data['rows'])} countries, {size} bytes")
    for row in data["rows"]:
        print(f"  {row['iso3']} {row['name']}: {row['value']}")
    print(f"source={SOURCE_URL} retrievedAt={RETRIEVED_AT}; license=CC0 1.0")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-zip", type=Path, help="Use a raw Census ZIP already in a temp folder.")
    args = parser.parse_args()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    if args.source_zip:
        write_output(build_from_zip(args.source_zip))
    else:
        with tempfile.TemporaryDirectory(prefix="census-apparel-01-01-") as temp_dir:
            source_zip = Path(temp_dir) / "IMDB2512.ZIP"
            download_to_path(SOURCE_URL, source_zip)
            write_output(build_from_zip(source_zip))


if __name__ == "__main__":
    main()
