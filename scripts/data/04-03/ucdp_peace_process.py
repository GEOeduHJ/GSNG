#!/usr/bin/env python3
"""Build peace-agreement and conflict-termination series from UCDP data."""

from __future__ import annotations

import csv
import io
import json
import posixpath
import re
import urllib.request
import zipfile
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict
from pathlib import Path


RETRIEVED_AT = "2026-11-27"
PEACE_URL = "https://ucdp.uu.se/downloads/peace/ucdp-peace-agreements-222.xlsx"
TERMINATION_URL = "https://ucdp.uu.se/downloads/monadterm/UCDPConflictTerminationDataset_v4_2024_Conflict.csv"
ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / "public/data/04-03"
NS = {
    "m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "p": "http://schemas.openxmlformats.org/package/2006/relationships",
}
OUTCOME_NAMES = {
    "1": "평화협정",
    "2": "휴전",
    "3": "무력 승리",
    "4": "무력 승리",
    "5": "낮은 무력 활동",
    "6": "분쟁 행위자 소멸",
}


def get_bytes(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": "04-03 public data preparation"})
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read()


def col_number(cell_ref: str) -> int:
    letters = re.match(r"[A-Z]+", cell_ref).group(0)
    number = 0
    for letter in letters:
        number = number * 26 + ord(letter) - 64
    return number - 1


def peace_agreements() -> dict[int, int]:
    workbook = zipfile.ZipFile(io.BytesIO(get_bytes(PEACE_URL)))
    workbook_xml = ET.fromstring(workbook.read("xl/workbook.xml"))
    rel_xml = ET.fromstring(workbook.read("xl/_rels/workbook.xml.rels"))
    rels = {item.attrib["Id"]: item.attrib["Target"] for item in rel_xml.findall("p:Relationship", NS)}
    sheet = workbook_xml.find("m:sheets/m:sheet", NS)
    target = rels[sheet.attrib[f"{{{NS['r']}}}id"]]
    sheet_path = posixpath.normpath(target.lstrip("/") if target.startswith("/") else "xl/" + target)
    sheet_xml = ET.fromstring(workbook.read(sheet_path))
    shared: list[str] = []
    if "xl/sharedStrings.xml" in workbook.namelist():
        strings = ET.fromstring(workbook.read("xl/sharedStrings.xml"))
        shared = ["".join(t.text or "" for t in item.findall(".//m:t", NS)) for item in strings.findall("m:si", NS)]

    rows = sheet_xml.findall(".//m:sheetData/m:row", NS)

    def value(cell: ET.Element) -> str:
        raw = cell.find("m:v", NS)
        text = raw.text if raw is not None and raw.text is not None else ""
        if cell.attrib.get("t") == "s" and text:
            return shared[int(text)]
        if cell.attrib.get("t") == "inlineStr":
            return "".join(t.text or "" for t in cell.findall(".//m:t", NS))
        return text

    header = {col_number(cell.attrib["r"]): value(cell) for cell in rows[0].findall("m:c", NS)}
    year_index = next(index for index, name in header.items() if name == "year")
    counts: Counter[int] = Counter()
    for row in rows[1:]:
        cells = {col_number(cell.attrib["r"]): value(cell) for cell in row.findall("m:c", NS)}
        raw = cells.get(year_index, "")
        if raw:
            counts[int(float(raw))] += 1

    years = list(range(1975, 2022))
    result = {year: counts[year] for year in years}
    write_json(
        "peace-agreements-by-year-1975-2021.json",
        {"unit": "peace agreement records", "years": years, "series": [{"name": "평화협정 기록", "values": [result[y] for y in years]}]},
    )
    return result


def terminations() -> dict[str, dict[int, int]]:
    rows = list(csv.DictReader(io.TextIOWrapper(io.BytesIO(get_bytes(TERMINATION_URL)), encoding="utf-8-sig")))
    episodes: dict[tuple[str, str, str], tuple[int, str]] = {}
    for row in rows:
        if row.get("c_epterm") != "1" or row.get("c_outcome") not in OUTCOME_NAMES:
            continue
        # In v4-2024 two episodes reuse c_epid after a later restart. Combine
        # the conflict id and episode start/end years to retain both distinct
        # termination records while still collapsing duplicate conflict-year rows.
        episode_key = (row["conflict_id"], row["c_ep_startyear"], row["c_ep_endyear"])
        item = (int(row["c_ep_endyear"]), OUTCOME_NAMES[row["c_outcome"]])
        previous = episodes.get(episode_key)
        if previous is not None and previous != item:
            raise ValueError(f"Conflicting termination rows for episode {episode_key}")
        episodes[episode_key] = item

    years = list(range(1946, 2024))
    category_names = ["평화협정", "휴전", "무력 승리", "낮은 무력 활동", "분쟁 행위자 소멸"]
    counts: dict[str, Counter[int]] = {name: Counter() for name in category_names}
    for year, category in episodes.values():
        counts[category][year] += 1
    result = {name: {year: counts[name][year] for year in years} for name in category_names}
    write_json(
        "conflict-termination-outcomes-series-1946-2023.json",
        {
            "unit": "conflict episodes",
            "years": years,
            "series": [{"name": name, "values": [result[name][year] for year in years]} for name in category_names],
        },
    )
    return result


def write_json(name: str, value: object) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    agreements = peace_agreements()
    endings = terminations()
    print("peace agreement records:", {y: agreements[y] for y in (1975, 1992, 2000, 2021)})
    print("termination outcomes:", {y: {name: endings[name][y] for name in endings} for y in (1946, 2000, 2023)})
