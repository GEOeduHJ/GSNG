#!/usr/bin/env python3
"""Build the Korean grain and food self-sufficiency series from MAFRA's HWPX table."""

from __future__ import annotations

import json
import re
import tempfile
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
SOURCE_PAGE_URL = "https://mafra.go.kr/bbs/home/798/571364/artclView.do"
SOURCE_FILE_URL = "https://mafra.go.kr/bbs/home/798/580412/download.do"
LICENSE_URL = "https://www.kogl.or.kr/"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/03-02"
MAX_BYTES = 1_000_000

FOOD_LABEL = "식량자급률(사료용 제외)"
GRAIN_LABEL = "곡물자급률(사료용 포함)"
YEAR_ROW = re.compile(r"[’‘']\s*(\d{1,2})\s+([\d]+(?:\.\d+)?|[-–—])")


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"},
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def extract_document_text(hwpx_bytes: bytes) -> str:
    with tempfile.NamedTemporaryFile(suffix=".hwpx") as temp_file:
        temp_file.write(hwpx_bytes)
        temp_file.flush()
        with zipfile.ZipFile(temp_file.name) as archive:
            section = archive.read("Contents/section0.xml")
    root = ET.fromstring(section)
    text = " ".join(
        element.text or ""
        for element in root.iter()
        if element.tag.endswith("}t")
    )
    return " ".join(text.split())


def values_from_block(block: str) -> dict[int, float]:
    values: dict[int, float] = {}
    for match in YEAR_ROW.finditer(block):
        year = 2000 + int(match.group(1))
        token = match.group(2)
        if 2011 <= year <= 2022:
            if token in {"-", "–", "—"}:
                raise RuntimeError(f"Missing total self-sufficiency value for {year}")
            values[year] = float(token)
    expected = list(range(2011, 2023))
    if sorted(values) != expected:
        raise RuntimeError(
            f"Expected MAFRA yearly values for 2011-2022; found {sorted(values)}"
        )
    return values


def write_json(path: Path, payload: dict) -> None:
    encoded = (json.dumps(payload, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    if len(encoded) > MAX_BYTES:
        raise RuntimeError(f"Output exceeds 1 MB: {path.name} ({len(encoded)} bytes)")
    path.write_bytes(encoded)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    hwpx_bytes = fetch_bytes(SOURCE_FILE_URL)
    text = extract_document_text(hwpx_bytes)
    food_start = text.find(FOOD_LABEL)
    grain_start = text.find(GRAIN_LABEL, food_start + len(FOOD_LABEL))
    if food_start < 0 or grain_start < 0:
        raise RuntimeError("Could not locate the food and grain self-sufficiency tables")
    food_block = text[food_start:grain_start]
    grain_end = text.find("나.", grain_start)
    if grain_end < 0:
        grain_end = len(text)
    grain_block = text[grain_start:grain_end]
    food_values = values_from_block(food_block)
    grain_values = values_from_block(grain_block)
    years = sorted(food_values)
    payload = {
        "unit": "%",
        "years": years,
        "series": [
            {
                "name": "곡물자급률(사료용 포함)",
                "values": [grain_values[year] for year in years],
            },
            {
                "name": "식량자급률(사료용 제외)",
                "values": [food_values[year] for year in years],
            },
        ],
    }
    output_path = OUT_DIR / "korea-self-sufficiency-series.json"
    write_json(output_path, payload)
    print(
        "MAFRA series 2011-2022: "
        f"grain {grain_values[2011]} -> {grain_values[2022]}%; "
        f"food {food_values[2011]} -> {food_values[2022]}%"
    )
    print(f"Source page: {SOURCE_PAGE_URL}")
    print(f"Retrieved: {RETRIEVED_AT}; source file: {len(hwpx_bytes)} bytes")


if __name__ == "__main__":
    main()
