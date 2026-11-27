#!/usr/bin/env python3
"""Build a 2026 RCEP participation map using the project's Natural Earth base."""

from __future__ import annotations

import json
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
SOURCE_URL = (
    "https://www.mfat.govt.nz/en/trade/free-trade-agreements/"
    "free-trade-agreements-in-force/regional-comprehensive-economic-partnership-rcep/"
    "rcep-overview"
)
BASE_MAP = Path(__file__).resolve().parents[3] / "public/data/base/countries-110m.geojson"
OUT_FILE = Path(__file__).resolve().parents[3] / "public/data/01-02/rcep-membership-map.json"
MAX_BYTES = 1_000_000

# The 15 parties listed by New Zealand's Ministry of Foreign Affairs and Trade.
MEMBERS = {
    "AUS", "BRN", "KHM", "CHN", "IDN", "JPN", "LAO", "MYS", "MMR",
    "NZL", "PHL", "KOR", "SGP", "THA", "VNM",
}


def build() -> dict:
    features = json.loads(BASE_MAP.read_text(encoding="utf-8"))["features"]
    iso3_codes = {
        feature["properties"]["iso_a3"]
        for feature in features
        if feature["properties"].get("iso_a3") not in (None, "", "-99")
    }
    # Singapore is a valid party but is omitted from the 110m generalized base
    # geometry. Keep its value in the dataset and disclose the map-scale limit.
    missing = MEMBERS - iso3_codes - {"SGP"}
    if missing:
        raise ValueError(f"RCEP members absent from the base map: {sorted(missing)}")
    if len(MEMBERS) != 15:
        raise ValueError("Expected 15 RCEP parties")
    return {
        "year": 2026,
        "unit": "participation (member=1, non-member=0)",
        "values": {
            iso3: int(iso3 in MEMBERS)
            for iso3 in sorted(iso3_codes | {"SGP"})
        },
        "unmappedISO3": ["SGP"],
    }


def main() -> None:
    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    data = build()
    OUT_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    size = OUT_FILE.stat().st_size
    if size > MAX_BYTES:
        OUT_FILE.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {size} bytes")
    print(
        f"{OUT_FILE}: {size} bytes; parties={sum(data['values'].values())}; "
        f"mapped ISO3 countries={len(data['values'])}; retrievedAt={RETRIEVED_AT}; source={SOURCE_URL}"
    )


if __name__ == "__main__":
    main()
