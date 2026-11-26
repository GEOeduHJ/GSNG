#!/usr/bin/env python3
"""Build 1991–2020 ERA5 climographs and a city Köppen–Geiger point map."""

from __future__ import annotations

import calendar
import json
import time
import urllib.parse
import urllib.request
from urllib.error import HTTPError
from collections import defaultdict
from datetime import date
from pathlib import Path

RETRIEVED_AT = "2026-11-26"
ARCHIVE_API_URL = "https://archive-api.open-meteo.com/v1/archive"
GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search"
OPEN_METEO_LICENSE_URL = "https://open-meteo.com/en/license"
GEOCODING_DOCS_URL = "https://open-meteo.com/en/docs/geocoding-api"
KOPPEN_MAP_URL = "https://www.gloh2o.org/koppen/"
KOPPEN_RASTER_URL = (
    "https://data.naturalcapitalalliance.stanford.edu/download/global/"
    "koppen_geiger_climatezones/koppen_geiger_climatezones_1991_2020_1km.tif"
)
KOPPEN_LEGEND_URL = (
    "https://data.naturalcapitalalliance.stanford.edu/download/global/"
    "koppen_geiger_climatezones/legend.txt"
)

ROOT = Path(__file__).resolve().parents[3]
OUTPUT_DIR = ROOT / "public/data/02-01"
MAX_BYTES = 1_000_000
START_DATE = "1991-01-01"
END_DATE = "2020-12-31"
YEARS = tuple(range(1991, 2021))
MONTHS = tuple(range(1, 13))

# Coordinates are the city results returned by Open-Meteo Geocoding API
# (GeoNames-based, queried on RETRIEVED_AT). Koppen class codes were sampled
# at those coordinates from the 1991–2020 1-km Beck et al. raster above.
# RGB colors are copied from that dataset's legend.txt.
CITIES = (
    {
        "slug": "seoul",
        "name": "서울",
        "name_en": "Seoul",
        "country_code": "KR",
        "lat": 37.566,
        "lon": 126.9784,
        "code": 21,
        "category": "냉대 겨울 건조 기후(Dwa)",
        "color": "#AAAFFF",
    },
    {
        "slug": "manaus",
        "name": "마나우스",
        "name_en": "Manaus",
        "country_code": "BR",
        "lat": -3.10194,
        "lon": -60.025,
        "code": 1,
        "category": "열대 우림 기후(Af)",
        "color": "#0000FF",
    },
    {
        "slug": "mumbai",
        "name": "뭄바이",
        "name_en": "Mumbai",
        "country_code": "IN",
        "lat": 19.07283,
        "lon": 72.88261,
        "code": 2,
        "category": "열대 몬순 기후(Am)",
        "color": "#0078FF",
    },
    {
        "slug": "cairo",
        "name": "카이로",
        "name_en": "Cairo",
        "country_code": "EG",
        "lat": 30.06263,
        "lon": 31.24967,
        "code": 4,
        "category": "고온 사막 기후(BWh)",
        "color": "#FF0000",
    },
    {
        "slug": "athens",
        "name": "아테네",
        "name_en": "Athens",
        "country_code": "GR",
        "lat": 37.98376,
        "lon": 23.72784,
        "code": 8,
        "category": "지중해성 기후(Csa)",
        "color": "#FFFF00",
    },
    {
        "slug": "london",
        "name": "런던",
        "name_en": "London",
        "country_code": "GB",
        "lat": 51.50853,
        "lon": -0.12574,
        "code": 15,
        "category": "서안 해양성 기후(Cfb)",
        "color": "#64FF50",
    },
    {
        "slug": "shanghai",
        "name": "상하이",
        "name_en": "Shanghai",
        "country_code": "CN",
        "lat": 31.22222,
        "lon": 121.45806,
        "code": 14,
        "category": "온난 습윤 기후(Cfa)",
        "color": "#C8FF50",
    },
    {
        "slug": "yakutsk",
        "name": "야쿠츠크",
        "name_en": "Yakutsk",
        "country_code": "RU",
        "lat": 62.03114,
        "lon": 129.72289,
        "code": 27,
        "category": "냉대 습윤 기후(Dfc)",
        "color": "#007D7D",
    },
    {
        "slug": "nuuk",
        "name": "누크",
        "name_en": "Nuuk",
        "country_code": "GL",
        "lat": 64.18347,
        "lon": -51.72157,
        "code": 29,
        "category": "한대 툰드라 기후(ET)",
        "color": "#B2B2B2",
    },
)


def fetch_json(url: str) -> dict | list:
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    for attempt in range(4):
        try:
            with urllib.request.urlopen(request, timeout=180) as response:
                return json.loads(response.read().decode("utf-8"))
        except HTTPError as error:
            if error.code != 429 or attempt == 3:
                raise
            retry_after = error.headers.get("Retry-After")
            delay = min(int(retry_after), 60) if retry_after and retry_after.isdigit() else 5 * (2**attempt)
            print(f"Open-Meteo returned HTTP 429; retrying after {delay}s")
            time.sleep(delay)
    raise RuntimeError("Open-Meteo request retries exhausted")


def archive_batch_url() -> str:
    params = {
        "latitude": ",".join(f"{city['lat']:.5f}" for city in CITIES),
        "longitude": ",".join(f"{city['lon']:.5f}" for city in CITIES),
        "start_date": START_DATE,
        "end_date": END_DATE,
        "daily": "temperature_2m_mean,precipitation_sum",
        "timezone": "auto",
        "models": "era5",
    }
    return ARCHIVE_API_URL + "?" + urllib.parse.urlencode(params)


def monthly_normals(daily: dict) -> tuple[list[float | None], list[float | None]]:
    times = daily["time"]
    temperatures = daily["temperature_2m_mean"]
    precipitation = daily["precipitation_sum"]
    if not (len(times) == len(temperatures) == len(precipitation)):
        raise ValueError("Daily time, temperature, and precipitation arrays differ in length")

    temp_days: dict[int, list[float | None]] = defaultdict(list)
    precip_days: dict[int, dict[int, list[float | None]]] = defaultdict(
        lambda: defaultdict(list)
    )
    for day, temperature, precip in zip(times, temperatures, precipitation):
        parsed = date.fromisoformat(day)
        if parsed.year not in YEARS:
            continue
        temp_days[parsed.month].append(temperature)
        precip_days[parsed.month][parsed.year].append(precip)

    monthly_temperature: list[float | None] = []
    monthly_precipitation: list[float | None] = []
    for month in MONTHS:
        expected_days = sum(calendar.monthrange(year, month)[1] for year in YEARS)
        temperature_values = temp_days[month]
        if len(temperature_values) != expected_days or any(
            value is None for value in temperature_values
        ):
            monthly_temperature.append(None)
        else:
            monthly_temperature.append(
                round(sum(temperature_values) / expected_days, 1)
            )

        year_totals: list[float] = []
        complete = True
        for year in YEARS:
            values = precip_days[month][year]
            expected_year_days = calendar.monthrange(year, month)[1]
            if len(values) != expected_year_days or any(value is None for value in values):
                complete = False
                break
            year_totals.append(sum(values))
        if not complete or len(year_totals) != len(YEARS):
            monthly_precipitation.append(None)
        else:
            monthly_precipitation.append(round(sum(year_totals) / len(YEARS), 1))

    return monthly_temperature, monthly_precipitation


def write_json(path: Path, data: dict) -> None:
    encoded = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    path.write_text(encoded, encoding="utf-8")
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    print(f"{path}: {size} bytes")


def build_climographs() -> None:
    # The API accepts comma-separated coordinates and returns one response
    # object per point. Batch requests avoid rapid repeated calls and preserve
    # the same ERA5 variables, date range, and timezone rule for all cities.
    responses = fetch_json(archive_batch_url())
    if not isinstance(responses, list) or len(responses) != len(CITIES):
        raise ValueError("Open-Meteo did not return one response per requested city")

    for city, response in zip(CITIES, responses):
        daily = response["daily"]
        temperature, precipitation = monthly_normals(daily)
        data = {
            "station": f"{city['name']} 도시 대표점 (ERA5 격자)",
            "lat": response["latitude"],
            "lon": response["longitude"],
            "period": "1991–2020 (ERA5 재분석)",
            "months": list(MONTHS),
            "temperature": temperature,
            "precipitation": precipitation,
            "unit": {"temperature": "°C", "precipitation": "mm"},
        }
        path = OUTPUT_DIR / f"climograph-{city['slug']}.json"
        write_json(path, data)
        print(
            f"  {city['name']}: 1월 {temperature[0]}°C / "
            f"7월 {precipitation[6]}mm / 8월 {temperature[7]}°C; "
            f"grid=({response['latitude']}, {response['longitude']})"
        )


def build_city_map() -> None:
    features = []
    for city in CITIES:
        features.append(
            {
                "type": "Feature",
                "properties": {
                    "name": city["name"],
                    "category": city["category"],
                    "color": city["color"],
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [city["lon"], city["lat"]],
                },
            }
        )
    write_json(
        OUTPUT_DIR / "climate-city-points.geojson",
        {"type": "FeatureCollection", "features": features},
    )


def build() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    build_climographs()
    build_city_map()
    print(
        f"Sources retrieved {RETRIEVED_AT}: {ARCHIVE_API_URL}; "
        f"{GEOCODING_DOCS_URL}; {KOPPEN_MAP_URL}; {KOPPEN_RASTER_URL}; "
        f"{KOPPEN_LEGEND_URL}; license={OPEN_METEO_LICENSE_URL}"
    )


if __name__ == "__main__":
    build()
