#!/usr/bin/env python3
"""Build the annual global land-ocean temperature anomaly series."""

from __future__ import annotations

import json
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
SOURCE_URL = (
    "https://www.ncei.noaa.gov/data/noaa-global-surface-temperature/v6.1/"
    "access/timeseries/aravg.ann.land_ocean.90S.90N.v6.1.0.202610.asc"
)
LICENSE_URL = "https://www.ncei.noaa.gov/sites/default/files/2023-12/NCEI%20PD-10-2-02%20-%20Open%20Data%20Policy%20Signed.pdf"
BASE_PERIOD = "1991-2020"
FIRST_YEAR = 1850
LAST_COMPLETE_YEAR = 2025
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/04-02"
OUTPUT = OUT_DIR / "global-temperature-anomaly-1850-2025.json"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"


def fetch_text(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read().decode("utf-8")


def write_json(path: Path, data: dict) -> int:
    payload = (json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n").encode("utf-8")
    if len(payload) > MAX_BYTES:
        raise ValueError(f"Output exceeds 1 MB: {path} ({len(payload)} bytes)")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(payload)
    print(f"{path}: {len(payload)} bytes")
    return len(payload)


def build() -> None:
    years: list[int] = []
    values: list[float | None] = []
    for line in fetch_text(SOURCE_URL).splitlines():
        columns = line.split()
        if not columns or not columns[0].isdigit():
            continue
        year = int(columns[0])
        if not FIRST_YEAR <= year <= LAST_COMPLETE_YEAR:
            continue
        if len(columns) < 2:
            raise ValueError(f"Unexpected NOAA row: {line}")
        years.append(year)
        values.append(float(columns[1]))

    expected_years = list(range(FIRST_YEAR, LAST_COMPLETE_YEAR + 1))
    if years != expected_years:
        raise ValueError(
            f"Unexpected NOAA year coverage: {years[0] if years else None}-"
            f"{years[-1] if years else None}; expected {FIRST_YEAR}-{LAST_COMPLETE_YEAR}"
        )

    write_json(
        OUTPUT,
        {
            "unit": f"°C anomaly (baseline {BASE_PERIOD})",
            "years": years,
            "series": [{"name": "전 지구 육지·해양 평균", "values": values}],
        },
    )
    sample_years = (1880, 1998, 2024, 2025)
    samples = {year: values[year - FIRST_YEAR] for year in sample_years}
    print(
        f"retrievedAt={RETRIEVED_AT}; version=NOAAGlobalTemp 6.1.0; "
        f"years={years[0]}-{years[-1]}; samples={samples}"
    )


if __name__ == "__main__":
    build()
