#!/usr/bin/env python3
"""Build neutral point-map and national-result data for the 2014 Scotland referendum."""

from __future__ import annotations

import io
import json
import urllib.request
import zipfile
from pathlib import Path

RETRIEVED_AT = "2026-11-27"
HOUSE_OF_COMMONS_TABLE_URL = (
    "https://researchbriefings.files.parliament.uk/documents/CBP-7529/CBP-7529.pdf"
)
OPEN_PARLIAMENT_LICENCE_URL = (
    "https://www.parliament.uk/site-information/copyright/open-parliament-licence/"
)
ELECTORAL_COMMISSION_REPORT_URL = (
    "https://www.electoralcommission.org.uk/sites/default/files/pdf_file/"
    "Scottish-independence-referendum-report.pdf"
)
EMB_RESULTS_URL = (
    "https://www.emb.scot/emb/scottish-independence-referendum-2014-3/"
    "scottish-independence-referendum-18-september-2014"
)
GEONAMES_GB_URL = "https://download.geonames.org/export/dump/GB.zip"
GEONAMES_LICENCE_URL = "https://www.geonames.org/export/"

ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/01-02"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"

YES_COLOR = "#2E7184"
NO_COLOR = "#C07D3E"

# Table 33, House of Commons Library briefing CBP-7529. Vote percentages
# and turnout are published to one decimal place; vote counts are retained
# here to derive the outcome category and check the published percentages.
SCOTLAND_ROWS = [
    {"name": "Aberdeen City", "yes": 59390, "no": 84094, "yes_share": 41.4, "turnout": 81.7},
    {"name": "Aberdeenshire", "yes": 71337, "no": 108606, "yes_share": 39.6, "turnout": 87.2},
    {"name": "Angus", "yes": 35044, "no": 45192, "yes_share": 43.7, "turnout": 85.7},
    {"name": "Argyll and Bute", "yes": 26324, "no": 37143, "yes_share": 41.5, "turnout": 88.2},
    {"name": "Clackmannanshire", "yes": 16350, "no": 19036, "yes_share": 46.2, "turnout": 88.6},
    {"name": "Dumfries and Galloway", "yes": 36614, "no": 70039, "yes_share": 34.3, "turnout": 87.5},
    {"name": "Dundee City", "yes": 53620, "no": 39880, "yes_share": 57.3, "turnout": 78.8},
    {"name": "East Ayrshire", "yes": 39762, "no": 44442, "yes_share": 47.2, "turnout": 84.5},
    {"name": "East Dunbartonshire", "yes": 30624, "no": 48314, "yes_share": 38.8, "turnout": 91.0},
    {"name": "East Lothian", "yes": 27467, "no": 44283, "yes_share": 38.3, "turnout": 87.6},
    {"name": "East Renfrewshire", "yes": 24287, "no": 41690, "yes_share": 36.8, "turnout": 90.4},
    {"name": "Edinburgh, City of", "yes": 123927, "no": 194638, "yes_share": 38.9, "turnout": 84.4},
    {"name": "Eilean Siar", "yes": 9195, "no": 10544, "yes_share": 46.6, "turnout": 86.2},
    {"name": "Falkirk", "yes": 50489, "no": 58030, "yes_share": 46.5, "turnout": 88.7},
    {"name": "Fife", "yes": 114148, "no": 139788, "yes_share": 45.0, "turnout": 84.1},
    {"name": "Glasgow City", "yes": 194779, "no": 169347, "yes_share": 53.5, "turnout": 75.0},
    {"name": "Highland", "yes": 78069, "no": 87739, "yes_share": 47.1, "turnout": 87.0},
    {"name": "Inverclyde", "yes": 27243, "no": 27329, "yes_share": 49.9, "turnout": 87.4},
    {"name": "Midlothian", "yes": 26370, "no": 33972, "yes_share": 43.7, "turnout": 86.7},
    {"name": "Moray", "yes": 27232, "no": 36935, "yes_share": 42.4, "turnout": 85.4},
    {"name": "North Ayrshire", "yes": 47072, "no": 49016, "yes_share": 49.0, "turnout": 84.4},
    {"name": "North Lanarkshire", "yes": 115783, "no": 110922, "yes_share": 51.1, "turnout": 84.4},
    {"name": "Orkney Islands", "yes": 4883, "no": 10004, "yes_share": 32.8, "turnout": 83.7},
    {"name": "Perth and Kinross", "yes": 41475, "no": 62714, "yes_share": 39.8, "turnout": 86.9},
    {"name": "Renfrewshire", "yes": 55466, "no": 62067, "yes_share": 47.2, "turnout": 87.3},
    {"name": "Scottish Borders", "yes": 27906, "no": 55553, "yes_share": 33.4, "turnout": 87.4},
    {"name": "Shetland Islands", "yes": 5669, "no": 9951, "yes_share": 36.3, "turnout": 84.4},
    {"name": "South Ayrshire", "yes": 34402, "no": 47247, "yes_share": 42.1, "turnout": 86.1},
    {"name": "South Lanarkshire", "yes": 100990, "no": 121800, "yes_share": 45.3, "turnout": 85.3},
    {"name": "Stirling", "yes": 25010, "no": 37153, "yes_share": 40.2, "turnout": 90.1},
    {"name": "West Dunbartonshire", "yes": 33720, "no": 28776, "yes_share": 54.0, "turnout": 87.9},
    {"name": "West Lothian", "yes": 53342, "no": 65682, "yes_share": 44.8, "turnout": 86.2},
]

# Each point uses a populated place in the council area as a representative
# location. Coordinates are read from the matching GeoNames IDs in GB.txt.
COUNCIL_CENTERS = {
    "Aberdeen City": ("Aberdeen", 2657832),
    "Aberdeenshire": ("Inverurie", 2646073),
    "Angus": ("Forfar", 2649207),
    "Argyll and Bute": ("Lochgilphead", 2643825),
    "Clackmannanshire": ("Alloa", 2657471),
    "Dumfries and Galloway": ("Dumfries", 2650798),
    "Dundee City": ("Dundee", 2650752),
    "East Ayrshire": ("Kilmarnock", 2645605),
    "East Dunbartonshire": ("Kirkintilloch", 2645261),
    "East Lothian": ("Haddington", 2647686),
    "East Renfrewshire": ("Giffnock", 2648683),
    "Edinburgh, City of": ("Edinburgh", 2650225),
    "Eilean Siar": ("Stornoway", 2636790),
    "Falkirk": ("Falkirk", 2649723),
    "Fife": ("Glenrothes", 2648438),
    "Glasgow City": ("Glasgow", 2648579),
    "Highland": ("Inverness", 2646088),
    "Inverclyde": ("Greenock", 2647948),
    "Midlothian": ("Dalkeith", 2651587),
    "Moray": ("Elgin", 2650122),
    "North Ayrshire": ("Irvine", 2646032),
    "North Lanarkshire": ("Motherwell", 2642135),
    "Orkney Islands": ("Kirkwall", 2645198),
    "Perth and Kinross": ("Perth", 2640358),
    "Renfrewshire": ("Paisley", 2640677),
    "Scottish Borders": ("Newtown St Boswells", 2641513),
    "Shetland Islands": ("Lerwick", 2644605),
    "South Ayrshire": ("Ayr", 2656708),
    "South Lanarkshire": ("Hamilton", 2647570),
    "Stirling": ("Stirling", 2636910),
    "West Dunbartonshire": ("Dumbarton", 2650802),
    "West Lothian": ("Livingston", 2644204),
}

NATIONAL_RESULT = {
    "yes": 1_617_989,
    "no": 2_001_926,
    "rejected": 3_429,
    "total": 3_623_344,
}


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read()


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


def fetch_geonames_coordinates() -> dict[str, tuple[float, float]]:
    if set(COUNCIL_CENTERS) != {row["name"] for row in SCOTLAND_ROWS}:
        raise ValueError("Council result names and representative places do not match")

    expected = {
        geoname_id: (council_name, place_name)
        for council_name, (place_name, geoname_id) in COUNCIL_CENTERS.items()
    }
    expected_ids = {str(geoname_id) for geoname_id in expected}
    archive_bytes = fetch_bytes(GEONAMES_GB_URL)
    coordinates: dict[str, tuple[float, float]] = {}
    with zipfile.ZipFile(io.BytesIO(archive_bytes)) as archive:
        if "GB.txt" not in archive.namelist():
            raise ValueError("GeoNames GB archive does not contain GB.txt")
        for line in archive.read("GB.txt").decode("utf-8").splitlines():
            fields = line.split("\t")
            if len(fields) < 15 or fields[0] not in expected_ids:
                continue
            if fields[6] != "P" or fields[8] != "GB" or fields[10] != "SCT":
                continue
            council_name, place_name = expected[int(fields[0])]
            if fields[1] != place_name:
                raise ValueError(
                    f"GeoNames ID {fields[0]} expected {place_name!r}, found {fields[1]!r}"
                )
            # GeoNames columns 5 and 4 are longitude and latitude respectively.
            coordinates[council_name] = (float(fields[5]), float(fields[4]))

    if len(coordinates) != 32:
        missing = sorted(set(COUNCIL_CENTERS) - set(coordinates))
        raise ValueError(f"Expected 32 GeoNames locations; missing: {missing}")
    return coordinates


def build_point_map(coordinates: dict[str, tuple[float, float]]) -> dict:
    features = []
    for row in SCOTLAND_ROWS:
        category = "찬성 우세" if row["yes"] > row["no"] else "반대 우세"
        color = YES_COLOR if category == "찬성 우세" else NO_COLOR
        lon, lat = coordinates[row["name"]]
        features.append(
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [lon, lat]},
                "properties": {
                    "name": row["name"],
                    "category": category,
                    "color": color,
                    "yes_share": row["yes_share"],
                    "turnout": row["turnout"],
                },
            }
        )
    return {"type": "FeatureCollection", "features": features}


def build_national_result() -> dict:
    valid_votes = NATIONAL_RESULT["yes"] + NATIONAL_RESULT["no"]
    if valid_votes + NATIONAL_RESULT["rejected"] != NATIONAL_RESULT["total"]:
        raise ValueError("National result totals do not reconcile")
    return {
        "year": 2014,
        "unit": "% of valid Yes/No votes",
        "rows": [
            {"name": "찬성", "value": round(100 * NATIONAL_RESULT["yes"] / valid_votes, 1)},
            {"name": "반대", "value": round(100 * NATIONAL_RESULT["no"] / valid_votes, 1)},
        ],
    }


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    yes_total = sum(row["yes"] for row in SCOTLAND_ROWS)
    no_total = sum(row["no"] for row in SCOTLAND_ROWS)
    if (yes_total, no_total) != (NATIONAL_RESULT["yes"], NATIONAL_RESULT["no"]):
        raise ValueError("Council vote totals do not match the national result")

    coordinates = fetch_geonames_coordinates()
    write_json(
        OUT_DIR / "scotland-referendum-council-points.geojson",
        build_point_map(coordinates),
    )
    write_json(
        OUT_DIR / "scotland-referendum-national-result.json",
        build_national_result(),
    )
    print(
        f"retrievedAt={RETRIEVED_AT}; councils={len(SCOTLAND_ROWS)}; "
        f"results={HOUSE_OF_COMMONS_TABLE_URL}; "
        f"coordinates={GEONAMES_GB_URL}; "
        f"validation={ELECTORAL_COMMISSION_REPORT_URL}; "
        f"assessed-result-page={EMB_RESULTS_URL}"
    )


if __name__ == "__main__":
    build()
