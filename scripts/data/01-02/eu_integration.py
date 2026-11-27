#!/usr/bin/env python3
"""Build EU accession-year and annual membership-count data for unit 01-02."""

from __future__ import annotations

import json
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
EU_HISTORY_URL = (
    "https://european-union.europa.eu/principles-countries-history/history-eu_en"
)
EU_ENLARGEMENT_URL = (
    "https://european-union.europa.eu/principles-countries-history/eu-enlargement_en"
)
EU_COUNTRIES_URL = (
    "https://european-union.europa.eu/principles-countries-history/"
    "facts-and-figures-european-union_en"
)
EU_REUSE_URL = "https://european-union.europa.eu/legal-notice_en"

ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/01-02"
MAX_BYTES = 1_000_000
SNAPSHOT_YEAR = 2026
SERIES_YEARS = range(1958, SNAPSHOT_YEAR + 1)

# Accession to the EEC is used for the six founding members (1958).
# The United Kingdom is deliberately absent because it left the EU in 2020.
ACCESSION_YEAR_BY_ISO3 = {
    "AUT": 1995,
    "BEL": 1958,
    "BGR": 2007,
    "CYP": 2004,
    "CZE": 2004,
    "DEU": 1958,
    "DNK": 1973,
    "ESP": 1986,
    "EST": 2004,
    "FIN": 1995,
    "FRA": 1958,
    "GRC": 1981,
    "HRV": 2013,
    "HUN": 2004,
    "IRL": 1973,
    "ITA": 1958,
    "LTU": 2004,
    "LUX": 1958,
    "LVA": 2004,
    "MLT": 2004,
    "NLD": 1958,
    "POL": 2004,
    "PRT": 1986,
    "ROU": 2007,
    "SVK": 2004,
    "SVN": 2004,
    "SWE": 1995,
}

# Annual values are membership counts at the end of each calendar year.
MEMBERSHIP_CHANGES = {
    1958: 6,
    1973: 3,
    1981: 1,
    1986: 2,
    1995: 3,
    2004: 10,
    2007: 2,
    2013: 1,
    2020: -1,
}


def write_json(path: Path, data: dict) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    print(f"{path}: {size} bytes")
    return size


def build_accession_map() -> dict:
    if len(ACCESSION_YEAR_BY_ISO3) != 27 or "GBR" in ACCESSION_YEAR_BY_ISO3:
        raise ValueError("Expected the current 27 EU members and no withdrawn member")
    return {
        "year": SNAPSHOT_YEAR,
        "unit": "year of accession to the EEC or EU",
        "values": dict(sorted(ACCESSION_YEAR_BY_ISO3.items())),
    }


def build_membership_series() -> dict:
    count = 0
    years = []
    values = []
    for year in SERIES_YEARS:
        count += MEMBERSHIP_CHANGES.get(year, 0)
        years.append(year)
        values.append(count)
    if values[-1] != 27:
        raise ValueError(f"Expected 27 members at year-end {SNAPSHOT_YEAR}, got {values[-1]}")
    return {
        "unit": "countries",
        "years": years,
        "series": [
            {
                "name": "유럽 공동체·EU 회원국 수",
                "values": values,
            }
        ],
    }


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    write_json(OUT_DIR / "eu-accession-year-map.json", build_accession_map())
    write_json(OUT_DIR / "eu-membership-count-series.json", build_membership_series())
    print(
        f"retrievedAt={RETRIEVED_AT}; snapshotYear={SNAPSHOT_YEAR}; "
        f"sources={EU_HISTORY_URL}, {EU_ENLARGEMENT_URL}, {EU_COUNTRIES_URL}, {EU_REUSE_URL}"
    )


if __name__ == "__main__":
    build()
