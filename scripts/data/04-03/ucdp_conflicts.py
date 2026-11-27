#!/usr/bin/env python3
"""Build country-level organized-violence and armed-conflict data for 04-03."""

from __future__ import annotations

import csv
import io
import json
import re
import unicodedata
import urllib.request
import zipfile
from collections import defaultdict
from pathlib import Path


RETRIEVED_AT = "2026-11-27"
OVCY_URL = "https://ucdp.uu.se/downloads/organizedviolencecy/organizedviolencecy-261-csv.zip"
ACD_URL = "https://ucdp.uu.se/downloads/ucdpprio/ucdp-prio-acd-261-csv.zip"
ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / "public/data/04-03"

# UCDP names use historical or alternate spellings; only explicit aliases are
# applied to the existing Natural Earth country geometries.
ALIASES = {
    "antigua & barbuda": "antigua and barbuda",
    "bahamas": "the bahamas",
    "bosnia-herzegovina": "bosnia and herzegovina",
    "cambodia (kampuchea)": "cambodia",
    "cape verde": "cabo verde",
    "congo": "republic of the congo",
    "czech republic": "czechia",
    "dr congo (zaire)": "democratic republic of the congo",
    "kingdom of eswatini (swaziland)": "eswatini",
    "madagascar (malagasy)": "madagascar",
    "myanmar (burma)": "myanmar",
    "russia (soviet union)": "russia",
    "serbia (yugoslavia)": "republic of serbia",
    "tanzania": "united republic of tanzania",
    "vietnam (north vietnam)": "vietnam",
    "yemen (north yemen)": "yemen",
    "zimbabwe (rhodesia)": "zimbabwe",
}

# These ISO3 codes correspond to disputed or contested territories in the
# shared base geometry. Their UCDP rows remain unassigned in this map.
UNASSIGNED_DISPUTED_CODES = {"ESH", "PSE", "TWN"}

# UCDP has no separate Palestine row: events in Israel and the Palestinian territories
# are counted in one "Israel" country unit. Showing that total on Israel alone would
# misplace it, so the map marks both areas as one separately counted unit instead.
COMBINED_UNITS = {"Israel": {"codes": ["ISR", "PSE"], "label": "이스라엘·팔레스타인 지역 합산(UCDP 단일 집계 단위)"}}


def get_bytes(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": "04-03 public data preparation"})
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read()


def csv_from_zip(url: str) -> list[dict[str, str]]:
    archive = zipfile.ZipFile(io.BytesIO(get_bytes(url)))
    member = next(name for name in archive.namelist() if name.lower().endswith(".csv"))
    with archive.open(member) as stream:
        return list(csv.DictReader(io.TextIOWrapper(stream, encoding="utf-8-sig")))


def normalized(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode().casefold()
    value = value.replace("&", " and ")
    return re.sub(r"[^a-z0-9]+", " ", value).strip()


def write_json(name: str, value: object) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def organized_violence_map() -> tuple[list[str], dict[str, int | None]]:
    source = csv_from_zip(OVCY_URL)
    features = json.loads((ROOT / "public/data/base/countries-110m.geojson").read_text(encoding="utf-8"))["features"]
    feature_by_name: dict[str, dict] = {}
    values: dict[str, int | None] = {}
    for feature in features:
        props = feature["properties"]
        code = props.get("iso_a3")
        if not code:
            continue
        feature_by_name[normalized(props["name"])] = props
        values[code] = None

    by_country = {row["country"]: row for row in source if row.get("year") == "2025"}
    unmapped: list[str] = []
    special: dict[str, bool] = {}
    special_label = None
    special_total = None
    for country, row in by_country.items():
        combined = COMBINED_UNITS.get(country)
        if combined:
            raw = row.get("cumulative_total_deaths_in_orgvio_best", "")
            special_total = int(float(raw)) if raw not in ("", "NA", "-") else None
            for code in combined["codes"]:
                special[code] = True
                values[code] = None
            special_label = combined["label"]
            continue
        key = normalized(country)
        target_name = ALIASES.get(country.casefold(), country)
        props = feature_by_name.get(normalized(target_name))
        if props is None:
            unmapped.append(country)
            continue
        code = props.get("iso_a3")
        if code in UNASSIGNED_DISPUTED_CODES:
            continue
        raw = row.get("cumulative_total_deaths_in_orgvio_best", "")
        values[code] = int(float(raw)) if raw not in ("", "NA", "-") else None

    write_json(
        "organized-violence-deaths-country-2025.json",
        {
            "year": 2025,
            "unit": "persons (best estimate)",
            "values": values,
            "special": special,
            "specialLabel": special_label,
            "specialTotals": {"이스라엘·팔레스타인 지역": special_total},
        },
    )
    return unmapped, values


def armed_conflict_series() -> dict[int, int]:
    rows = csv_from_zip(ACD_URL)
    active: dict[int, set[str]] = defaultdict(set)
    for row in rows:
        active[int(row["year"])].add(row["conflict_id"])
    years = list(range(1946, 2026))
    counts = {year: len(active.get(year, set())) for year in years}
    write_json(
        "armed-conflict-count-series-1946-2025.json",
        {
            "unit": "state-based armed conflicts",
            "years": years,
            "series": [{"name": "세계 국가기반 무력 분쟁", "values": [counts[year] for year in years]}],
        },
    )
    return counts


if __name__ == "__main__":
    unmapped, map_values = organized_violence_map()
    conflicts = armed_conflict_series()
    print(f"organized violence mapped non-null: {sum(v is not None for v in map_values.values())}")
    print(f"unmatched UCDP country names: {len(unmapped)}; {', '.join(unmapped)}")
    print("death values:", {c: map_values.get(c) for c in ("UKR", "SDN", "ISR", "PSE", "COD", "MEX")})
    print("armed conflicts:", {y: conflicts[y] for y in (1946, 1990, 2000, 2025)})
