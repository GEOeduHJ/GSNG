#!/usr/bin/env python3
"""Build the 2025 Scottish governance preference bar-chart snapshot."""

from __future__ import annotations

import json
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
SOURCE_URL = "https://www.gov.scot/publications/scottish-social-attitudes-survey-2025-core-module/pages/5/"
OUT_FILE = Path(__file__).resolve().parents[3] / "public/data/01-02/scotland-governance-preference-2025.json"
MAX_BYTES = 1_000_000

ROWS = [
    {"name": "스코틀랜드 정부", "value": 67},
    {"name": "영국 정부", "value": 16},
    {"name": "지방 의회", "value": 13},
    {"name": "유럽 연합", "value": 1},
]


def build() -> dict:
    if [row["value"] for row in ROWS] != [67, 16, 13, 1]:
        raise ValueError("Survey values changed; re-check the source table before updating")
    return {
        "year": 2025,
        "unit": "응답자 비율(%)",
        "population": {"n": 1549},
        "question": "스코틀랜드를 운영하는 데 누가 가장 큰 영향력을 가져야 한다고 생각하는가?",
        "rows": ROWS,
    }


def main() -> None:
    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    data = build()
    OUT_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    size = OUT_FILE.stat().st_size
    if size > MAX_BYTES:
        OUT_FILE.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {size} bytes")
    print(f"{OUT_FILE}: {size} bytes; n={data['population']['n']}; retrievedAt={RETRIEVED_AT}; source={SOURCE_URL}")


if __name__ == "__main__":
    main()
