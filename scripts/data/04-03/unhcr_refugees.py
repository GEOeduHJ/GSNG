#!/usr/bin/env python3
"""Build annual forced-displacement charts from the UNHCR Statistics API."""

from __future__ import annotations

import json
import re
import time
import urllib.parse
import urllib.request
from collections import defaultdict
from pathlib import Path


RETRIEVED_AT = "2026-11-27"
API_URL = "https://api-data.unhcr.org/api/v0/data/PopStatsOfficial"
TERMS_URL = "https://refugeedata.unhcr.org/en/terms-and-conditions-of-use/"
GLOBAL_SERIES_URL = "https://www.unhcr.org/figures-at-a-glance"
ORIGIN_TYPES = "REF_UNHCR,REF_UNRWA,OIP,ASY"
UNKNOWN_CODES = {"UKN", "UNK", "XXX", "_T", ""}
ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / "public/data/04-03"
LAST_REQUEST = 0.0

# UNHCR's published global forced-displacement indicator, transcribed at the
# source's stated precision (millions of people). Using the published total
# preserves the agency's adjustments for overlapping displacement categories.
GLOBAL_FORCED_DISPLACED_MILLIONS = {
    2006: 39.47, 2007: 42.69, 2008: 41.98, 2009: 41.10, 2010: 41.06,
    2011: 38.54, 2012: 42.75, 2013: 51.23, 2014: 59.21, 2015: 65.03,
    2016: 64.17, 2017: 67.90, 2018: 72.56, 2019: 78.38, 2020: 81.49,
    2021: 88.23, 2022: 107.22, 2023: 116.36, 2024: 123.25, 2025: 117.83,
}


def request_page(params: dict[str, str | int]) -> dict:
    global LAST_REQUEST
    wait = 1.0 - (time.monotonic() - LAST_REQUEST)
    if wait > 0:
        time.sleep(wait)
    url = API_URL + "?" + urllib.parse.urlencode(params)
    request = urllib.request.Request(url, headers={"User-Agent": "04-03 public data preparation"})
    with urllib.request.urlopen(request, timeout=60) as response:
        body = response.read()
    LAST_REQUEST = time.monotonic()
    return json.loads(body)


def fetch_all(pop_types: str, period: str, dimensions: str) -> list[dict]:
    params: dict[str, str | int] = {
        "c[pop_type]": pop_types,
        "time_period": f"eq:{period}-12",
        "dimensions": dimensions,
        "page_size": 100,
        "page": 1,
    }
    first = request_page(params)
    data = list(first["data"])
    total_pages = int(first["pagination"]["total_pages"])
    for page in range(2, total_pages + 1):
        params["page"] = page
        data.extend(request_page(params)["data"])
    return data


def country_names() -> dict[str, str]:
    geo = json.loads((ROOT / "public/data/base/countries-110m.geojson").read_text(encoding="utf-8"))
    return {f["properties"]["iso_a3"]: f["properties"]["name_ko"] for f in geo["features"] if f["properties"].get("iso_a3")}


def korean_name(code: str, source_name: str, names: dict[str, str]) -> str:
    if code == "PSE":
        return "팔레스타인 지역"
    return names.get(code, source_name)


def top_rows(data: list[dict], dimension: str, names: dict[str, str]) -> list[dict]:
    sums: dict[str, int] = defaultdict(int)
    labels: dict[str, str] = {}
    for row in data:
        code = str(row.get(dimension, ""))
        if code in UNKNOWN_CODES or not re.fullmatch(r"[A-Z]{3}", code):
            continue
        sums[code] += int(float(row["obs_value"]))
        labels[code] = row.get(f"{dimension}_label", code)
    ordered = sorted(sums.items(), key=lambda pair: (-pair[1], pair[0]))[:10]
    result = []
    for code, value in ordered:
        row = {"name": korean_name(code, labels[code], names), "value": value}
        if code != "PSE":
            row = {"iso3": code, **row}
        result.append(row)
    return result


def save(name: str, value: dict) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    names = country_names()
    origin = top_rows(fetch_all(ORIGIN_TYPES, "2025", "pop_type,area_ori_adm0"), "area_ori_adm0", names)
    host = top_rows(fetch_all(ORIGIN_TYPES, "2025", "pop_type,ref_area_adm0"), "ref_area_adm0", names)
    save("forcibly-displaced-origin-top10-2025.json", {"year": 2025, "unit": "persons", "rows": origin})
    save("forcibly-displaced-host-top10-2025.json", {"year": 2025, "unit": "persons", "rows": host})

    years = list(GLOBAL_FORCED_DISPLACED_MILLIONS)
    totals = [GLOBAL_FORCED_DISPLACED_MILLIONS[year] for year in years]
    save(
        "global-forcibly-displaced-series-2006-2025.json",
        {"unit": "million persons", "years": years, "series": [{"name": "세계 강제 이주민", "values": totals}]},
    )

    print("origin top 10:", origin)
    print("host top 10:", host)
    print("published world totals (million persons):", dict(zip(years, totals)))
    print("global indicator:", GLOBAL_SERIES_URL)
    print("UNHCR terms:", TERMS_URL)


if __name__ == "__main__":
    main()
