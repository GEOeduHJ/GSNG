#!/usr/bin/env python3
"""Build the staple-food energy-share data for unit 02-04 from FAOSTAT."""

from __future__ import annotations

import csv
import io
import json
import tempfile
import urllib.request
import zipfile
from pathlib import Path

RETRIEVED_AT = "2026-11-26"
YEAR = 2023
FAOSTAT_ZIP_URL = (
    "https://bulks-faostat.fao.org/production/"
    "FoodBalanceSheets_E_All_Data_(Normalized).zip"
)
NATURAL_EARTH_URL = (
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/"
    "geojson/ne_110m_admin_0_countries.geojson"
)
FAO_TERMS_URL = "https://www.fao.org/contact-us/terms/db-terms-of-use/"
ROOT = Path(__file__).resolve().parents[3]
BASE_COUNTRIES = ROOT / "public/data/base/countries-110m.geojson"
OUT_DIR = ROOT / "public/data/02-04"
MAX_BYTES = 1_000_000

CROPS = {
    "rice": ("Rice and products", "쌀·쌀 제품"),
    "wheat": ("Wheat and products", "밀·밀 제품"),
    "maize": ("Maize and products", "옥수수·옥수수 제품"),
}
SELECTED_COUNTRIES = [
    ("BGD", "방글라데시"),
    ("KOR", "대한민국"),
    ("IND", "인도"),
    ("ITA", "이탈리아"),
    ("MEX", "멕시코"),
    ("USA", "미국"),
]


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"},
    )
    with urllib.request.urlopen(request, timeout=180) as response:
        return response.read()


def load_iso3_to_m49(natural_earth_bytes: bytes) -> dict[str, str]:
    """Return ISO3 -> FAOSTAT M49 country code using Natural Earth crosswalk."""
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
    base = json.loads(BASE_COUNTRIES.read_text(encoding="utf-8"))
    result: dict[str, str] = {}
    for feature in base["features"]:
        code = feature["properties"].get("iso_a3")
        if code in raw_iso_to_m49:
            result[code] = raw_iso_to_m49[code]
    if len(result) < 160:
        raise RuntimeError(f"Natural Earth M49 crosswalk unexpectedly small: {len(result)}")
    return result


def load_base_iso3s() -> list[str]:
    base = json.loads(BASE_COUNTRIES.read_text(encoding="utf-8"))
    return sorted(
        {
            feature["properties"]["iso_a3"]
            for feature in base["features"]
            if feature["properties"].get("iso_a3")
        }
    )


def read_food_balance_rows(zip_bytes: bytes, iso3_to_m49: dict[str, str]):
    wanted_codes = set(iso3_to_m49.values())
    item_names = {item for item, _ in CROPS.values()} | {"Grand Total"}
    values: dict[str, dict[str, float]] = {}
    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as archive:
        csv_names = [name for name in archive.namelist() if name.lower().endswith(".csv")]
        if not csv_names:
            raise RuntimeError("No CSV found in FAOSTAT Food Balances ZIP")
        with archive.open(csv_names[0]) as raw:
            text = io.TextIOWrapper(raw, encoding="utf-8-sig", newline="")
            reader = csv.DictReader(text)
            required = {"Area Code (M49)", "Item", "Element", "Year", "Value"}
            if not required.issubset(reader.fieldnames or []):
                raise RuntimeError(f"Unexpected FAOSTAT headers: {reader.fieldnames}")
            for row in reader:
                if row["Year"] != str(YEAR):
                    continue
                if row["Element"] != "Food supply (kcal/capita/day)":
                    continue
                if row["Item"] not in item_names:
                    continue
                m49 = row["Area Code (M49)"].strip().strip("'").zfill(3)
                if m49 not in wanted_codes or not row["Value"].strip():
                    continue
                try:
                    value = float(row["Value"])
                except ValueError:
                    continue
                values.setdefault(m49, {})[row["Item"]] = value
    return values


def build_outputs(
    values: dict[str, dict[str, float]],
    iso3_to_m49: dict[str, str],
    base_iso3s: list[str],
):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    m49_to_iso3 = {m49: iso3 for iso3, m49 in iso3_to_m49.items()}
    by_iso3: dict[str, dict[str, float | None]] = {}
    for m49, row in values.items():
        iso3 = m49_to_iso3[m49]
        total = row.get("Grand Total")
        by_iso3[iso3] = {}
        for slug, (item, _) in CROPS.items():
            supply = row.get(item)
            by_iso3[iso3][slug] = (
                round(supply / total * 100, 2)
                if supply is not None and total not in (None, 0)
                else None
            )

    for slug, (_, korean_label) in CROPS.items():
        payload = {
            "year": YEAR,
            "unit": "% (해당 국가 1인당 식품 공급 열량 중 해당 품목 비중)",
            "values": {
                iso3: by_iso3.get(iso3, {}).get(slug)
                for iso3 in base_iso3s
            },
        }
        write_json(OUT_DIR / f"staple-{slug}-share-map.json", payload)

    rows = []
    for iso3, country in SELECTED_COUNTRIES:
        for slug, (_, korean_label) in CROPS.items():
            rows.append(
                {
                    "country": country,
                    "iso3": iso3,
                    "name": f"{country} · {korean_label}",
                    "staple": korean_label,
                    "value": by_iso3.get(iso3, {}).get(slug),
                }
            )
    write_json(
        OUT_DIR / "staple-share-comparison.json",
        {
            "year": YEAR,
            "unit": "% (해당 국가 1인당 식품 공급 열량 중 해당 품목 비중)",
            "rows": rows,
        },
    )
    return by_iso3


def write_json(path: Path, payload: dict) -> None:
    encoded = (json.dumps(payload, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    if len(encoded) >= MAX_BYTES:
        raise RuntimeError(f"Output exceeds 1 MB: {path.name} ({len(encoded)} bytes)")
    path.write_bytes(encoded)


def main() -> None:
    print(f"Downloading FAOSTAT source: {FAOSTAT_ZIP_URL}")
    with tempfile.TemporaryDirectory(prefix="faostat-food-02-04-") as temp_dir:
        temp_path = Path(temp_dir)
        fao_path = temp_path / "food-balances.zip"
        ne_path = temp_path / "natural-earth.geojson"
        fao_path.write_bytes(fetch_bytes(FAOSTAT_ZIP_URL))
        ne_path.write_bytes(fetch_bytes(NATURAL_EARTH_URL))
        iso3_to_m49 = load_iso3_to_m49(ne_path.read_bytes())
        base_iso3s = load_base_iso3s()
        values = read_food_balance_rows(fao_path.read_bytes(), iso3_to_m49)
    by_iso3 = build_outputs(values, iso3_to_m49, base_iso3s)
    print(
        f"Built {len(base_iso3s)} base ISO3 keys ({len(iso3_to_m49)} M49 crosswalks); "
        f"{len(values)} countries had matching source rows."
    )
    for iso3 in ("BGD", "KOR", "IND", "ITA", "MEX", "USA"):
        print(iso3, by_iso3.get(iso3))
    print(f"Source terms: {FAO_TERMS_URL}")


if __name__ == "__main__":
    main()
