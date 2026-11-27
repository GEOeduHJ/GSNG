#!/usr/bin/env python3
"""Build urbanization and largest-city-share series for unit 01-02."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
API_URL_TEMPLATE = (
    "https://api.worldbank.org/v2/country/all/indicator/{indicator}"
    "?format=json&per_page=20000&date=1960:2025"
)
WDI_LICENSE_URL = "https://datacatalog.worldbank.org/public-licenses"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/01-02"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"
YEARS = list(range(1960, 2026))

OUTPUTS = {
    "urbanization-rate-series.json": {
        "indicator": "SP.URB.TOTL.IN.ZS",
        "unit": "% of total population",
        "series": [
            ("WLD", "세계"),
            ("KOR", "대한민국"),
            ("JPN", "일본"),
            ("DEU", "독일"),
            ("BGD", "방글라데시"),
        ],
    },
    "largest-city-urban-share-series.json": {
        "indicator": "EN.URB.LCTY.UR.ZS",
        "unit": "% of urban population",
        "series": [
            ("KOR", "대한민국"),
            ("JPN", "일본"),
            ("DEU", "독일"),
            ("BGD", "방글라데시"),
        ],
    },
}


def fetch_json(url: str):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.load(response)


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


def fetch_indicator(indicator: str) -> tuple[dict[tuple[str, int], float | None], str]:
    url = API_URL_TEMPLATE.format(
        indicator=urllib.parse.quote(indicator, safe="."),
    )
    response = fetch_json(url)
    if (
        not isinstance(response, list)
        or len(response) < 2
        or not isinstance(response[1], list)
    ):
        raise ValueError(f"Unexpected World Bank response for {indicator}")

    observations = {}
    for row in response[1]:
        iso3 = row.get("countryiso3code")
        if iso3 and row.get("date"):
            observations[(iso3, int(row["date"]))] = row.get("value")
    return observations, response[0].get("lastupdated", "")


def build_series(config: dict, observations: dict) -> dict:
    series = []
    for iso3, name in config["series"]:
        values = [observations.get((iso3, year)) for year in YEARS]
        if not any(value is not None for value in values):
            raise ValueError(f"No observations returned for {iso3}")
        series.append({"name": name, "iso3": iso3, "values": values})
    return {"unit": config["unit"], "years": YEARS, "series": series}


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for filename, config in OUTPUTS.items():
        observations, source_updated = fetch_indicator(config["indicator"])
        data = build_series(config, observations)
        write_json(OUT_DIR / filename, data)
        latest = {
            item["iso3"]: item["values"][-1]
            for item in data["series"]
        }
        print(
            f"{config['indicator']}: API lastupdated={source_updated}; "
            f"seriesYears={YEARS[0]}-{YEARS[-1]}; 2025={latest}"
        )
    print(f"retrievedAt={RETRIEVED_AT}; license={WDI_LICENSE_URL}")


if __name__ == "__main__":
    build()
