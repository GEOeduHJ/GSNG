#!/usr/bin/env python3
"""Build the UNESCO Sagarmatha representative point and visitor series."""

from __future__ import annotations

import json
from pathlib import Path

RETRIEVED_AT = "2026-11-26"
UNESCO_MAPS_URL = "https://whc.unesco.org/en/list/120/maps"
UNESCO_LISTING_URL = "https://whc.unesco.org/en/list/120"
SAGARMATHA_MANAGEMENT_PLAN_URL = (
    "https://www.snp.gov.np/uploads/download/1597001947.pdf"
)
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/02-02"
MAX_BYTES = 1_000_000

# UNESCO's map table publishes 27°57′55.008″N, 86°54′47.016″E.
LATITUDE = 27 + 57 / 60 + 55.008 / 3600
LONGITUDE = 86 + 54 / 60 + 47.016 / 3600
PROPERTY_AREA_HA = 124_400
INSCRIBED_YEAR = 1979

# DNPWC Annex VII, "Tourist record of Sagarmatha National Park".
# Keys are the first year of the Nepal fiscal year (for example, 2014 means FY 2014/15).
VISITORS_BY_FY_START = {
    1975: 3600,
    1976: 3550,
    1977: 3650,
    1978: 3850,
    1986: 8135,
    1987: 8405,
    1988: 7878,
    1989: 8196,
    1990: 8785,
    1991: 11318,
    1992: 12180,
    1993: 12549,
    1994: 13388,
    1995: 15529,
    1996: 17067,
    1997: 17890,
    1998: 21394,
    1999: 26483,
    2000: 25292,
    2001: 19678,
    2002: 19300,
    2003: 21396,
    2004: 19063,
    2005: 20036,
    2006: 25814,
    2007: 30599,
    2008: 28784,
    2009: 31126,
    2010: 33390,
    2011: 35531,
    2012: 36650,
    2013: 35171,
    2014: 34412,
}


def write_json(path: Path, data: dict) -> int:
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


def build_point() -> None:
    feature_collection = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "name": "사가르마타 국립공원",
                    "category": "산악 세계유산",
                    "color": "#7b3294",
                    "area_ha": PROPERTY_AREA_HA,
                    "inscribed_year": INSCRIBED_YEAR,
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [LONGITUDE, LATITUDE],
                },
            }
        ],
    }
    write_json(OUT_DIR / "sagarmatha-point.geojson", feature_collection)
    print(
        f"UNESCO point: longitude={LONGITUDE:.5f}, latitude={LATITUDE:.5f}, "
        f"area_ha={PROPERTY_AREA_HA}, inscribed_year={INSCRIBED_YEAR}"
    )


def build_visitors() -> None:
    years = list(range(1975, 2015))
    values = [VISITORS_BY_FY_START.get(year) for year in years]
    if len(years) != len(values):
        raise ValueError("Visitor years and values must be the same length")
    data = {
        "unit": "visitors per fiscal year (year label is fiscal year start)",
        "years": years,
        "series": [
            {
                "name": "사가르마타 국립공원 방문객",
                "values": values,
            }
        ],
    }
    write_json(OUT_DIR / "sagarmatha-visitors-series.json", data)
    print(
        "DNPWC visitor records: "
        f"1975/76={VISITORS_BY_FY_START[1975]}, "
        f"2012/13={VISITORS_BY_FY_START[2012]}, "
        f"2014/15={VISITORS_BY_FY_START[2014]}, "
        f"reportedYears={len(VISITORS_BY_FY_START)}, missingYears="
        f"{sum(value is None for value in values)}"
    )


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    build_point()
    build_visitors()
    print(f"retrievedAt={RETRIEVED_AT}")


if __name__ == "__main__":
    build()
