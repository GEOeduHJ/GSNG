#!/usr/bin/env python3
"""Build World Bank WDI datasets for unit 03-01."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
WDI_API_URL_TEMPLATE = (
    "https://api.worldbank.org/v2/country/{country}/indicator/{indicator}"
    "?format=json&per_page=20000&date={date}"
)
COUNTRY_URL = "https://api.worldbank.org/v2/country?format=json&per_page=400"
WDI_CATALOG_URL = (
    "https://datacatalog.worldbank.org/infrastructure-data/search/dataset/"
    "0037712/world-development-indicators"
)
WDI_LICENSE_URL = "https://datacatalog.worldbank.org/public-licenses"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/03-01"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"
SNAPSHOT_YEAR = 2024
SERIES_YEARS = list(range(1960, 2025))

INDICATORS = {
    "population-density-map-2024": {
        "id": "EN.POP.DNST",
        "unit": "persons per sq. km of land area",
    },
    "population-top10-2024": {
        "id": "SP.POP.TOTL",
        "unit": "persons",
    },
    "age-65plus-map-2024": {
        "id": "SP.POP.65UP.TO.ZS",
        "unit": "% of total population",
    },
    "international-migrant-share-map-2024": {
        "id": "SM.POP.TOTL.ZS",
        "unit": "% of total population",
    },
    "personal-remittances-gdp-map-2024": {
        "id": "BX.TRF.PWKR.DT.GD.ZS",
        "unit": "% of GDP",
    },
}

TOP_TEN_KOREAN_NAMES = {
    "IND": "인도",
    "CHN": "중국",
    "USA": "미국",
    "IDN": "인도네시아",
    "PAK": "파키스탄",
    "NGA": "나이지리아",
    "BRA": "브라질",
    "BGD": "방글라데시",
    "RUS": "러시아",
    "ETH": "에티오피아",
}

FERTILITY_SERIES = [
    ("KOR", "대한민국"),
    ("JPN", "일본"),
    ("UGA", "우간다"),
    ("WLD", "세계"),
]


def fetch_json(url: str):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.load(response)


def write_json(path: Path, data: dict) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    print(f"{path}: {size} bytes")
    return size


def get_country_iso3s() -> set[str]:
    response = fetch_json(COUNTRY_URL)
    if not isinstance(response, list) or len(response) < 2 or not response[1]:
        raise ValueError("Unexpected World Bank country response")

    codes = {
        row["id"]
        for row in response[1]
        if len(row.get("id", "")) == 3
        and row.get("region", {}).get("id") != "NA"
    }
    if not codes:
        raise ValueError("World Bank country response contains no ISO3 codes")
    return codes


def fetch_indicator(indicator: str, date: str, country: str = "all") -> tuple[list, str]:
    url = WDI_API_URL_TEMPLATE.format(
        country=urllib.parse.quote(country, safe=";"),
        indicator=urllib.parse.quote(indicator, safe="."),
        date=urllib.parse.quote(date, safe=":"),
    )
    response = fetch_json(url)
    if (
        not isinstance(response, list)
        or len(response) < 2
        or not isinstance(response[1], list)
    ):
        raise ValueError(f"Unexpected World Bank response for {indicator}")
    return response[1], response[0].get("lastupdated", "")


def build_map(slug: str, config: dict, country_iso3s: set[str]) -> tuple[dict, list]:
    indicator = config["id"]
    rows, _ = fetch_indicator(indicator, str(SNAPSHOT_YEAR))
    observations = {
        row.get("countryiso3code"): row.get("value")
        for row in rows
        if row.get("countryiso3code") in country_iso3s
        and row.get("date") == str(SNAPSHOT_YEAR)
    }
    values = {iso3: observations.get(iso3) for iso3 in sorted(country_iso3s)}
    data = {"year": SNAPSHOT_YEAR, "unit": config["unit"], "values": values}
    write_json(OUT_DIR / f"{slug}.json", data)
    observed = sum(value is not None for value in values.values())
    return data, [observed, len(values)]


def build_population_top_ten(country_iso3s: set[str]) -> dict:
    rows, _ = fetch_indicator("SP.POP.TOTL", str(SNAPSHOT_YEAR))
    observations = [
        row
        for row in rows
        if row.get("countryiso3code") in country_iso3s
        and row.get("date") == str(SNAPSHOT_YEAR)
        and row.get("value") is not None
    ]
    observations.sort(key=lambda row: (-row["value"], row["countryiso3code"]))
    top_ten = observations[:10]
    if len(top_ten) != 10:
        raise ValueError("World Bank response has fewer than ten 2024 country values")

    rows_out = []
    for row in top_ten:
        iso3 = row["countryiso3code"]
        if iso3 not in TOP_TEN_KOREAN_NAMES:
            raise ValueError(f"Missing Korean label for top-ten country {iso3}")
        rows_out.append(
            {
                "iso3": iso3,
                "name": TOP_TEN_KOREAN_NAMES[iso3],
                "value": row["value"],
            }
        )

    data = {"year": SNAPSHOT_YEAR, "unit": "persons", "rows": rows_out}
    write_json(OUT_DIR / "population-top10-2024.json", data)
    return data


def build_fertility_series() -> dict:
    codes = ";".join(code for code, _ in FERTILITY_SERIES)
    rows, _ = fetch_indicator("SP.DYN.TFRT.IN", "1960:2024", country=codes)
    values_by_country: dict[str, dict[int, float | None]] = {
        code: {} for code, _ in FERTILITY_SERIES
    }
    for row in rows:
        iso3 = row.get("countryiso3code")
        if iso3 not in values_by_country:
            continue
        year = int(row["date"])
        values_by_country[iso3][year] = row.get("value")

    series = [
        {
            "name": name,
            "iso3": iso3,
            "values": [values_by_country[iso3].get(year) for year in SERIES_YEARS],
        }
        for iso3, name in FERTILITY_SERIES
    ]
    data = {
        "unit": "births per woman",
        "years": SERIES_YEARS,
        "series": series,
    }
    write_json(OUT_DIR / "fertility-rate-series-1960-2024.json", data)
    return data


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    country_iso3s = get_country_iso3s()
    map_coverage = {}

    for slug in (
        "population-density-map-2024",
        "age-65plus-map-2024",
        "international-migrant-share-map-2024",
        "personal-remittances-gdp-map-2024",
    ):
        _, coverage = build_map(slug, INDICATORS[slug], country_iso3s)
        map_coverage[slug] = f"{coverage[0]}/{coverage[1]}"

    population_top_ten = build_population_top_ten(country_iso3s)
    fertility = build_fertility_series()
    fertility_2024 = {
        series["iso3"]: series["values"][-1] for series in fertility["series"]
    }
    print(
        f"retrievedAt={RETRIEVED_AT}; source=World Development Indicators; "
        f"year={SNAPSHOT_YEAR}; countryCodes={len(country_iso3s)}; "
        f"mapCoverage={map_coverage}; "
        f"top10={[row['iso3'] for row in population_top_ten['rows']]}; "
        f"fertility2024={fertility_2024}; license=CC BY 4.0; "
        f"catalog={WDI_CATALOG_URL}; licenseInfo={WDI_LICENSE_URL}"
    )


if __name__ == "__main__":
    build()
