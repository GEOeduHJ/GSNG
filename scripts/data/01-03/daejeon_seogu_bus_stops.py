#!/usr/bin/env python3
"""Build Daejeon Seo-gu bus-stop points from the municipal open-data CSV."""

from __future__ import annotations

import csv
import http.cookiejar
import io
import json
import tempfile
import urllib.parse
import urllib.request
from pathlib import Path

SOURCE_PAGE_URL = "https://www.data.go.kr/data/15081730/fileData.do"
SOURCE_DOWNLOAD_METADATA_URL = "https://www.data.go.kr/tcs/dss/selectFileDataDownload.do"
SOURCE_FILE_DOWNLOAD_URL = "https://www.data.go.kr/cmm/cmm/fileDownload.do"
LICENSE_URL = "https://www.data.go.kr/ugs/selectPortalPolicyView.do"
PUBLIC_DATA_PK = "15081730"
PUBLIC_DATA_DETAIL_PK = "uddi:ad2a3d58-6c27-4321-9338-fcf0093716e8"
RETRIEVED_AT = "2026-11-27"
SOURCE_DATA_DATE = "2025-04-24"
MAX_BYTES = 1_000_000
ROOT = Path(__file__).resolve().parents[3]
OUTPUT = ROOT / "public/data/01-03/daejeon-seogu-bus-stops.geojson"

CATEGORY_COLORS = {
    "안내 단말기 설치": "#477A69",
    "안내 단말기 미설치": "#D28E3D",
    "설치 여부 미확인": "#6B7280",
}


def download_source_csv() -> bytes:
    cookie_jar = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cookie_jar))
    user_agent = "WorldCitizenshipGeography/1.0 (educational data)"
    with opener.open(
        urllib.request.Request(SOURCE_PAGE_URL, headers={"User-Agent": user_agent}),
        timeout=45,
    ) as response:
        response.read()

    form = urllib.parse.urlencode(
        {
            "publicDataDetailPk": PUBLIC_DATA_DETAIL_PK,
            "publicDataPk": PUBLIC_DATA_PK,
            "atchFileId": "",
            "fileDetailSn": "1",
            "publicDataHistSn": "2",
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

    file_info = metadata.get("dataSetFileDetailInfo", {})
    file_id = metadata.get("atchFileId")
    file_detail_sn = metadata.get("fileDetailSn")
    data_name = file_info.get("dataNm")
    if not file_id or not file_detail_sn or not data_name:
        raise RuntimeError("Public Data Portal download metadata is incomplete")

    query = urllib.parse.urlencode(
        {"atchFileId": file_id, "fileDetailSn": file_detail_sn, "dataNm": data_name}
    )
    request = urllib.request.Request(
        f"{SOURCE_FILE_DOWNLOAD_URL}?{query}",
        headers={"User-Agent": user_agent, "Referer": SOURCE_PAGE_URL},
    )
    with opener.open(request, timeout=60) as response:
        return response.read()


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


def build() -> int:
    raw_bytes = download_source_csv()
    with tempfile.TemporaryDirectory(prefix="daejeon-seogu-bus-stops-01-03-") as temp_dir:
        raw_path = Path(temp_dir) / "bus-stops.csv"
        raw_path.write_bytes(raw_bytes)
        source_text = raw_path.read_bytes().decode("cp949")

    rows = list(csv.DictReader(io.StringIO(source_text)))
    required_columns = {
        "국토부 코드",
        "정류장명",
        "시도명",
        "시군구명",
        "읍면동명",
        "버스안내단말기 설치유무",
        "와이좌표",
        "엑스좌표",
    }
    if not rows or not required_columns.issubset(rows[0]):
        raise ValueError("The source file is empty or missing required bus-stop columns")

    features = []
    seen_stop_ids = set()
    invalid_coordinates = 0
    for row in rows:
        if row.get("시도명", "").strip() != "대전광역시" or row.get("시군구명", "").strip() != "서구":
            continue

        stop_id = row.get("국토부 코드", "").strip()
        if not stop_id or stop_id in seen_stop_ids:
            continue
        seen_stop_ids.add(stop_id)

        try:
            latitude = float(row.get("와이좌표", ""))
            longitude = float(row.get("엑스좌표", ""))
        except ValueError:
            invalid_coordinates += 1
            continue
        if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
            invalid_coordinates += 1
            continue

        bit_status = row.get("버스안내단말기 설치유무", "").strip()
        if bit_status == "O":
            category = "안내 단말기 설치"
        elif bit_status == "X":
            category = "안내 단말기 미설치"
        else:
            category = "설치 여부 미확인"

        name = row.get("정류장명", "").strip()
        if not name:
            continue
        features.append(
            {
                "type": "Feature",
                "id": stop_id,
                "properties": {
                    "name": name,
                    "category": category,
                    "color": CATEGORY_COLORS[category],
                    "dong": row.get("읍면동명", "").strip(),
                    "stop_id": stop_id,
                },
                "geometry": {"type": "Point", "coordinates": [longitude, latitude]},
            }
        )

    if not features:
        raise ValueError("No Daejeon Seo-gu bus stops with usable coordinates were found")

    payload = {"type": "FeatureCollection", "features": features}
    size = write_json(OUTPUT, payload)
    categories = {}
    for feature in features:
        category = feature["properties"]["category"]
        categories[category] = categories.get(category, 0) + 1
    print(f"{OUTPUT}: {len(features)} features, {size} bytes, categories={categories}")
    print(
        f"source={SOURCE_PAGE_URL} dataDate={SOURCE_DATA_DATE} "
        f"retrievedAt={RETRIEVED_AT} invalidCoordinates={invalid_coordinates}"
    )
    return size


if __name__ == "__main__":
    build()
