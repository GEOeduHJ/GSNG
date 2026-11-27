#!/usr/bin/env python3
"""Build annual UCDP state-based armed-conflict counts by conflict type."""

from __future__ import annotations

import csv
import io
import json
import urllib.request
import zipfile
from collections import defaultdict
from pathlib import Path


RETRIEVED_AT = "2026-11-27"
ACD_URL = "https://ucdp.uu.se/downloads/ucdpprio/ucdp-prio-acd-261-csv.zip"
ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / "public/data/04-03"

# UCDP/PRIO Armed Conflict Dataset codebook v26.1: type_of_conflict values.
CONFLICT_TYPES = [
    ("국가 외부 분쟁", "1"),
    ("국가 간 무력 분쟁", "2"),
    ("국내 무력 분쟁", "3"),
    ("국제화된 국내 무력 분쟁", "4"),
]


def fetch_rows() -> list[dict[str, str]]:
    request = urllib.request.Request(ACD_URL, headers={"User-Agent": "04-03 public data preparation"})
    with urllib.request.urlopen(request, timeout=90) as response:
        archive = zipfile.ZipFile(io.BytesIO(response.read()))
    member = next(name for name in archive.namelist() if name.lower().endswith(".csv"))
    with archive.open(member) as stream:
        return list(csv.DictReader(io.TextIOWrapper(stream, encoding="utf-8-sig")))


def main() -> None:
    years = list(range(1946, 2026))
    counts: dict[str, dict[int, set[str]]] = {
        code: defaultdict(set) for _, code in CONFLICT_TYPES
    }
    for row in fetch_rows():
        type_code = row.get("type_of_conflict", "")
        if type_code not in counts:
            raise ValueError(f"Unexpected type_of_conflict code: {type_code!r}")
        year = int(row["year"])
        counts[type_code][year].add(row["conflict_id"])

    series = [
        {"name": label, "values": [len(counts[code].get(year, set())) for year in years]}
        for label, code in CONFLICT_TYPES
    ]
    expected = json.loads((OUT / "armed-conflict-count-series-1946-2025.json").read_text(encoding="utf-8"))
    totals = [sum(item["values"][index] for item in series) for index in range(len(years))]
    if totals != expected["series"][0]["values"]:
        raise ValueError("Conflict-type counts do not reconcile with the existing annual total series")

    OUT.mkdir(parents=True, exist_ok=True)
    result = {
        "unit": "state-based armed conflicts",
        "years": years,
        "series": series,
    }
    (OUT / "armed-conflict-types-series-1946-2025.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    samples = {
        year: {label: series[index]["values"][years.index(year)] for index, (label, _) in enumerate(CONFLICT_TYPES)}
        for year in (1946, 1990, 2025)
    }
    print("type counts:", json.dumps(samples, ensure_ascii=False))
    print("series reconciles to the existing total for every year")


if __name__ == "__main__":
    main()
