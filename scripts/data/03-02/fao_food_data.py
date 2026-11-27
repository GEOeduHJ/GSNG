#!/usr/bin/env python3
"""Build food-resource and food-security datasets for unit 03-02."""

from __future__ import annotations

import csv
import io
import json
import re
import tempfile
import urllib.request
import zipfile
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
PRODUCTION_YEAR = 2024
WHEAT_TRADE_YEAR = 2024
UNDERNOURISHMENT_PERIOD = "2023-2025"
WORLD_BANK_UNDERNOURISHMENT_YEAR = 2024
CEREAL_DEPENDENCY_PERIOD = "2022-2024"

PRODUCTION_URL = (
    "https://bulks-faostat.fao.org/production/"
    "Production_Crops_Livestock_E_All_Data_(Normalized).zip"
)
TRADE_URL = (
    "https://bulks-faostat.fao.org/production/"
    "Trade_CropsLivestock_E_All_Data_(Normalized).zip"
)
FOOD_SECURITY_URL = (
    "https://bulks-faostat.fao.org/production/"
    "Food_Security_Data_E_All_Data_(Normalized).zip"
)
WORLD_BANK_POU_API_URL = (
    "https://api.worldbank.org/v2/country/all/indicator/"
    "SN.ITK.DEFC.ZS?format=json&date=2024&per_page=20000"
)
WORLD_BANK_POU_PAGE_URL = "https://data.worldbank.org/indicator/SN.ITK.DEFC.ZS"
WORLD_BANK_LICENSE_URL = "https://datacatalog.worldbank.org/public-licenses"
NATURAL_EARTH_URL = (
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/"
    "geojson/ne_110m_admin_0_countries.geojson"
)
FAOSTAT_TERMS_URL = "https://www.fao.org/contact-us/terms/db-terms-of-use/en"

ROOT = Path(__file__).resolve().parents[3]
BASE_COUNTRIES = ROOT / "public/data/base/countries-110m.geojson"
OUT_DIR = ROOT / "public/data/03-02"
MAX_BYTES = 1_000_000

PRODUCTION_ITEMS = {
    "rice": ("Rice", "Rice, paddy"),
    "wheat": ("Wheat",),
    "maize": ("Maize", "Maize (corn)"),
}
POU_ITEM = "Prevalence of undernourishment (percent) (3-year average)"
DEPENDENCY_ITEM = "Cereal import dependency ratio (percent) (3-year average)"
MAP_FILES = {
    "rice": "rice-production-top10.json",
    "wheat": "wheat-production-top10.json",
    "maize": "maize-production-top10.json",
}


def fetch_to_path(url: str, path: Path) -> None:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"},
    )
    with urllib.request.urlopen(request, timeout=300) as response, path.open("wb") as out:
        while True:
            block = response.read(1024 * 1024)
            if not block:
                break
            out.write(block)


def csv_member(archive: zipfile.ZipFile) -> str:
    candidates = [
        name
        for name in archive.namelist()
        if name.lower().endswith(".csv") and "_all_data_" in name.lower()
    ]
    if not candidates:
        raise RuntimeError("FAOSTAT ZIP does not contain an All_Data CSV")
    return candidates[0]


def read_base_names() -> tuple[list[str], dict[str, str]]:
    base = json.loads(BASE_COUNTRIES.read_text(encoding="utf-8"))
    names: dict[str, str] = {}
    for feature in base["features"]:
        props = feature["properties"]
        iso3 = props.get("iso_a3")
        if iso3:
            names[iso3] = props.get("name_ko") or props.get("name") or iso3
    return sorted(names), names


def load_iso3_to_m49(natural_earth_bytes: bytes, base_iso3s: list[str]) -> dict[str, str]:
    """Use Natural Earth only as an ISO3-to-M49 crosswalk, not as a new boundary."""
    source = json.loads(natural_earth_bytes)
    raw_iso_to_m49: dict[str, str] = {}
    for feature in source["features"]:
        props = feature["properties"]
        m49 = str(props.get("ISO_N3", "")).strip()
        if not m49.isdigit():
            continue
        for key in ("ISO_A3", "ISO_A3_EH", "ADM0_A3"):
            code = str(props.get(key, "")).strip()
            if len(code) == 3 and code.isalpha() and code != "-99":
                raw_iso_to_m49.setdefault(code, m49.zfill(3))
    result = {
        iso3: raw_iso_to_m49[iso3]
        for iso3 in base_iso3s
        if iso3 in raw_iso_to_m49
    }
    if len(result) < 160:
        raise RuntimeError(f"Natural Earth M49 crosswalk unexpectedly small: {len(result)}")
    return result


def fao_m49(value: str) -> str:
    return value.strip().strip("'").zfill(3)


def write_json(path: Path, payload: dict) -> None:
    encoded = (json.dumps(payload, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    if len(encoded) > MAX_BYTES:
        raise RuntimeError(f"Output exceeds 1 MB: {path.name} ({len(encoded)} bytes)")
    path.write_bytes(encoded)


def parse_number(raw: str) -> float | None:
    try:
        return float(raw.strip())
    except (TypeError, ValueError):
        return None


def build_production(
    zip_path: Path,
    iso3_to_m49: dict[str, str],
    names: dict[str, str],
) -> dict[str, list[dict]]:
    m49_to_iso3 = {m49: iso3 for iso3, m49 in iso3_to_m49.items()}
    wanted = {
        (slug, item.casefold())
        for slug, items in PRODUCTION_ITEMS.items()
        for item in items
    }
    found: dict[str, dict[str, dict[str, float]]] = {slug: {} for slug in PRODUCTION_ITEMS}
    with zipfile.ZipFile(zip_path) as archive:
        with archive.open(csv_member(archive)) as raw:
            reader = csv.DictReader(io.TextIOWrapper(raw, encoding="utf-8-sig", newline=""))
            required = {"Area Code (M49)", "Area", "Item", "Element", "Year", "Unit", "Value"}
            if not required.issubset(reader.fieldnames or []):
                raise RuntimeError(f"Unexpected production headers: {reader.fieldnames}")
            for row in reader:
                if row["Year"] != str(PRODUCTION_YEAR) or row["Element"] != "Production":
                    continue
                item = row["Item"].strip()
                matches = [slug for slug, candidate in wanted if candidate == item.casefold()]
                if not matches:
                    continue
                value = parse_number(row["Value"])
                iso3 = m49_to_iso3.get(fao_m49(row["Area Code (M49)"]))
                if value is None or iso3 not in names:
                    continue
                slug = matches[0]
                found[slug].setdefault(item, {})[iso3] = value

    outputs: dict[str, list[dict]] = {}
    for slug, preferred_names in PRODUCTION_ITEMS.items():
        records_by_item = found[slug]
        selected_item = next(
            (name for name in preferred_names if name in records_by_item),
            None,
        )
        if selected_item is None:
            raise RuntimeError(
                f"No {slug} production rows for {PRODUCTION_YEAR}; "
                f"source items were {sorted(records_by_item)}"
            )
        ranked = sorted(
            records_by_item[selected_item].items(),
            key=lambda pair: (-pair[1], pair[0]),
        )[:10]
        rows = [
            {
                "iso3": iso3,
                "name": names[iso3],
                "value": round(value, 3),
            }
            for iso3, value in ranked
        ]
        if len(rows) < 10:
            raise RuntimeError(f"Only {len(rows)} {slug} production countries found")
        outputs[slug] = rows
        write_json(
            OUT_DIR / MAP_FILES[slug],
            {
                "year": PRODUCTION_YEAR,
                "unit": "t",
                "rows": rows,
            },
        )
        print(f"{slug}: {selected_item}; top 3 {rows[:3]}")
    return outputs


def build_wheat_exports(
    zip_path: Path,
    iso3_to_m49: dict[str, str],
    names: dict[str, str],
) -> tuple[list[dict], list[dict], float]:
    m49_to_iso3 = {m49: iso3 for iso3, m49 in iso3_to_m49.items()}
    country_values: dict[str, float] = {}
    world_total: float | None = None
    with zipfile.ZipFile(zip_path) as archive:
        with archive.open(csv_member(archive)) as raw:
            reader = csv.DictReader(io.TextIOWrapper(raw, encoding="utf-8-sig", newline=""))
            required = {"Area Code (M49)", "Area", "Item", "Element", "Year", "Value"}
            if not required.issubset(reader.fieldnames or []):
                raise RuntimeError(f"Unexpected trade headers: {reader.fieldnames}")
            for row in reader:
                if (
                    row["Year"] != str(WHEAT_TRADE_YEAR)
                    or row["Item"].strip() != "Wheat"
                    or row["Element"].strip().casefold() != "export quantity"
                ):
                    continue
                value = parse_number(row["Value"])
                if value is None:
                    continue
                m49 = fao_m49(row["Area Code (M49)"])
                if m49 == "001" or row["Area"].strip() == "World":
                    world_total = value
                    continue
                iso3 = m49_to_iso3.get(m49)
                if iso3 in names:
                    country_values[iso3] = value
    if world_total is None or world_total <= 0:
        raise RuntimeError(f"FAOSTAT World wheat exports missing for {WHEAT_TRADE_YEAR}")
    ranked = sorted(country_values.items(), key=lambda pair: (-pair[1], pair[0]))[:10]
    quantity_rows = [
        {
            "iso3": iso3,
            "name": names[iso3],
            "value": round(value, 3),
        }
        for iso3, value in ranked
    ]
    share_rows = [
        {
            "iso3": iso3,
            "name": names[iso3],
            "value": round(value / world_total * 100, 2),
        }
        for iso3, value in ranked
    ]
    if len(quantity_rows) < 10:
        raise RuntimeError(f"Only {len(quantity_rows)} wheat exporters found")
    write_json(
        OUT_DIR / "wheat-exports-top10.json",
        {
            "year": WHEAT_TRADE_YEAR,
            "unit": "t",
            "rows": quantity_rows,
        },
    )
    write_json(
        OUT_DIR / "wheat-export-world-share-top10.json",
        {
            "year": WHEAT_TRADE_YEAR,
            "unit": "% of FAOSTAT world wheat exports (quantity)",
            "rows": share_rows,
        },
    )
    print(f"wheat exports: world {world_total}; top 3 {quantity_rows[:3]}")
    print(f"wheat export shares: top 3 {share_rows[:3]}")
    return quantity_rows, share_rows, world_total


def parse_period(period: str) -> tuple[int, int] | None:
    match = re.fullmatch(r"(\d{4})-(\d{4})", period.strip())
    return (int(match.group(1)), int(match.group(2))) if match else None


def build_food_security(
    zip_path: Path,
    world_bank_path: Path,
    iso3_to_m49: dict[str, str],
    base_iso3s: list[str],
) -> tuple[dict[str, float | None], dict[str, str], dict[str, float | None], list[int], list[float | None]]:
    m49_to_iso3 = {m49: iso3 for iso3, m49 in iso3_to_m49.items()}
    undernourishment: dict[str, float | None] = {iso3: None for iso3 in base_iso3s}
    below: dict[str, str] = {}
    dependency: dict[str, float | None] = {iso3: None for iso3 in base_iso3s}
    world_periods: dict[tuple[int, int], float | None] = {}
    with zipfile.ZipFile(zip_path) as archive:
        with archive.open(csv_member(archive)) as raw:
            reader = csv.DictReader(io.TextIOWrapper(raw, encoding="utf-8-sig", newline=""))
            required = {"Area Code (M49)", "Area", "Item", "Element", "Year", "Value"}
            if not required.issubset(reader.fieldnames or []):
                raise RuntimeError(f"Unexpected food-security headers: {reader.fieldnames}")
            for row in reader:
                if row["Element"].strip() != "Value":
                    continue
                item = row["Item"].strip()
                year = row["Year"].strip()
                m49 = fao_m49(row["Area Code (M49)"])
                iso3 = m49_to_iso3.get(m49)
                value_text = row["Value"].strip()

                if item == POU_ITEM:
                    period = parse_period(year)
                    if period and row["Area"].strip() == "World":
                        world_periods[period] = parse_number(value_text)
                elif (
                    item == DEPENDENCY_ITEM
                    and year == CEREAL_DEPENDENCY_PERIOD
                    and iso3 in dependency
                ):
                    value = parse_number(value_text)
                    dependency[iso3] = round(value, 2) if value is not None else None

    world_bank_payload = json.loads(world_bank_path.read_text(encoding="utf-8"))
    if (
        not isinstance(world_bank_payload, list)
        or len(world_bank_payload) < 2
        or not isinstance(world_bank_payload[1], list)
    ):
        raise RuntimeError("Unexpected World Bank indicator API response")
    for row in world_bank_payload[1]:
        if row.get("date") != str(WORLD_BANK_UNDERNOURISHMENT_YEAR):
            continue
        iso3 = row.get("countryiso3code")
        if iso3 not in undernourishment:
            continue
        value = parse_number(str(row.get("value", "")))
        if value is None:
            continue
        # World Bank metadata states that a displayed value of 2.5 means <2.5%.
        if value <= 2.5:
            undernourishment[iso3] = None
            below[iso3] = "<2.5"
        else:
            undernourishment[iso3] = round(value, 2)

    if not world_periods:
        raise RuntimeError("FAOSTAT World undernourishment time series is empty")
    periods = sorted(world_periods)
    years = [start + (end - start) // 2 for start, end in periods]
    series_values = [world_periods[period] for period in periods]
    if not any(value is not None for value in undernourishment.values()) or not below:
        raise RuntimeError(
            f"No World Bank undernourishment values for "
            f"{WORLD_BANK_UNDERNOURISHMENT_YEAR}"
        )
    if not any(value is not None for value in dependency.values()):
        raise RuntimeError(f"No cereal import-dependency values for {CEREAL_DEPENDENCY_PERIOD}")

    write_json(
        OUT_DIR / "undernourishment-map.json",
        {
            "year": WORLD_BANK_UNDERNOURISHMENT_YEAR,
            "unit": "% of population",
            "values": undernourishment,
            "below": below,
            "belowLabel": "2.5% 미만",
        },
    )
    write_json(
        OUT_DIR / "cereal-import-dependency-map.json",
        {
            "year": CEREAL_DEPENDENCY_PERIOD,
            "unit": "% (3-year average; negative = net exporter)",
            "values": dependency,
        },
    )
    write_json(
        OUT_DIR / "global-undernourishment-series.json",
        {
            "unit": "% of world population (3-year average; year is period midpoint)",
            "years": years,
            "series": [
                {
                    "name": "세계",
                    "iso3": "WLD",
                    "values": [
                        round(value, 2) if value is not None else None
                        for value in series_values
                    ],
                }
            ],
        },
    )
    print(
        "food security: "
        f"undernourishment {sum(value is not None for value in undernourishment.values())} "
        f"numeric, {len(below)} below; "
        f"cereal dependency {sum(value is not None for value in dependency.values())} numeric"
    )
    print(
        "global undernourishment: "
        f"{years[0]}={series_values[0]}, {years[-1]}={series_values[-1]}"
    )
    return undernourishment, below, dependency, years, series_values


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    base_iso3s, names = read_base_names()
    with tempfile.TemporaryDirectory(prefix="faostat-food-03-02-") as temp_dir:
        temp = Path(temp_dir)
        production_path = temp / "production.zip"
        trade_path = temp / "trade.zip"
        food_security_path = temp / "food-security.zip"
        world_bank_path = temp / "world-bank-pou.json"
        natural_earth_path = temp / "natural-earth.geojson"
        for url, path in (
            (PRODUCTION_URL, production_path),
            (TRADE_URL, trade_path),
            (FOOD_SECURITY_URL, food_security_path),
            (WORLD_BANK_POU_API_URL, world_bank_path),
            (NATURAL_EARTH_URL, natural_earth_path),
        ):
            print(f"Downloading {url}")
            fetch_to_path(url, path)
        iso3_to_m49 = load_iso3_to_m49(natural_earth_path.read_bytes(), base_iso3s)
        print(
            f"Loaded {len(base_iso3s)} base ISO3s and "
            f"{len(iso3_to_m49)} Natural Earth M49 crosswalks"
        )
        build_production(production_path, iso3_to_m49, names)
        build_wheat_exports(trade_path, iso3_to_m49, names)
        build_food_security(
            food_security_path,
            world_bank_path,
            iso3_to_m49,
            base_iso3s,
        )
    print(f"FAOSTAT terms: {FAOSTAT_TERMS_URL}")
    print(f"World Bank indicator: {WORLD_BANK_POU_PAGE_URL}")
    print(f"World Bank license: {WORLD_BANK_LICENSE_URL}")


if __name__ == "__main__":
    main()
