const SOURCE_USAGE = '참고 링크입니다. 개별 표·이미지·데이터를 재배포하려면 제공기관의 해당 자료 이용 조건을 별도로 확인해야 합니다.';

export const SOURCES = {
  'unesco-gced': {
    title: 'Global Citizenship Education: What You Need to Know',
    organization: 'UNESCO',
    url: 'https://www.unesco.org/en/global-citizenship-peace-education/need-know?hub=84606',
    usage: SOURCE_USAGE,
  },
  'unctad-trade': {
    title: 'Trade Analysis',
    organization: 'UN Trade and Development (UNCTAD)',
    url: 'https://unctad.org/topic/trade-analysis',
    usage: SOURCE_USAGE,
  },
  'eu-history': {
    title: 'History of the European Union',
    organization: 'European Union',
    url: 'https://european-union.europa.eu/principles-countries-history/history-eu_en',
    usage: SOURCE_USAGE,
  },
  'qgis-docs': {
    title: 'QGIS Documentation',
    organization: 'QGIS Project',
    url: 'https://docs.qgis.org/4.4/en/docs/index.html',
    usage: SOURCE_USAGE,
  },
  'nasa-worldview': {
    title: 'NASA Worldview',
    organization: 'NASA Earthdata',
    url: 'https://worldview.earthdata.nasa.gov/',
    usage: SOURCE_USAGE,
  },
  'world-bank-indicators': {
    title: 'World Development Indicators',
    organization: 'World Bank',
    url: 'https://data.worldbank.org/indicator',
    usage: SOURCE_USAGE,
  },
  'wmo-climate': {
    title: 'Climate',
    organization: 'World Meteorological Organization (WMO)',
    url: 'https://wmo.int/themes/climate',
    usage: SOURCE_USAGE,
  },
  'usgs-tectonics': {
    title: 'What is an earthquake and what causes them to happen?',
    organization: 'U.S. Geological Survey (USGS)',
    url: 'https://www.usgs.gov/faqs/what-earthquake-and-what-causes-them-happen',
    usage: SOURCE_USAGE,
  },
  'unesco-ich': {
    title: 'What is Intangible Cultural Heritage?',
    organization: 'UNESCO Intangible Cultural Heritage',
    url: 'https://ich.unesco.org/en/what-is-intangible-heritage-00003?lang=en',
    usage: SOURCE_USAGE,
  },
  'pew-religion': {
    title: 'Religion Research',
    organization: 'Pew Research Center',
    url: 'https://www.pewresearch.org/religion/',
    usage: SOURCE_USAGE,
  },
  'un-desawpp': {
    title: 'World Population Prospects',
    organization: 'UN Department of Economic and Social Affairs',
    url: 'https://population.un.org/wpp/',
    usage: SOURCE_USAGE,
  },
  'iom-migration': {
    title: 'Migration Data Portal',
    organization: 'International Organization for Migration (IOM)',
    url: 'https://www.migrationdataportal.org/',
    usage: SOURCE_USAGE,
  },
  'fao-faostat': {
    title: 'FAOSTAT: Food and Agriculture Data',
    organization: 'Food and Agriculture Organization of the United Nations (FAO)',
    url: 'https://www.fao.org/faostat/en/',
    usage: SOURCE_USAGE,
  },
  'wfp-food': {
    title: 'The State of Food Security and Nutrition in the World',
    organization: 'World Food Programme (WFP)',
    url: 'https://www.wfp.org/publications/state-food-security-and-nutrition-world-sofi-report',
    usage: SOURCE_USAGE,
  },
  'iea-data': {
    title: 'Energy Statistics Data Browser',
    organization: 'International Energy Agency (IEA)',
    url: 'https://www.iea.org/data-and-statistics/data-tools/energy-statistics-data-browser',
    usage: SOURCE_USAGE,
  },
  'irena-statistics': {
    title: 'Renewable Energy Statistics Data Tools',
    organization: 'International Renewable Energy Agency (IRENA)',
    url: 'https://www.irena.org/Data/Downloads/Tools',
    usage: SOURCE_USAGE,
  },
  'ipcc-reports': {
    title: 'IPCC Reports',
    organization: 'Intergovernmental Panel on Climate Change (IPCC)',
    url: 'https://www.ipcc.ch/reports/',
    usage: SOURCE_USAGE,
  },
  unep: {
    title: 'Environment Topics',
    organization: 'UN Environment Programme (UNEP)',
    url: 'https://www.unep.org/explore-topics/biodiversity-and-ecosystem-services',
    usage: SOURCE_USAGE,
  },
  ucdp: {
    title: 'Dataset Download Center',
    organization: 'Uppsala Conflict Data Program (UCDP)',
    url: 'https://ucdp.uu.se/downloads/',
    usage: SOURCE_USAGE,
  },
  'un-peacebuilding': {
    title: 'Peacebuilding Support Office',
    organization: 'United Nations',
    url: 'https://www.un.org/peacebuilding/',
    usage: SOURCE_USAGE,
  },
};

export function resolveSources(ids = []) {
  return ids.map((id) => SOURCES[id]).filter(Boolean);
}
