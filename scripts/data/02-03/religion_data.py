#!/usr/bin/env python3
"""Build the religion datasets for unit 02-03 from Pew and GeoNames sources."""

from __future__ import annotations

import json
import re
import tempfile
import unicodedata
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

from pypdf import PdfReader

RETRIEVED_AT = "2026-11-26"
PEW_APPENDIX_B_URL = (
    "https://www.pewresearch.org/wp-content/uploads/sites/20/2025/06/"
    "PR_2025.06.09_global-religious-change_appendix-b.pdf"
)
PEW_REPORT_URL = (
    "https://www.pewresearch.org/religion/2025/06/09/"
    "how-the-global-religious-landscape-changed-from-2010-to-2020/"
)
LATEST_COUNTRY_TABLE_URL = (
    "https://www.pewresearch.org/feature/religious-composition-by-country-2010-2070/"
)
GEONAMES_LICENSE_URL = "https://www.geonames.org/export/"
ROOT = Path(__file__).resolve().parents[3]
BASE_COUNTRIES = ROOT / "public/data/base/countries-110m.geojson"
OUT_DIR = ROOT / "public/data/02-03"
MAX_BYTES = 1_000_000
YEARS = [2010, 2020]

GROUP_COLUMNS = [
    ("christian", "크리스트교"),
    ("muslim", "이슬람교"),
    ("unaffiliated", "종교 비소속"),
    ("buddhist", "불교"),
    ("hindu", "힌두교"),
    ("jewish", "유대교"),
    ("other", "기타 종교"),
]
GROUP_INDEX = {key: index for index, (key, _) in enumerate(GROUP_COLUMNS)}
PERCENT_TOKEN = r"(?:<\s*\d+(?:\.\d+)?%?|[\d,]+(?:\.\d+)?%?)"
TABLE_TITLE_RE = re.compile(r"Appendix B:\s*Religious composition table", re.IGNORECASE)
TABLE_HEADER_RE = re.compile(
    r"Place\s+Year\s+Population\s+%\s+Christian\s+%\s+Muslim\s+%\s+"
    r"religiously\s+unaffiliated\s+%\s+Buddhist\s+%\s+Hindu\s+%\s+"
    r"Jewish\s+%\s+other\s+religions",
    re.IGNORECASE,
)
ROW_RE = re.compile(
    rf"(?<![\w])(?P<name>[\wÀ-ÿ&.,'’()\- ]{{1,100}}?)\s+"
    rf"(?P<year>2010|2020)\s+(?P<population>[\d,]+)\s+"
    rf"(?P<groups>{PERCENT_TOKEN}(?:\s+{PERCENT_TOKEN}){{6}})",
    re.UNICODE,
)

# Pew table labels that differ from the names/codes in the existing Natural Earth layer.
NAME_TO_ISO3 = {
    "brunei": "BRN",
    "bahamas": "BHS",
    "bosnia herzegovina": "BIH",
    "cape verde": "CPV",
    "czech republic": "CZE",
    "cote d ivoire": "CIV",
    "ivory coast": "CIV",
    "curacao": "CUW",
    "d r congo": "COD",
    "democratic republic of the congo": "COD",
    "republic of the congo": "COG",
    "republic of congo": "COG",
    "eswatini": "SWZ",
    "federated states of micronesia": "FSM",
    "french guiana": "GUF",
    "french polynesia": "PYF",
    "guadeloupe": "GLP",
    "macao": "MAC",
    "macau": "MAC",
    "martinique": "MTQ",
    "mayotte": "MYT",
    "north korea": "PRK",
    "south korea": "KOR",
    "palestinian territories": "PSE",
    "reunion": "REU",
    "sao tome and principe": "STP",
    "serbia": "SRB",
    "st lucia": "LCA",
    "st vincent and the grenadines": "VCT",
    "u s virgin islands": "VIR",
    "united states": "USA",
    "united arab emirates": "ARE",
    "united kingdom": "GBR",
    "tanzania": "TZA",
    "timor leste": "TLS",
    "kosovo": None,
    "channel islands": None,
}

RELIGION_MAPS = [
    ("christian", "크리스트교"),
    ("muslim", "이슬람교"),
    ("buddhist", "불교"),
    ("hindu", "힌두교"),
]
AGGREGATE_PLACES = {
    "World",
    "Asia-Pacific",
    "Europe",
    "Latin America-Caribbean",
    "Middle East-North Africa",
    "North America",
    "Sub-Saharan Africa",
}

# These GeoNames records are representative place coordinates, not shrine-building footprints.
SITES = [
    {
        "id": 281184,
        "slug": "jerusalem",
        "name": "예루살렘",
        "category": "공동 성지(크리스트교·이슬람교·유대교)",
        "color": "#6E6B80",
    },
    {
        "id": 284315,
        "slug": "bethlehem",
        "name": "베들레헴",
        "category": "크리스트교",
        "color": "#6674BA",
    },
    {
        "id": 104515,
        "slug": "makkah",
        "name": "메카",
        "category": "이슬람교",
        "color": "#3D8B78",
    },
    {
        "id": 109223,
        "slug": "madinah",
        "name": "메디나",
        "category": "이슬람교",
        "color": "#3D8B78",
    },
    {
        "id": 1282839,
        "slug": "rummin-dei",
        "name": "룸비니",
        "category": "불교",
        "color": "#D28A46",
    },
    {
        "id": 1275389,
        "slug": "bodh-gaya",
        "name": "부다가야",
        "category": "불교",
        "color": "#D28A46",
    },
    {
        "id": 1257137,
        "slug": "sarnath",
        "name": "사르나트",
        "category": "불교",
        "color": "#D28A46",
    },
    {
        "id": 1253405,
        "slug": "varanasi",
        "name": "바라나시",
        "category": "힌두교",
        "color": "#B45F7B",
    },
    {
        "id": 1263364,
        "slug": "mathura",
        "name": "마투라",
        "category": "힌두교",
        "color": "#B45F7B",
    },
]


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "WorldCitizenshipGeography/1.0 (educational data)"},
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return response.read()


def normalized_name(value: str) -> str:
    decomposed = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", " ", decomposed.casefold()).strip()


class Below(str):
    """A share the source reports only as under a threshold, e.g. '<0.1'. Not missing, just tiny."""


def parse_percent(token: str) -> float | Below:
    value = token.replace("%", "").strip()
    if value.startswith("<"):
        return Below(value)
    return float(value.replace(",", ""))


def parse_pew_pdf(pdf_path: Path) -> dict[str, dict[int, dict]]:
    reader = PdfReader(str(pdf_path))
    records: dict[str, dict[int, dict]] = {}
    for page in reader.pages:
        text = page.extract_text() or ""
        text = TABLE_TITLE_RE.sub(" ", text)
        text = TABLE_HEADER_RE.sub(" ", text)
        for match in ROW_RE.finditer(text):
            place = re.sub(r"\s+", " ", match.group("name")).strip()
            year = int(match.group("year"))
            groups = match.group("groups").split()
            if len(groups) != len(GROUP_COLUMNS):
                continue
            records.setdefault(place, {})[year] = {
                "population": int(match.group("population").replace(",", "")),
                "groups": [parse_percent(token) for token in groups],
            }

    if "World" not in records or not all(year in records["World"] for year in YEARS):
        raise ValueError("Could not extract the World 2010/2020 rows from Pew Appendix B")
    country_places = set(records) - AGGREGATE_PLACES
    if len(country_places) != 201:
        raise ValueError(f"Expected 201 Pew country/territory rows; extracted {len(country_places)}")
    incomplete = [place for place in records if not all(year in records[place] for year in YEARS)]
    if incomplete:
        raise ValueError(f"Pew rows missing a comparison year: {incomplete[:5]}")
    return records


def base_iso3_names() -> tuple[set[str], dict[str, str]]:
    source = json.loads(BASE_COUNTRIES.read_text(encoding="utf-8"))
    codes: set[str] = set()
    names: dict[str, str] = {}
    for feature in source["features"]:
        properties = feature.get("properties", {})
        iso3 = properties.get("iso_a3")
        name = properties.get("name")
        if not (isinstance(iso3, str) and len(iso3) == 3 and name):
            continue
        codes.add(iso3)
        key = normalized_name(name)
        if key not in names:
            names[key] = iso3
        elif names[key] != iso3:
            names.pop(key, None)
    aliases = {normalized_name(name): iso3 for name, iso3 in NAME_TO_ISO3.items()}
    for key, iso3 in aliases.items():
        if iso3 is None:
            names.pop(key, None)
        else:
            names[key] = iso3
    return codes, names


def country_share_maps(records: dict[str, dict[int, dict]]) -> tuple[dict, dict[str, dict]]:
    map_codes, names = base_iso3_names()
    source_rows = [
        (place, values[2020])
        for place, values in records.items()
        if 2020 in values and place not in AGGREGATE_PLACES
    ]
    outputs: dict[str, dict] = {}
    coverage: dict[str, dict] = {}
    for key, korean_name in RELIGION_MAPS:
        values: dict[str, float | None] = {iso3: None for iso3 in sorted(map_codes)}
        below: dict[str, str] = {}
        mapped_source_names: set[str] = set()
        for place, row in source_rows:
            iso3 = names.get(normalized_name(place))
            if iso3 in map_codes:
                share = row["groups"][GROUP_INDEX[key]]
                if isinstance(share, Below):
                    below[iso3] = str(share)
                else:
                    values[iso3] = share
                mapped_source_names.add(place)
        outputs[key] = {"year": 2020, "unit": "% of population", "values": values, "below": below, "belowLabel": "0.1% 미만"}
        coverage[key] = {
            "mappedPlaces": len(mapped_source_names),
            "numericValues": sum(value is not None for value in values.values()),
            "nullValues": sum(value is None for value in values.values()),
            "belowValues": len(below),
            "sourcePlaces": len(source_rows),
        }
    return outputs, coverage


def global_share_series(records: dict[str, dict[int, dict]]) -> dict:
    world = records["World"]
    series = []
    for index, (_, label) in enumerate(GROUP_COLUMNS):
        series.append(
            {
                "name": label,
                "values": [world[year]["groups"][index] for year in YEARS],
            }
        )
    return {"unit": "% of world population", "years": YEARS, "series": series}


class JSONLDParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self._in_jsonld = False
        self.blocks: list[str] = []
        self._current: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "script":
            attributes = dict(attrs)
            self._in_jsonld = "ld+json" in (attributes.get("type") or "").lower()
            if self._in_jsonld:
                self._current = []

    def handle_data(self, data: str) -> None:
        if self._in_jsonld:
            self._current.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "script" and self._in_jsonld:
            self.blocks.append("".join(self._current).strip())
            self._current = []
            self._in_jsonld = False


def find_geo(value):
    if isinstance(value, list):
        for child in value:
            result = find_geo(child)
            if result:
                return result
    elif isinstance(value, dict):
        geo = value.get("geo")
        if isinstance(geo, dict) and "latitude" in geo and "longitude" in geo:
            return float(geo["latitude"]), float(geo["longitude"])
        for child in value.values():
            result = find_geo(child)
            if result:
                return result
    return None


def geonames_point_features() -> dict:
    features = []
    for site in SITES:
        url = f"https://www.geonames.org/{site['id']}/{site['slug']}.html"
        parser = JSONLDParser()
        parser.feed(fetch_bytes(url).decode("utf-8", "replace"))
        coordinate = None
        for block in parser.blocks:
            try:
                coordinate = find_geo(json.loads(block))
            except json.JSONDecodeError:
                continue
            if coordinate:
                break
        if not coordinate:
            raise ValueError(f"GeoNames JSON-LD coordinates not found: {url}")
        latitude, longitude = coordinate
        if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
            raise ValueError(f"Invalid WGS84 coordinate in {url}: {coordinate}")
        features.append(
            {
                "type": "Feature",
                "properties": {
                    "name": site["name"],
                    "category": site["category"],
                    "color": site["color"],
                },
                "geometry": {"type": "Point", "coordinates": [longitude, latitude]},
            }
        )
    return {"type": "FeatureCollection", "features": features}


def write_json(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    size = path.stat().st_size
    if size > MAX_BYTES:
        path.unlink(missing_ok=True)
        raise ValueError(f"Output exceeds 1 MB: {path} ({size} bytes)")
    print(f"{path.relative_to(ROOT)}: {size} bytes")


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="religion-02-03-") as temp_dir:
        pdf_path = Path(temp_dir) / "pew-appendix-b.pdf"
        pdf_path.write_bytes(fetch_bytes(PEW_APPENDIX_B_URL))
        records = parse_pew_pdf(pdf_path)

    maps, coverage = country_share_maps(records)
    for key, _ in RELIGION_MAPS:
        write_json(OUT_DIR / f"religion-{key}-share-map.json", maps[key])
    write_json(OUT_DIR / "religion-global-share-series.json", global_share_series(records))
    write_json(OUT_DIR / "religion-sites-points.geojson", geonames_point_features())

    print(f"Pew source places parsed: {len(records)}; retrieval date: {RETRIEVED_AT}")
    for key, _ in RELIGION_MAPS:
        stats = coverage[key]
        print(
            f"{key}: mappedPlaces={stats['mappedPlaces']}/{stats['sourcePlaces']}; "
            f"numeric={stats['numericValues']}; null={stats['nullValues']}"
        )
    for year in YEARS:
        print(
            f"World {year}: Christian={records['World'][year]['groups'][GROUP_INDEX['christian']]}%; "
            f"Muslim={records['World'][year]['groups'][GROUP_INDEX['muslim']]}%; "
            f"Buddhist={records['World'][year]['groups'][GROUP_INDEX['buddhist']]}%; "
            f"Hindu={records['World'][year]['groups'][GROUP_INDEX['hindu']]}%"
        )


if __name__ == "__main__":
    build()
