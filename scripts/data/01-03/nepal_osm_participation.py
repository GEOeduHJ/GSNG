#!/usr/bin/env python3
"""Build a structured bar/table from HOT's reported 2015 Nepal mapping figures."""

from __future__ import annotations

import json
from pathlib import Path

SOURCE_PAGE_URL = "https://www.hotosm.org/en/annual-reports/"
SOURCE_URL = "https://www.hotosm.org/downloads/2015-Annual-Report.pdf"
LICENSE_URL = "https://creativecommons.org/licenses/by-sa/4.0/"
RETRIEVED_AT = "2026-11-27"
MAX_BYTES = 1_000_000
ROOT = Path(__file__).resolve().parents[3]
OUTPUT = ROOT / "public/data/01-03/nepal-osm-participation-2015.json"

# Values reported by HOT; 2,000 is rounded and 8,000 is a lower bound.
ROWS = [
    {"name": "첫 48시간 (약 2,000명)", "value": 2000},
    {"name": "지진 발생 5일 뒤 (3,679명)", "value": 3679},
    {"name": "활성화 기간 전체 (8,000명 이상)", "value": 8000},
]


def build() -> int:
    payload = {"year": 2015, "unit": "명", "rows": ROWS}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    size = OUTPUT.stat().st_size
    if size > MAX_BYTES:
        OUTPUT.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {OUTPUT} ({size} bytes)")
    print(f"{OUTPUT}: {len(ROWS)} rows, {size} bytes")
    print(f"source={SOURCE_URL} retrievedAt={RETRIEVED_AT} license=CC BY-SA 4.0")
    return size


if __name__ == "__main__":
    build()
