#!/usr/bin/env python3
"""Fetch and shape annual Eurostat intra-EU goods-export values."""

from __future__ import annotations

import json
from pathlib import Path
from urllib.request import Request, urlopen

RETRIEVED_AT = "2026-11-27"
API_URL = (
    "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"
    "ext_lt_intratrd?format=JSON&lang=en&freq=A&indic_et=MIO_EXP_VAL&"
    "sitc06=TOTAL&partner=EU27_2020&geo=EU27_2020"
)
OUT_FILE = Path(__file__).resolve().parents[3] / "public/data/01-02/intra-eu-exports-series.json"
MAX_BYTES = 1_000_000


def fetch() -> dict:
    request = Request(API_URL, headers={"User-Agent": "world-citizenship-geography-platform/1.0"})
    with urlopen(request, timeout=30) as response:
        return json.load(response)


def build() -> dict:
    source = fetch()
    years = source["dimension"]["time"]["category"]["index"]
    index_to_year = {index: int(year) for year, index in years.items()}
    values = source.get("value", {})
    by_year = [
        values.get(str(index))
        for index in range(len(index_to_year))
    ]
    if len(by_year) != 24 or index_to_year.get(0) != 2002 or index_to_year.get(23) != 2025:
        raise ValueError("Unexpected Eurostat annual time dimension")
    if by_year[0] != 1499867.3 or by_year[18] != 2856338.4 or by_year[23] != 4150750.3:
        raise ValueError("Eurostat benchmark values changed; re-check unit and filters before updating")
    return {
        "unit": "백만 유로",
        "years": [index_to_year[index] for index in range(len(index_to_year))],
        "series": [{"name": "EU27_2020 역내 재화 수출", "values": by_year}],
        "metadata": {
            "updated": source.get("updated"),
            "indicator": "MIO_EXP_VAL",
            "product": "TOTAL",
            "partner": "EU27_2020",
            "geo": "EU27_2020",
            "aggregateComposition": "27 EU Member States as of 2020",
        },
    }


def main() -> None:
    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    data = build()
    OUT_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    size = OUT_FILE.stat().st_size
    if size > MAX_BYTES:
        OUT_FILE.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {size} bytes")
    print(f"{OUT_FILE}: {size} bytes; years={data['years'][0]}–{data['years'][-1]}; retrievedAt={RETRIEVED_AT}; source={API_URL}")


if __name__ == "__main__":
    main()
