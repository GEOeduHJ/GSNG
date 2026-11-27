#!/usr/bin/env python3
"""Build UNESCO festival/ritual points and Mediterranean-diet country data."""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

RETRIEVED_AT = "2026-11-26"
ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "public/data/02-04"
BASE_COUNTRIES = ROOT / "public/data/base/countries-110m.geojson"
MAX_BYTES = 1_000_000
GEONAMES_LICENSE_URL = "https://www.geonames.org/export/"
UNESCO_TERMS_URL = "https://ich.unesco.org/doc/src/66216-EN.pdf"

COLORS = {
    "아시아": "#D95F59",
    "유럽": "#3B6FB6",
    "아프리카": "#C18A22",
    "아메리카": "#4C9076",
}

# Coordinates are WGS84 points for the representative place in the last column.
# UNESCO facts are the element name and Representative List inscription year.
FESTIVALS = [
    {
        "name": "강릉단오제",
        "category": "아시아",
        "inscribed": 2008,
        "country": "대한민국",
        "place": "강릉",
        "geonames_id": 1843137,
        "coordinates": [128.87239, 37.75266],
        "unesco_url": "https://ich.unesco.org/en/RL/gangneung-danoje-festival-00114",
    },
    {
        "name": "종묘제례 및 종묘제례악",
        "category": "아시아",
        "inscribed": 2008,
        "country": "대한민국",
        "place": "종묘, 서울",
        "geonames_id": 6800593,
        "coordinates": [126.99387, 37.57492],
        "unesco_url": "https://ich.unesco.org/en/RL/00016",
    },
    {
        "name": "푸동·속 사원의 지옹 축제",
        "category": "아시아",
        "inscribed": 2010,
        "country": "베트남",
        "place": "푸동, 하노이",
        "geonames_id": 1570639,
        "coordinates": [105.96315, 21.05709],
        "unesco_url": "https://ich.unesco.org/en/RL/ging-festival-of-ph-ng-and-sc-temples-00443",
    },
    {
        "name": "파헬라 바이샤흐의 망갈 쇼바자트라",
        "category": "아시아",
        "inscribed": 2016,
        "country": "방글라데시",
        "place": "다카 대학교",
        "geonames_id": 8985943,
        "coordinates": [90.3925, 23.73155],
        "unesco_url": "https://ich.unesco.org/en/RL/mangal-shobhajatra-on-pahela-baishakh-01091",
    },
    {
        "name": "몽골 전통 나담 축제",
        "category": "아시아",
        "inscribed": 2010,
        "country": "몽골",
        "place": "울란바토르(대표 도시)",
        "geonames_id": 2028462,
        "coordinates": [106.88324, 47.90771],
        "unesco_url": "https://ich.unesco.org/en/RL/naadam-mongolian-traditional-festival-00395",
    },
    {
        "name": "라마야나 전통 공연 라밀라",
        "category": "아시아",
        "inscribed": 2008,
        "country": "인도",
        "place": "라마나가르, 바라나시",
        "geonames_id": 1258642,
        "coordinates": [83.02971, 25.26907],
        "unesco_url": "https://ich.unesco.org/en/RL/ramlila-the-traditional-performance-of-the-ramayana-00110",
    },
    {
        "name": "두브로브니크의 성 블라시오 축제",
        "category": "유럽",
        "inscribed": 2009,
        "country": "크로아티아",
        "place": "두브로브니크",
        "geonames_id": 3201047,
        "coordinates": [18.10909, 42.64125],
        "unesco_url": "https://ich.unesco.org/en/RL/festivity-of-saint-blaise-the-patron-of-dubrovnik-00232",
    },
    {
        "name": "베르가의 파툼",
        "category": "유럽",
        "inscribed": 2008,
        "country": "스페인",
        "place": "베르가",
        "geonames_id": 3128201,
        "coordinates": [1.84628, 42.10429],
        "unesco_url": "https://ich.unesco.org/en/RL/patum-of-berga-00156",
    },
    {
        "name": "빈슈 카니발",
        "category": "유럽",
        "inscribed": 2008,
        "country": "벨기에",
        "place": "빈슈",
        "geonames_id": 2801922,
        "coordinates": [4.16469, 50.41155],
        "unesco_url": "https://ich.unesco.org/en/RL/carnival-of-binche-00033",
    },
    {
        "name": "드자네트 오아시스 세베이바 의례와 의식",
        "category": "아프리카",
        "inscribed": 2014,
        "country": "알제리",
        "place": "드자네트",
        "geonames_id": 2500275,
        "coordinates": [9.485, 24.55528],
        "unesco_url": "https://ich.unesco.org/en/RL/ritual-and-ceremonies-of-sebeiba-in-the-oasis-of-djanet-algeria-00665",
    },
    {
        "name": "아르군구 국제 낚시·문화 축제",
        "category": "아프리카",
        "inscribed": 2016,
        "country": "나이지리아",
        "place": "아르군구",
        "geonames_id": 2349431,
        "coordinates": [4.52514, 12.74482],
        "unesco_url": "https://ich.unesco.org/en/RL/argungu-international-fishing-and-cultural-festival-00901",
    },
    {
        "name": "치아파 데 코르소 1월 축제의 파라치코스",
        "category": "아메리카",
        "inscribed": 2010,
        "country": "멕시코",
        "place": "치아파 데 코르소",
        "geonames_id": 3531013,
        "coordinates": [-93.01216, 16.7075],
        "unesco_url": "https://ich.unesco.org/en/RL/festivity-of-las-parachicos-in-the-traditional-january-feast-of-chiapa-de-corzo-00399",
    },
    {
        "name": "엘 칼라오 카니발",
        "category": "아메리카",
        "inscribed": 2016,
        "country": "베네수엘라",
        "place": "엘 칼라오",
        "geonames_id": 3644022,
        "coordinates": [-61.82684, 7.34706],
        "unesco_url": "https://ich.unesco.org/en/RL/carnival-of-el-callao-a-festive-representation-of-a-memory-and-cultural-identity-01198",
    },
    {
        "name": "코일루리티 주님 성지 순례",
        "category": "아메리카",
        "inscribed": 2011,
        "country": "페루",
        "place": "코일루리티 성지 일대",
        "geonames_id": 12212526,
        "coordinates": [-71.87831, -14.28603],
        "unesco_url": "https://ich.unesco.org/en/RL/pilgrimage-to-the-sanctuary-of-the-lord-of-qoyllurriti-00567",
    },
    {
        "name": "오루로 카니발",
        "category": "아메리카",
        "inscribed": 2008,
        "country": "볼리비아",
        "place": "오루로",
        "geonames_id": 3909234,
        "coordinates": [-67.0932, -17.97153],
        "unesco_url": "https://ich.unesco.org/en/RL/carnival-of-oruro-00003",
    },
]

MEDITERRANEAN_DIET_COUNTRIES = {
    "CYP": "키프로스",
    "HRV": "크로아티아",
    "ESP": "스페인",
    "GRC": "그리스",
    "ITA": "이탈리아",
    "MAR": "모로코",
    "PRT": "포르투갈",
}
MEDITERRANEAN_DIET_URL = "https://ich.unesco.org/en/RL/mediterranean-diet-00884"

# These are four selected national entries, not a complete inventory of food heritage.
NATIONAL_FOOD_PRACTICES = {
    "FRA": "프랑스 미식 식사",
    "MEX": "멕시코 전통 요리 문화",
    "JPN": "와쇼쿠",
    "KOR": "김장 문화",
}

# One primary teaching theme is assigned to each example. UNESCO does not use these
# categories, and the categories do not claim that a festival has only one meaning.
FESTIVAL_THEMES = [
    {
        "name": "계절·달력",
        "elements": ["강릉단오제", "파헬라 바이샤흐의 망갈 쇼바자트라"],
    },
    {
        "name": "종교·의례",
        "elements": ["종묘제례 및 종묘제례악", "두브로브니크의 성 블라시오 축제"],
    },
    {"name": "역사·공동체 기억", "elements": ["엘 칼라오 카니발"]},
    {"name": "생업·환경", "elements": ["아르군구 국제 낚시·문화 축제"]},
]


def write_json(path: Path, payload: dict, compact: bool = False) -> None:
    if compact:
        text = json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n"
    else:
        text = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
    encoded = text.encode("utf-8")
    if len(encoded) >= MAX_BYTES:
        raise RuntimeError(f"Output exceeds 1 MB: {path.name} ({len(encoded)} bytes)")
    path.write_bytes(encoded)


def build_festival_points() -> None:
    features = []
    for festival in FESTIVALS:
        features.append(
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": festival["coordinates"],
                },
                "properties": {
                    "name": festival["name"],
                    "category": festival["category"],
                    "color": COLORS[festival["category"]],
                    "inscribed": festival["inscribed"],
                },
            }
        )
    write_json(OUT_DIR / "festival-rituals-points.geojson", {"type": "FeatureCollection", "features": features}, compact=True)

    counts = Counter(festival["inscribed"] for festival in FESTIVALS)
    write_json(
        OUT_DIR / "festival-inscribed-years.json",
        {
            "unit": "개 (이 파일에 수록한 15개 종목만 집계)",
            "rows": [{"year": year, "value": counts[year]} for year in range(2008, 2017)],
        },
    )


def build_mediterranean_map() -> None:
    base = json.loads(BASE_COUNTRIES.read_text(encoding="utf-8"))
    iso3s = sorted(
        feature["properties"]["iso_a3"]
        for feature in base["features"]
        if feature["properties"].get("iso_a3")
    )
    payload = {
        "year": 2013,
        "unit": "유네스코 지중해 식생활 다국적 공동 등재국이면 1, 아니면 0",
        "values": {iso3: int(iso3 in MEDITERRANEAN_DIET_COUNTRIES) for iso3 in iso3s},
    }
    write_json(OUT_DIR / "mediterranean-diet-countries-map.json", payload)
    write_json(
        OUT_DIR / "mediterranean-diet-country-table.json",
        {
            "year": 2013,
            "rows": [
                {"country": name, "iso3": iso3, "inscribed": 2013}
                for iso3, name in MEDITERRANEAN_DIET_COUNTRIES.items()
            ],
        },
    )


def build_national_food_practices_map() -> None:
    base = json.loads(BASE_COUNTRIES.read_text(encoding="utf-8"))
    iso3s = sorted(
        feature["properties"]["iso_a3"]
        for feature in base["features"]
        if feature["properties"].get("iso_a3")
    )
    missing = sorted(set(NATIONAL_FOOD_PRACTICES) - set(iso3s))
    if missing:
        raise ValueError(f"Selected UNESCO food-practice countries missing from base map: {missing}")
    write_json(
        OUT_DIR / "unesco-national-food-practices-map.json",
        {
            "year": None,
            "period": "2010–2013년 등재 사례",
            "unit": "선정한 음식 문화 종목의 등재 국가이면 1, 그 밖의 지도 코드는 null",
            "values": {
                iso3: 1 if iso3 in NATIONAL_FOOD_PRACTICES else None
                for iso3 in iso3s
            },
        },
    )


def build_festival_theme_counts() -> None:
    festival_names = {festival["name"] for festival in FESTIVALS}
    selected_names = {
        name for theme in FESTIVAL_THEMES for name in theme["elements"]
    }
    missing = sorted(selected_names - festival_names)
    if missing:
        raise ValueError(f"Festival themes reference unknown items: {missing}")
    if len(selected_names) != 6:
        raise ValueError(f"Expected six selected festival items, got {len(selected_names)}")
    write_json(
        OUT_DIR / "festival-theme-counts.json",
        {
            "year": None,
            "unit": "개 (선정한 축제·의례 6종목의 중심 주제 분류)",
            "rows": [
                {"name": theme["name"], "value": len(theme["elements"])}
                for theme in FESTIVAL_THEMES
            ],
        },
    )


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    if len(FESTIVALS) != 15:
        raise RuntimeError(f"Expected 15 curated festival/ritual items, got {len(FESTIVALS)}")
    build_festival_points()
    build_mediterranean_map()
    build_national_food_practices_map()
    build_festival_theme_counts()
    print(f"Retrieved at: {RETRIEVED_AT}")
    print(f"Built {len(FESTIVALS)} UNESCO festival/ritual points.")
    print("Selected-item counts by inscription year:", dict(sorted(Counter(f['inscribed'] for f in FESTIVALS).items())))
    print(f"Mediterranean diet joint inscription countries: {', '.join(MEDITERRANEAN_DIET_COUNTRIES)}")
    print(f"Selected national food-practice countries: {', '.join(NATIONAL_FOOD_PRACTICES)}")
    print("Selected festival primary-theme counts:", {row["name"]: row["value"] for row in [
        {"name": theme["name"], "value": len(theme["elements"])} for theme in FESTIVAL_THEMES
    ]})
    print(f"GeoNames license: {GEONAMES_LICENSE_URL}")
    print(f"UNESCO use conditions: {UNESCO_TERMS_URL}")


if __name__ == "__main__":
    main()
