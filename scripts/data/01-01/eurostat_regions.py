#!/usr/bin/env python3
"""Build two Eurostat tourism series and representative NUTS2 points."""

from __future__ import annotations

import json
import tempfile
import urllib.parse
import urllib.request
from pathlib import Path

RETRIEVED_AT = "2026-11-26"
API_BASE = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tgs00111"
SOURCE_URL = API_BASE
BOUNDARY_URL = (
    "https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/"
    "NUTS_RG_01M_2021_4326_LEVL_2.geojson"
)
LICENSE_URL = "https://ec.europa.eu/eurostat/web/gisco/geodata/statistical-units"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/01-01"
MAX_BYTES = 1_000_000
YEARS = list(range(2014, 2026))
REGIONS = [
    {"slug": "canary-islands", "geo": "ES70", "name": "Canarias"},
    {"slug": "south-tyrol", "geo": "ITH1", "name": "Provincia Autonoma di Bolzano/Bozen"},
]


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        return response.read()


def fetch_json(url: str):
    return json.loads(fetch_bytes(url).decode("utf-8"))


def write_json(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    print(f"{path}: {size} bytes")


def eurostat_url(geo: str) -> str:
    params = {
        "geo": geo,
        "freq": "A",
        "c_resid": "TOTAL",
        "unit": "NR",
        "nace_r2": "I551-I553",
        "sinceTimePeriod": str(YEARS[0]),
        "untilTimePeriod": str(YEARS[-1]),
        "lang": "en",
    }
    return API_BASE + "?" + urllib.parse.urlencode(params)


def region_values(response: dict) -> list[int | None]:
    time_index = response["dimension"]["time"]["category"]["index"]
    by_year = {int(year): int(index) for year, index in time_index.items()}
    raw = response.get("value", {})
    return [raw.get(str(by_year[year])) for year in YEARS]


def polygon_centroid(outer_ring: list[list[float]]) -> tuple[float, float]:
    cross_sum = 0.0
    x_sum = 0.0
    y_sum = 0.0
    for first, second in zip(outer_ring, outer_ring[1:]):
        cross = first[0] * second[1] - second[0] * first[1]
        cross_sum += cross
        x_sum += (first[0] + second[0]) * cross
        y_sum += (first[1] + second[1]) * cross
    if cross_sum == 0:
        raise ValueError("Cannot compute centroid for a zero-area polygon")
    return x_sum / (3 * cross_sum), y_sum / (3 * cross_sum)


def representative_point(feature: dict) -> list[float]:
    geometry = feature["geometry"]
    if geometry["type"] == "Polygon":
        polygons = [geometry["coordinates"]]
    elif geometry["type"] == "MultiPolygon":
        polygons = geometry["coordinates"]
    else:
        raise ValueError(f"Unexpected NUTS geometry: {geometry['type']}")

    candidates = []
    for polygon in polygons:
        ring = polygon[0]
        area = abs(
            sum(
                first[0] * second[1] - second[0] * first[1]
                for first, second in zip(ring, ring[1:])
            )
        )
        if area:
            candidates.append((area, ring))
    if not candidates:
        raise ValueError(f"No polygon area for {feature['properties'].get('NUTS_ID')}")
    _, largest_ring = max(candidates, key=lambda item: item[0])
    longitude, latitude = polygon_centroid(largest_ring)
    return [round(longitude, 6), round(latitude, 6)]


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="eurostat-01-01-") as temp_dir:
        boundary_path = Path(temp_dir) / "nuts2.geojson"
        boundary_path.write_bytes(fetch_bytes(BOUNDARY_URL))
        boundaries = json.loads(boundary_path.read_text(encoding="utf-8"))
        boundary_by_geo = {
            feature["properties"]["NUTS_ID"]: feature
            for feature in boundaries["features"]
            if feature.get("properties", {}).get("NUTS_ID")
        }
        for region in REGIONS:
            geo = region["geo"]
            response = fetch_json(eurostat_url(geo))
            values = region_values(response)
            write_json(
                OUT_DIR / f"region-{region['slug']}-series.json",
                {
                    "unit": "nights spent at tourist accommodation establishments",
                    "years": YEARS,
                    "series": [{"name": region["name"], "geo": geo, "values": values}],
                },
            )
            if geo not in boundary_by_geo:
                raise ValueError(f"No matching NUTS 2021 geometry for {geo}")
            coordinates = representative_point(boundary_by_geo[geo])
            write_json(
                OUT_DIR / f"region-{region['slug']}-point.geojson",
                {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {
                                "name": region["name"],
                                "nuts_id": geo,
                                "method": "centroid of the largest polygon in the NUTS 2021 region",
                            },
                            "geometry": {"type": "Point", "coordinates": coordinates},
                        }
                    ],
                },
            )
            print(f"{geo}: {values[0]} ({YEARS[0]}) … {values[-1]} ({YEARS[-1]}); point={coordinates}")
    print(f"statisticsSource={SOURCE_URL}; boundarySource={BOUNDARY_URL}; retrievedAt={RETRIEVED_AT}")


if __name__ == "__main__":
    build()
