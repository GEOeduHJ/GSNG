#!/usr/bin/env python3
"""Build the compact Natural Earth 1:110m country background layer."""

from __future__ import annotations

import json
import tempfile
import urllib.request
from pathlib import Path

SOURCE_URL = (
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/"
    "geojson/ne_110m_admin_0_countries.geojson"
)
LICENSE_URL = "https://www.naturalearthdata.com/about/terms-of-use/"
RETRIEVED_AT = "2026-11-26"
COORDINATE_DECIMALS = 2
ROOT = Path(__file__).resolve().parents[3]
OUTPUT = ROOT / "public/data/base/countries-110m.geojson"
MAX_BYTES = 1_000_000


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url, headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"}
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read()


def compact_coordinates(value):
    if isinstance(value, list):
        if value and isinstance(value[0], (int, float)):
            rounded = [round(float(n), COORDINATE_DECIMALS) for n in value]
            return [0 if n == 0 else n for n in rounded]
        return [compact_coordinates(child) for child in value]
    return value


def source_iso3(properties: dict) -> str | None:
    code = properties.get("ISO_A3")
    if code and code != "-99" and len(code) == 3:
        return code
    # Use the enhanced code only where it equals Natural Earth's admin ID;
    # this avoids assigning a sovereign's code to a separate disputed feature.
    enhanced = properties.get("ISO_A3_EH")
    if enhanced and enhanced == properties.get("ADM0_A3") and len(enhanced) == 3:
        return enhanced
    return None


def build() -> int:
    with tempfile.TemporaryDirectory(prefix="natural-earth-01-01-") as temp_dir:
        raw_path = Path(temp_dir) / "countries.geojson"
        raw_path.write_bytes(fetch_bytes(SOURCE_URL))
        source = json.loads(raw_path.read_text(encoding="utf-8"))

    features = []
    for feature in source["features"]:
        properties = feature["properties"]
        features.append(
            {
                "type": "Feature",
                "properties": {
                    "iso_a3": source_iso3(properties),
                    "name": properties.get("ADMIN"),
                    "name_ko": properties.get("NAME_KO") or None,
                },
                "geometry": {
                    "type": feature["geometry"]["type"],
                    "coordinates": compact_coordinates(feature["geometry"]["coordinates"]),
                },
            }
        )

    output = {"type": "FeatureCollection", "features": features}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(output, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    size = OUTPUT.stat().st_size
    if size > MAX_BYTES:
        OUTPUT.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {size} bytes")
    print(f"{OUTPUT}: {len(features)} features, {size} bytes")
    print(f"source={SOURCE_URL} retrievedAt={RETRIEVED_AT} license=public domain")
    return size


if __name__ == "__main__":
    build()
