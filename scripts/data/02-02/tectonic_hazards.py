#!/usr/bin/env python3
"""Build compact USGS earthquake and Smithsonian GVP volcano point layers."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

RETRIEVED_AT = "2026-11-26"
USGS_API_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query"
USGS_SOURCE_URL = (
    "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson"
    "&starttime={start_year}-01-01&endtime={end_year}-01-01&minmagnitude=6"
    "&eventtype=earthquake&catalog=us"
)
GVP_WFS_URL = "https://webservices.volcano.si.edu/geoserver/GVP-VOTW/ows"
GVP_SOURCE_URL = (
    "https://webservices.volcano.si.edu/geoserver/GVP-VOTW/wfs?service=WFS"
    "&version=1.0.0&request=GetFeature"
    "&typeName=GVP-VOTW%3ASmithsonian_VOTW_Holocene_Volcanoes"
    "&outputFormat=application%2Fjson"
)
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/02-02"
MAX_BYTES = 1_000_000
USER_AGENT = "WorldCitizenshipGeography/1.0 (educational data)"


def fetch_json(url: str) -> dict:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.load(response)


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


def fetch_earthquakes() -> list[tuple[int, dict]]:
    events: dict[str, tuple[int, dict]] = {}
    batch_start = 2000
    while batch_start < 2026:
        batch_end = min(batch_start + 5, 2026)
        query = urllib.parse.urlencode(
            {
                "format": "geojson",
                "starttime": f"{batch_start}-01-01",
                "endtime": f"{batch_end}-01-01",
                "minmagnitude": "6",
                "eventtype": "earthquake",
                "catalog": "us",
                "orderby": "time-asc",
                "limit": "1000",
            }
        )
        payload = fetch_json(f"{USGS_API_URL}?{query}")
        batch_features = payload.get("features", [])
        if len(batch_features) >= 1000:
            raise ValueError(
                f"USGS returned the 1,000-event limit for {batch_start}-{batch_end - 1}; "
                "split this interval into smaller time ranges before publishing"
            )
        for feature in batch_features:
            properties = feature.get("properties") or {}
            coordinates = (feature.get("geometry") or {}).get("coordinates") or []
            timestamp = properties.get("time")
            magnitude = properties.get("mag")
            if timestamp is None or magnitude is None or len(coordinates) < 2:
                continue
            event_year = datetime.fromtimestamp(
                timestamp / 1000, tz=timezone.utc
            ).year
            if not batch_start <= event_year < batch_end or not 2000 <= event_year <= 2025:
                continue
            event_id = feature.get("id")
            if event_id:
                events[event_id] = (
                    timestamp,
                    {
                        "type": "Feature",
                        "properties": {
                            "name": "",
                            "category": "규모 7 이상" if magnitude >= 7 else "규모 6~6.9",
                            "color": "#d7191c" if magnitude >= 7 else "#2c7bb6",
                            "mag": magnitude,
                            "year": event_year,
                            "event_id": event_id,
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [float(coordinates[0]), float(coordinates[1])],
                        },
                    },
                )
        print(
            f"USGS {batch_start}-{batch_end - 1}: "
            f"{len(batch_features)} records returned",
            flush=True,
        )
        batch_start = batch_end
    return sorted(events.values(), key=lambda item: item[0])


def build_earthquakes() -> list[dict]:
    events = fetch_earthquakes()
    features = [feature for _, feature in events]
    write_json(
        OUT_DIR / "earthquakes-m6-2000-2025.geojson",
        {"type": "FeatureCollection", "features": features},
    )
    bins = {"규모 6~6.9": 0, "규모 7 이상": 0}
    for feature in features:
        bins[feature["properties"]["category"]] += 1
    print(f"USGS M6+ events: {len(features)}; bins={bins}")
    return features


def fetch_volcanoes() -> list[dict]:
    query = urllib.parse.urlencode(
        {
            "service": "WFS",
            "version": "1.0.0",
            "request": "GetFeature",
            "typeName": "GVP-VOTW:Smithsonian_VOTW_Holocene_Volcanoes",
            "outputFormat": "application/json",
            "propertyName": (
                "GeoLocation,Volcano_Number,Volcano_Name,Latitude,Longitude,Elevation,"
                "Last_Eruption_Year"
            ),
            "maxFeatures": "5000",
        }
    )
    payload = fetch_json(f"{GVP_WFS_URL}?{query}")
    features = []
    for feature in payload.get("features", []):
        properties = feature.get("properties") or {}
        geometry = feature.get("geometry") or {}
        coordinates = geometry.get("coordinates") or []
        number = properties.get("Volcano_Number")
        if number is None or len(coordinates) < 2:
            continue
        output_properties = {
            "name": "",
            "category": "홀로세 화산",
            "color": "#d73027",
            "volcano_number": int(number),
        }
        elevation = properties.get("Elevation")
        if elevation is not None:
            output_properties["elevation_m"] = float(elevation)
        features.append(
            {
                "type": "Feature",
                "properties": output_properties,
                "geometry": {
                    "type": "Point",
                    "coordinates": [float(coordinates[0]), float(coordinates[1])],
                },
            }
        )
    features.sort(key=lambda feature: feature["properties"]["volcano_number"])
    return features


def build_volcanoes() -> list[dict]:
    features = fetch_volcanoes()
    write_json(
        OUT_DIR / "holocene-volcanoes.geojson",
        {"type": "FeatureCollection", "features": features},
    )
    print(f"GVP Holocene volcanoes: {len(features)}")
    for feature in features[:3]:
        print(
            "  volcano_number="
            f"{feature['properties']['volcano_number']} coordinates="
            f"{feature['geometry']['coordinates']}"
        )
    return features


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    earthquake_features = build_earthquakes()
    volcano_features = build_volcanoes()
    print(
        f"retrievedAt={RETRIEVED_AT}; earthquakes={len(earthquake_features)}; "
        f"volcanoes={len(volcano_features)}"
    )


if __name__ == "__main__":
    build()
