#!/usr/bin/env python3
"""Build public earthquake shelter points and category counts for Daejeon Seo-gu."""

from __future__ import annotations

import csv
import http.cookiejar
import io
import json
import tempfile
import urllib.parse
import urllib.request
from collections import Counter
from pathlib import Path

SOURCE_PAGE_URL = "https://www.data.go.kr/data/15124341/fileData.do"
SOURCE_METADATA_URL = "https://www.data.go.kr/catalog/15124341/fileData.json"
SOURCE_DOWNLOAD_METADATA_URL = "https://www.data.go.kr/tcs/dss/selectFileDataDownload.do"
SOURCE_FILE_DOWNLOAD_URL = "https://www.data.go.kr/cmm/cmm/fileDownload.do"
LICENSE_URL = "https://www.data.go.kr/ugs/selectPortalPolicyView.do"
PUBLIC_DATA_PK = "15124341"
PUBLIC_DATA_DETAIL_PK = "uddi:c278c431-ce69-4850-b3c3-8b9e31496f49"
RETRIEVED_AT = "2026-11-27"
SOURCE_DATA_DATE = "2026-01-21"
MAX_BYTES = 1_000_000
ROOT = Path(__file__).resolve().parents[3]
POINTS_OUTPUT = ROOT / "public/data/01-03/daejeon-seogu-earthquake-shelters.geojson"
COUNTS_OUTPUT = ROOT / "public/data/01-03/daejeon-seogu-shelters-by-type.json"

CATEGORY_COLORS = {
    "학교운동장": "#477A69",
    "주차장(옥외)": "#D28E3D",
    "공원": "#4F7CAC",
}


def download_source_csv() -> bytes:
    cookie_jar = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cookie_jar))
    user_agent = "WorldCitizenshipGeography/1.0 (educational data)"
    page_request = urllib.request.Request(SOURCE_PAGE_URL, headers={"User-Agent": user_agent})
    with opener.open(page_request, timeout=45) as response:
        response.read()

    form = urllib.parse.urlencode(
        {
            "publicDataDetailPk": PUBLIC_DATA_DETAIL_PK,
            "publicDataPk": PUBLIC_DATA_PK,
            "atchFileId": "",
            "fileDetailSn": "1",
            "publicDataHistSn": "1",
            "publicDataTyCode": "PR0051",
        }
    ).encode("utf-8")
    metadata_request = urllib.request.Request(
        SOURCE_DOWNLOAD_METADATA_URL,
        data=form,
        headers={
            "User-Agent": user_agent,
            "X-Requested-With": "XMLHttpRequest",
            "Referer": SOURCE_PAGE_URL,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
    )
    with opener.open(metadata_request, timeout=45) as response:
        metadata = json.loads(response.read().decode("utf-8"))
    if metadata.get("status") is not True:
        raise RuntimeError("Public Data Portal did not provide file download metadata")

    file_id = metadata.get("atchFileId")
    file_detail_sn = metadata.get("fileDetailSn")
    data_name = metadata.get("dataSetFileDetailInfo", {}).get("dataNm")
    if not file_id or not file_detail_sn or not data_name:
        raise RuntimeError("Public Data Portal download metadata is incomplete")

    download_url = SOURCE_FILE_DOWNLOAD_URL + "?" + urllib.parse.urlencode(
        {"atchFileId": file_id, "fileDetailSn": file_detail_sn, "dataNm": data_name}
    )
    download_request = urllib.request.Request(
        download_url, headers={"User-Agent": user_agent, "Referer": SOURCE_PAGE_URL}
    )
    with opener.open(download_request, timeout=60) as response:
        return response.read()


def parse_number(value: str) -> int | float | None:
    text = (value or "").strip().replace(",", "")
    if not text:
        return None
    number = float(text)
    return int(number) if number.is_integer() else number


def write_json(path: Path, payload: dict) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    return size


def build() -> tuple[int, int]:
    raw_bytes = download_source_csv()
    with tempfile.TemporaryDirectory(prefix="daejeon-seogu-01-03-") as temp_dir:
        raw_path = Path(temp_dir) / "earthquake-shelters.csv"
        raw_path.write_bytes(raw_bytes)
        source_text = raw_path.read_bytes().decode("cp949")

    rows = list(csv.DictReader(io.StringIO(source_text)))
    if not rows:
        raise ValueError("The source file contains no shelter rows")
    required_columns = {"시설구분명", "시설명", "위도", "경도"}
    if not required_columns.issubset(rows[0]):
        raise ValueError("The source file is missing required facility or coordinate columns")

    capacity_column = next(
        (column for column in rows[0] if "수용" in column and "인원" in column), None
    )
    features = []
    omitted_without_coordinates = 0
    for row in rows:
        latitude = parse_number(row.get("위도", ""))
        longitude = parse_number(row.get("경도", ""))
        if latitude is None or longitude is None:
            omitted_without_coordinates += 1
            continue
        category = (row.get("시설구분명") or "").strip()
        name = (row.get("시설명") or "").strip()
        if not category or not name:
            continue

        properties = {
            "name": name,
            "category": category,
            "color": CATEGORY_COLORS.get(category, "#6B7280"),
        }
        if capacity_column:
            properties["capacity"] = parse_number(row.get(capacity_column, ""))
        features.append(
            {
                "type": "Feature",
                "properties": properties,
                "geometry": {"type": "Point", "coordinates": [longitude, latitude]},
            }
        )

    if not features:
        raise ValueError("No facilities with names and coordinates were found")

    point_collection = {"type": "FeatureCollection", "features": features}
    counts = Counter(feature["properties"]["category"] for feature in features)
    count_chart = {
        "year": 2026,
        "unit": "곳",
        "rows": [{"name": category, "value": count} for category, count in sorted(counts.items(), key=lambda item: (-item[1], item[0]))],
    }

    points_size = write_json(POINTS_OUTPUT, point_collection)
    counts_size = write_json(COUNTS_OUTPUT, count_chart)
    print(f"{POINTS_OUTPUT}: {len(features)} features, {points_size} bytes")
    print(f"{COUNTS_OUTPUT}: {len(counts)} categories, {counts_size} bytes, counts={dict(counts)}")
    print(f"source={SOURCE_PAGE_URL} dataDate={SOURCE_DATA_DATE} retrievedAt={RETRIEVED_AT}")
    print(f"omittedWithoutCoordinates={omitted_without_coordinates}; capacityColumn={capacity_column}")
    return points_size, counts_size


if __name__ == "__main__":
    build()
