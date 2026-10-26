/**
 * 시연용 더미 데이터 — 07.24 중간보고 시나리오 (엑셀 기반)
 *
 * 실제 수집 파이프라인·DB를 건드리지 않고, api-client.ts에서만 병합해
 * Daily News · Explorer MAP에 노출하기 위한 더미. 원본은 poc-a/data/시연용/ 3개 엑셀.
 *   - 뉴스db-타임라인.xlsx "뉴스 전체"  → DEMO_NEWS (카테고리 카드 + Explorer)
 *   - 동 파일 "복합리스크_타임라인"      → DEMO_GROUPS (AI 핵심 인사이트 3그룹)
 *   - 자재가설.xlsx / 협력사가설.xlsx    → DEMO_TAG_DETAIL(태그 팝업 표) + DEMO_ENTITIES(지도 마커)
 *
 * ⚠️ 시연 종료 후 이 파일과 api-client.ts의 병합 분기를 제거하면 원복된다.
 */
import type { NewsItem, NewsGroup, SupplyEntity, AdminGroup, TagRef, TagType, TagSupplyChain, SupplyRef } from './types'

// ─── 공급망 거점(협력사) 마커 — 좌표는 협력사가설.xlsx 원본 ─────────────────────
// 호르무즈/홍해/수에즈 결절점은 dummy-iran.ts의 DUMMY_IRAN_ENTITIES를 재사용한다.
export const DEMO_ENTITIES: SupplyEntity[] = [
  {
    id: 'demo-sk-specialty', name: 'SK Specialty Co., Ltd.', nameKo: 'SK스페셜티',
    type: 'supplier', tier: 1, category: '특수가스 (NF3·헬륨)', country: '한국', city: '경북',
    lat: 36.8057, lng: 128.624, criticality: 'high', status: 'watch',
    products: ['고순도 헬륨', '삼불화질소(NF3)', '특수가스'], activeRiskIds: ['demo-020', 'demo-057'],
  },
  {
    id: 'demo-wonik-materials', name: 'WONIK Materials Co., Ltd.', nameKo: '원익머트리얼즈',
    type: 'supplier', tier: 1, category: '특수가스', country: '한국', city: '충북',
    lat: 36.6424, lng: 127.489, criticality: 'high', status: 'watch',
    products: ['고순도 헬륨', '특수가스', '전자재료'], activeRiskIds: ['demo-020'],
  },
  {
    id: 'demo-air-liquide', name: 'Air Liquide S.A.', nameKo: '에어리퀴드',
    type: 'supplier', tier: 1, category: '산업가스 (헬륨)', country: '프랑스', city: '일드프랑스',
    lat: 48.8566, lng: 2.3522, criticality: 'high', status: 'watch',
    products: ['고순도 헬륨', '산업용 가스'], activeRiskIds: ['demo-020', 'demo-022'],
  },
  {
    id: 'demo-linde', name: 'Linde plc', nameKo: '린데',
    type: 'supplier', tier: 1, category: '산업가스 (헬륨)', country: '영국', city: '서리',
    lat: 51.2362, lng: -0.5704, criticality: 'medium', status: 'normal',
    products: ['고순도 헬륨', '산업용 가스'], activeRiskIds: [],
  },
  {
    id: 'demo-asml', name: 'ASML Holding N.V.', nameKo: 'ASML',
    type: 'supplier', tier: 1, category: 'EUV 노광장비', country: '네덜란드', city: '노르트브라반트',
    lat: 51.4231, lng: 5.4623, criticality: 'high', status: 'watch',
    products: ['EUV 노광장비', 'DUV 노광장비'], activeRiskIds: ['demo-050'],
  },
  {
    id: 'demo-jsr', name: 'JSR Corporation', nameKo: 'JSR',
    type: 'supplier', tier: 1, category: '포토레지스트', country: '일본', city: '도쿄',
    lat: 35.6762, lng: 139.6503, criticality: 'high', status: 'watch',
    products: ['EUV 포토레지스트', 'ArF 포토레지스트'], activeRiskIds: ['demo-005', 'demo-006'],
  },
  {
    id: 'demo-entegris', name: 'Entegris, Inc.', nameKo: '엔테그리스',
    type: 'supplier', tier: 2, category: '소재·필터·용기', country: '미국', city: '매사추세츠',
    lat: 42.4851, lng: -71.4328, criticality: 'medium', status: 'normal',
    products: ['공정 소재', '필터', '가스 용기'], activeRiskIds: ['demo-005'],
  },
  {
    id: 'demo-amkor', name: 'Amkor Technology, Inc.', nameKo: '앰코테크놀로지',
    type: 'supplier', tier: 1, category: '반도체 패키징·테스트', country: '미국', city: '애리조나',
    lat: 33.4484, lng: -112.074, criticality: 'medium', status: 'normal',
    products: ['첨단 패키징', '테스트'], activeRiskIds: ['demo-004'],
  },
  {
    id: 'demo-wonik-ips', name: 'WONIK IPS Co., Ltd.', nameKo: '원익IPS',
    type: 'supplier', tier: 1, category: '증착·열처리 장비', country: '한국', city: '경기',
    lat: 37.0078, lng: 127.2797, criticality: 'medium', status: 'normal',
    products: ['증착 장비', '열처리 장비'], activeRiskIds: ['demo-002'],
  },
  {
    id: 'demo-yest', name: 'YEST Co., Ltd.', nameKo: '예스티',
    type: 'supplier', tier: 2, category: '열처리·고압어닐링 장비', country: '한국', city: '경기',
    lat: 37.0078, lng: 127.2797, criticality: 'low', status: 'normal',
    products: ['고압어닐링 장비', '열처리 장비'], activeRiskIds: ['demo-003'],
  },
  {
    id: 'demo-foosung', name: 'Foosung Co., Ltd.', nameKo: '후성',
    type: 'supplier', tier: 2, category: '불소계 특수가스·소재', country: '한국', city: '경기',
    lat: 37.2636, lng: 127.0286, criticality: 'medium', status: 'normal',
    products: ['불화수소', '불소계 가스'], activeRiskIds: [],
  },
  {
    id: 'demo-soulbrain', name: 'Soulbrain Co., Ltd.', nameKo: '솔브레인',
    type: 'supplier', tier: 1, category: '식각액·불화수소', country: '한국', city: '경기',
    lat: 37.3943, lng: 127.1112, criticality: 'medium', status: 'normal',
    products: ['고순도 불화수소', '식각액', 'CMP 슬러리'], activeRiskIds: [],
  },
  {
    id: 'demo-shinetsu', name: 'Shin-Etsu Chemical Co., Ltd.', nameKo: '신에츠화학',
    type: 'supplier', tier: 1, category: '실리콘 웨이퍼·소재', country: '일본', city: '도쿄',
    lat: 35.6762, lng: 139.6503, criticality: 'high', status: 'normal',
    products: ['실리콘 웨이퍼', '디클로로실란', '포토레지스트'], activeRiskIds: [],
  },
  // ── 신규 시나리오(S1~S4)용 거점 ──────────────────────────────────────────────
  {
    id: 'demo-lg-chem', name: 'LG Chem, Ltd.', nameKo: 'LG화학',
    type: 'supplier', tier: 1, category: '석유화학·용제 (나프타·PGMEA)', country: '한국', city: '전남 여수',
    lat: 34.7604, lng: 127.6622, criticality: 'high', status: 'watch',
    products: ['나프타', 'PGMEA 용제', '폴리머'], activeRiskIds: [],
  },
  {
    id: 'demo-qatar-helium', name: 'Ras Laffan Industrial City', nameKo: '카타르 라스라판 가스단지',
    type: 'site', tier: 1, category: '헬륨·LNG 생산 거점', country: '카타르', city: '라스라판',
    lat: 25.9028, lng: 51.5333, criticality: 'high', status: 'disrupted',
    products: ['고순도 헬륨', 'LNG'], activeRiskIds: [],
  },
  {
    id: 'demo-china-mineral', name: 'China Critical Minerals Hub', nameKo: '중국 핵심광물 가공거점',
    type: 'site', tier: 2, category: '희토류·갈륨·텅스텐·WF6', country: '중국', city: '장시·장수',
    lat: 28.6820, lng: 115.8579, criticality: 'high', status: 'watch',
    products: ['희토류', '갈륨', '텅스텐', '육불화텅스텐(WF6)'], activeRiskIds: [],
  },
  {
    id: 'demo-tokyo-electron', name: 'Tokyo Electron Ltd.', nameKo: '도쿄일렉트론',
    type: 'supplier', tier: 1, category: '식각·증착 장비', country: '일본', city: '도쿄',
    lat: 35.6895, lng: 139.6917, criticality: 'high', status: 'watch',
    products: ['식각 장비', '증착 장비', '코터·디벨로퍼'], activeRiskIds: [],
  },
  {
    id: 'demo-samsung-xian', name: 'Samsung Xi\'an Fab', nameKo: '삼성 시안 NAND 팹',
    type: 'site', tier: 1, category: 'NAND 플래시 생산 (중국)', country: '중국', city: '시안',
    lat: 34.3416, lng: 108.9398, criticality: 'high', status: 'watch',
    products: ['NAND 플래시'], activeRiskIds: [],
  },
  {
    id: 'demo-sk-wuxi', name: 'SK hynix Wuxi Fab', nameKo: 'SK하이닉스 우시 DRAM 팹',
    type: 'site', tier: 1, category: 'DRAM 생산 (중국)', country: '중국', city: '우시',
    lat: 31.4912, lng: 120.3119, criticality: 'high', status: 'watch',
    products: ['DRAM'], activeRiskIds: [],
  },
]

// ─── 뉴스 상세 "리스크 태그" 공급망 연계 (news-overlay 클릭 → 협력사/자재 드롭다운) ──
// 이란 더미(tagRefs + DUMMY_TAG_SUPPLY)와 동일 패턴. relatedEntityIds를 클릭 가능한
// 태그로 변환하고, 클릭 시 해당 거점의 공급망 정보(TagSupplyChain)를 반환한다.
// 재사용하는 이란 물류 결절점(호르무즈/홍해/수에즈)은 SITE 태그로 취급한다.
// 물류 결절점(SITE 태그) — 자기 자신(sites) + 그 길목을 지나는 협력사/자재/원재료 4그룹.
// 실제 백엔드 SITE 태그처럼 4그룹을 채워, 결절점 클릭 시 연관 공급망이 함께 드롭다운되게 한다.
const IRAN_HUB_META: Record<
  string,
  { nameKo: string; country: string; supplierIds: string[]; materials: SupplyRef[]; rawMaterials: SupplyRef[] }
> = {
  'hormuz-strait': {
    nameKo: '호르무즈 해협', country: 'Iran / Oman',
    supplierIds: ['demo-air-liquide', 'demo-sk-specialty', 'demo-wonik-materials'],
    materials: [{ code: '1601-000009', nameKo: '고순도 헬륨' }, { code: '1601-000008', nameKo: '고순도 아르곤' }],
    rawMaterials: [{ code: 'RM-HE-01', nameKo: '조헬륨(Crude Helium)' }, { code: 'RM-CRUDE-01', nameKo: '카타르산 원유' }],
  },
  'redsea-babelmandeb': {
    nameKo: '홍해·바브엘만데브', country: 'Yemen',
    supplierIds: ['demo-asml', 'demo-jsr'],
    materials: [{ code: '1201-000001', nameKo: 'EUV 포토레지스트' }],
    rawMaterials: [{ code: 'RM-CRUDE-01', nameKo: '중동산 원유' }],
  },
  'suez-canal': {
    nameKo: '수에즈 운하', country: 'Egypt',
    supplierIds: ['demo-asml', 'demo-linde'],
    materials: [],
    rawMaterials: [{ code: 'RM-CRUDE-01', nameKo: '중동산 원유' }],
  },
}

// 협력사 제품(products) 명칭 → 자재가설.xlsx material_code. 실제 표의 코드를 그대로 인용.
const MATERIAL_CODE: Record<string, string> = {
  '고순도 헬륨': '1601-000009',
  '고순도 아르곤': '1601-000008',
  '삼불화질소(NF3)': '1301-000003',
  '삼불화질소': '1301-000003',
  '불화수소': '1301-000001',
  '고순도 불화수소': '1301-000001',
  'EUV 포토레지스트': '1201-000001',
  'ArF 포토레지스트': '1201-000002',
  '포토레지스트': '1201-000001',
  '실리콘 웨이퍼': '1101-000001',
  'CMP 슬러리': '1801-000001',
  '실리카 CMP 슬러리': '1801-000001',
  '디클로로실란': '1301-000005',
  '나프타': '1901-000001',
  'PGMEA 용제': '1201-000005',
  'LNG': '1902-000001',
  '육불화텅스텐(WF6)': '1301-000006',
  '희토류': '2001-000001',
  '갈륨': '2001-000002',
  '텅스텐': '2001-000003',
}

// 협력사별 생산지(site) + 원재료(rawMaterials) — 4그룹을 실제 백엔드 응답처럼 채우기 위한 더미.
// 자재(materials)는 products에서 파생하므로 여기엔 site·rawMaterials만 명시한다.
const ENTITY_CHAIN_EXT: Record<string, { sites: SupplyRef[]; rawMaterials: SupplyRef[] }> = {
  'demo-sk-specialty': {
    sites: [{ code: 'SITE-SKS-01', nameKo: 'SK스페셜티 영주 특수가스 플랜트', country: '한국', region: '경북 영주' }],
    rawMaterials: [{ code: 'RM-HE-01', nameKo: '조헬륨(Crude Helium)' }, { code: 'RM-N2F-01', nameKo: '불소·질소 원료가스' }],
  },
  'demo-wonik-materials': {
    sites: [{ code: 'SITE-WNM-01', nameKo: '원익머트리얼즈 청주 가스정제 플랜트', country: '한국', region: '충북 청주' }],
    rawMaterials: [{ code: 'RM-HE-01', nameKo: '조헬륨(Crude Helium)' }, { code: 'RM-SPG-01', nameKo: '특수가스 원료' }],
  },
  'demo-air-liquide': {
    sites: [{ code: 'SITE-AL-01', nameKo: 'Air Liquide 헬륨 정제 거점', country: '프랑스', region: '일드프랑스' }],
    rawMaterials: [{ code: 'RM-HE-02', nameKo: '천연가스 부생 헬륨' }],
  },
  'demo-linde': {
    sites: [{ code: 'SITE-LN-01', nameKo: 'Linde 산업가스 분리 플랜트', country: '영국', region: '서리' }],
    rawMaterials: [{ code: 'RM-HE-02', nameKo: '천연가스 부생 헬륨' }],
  },
  'demo-asml': {
    sites: [{ code: 'SITE-ASML-01', nameKo: 'ASML Veldhoven 노광장비 조립', country: '네덜란드', region: '노르트브라반트' }],
    rawMaterials: [{ code: 'RM-OPT-01', nameKo: '초정밀 광학 모듈' }],
  },
  'demo-jsr': {
    sites: [{ code: 'SITE-JSR-01', nameKo: 'JSR 포토레지스트 합성 공장', country: '일본', region: '도쿄' }],
    rawMaterials: [{ code: 'RM-PR-01', nameKo: '포토레지스트 폴리머 수지' }, { code: 'RM-PAG-01', nameKo: '광산발생제(PAG)' }],
  },
  'demo-entegris': {
    sites: [{ code: 'SITE-ETG-01', nameKo: 'Entegris 소재·필터 제조 거점', country: '미국', region: '매사추세츠' }],
    rawMaterials: [{ code: 'RM-FLT-01', nameKo: '고분자 필터 멤브레인 원료' }],
  },
  'demo-amkor': {
    sites: [{ code: 'SITE-AMK-01', nameKo: 'Amkor 애리조나 첨단 패키징', country: '미국', region: '애리조나' }],
    rawMaterials: [{ code: 'RM-EMC-01', nameKo: '에폭시 몰딩 컴파운드 원료' }],
  },
  'demo-wonik-ips': {
    sites: [{ code: 'SITE-WIP-01', nameKo: '원익IPS 평택 장비 제조', country: '한국', region: '경기 평택' }],
    rawMaterials: [{ code: 'RM-CMP-01', nameKo: '장비용 정밀 부품' }],
  },
  'demo-yest': {
    sites: [{ code: 'SITE-YST-01', nameKo: '예스티 열처리 장비 제조', country: '한국', region: '경기' }],
    rawMaterials: [{ code: 'RM-CMP-01', nameKo: '장비용 정밀 부품' }],
  },
  'demo-foosung': {
    sites: [{ code: 'SITE-FSG-01', nameKo: '후성 울산 불소계 소재 공장', country: '한국', region: '경기' }],
    rawMaterials: [{ code: 'RM-FLR-01', nameKo: '형석(불소 원료)' }],
  },
  'demo-soulbrain': {
    sites: [{ code: 'SITE-SLB-01', nameKo: '솔브레인 공주 전자재료 공장', country: '한국', region: '경기' }],
    rawMaterials: [{ code: 'RM-FLR-01', nameKo: '형석(불소 원료)' }, { code: 'RM-SLC-01', nameKo: '고순도 실리카 원료' }],
  },
  'demo-shinetsu': {
    sites: [{ code: 'SITE-SEC-01', nameKo: 'Shin-Etsu 실리콘 웨이퍼 공장', country: '일본', region: '후쿠시마' }],
    rawMaterials: [{ code: 'RM-POLY-01', nameKo: '폴리실리콘' }, { code: 'RM-SLC-01', nameKo: '고순도 실리카 원료' }],
  },
  'demo-lg-chem': {
    sites: [{ code: 'SITE-LGC-01', nameKo: 'LG화학 여수 NCC·용제 플랜트', country: '한국', region: '전남 여수' }],
    rawMaterials: [{ code: 'RM-NAP-01', nameKo: '나프타' }, { code: 'RM-PO-01', nameKo: '프로필렌옥사이드' }],
  },
  'demo-qatar-helium': {
    sites: [{ code: 'SITE-QAT-01', nameKo: '라스라판 헬륨·LNG 플랜트', country: '카타르', region: '라스라판' }],
    rawMaterials: [{ code: 'RM-HE-01', nameKo: '조헬륨(Crude Helium)' }, { code: 'RM-NG-01', nameKo: '천연가스' }],
  },
  'demo-china-mineral': {
    sites: [{ code: 'SITE-CNM-01', nameKo: '중국 희토류·갈륨 정련단지', country: '중국', region: '장시' }],
    rawMaterials: [{ code: 'RM-REE-01', nameKo: '희토류 정광' }, { code: 'RM-TNG-01', nameKo: '텅스텐 정광' }],
  },
  'demo-tokyo-electron': {
    sites: [{ code: 'SITE-TEL-01', nameKo: '도쿄일렉트론 장비 제조', country: '일본', region: '야마나시' }],
    rawMaterials: [{ code: 'RM-CMP-01', nameKo: '장비용 정밀 부품' }, { code: 'RM-YTR-01', nameKo: '이트륨 코팅 소재' }],
  },
  'demo-samsung-xian': {
    sites: [{ code: 'SITE-XIAN-01', nameKo: '삼성 시안 NAND 생산라인', country: '중국', region: '시안' }],
    rawMaterials: [{ code: 'RM-WF6-01', nameKo: '육불화텅스텐(WF6)' }],
  },
  'demo-sk-wuxi': {
    sites: [{ code: 'SITE-WUXI-01', nameKo: 'SK하이닉스 우시 DRAM 생산라인', country: '중국', region: '우시' }],
    rawMaterials: [{ code: 'RM-WF6-01', nameKo: '육불화텅스텐(WF6)' }],
  },
}

type EntityTagMeta = { tagId: string; tagName: string; tagType: TagType; chain: TagSupplyChain }
const ENTITY_TAG_META: Record<string, EntityTagMeta> = {}

for (const e of DEMO_ENTITIES) {
  const tagId = `demo-tag-${e.id}`
  const self: SupplyRef = { code: e.id, nameKo: e.nameKo, nameEng: e.name, country: e.country, region: e.city }
  const ext = ENTITY_CHAIN_EXT[e.id] ?? { sites: [], rawMaterials: [] }
  // products → 자재(코드 매핑되면 코드, 아니면 명칭). 장비는 코드가 없어 명칭만.
  const materials: SupplyRef[] = e.products.map((p) => ({ code: MATERIAL_CODE[p] ?? p, nameKo: p }))
  ENTITY_TAG_META[e.id] = {
    tagId, tagName: e.nameKo, tagType: 'SUPPLIER',
    chain: {
      tagId, tagType: 'SUPPLIER', tagName: e.nameKo,
      suppliers: [self],
      sites: ext.sites,
      materials,
      rawMaterials: ext.rawMaterials,
    },
  }
}
for (const [id, hub] of Object.entries(IRAN_HUB_META)) {
  const tagId = `demo-tag-${id}`
  const self: SupplyRef = { code: id, nameKo: hub.nameKo, country: hub.country }
  const suppliers: SupplyRef[] = hub.supplierIds
    .map((sid) => DEMO_ENTITIES.find((e) => e.id === sid))
    .filter((e): e is SupplyEntity => Boolean(e))
    .map((e) => ({ code: e.id, nameKo: e.nameKo, nameEng: e.name, country: e.country, region: e.city }))
  ENTITY_TAG_META[id] = {
    tagId, tagName: hub.nameKo, tagType: 'SITE',
    chain: {
      tagId, tagType: 'SITE', tagName: hub.nameKo,
      suppliers,
      sites: [self],
      materials: hub.materials,
      rawMaterials: hub.rawMaterials,
    },
  }
}

// ─── 뉴스 골격 → NewsItem 변환 빌더 ──────────────────────────────────────────────
type DemoRow = {
  id: string
  title: string
  source: string
  date: string // YYYY-MM-DD
  category: NewsItem['category']
  severity: NewsItem['severity']
  region: string
  summary: string
  keywords: string[]
  tags: string[]
  impact: number
  url: string
  entities?: string[]
  why?: string
}

function mk(r: DemoRow): NewsItem {
  // 연관 거점 → 클릭 가능한 공급망 태그(SUPPLIER/SITE), 그 외 라벨 → 비링크 EVENT 태그
  const linkableRefs: TagRef[] = (r.entities ?? [])
    .filter((id) => ENTITY_TAG_META[id])
    .map((id) => {
      const m = ENTITY_TAG_META[id]
      return { tagId: m.tagId, tagName: m.tagName, tagType: m.tagType, linkable: true }
    })
  const eventRefs: TagRef[] = r.tags.map((t, i) => ({
    tagId: `demo-evt-${r.id}-${i}`, tagName: t, tagType: 'EVENT', linkable: false,
  }))
  return {
    id: r.id,
    title: r.title,
    source: r.source,
    publishedAt: `${r.date}T09:00:00+09:00`,
    category: r.category,
    severity: r.severity,
    summary: r.summary,
    detail: r.summary,
    keywords: r.keywords,
    recommendedKeywords: [],
    tags: r.tags,
    tagRefs: [...linkableRefs, ...eventRefs],
    relatedEntityIds: r.entities ?? [],
    region: r.region,
    url: r.url,
    impactScore: r.impact,
    riskJustification: r.why,
    isRisk: r.severity === 'high',
  }
}

// ─── DEMO 뉴스 (시연 시나리오 N01~N23) ──────────────────────────────────────────
// ⚠️ ※ 날짜: 원문에서 정확한 게재일을 확인하지 못한 기사는 월 기준 placeholder + 아래 주석으로 표기.
export const DEMO_NEWS: NewsItem[] = [
  // ══════════════════════════════════════════════════════════════════════════════
  // A. 에너지·가스·화학 (호르무즈발) — N01~N09
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n01', title: '카타르 헬륨 생산 중단 장기화 및 러시아 헬륨 수출통제 시행', source: 'IUMI', date: '2026-06-09', category: 'geopolitical', severity: 'high', region: '중동', impact: 86,
    url: 'https://iumi.com/newsletter-june-2026/qatari-helium-shortages/', entities: ['demo-qatar-helium', 'demo-sk-specialty', 'demo-air-liquide'],
    summary: '- 카타르 라스라판 가스단지가 피격되며 전 세계 헬륨 공급의 핵심 거점에서 생산이 중단됐습니다.\n- 한국은 반도체용 헬륨의 64.7%를 카타르에 의존하는데, 러시아의 수출통제까지 겹쳐 대체 조달선이 동시에 좁아졌습니다.\n- 조헬륨 공급원이 물리적 타격을 입으며 수급 리스크가 가격을 넘어 물량 자체의 문제로 전환됐습니다.',
    keywords: ['카타르', '헬륨', '라스라판', '수출통제', '카타르 의존'], tags: ['헬륨 수급', '생산 중단', '단일 의존'],
    why: '헬륨 공급의 물리적 핵심 거점인 라스라판이 타격을 입으면서, 가격 상승을 넘어 물량 확보 자체가 불가능해지는 국면으로 진입했습니다. 한국의 64.7% 카타르 편중은 이 단일 거점 사고가 곧바로 국내 수급 절반 이상을 위협하는 구조적 취약성입니다. 러시아 수출통제까지 겹쳐 대체 공급원이 동시에 막히면서 재고 소진 시한이 앞당겨지는 핵심 트리거가 됩니다.' }),
  mk({ id: 'demo-n02', title: '카타르 헬륨 중단, 한국 70% 이상 의존…반도체 칩 공급망에 신규 리스크', source: 'Caixin Global', date: '2026-03-16', category: 'material', severity: 'high', region: '중동', impact: 80,
    url: 'https://www.caixinglobal.com/2026-03-16/qatar-helium-shutdown-adds-new-risk-to-chip-supply-chain-102423361.html', entities: ['demo-qatar-helium', 'demo-sk-specialty'],
    summary: '- 카타르 헬륨 중단으로 한국 반도체 공급망에 새로운 리스크가 부각됐습니다.\n- 한국의 헬륨 카타르 의존도가 70%를 넘어선다는 분석이 제시됐습니다.\n- 칩 생산에 필수적인 공정 가스의 단일 공급원 리스크가 국제 매체에서도 경고됐습니다.',
    keywords: ['카타르', '헬륨', '칩 공급망', '의존도'], tags: ['헬륨 수급', '단일 의존'],
    why: '반도체용 헬륨의 카타르 70%+ 의존은 특정 지역에 공급이 편중된 구조적 리스크의 핵심입니다. 헬륨은 이온주입·열처리 등 필수 공정에 쓰이고 대체재가 없어, 단일 공급원 중단은 곧바로 생산 차질로 이어질 수 있습니다. 국제 매체가 한국 공급망을 특정해 경고했다는 점에서 리스크의 심각성과 가시성이 함께 높아졌습니다.' }),
  mk({ id: 'demo-n03', title: '카타르, 대(對)한국 장기 LNG 계약 불가항력 선언…전력단가 변동성 경고', source: 'Korea JoongAng Daily', date: '2026-03-20', category: 'material', severity: 'high', region: '중동', impact: 78,
    url: 'https://www.koreajoongangdaily.com/business/korea-likely-to-face-lng-price-volatility-due-to-suspended-supply-from-qatar-officials/12526384', entities: ['demo-qatar-helium'],
    summary: '- 카타르가 대한국 장기 LNG 공급 계약에 대해 불가항력(Force Majeure)을 선언했습니다.\n- LNG 공급 중단으로 국내 전력단가 변동성이 커질 수 있다는 경고가 나왔습니다.\n- 반도체 팹의 전력·유틸리티 원가에 직접 영향을 줄 수 있는 사안입니다.\n- ※ 원문 게재일 미확인(2026-03월, 원문 확인 필요)',
    keywords: ['카타르', 'LNG', '불가항력', '전력단가'], tags: ['LNG 공급', '전력 리스크'],
    why: '카타르의 LNG 불가항력 선언은 이미 체결한 장기 계약 물량조차 인도받지 못할 수 있음을 뜻합니다. LNG는 국내 발전원의 핵심이라 공급 중단은 전력단가 변동성으로 전이되어 용인·평택 등 반도체 팹의 유틸리티 원가를 직접 압박합니다. 헬륨과 같은 호르무즈발 원인에서 비롯된 리스크가 전력 영역으로 확산되는 경로를 보여줍니다.' }),
  mk({ id: 'demo-n04', title: '나프타 부족으로 PGME·PGMEA 생산 연쇄 차질…PR·시너 용제 공급 비상', source: '딜사이트', date: '2026-04-27', category: 'material', severity: 'high', region: '국내', impact: 74,
    url: 'https://dealsite.co.kr/articles/160842/068021', entities: ['demo-lg-chem', 'demo-soulbrain'],
    summary: '- 나프타 부족으로 PGME·PGMEA 등 반도체 용제의 생산에 연쇄 차질이 빚어지고 있습니다.\n- PGMEA는 포토레지스트와 시너(Thinner)의 핵심 용제로, 공급 차질이 포토 공정에 직접 영향을 줍니다.\n- 호르무즈발 원유·나프타 수급 불안이 화학 소재 생산으로 전이되는 양상입니다.',
    keywords: ['나프타', 'PGMEA', '용제', '포토레지스트', '시너'], tags: ['용제 공급', '생산 차질'],
    why: 'PGMEA는 포토레지스트와 시너의 핵심 용제라 나프타발 생산 차질이 포토리소그래피 공정 전반의 소재 수급으로 직결됩니다. 원유·나프타 가격과 물량이 호르무즈 리스크에 묶여 있어, 에너지 쇼크가 화학 소재를 거쳐 반도체 공정 투입물로 번지는 전형적 전이 경로입니다. 용제는 대체·재고 확보가 쉽지 않아 공급 차질 시 공정 가동률에 빠르게 반영됩니다.' }),
  mk({ id: 'demo-n05', title: 'LG화학 폴리머 출하 지연 가능성…NCC 가동률 50~60%대로 하향', source: '파이낸셜뉴스', date: '2026-04-02', category: 'material', severity: 'medium', region: '국내', impact: 64,
    url: 'https://www.fnnews.com/news/202604021823365805', entities: ['demo-lg-chem'],
    summary: '- LG화학이 나프타 분해설비(NCC) 가동률을 50~60%대로 하향 조정했습니다.\n- 폴리머·용제 출하 지연 가능성이 제기되며 전방 산업의 소재 조달에 영향이 우려됩니다.\n- 원유·나프타 수급 불안이 국내 석유화학 가동률 저하로 나타나고 있습니다.',
    keywords: ['LG화학', 'NCC', '가동률', '폴리머', '나프타'], tags: ['가동률 저하', '용제 공급'],
    why: 'NCC 가동률 하향은 나프타 기반 용제·폴리머의 출하 지연으로 이어져 반도체용 PGMEA 등 소재 조달에 간접 압력을 줍니다. 국내 핵심 석유화학사의 가동 축소는 호르무즈발 원유 수급 불안이 실제 생산 지표로 나타난 신호입니다. 가동률 저하가 길어지면 용제 재고 버퍼가 소진되며 포토 공정 투입물 리스크로 전이될 수 있습니다.' }),
  mk({ id: 'demo-n06', title: "호르무즈 위협 수준 '심각' 유지…선박 피격 지속", source: "Lloyd's List Intelligence", date: '2026-09-30', category: 'logistics', severity: 'high', region: '중동', impact: 82,
    url: 'https://www.lloydslistintelligence.com/resources/blog/strait-of-hormuz-brief-30-september-2026', entities: ['hormuz-strait'],
    summary: '- 호르무즈 해협의 위협 수준이 9월 말까지도 "심각" 단계로 유지되고 있습니다.\n- 선박 피격이 지속되며 해상 물류 리스크가 장기화되는 양상입니다.\n- 사태가 일시적 충격이 아니라 구조적 장기화 국면으로 접어들었음을 보여줍니다.',
    keywords: ['호르무즈', '위협 수준', '선박 피격', '해상 물류'], tags: ['호르무즈 위협', '장기화'],
    why: '호르무즈 위협이 9월 말까지 "심각" 단계로 유지된다는 것은 사태가 일시적 충격이 아니라 장기화 국면에 들어섰음을 뜻합니다. 선박 피격 지속은 전쟁위험 할증보험료와 통항 기피를 상시화해 해상 물류비를 구조적으로 끌어올립니다. 장기화가 굳어질수록 재고 버퍼로 버티던 공정 투입물의 리스크가 원가에서 물량 문제로 전환됩니다.' }),
  mk({ id: 'demo-n07', title: '호르무즈 통항 하루 4척 급감(평시 85척)…브렌트유 약 101달러', source: 'Straits (AI 보조 브리핑)', date: '2026-10-07', category: 'logistics', severity: 'high', region: '중동', impact: 88,
    url: 'https://straits.live/briefs/2026-10-07', entities: ['hormuz-strait'],
    summary: '- 호르무즈 통항 선박이 하루 4척으로 급감했습니다(평시 약 85척, 5% 수준).\n- 브렌트유가 배럴당 약 101달러로 상승하며 에너지 가격 압력이 커졌습니다.\n- ※ 출처 신뢰도: AI 보조 브리핑 — 수치는 참고용으로 교차검증 권장.',
    keywords: ['호르무즈', '통항 급감', '브렌트유', '유가'], tags: ['통항 급감', 'AI 브리핑'],
    why: '통항량이 평시의 5% 수준으로 급감했다는 것은 호르무즈가 사실상 마비 상태에 가깝다는 의미로, 에너지·자재 입고의 예측 가능성이 붕괴됐습니다. 브렌트유 101달러는 지정학 리스크가 실제 에너지 가격으로 전이됐음을 보여주는 지표입니다. 다만 이 브리핑은 AI 보조 출처이므로 수치는 교차검증이 필요하며, 시연에서 출처 신뢰도 라벨을 함께 제시해야 합니다.' }),
  mk({ id: 'demo-n08', title: '골드만삭스 "중동 해운 차질 내년까지 지속"…유가 전망 상향', source: 'Baird Maritime / Reuters', date: '2026-08-20', category: 'logistics', severity: 'medium', region: '글로벌', impact: 66,
    url: 'https://www.bairdmaritime.com/shipping/iran-threat-casts-chill-over-strait-of-hormuz-shipping-lanes', entities: ['hormuz-strait'],
    summary: '- 골드만삭스가 중동 해운 차질이 내년까지 지속될 것으로 전망했습니다.\n- 이에 따라 유가 전망치를 상향 조정했습니다.\n- 사태 장기화가 시장 전망에 공식 반영되며 리스크의 지속성이 확인됐습니다.\n- ※ 원문 게재일 미확인(2026 하반기, 원문 확인 필요)',
    keywords: ['골드만삭스', '중동 해운', '유가 전망', '장기화'], tags: ['장기화', '유가 전망'],
    why: '주요 투자은행이 해운 차질의 장기화를 공식 전망하고 유가 전망을 상향했다는 것은 리스크가 단기 변수가 아닌 중기 구조로 자리잡았음을 뜻합니다. 시장 컨센서스가 장기화로 기울면 조달·원가 계획도 장기 시나리오를 전제로 재설계해야 합니다. 유가 전망 상향은 소재·물류 원가의 기준선 자체가 높아진다는 신호입니다.' }),
  mk({ id: 'demo-n09', title: 'Oxford Economics "에너지 쇼크는 시차를 두고 반도체 생산에 파급"', source: 'Oxford Economics', date: '2026-03-23', category: 'material', severity: 'medium', region: '글로벌', impact: 58,
    url: 'https://www.oxfordeconomics.com/resource/silicons-achilles-heel-is-energy-supply/',
    summary: '- Oxford Economics가 에너지 쇼크는 즉각적이지 않고 시차를 두고 반도체 생산에 파급된다고 분석했습니다.\n- 에너지 가격·공급 충격이 소재·용제·전력을 거쳐 생산에 반영되기까지 시차가 존재합니다.\n- 초기에 "재고로 영향 제한" 판단이 나왔던 근거를 재검토하게 하는 분석입니다.',
    keywords: ['Oxford Economics', '에너지 쇼크', '시차', '반도체 생산'], tags: ['영향 분석', '시차 파급'],
    why: '에너지 쇼크가 시차를 두고 생산에 파급된다는 분석은 초기 "재고로 영향 제한" 판단의 유효기간이 정해져 있음을 시사합니다. 재고 버퍼가 소진되는 시점에 그동안 누적된 에너지·소재 충격이 한꺼번에 생산 차질로 나타날 수 있습니다. 리스크가 지금 보이지 않는다고 해소된 것이 아니라 시차를 두고 다가온다는 점에서 선제적 재고·조달 점검의 근거가 됩니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // B. 핵심광물·수출통제 (중국) — N10~N15
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n10', title: '중국 확대 희토류 통제 유예 11/10 만료…2025년 4월 7종 통제는 유효', source: 'Mining Technology', date: '2026-08-27', category: 'geopolitical', severity: 'high', region: '중국', impact: 80,
    url: 'https://www.mining-technology.com/?p=708896', entities: ['demo-china-mineral'],
    summary: '- 중국의 확대 희토류 수출통제 유예가 11월 10일 만료됩니다.\n- 2025년 4월에 시행된 7종(이트륨·스칸듐 등) 통제는 여전히 유효합니다.\n- 유예 만료 시 희토류 수출통제가 전면 복원될 수 있어 조달 불확실성이 커집니다.',
    keywords: ['중국', '희토류', '수출통제', '유예 만료', '11월 10일'], tags: ['희소물질', '수출 통제', '규제 절벽'],
    why: '희토류 통제 유예가 11/10 만료되면 그간 완화됐던 수출통제가 전면 복원되어 조달 가용성이 급격히 떨어질 수 있습니다. 이미 유효한 7종 통제에 더해 확대 통제까지 복원되면 식각 챔버 코팅용 이트륨 등 장비 소모품의 리드타임이 먼저 타격받습니다. 특정 만료일에 리스크가 몰려 있어 D-day 기준의 선제 재고 확보가 필요한 사안입니다.' }),
  mk({ id: 'demo-n11', title: "'11월 10일 절벽': 미·중 휴전 만료와 희토류 유예 만료 동시 도래", source: 'Timewell', date: '2026-10-04', category: 'geopolitical', severity: 'high', region: '글로벌', impact: 84,
    url: 'https://timewell.jp/en/columns/monozukuri-whitepaper-2026-export-control-shift', entities: ['demo-china-mineral', 'demo-samsung-xian'],
    summary: '- 미·중 휴전 만료와 중국 희토류 통제 유예 만료가 11월 10일 동시에 도래합니다.\n- 두 개의 규제 데드라인이 같은 날 겹치며 "11월 10일 절벽"으로 불립니다.\n- 핵심광물 조달과 중국 생산거점 라이선스가 동시에 불확실성에 노출됩니다.',
    keywords: ['11월 10일', '미중 휴전', '희토류 유예', '규제 절벽'], tags: ['규제 절벽', '수출 통제', '복합 리스크'],
    why: '미·중 휴전 만료와 희토류 유예 만료가 같은 날 겹치는 "11월 10일 절벽"은 통상·소재 리스크가 단일 시점에 집중되는 복합 사건입니다. 핵심광물 조달 불확실성과 중국 팹 라이선스 리스크가 동시에 발동되면 대응 자원이 분산돼 충격이 증폭됩니다. 이 뉴스는 S2(핵심광물 절벽)와 S4(중국 팹 라이선스) 두 시나리오를 잇는 공통 분기점으로, 11/10을 기준으로 한 통합 대비가 필요합니다.' }),
  mk({ id: 'demo-n12', title: '미·중 휴전에도 갈륨 문제 미해결…중국 갈륨 수출 94% 감소', source: 'CSIS', date: '2026-05-11', category: 'geopolitical', severity: 'high', region: '중국', impact: 78,
    url: 'https://www.csis.org/analysis/us-china-trade-truce-has-not-solved-gallium-problem', entities: ['demo-china-mineral'],
    summary: '- 미·중 휴전에도 불구하고 갈륨 수출 문제는 해결되지 않았다는 분석입니다.\n- 중국의 갈륨 수출이 94% 감소하며 사실상 금수에 가까운 수준입니다.\n- 화합물 반도체·전력 소자용 핵심 소재의 조달 리스크가 지속되고 있습니다.',
    keywords: ['갈륨', '중국', '수출 94% 감소', '미중 휴전'], tags: ['희소물질', '수출 통제'],
    why: '갈륨 수출 94% 감소는 휴전이라는 외형과 달리 실질적 금수가 지속되고 있음을 보여줍니다. 갈륨은 화합물 반도체·전력 소자의 핵심 소재라 중국의 압도적 점유율을 고려하면 단기 대체가 사실상 불가능합니다. 휴전에도 핵심광물 통제가 풀리지 않는다는 점은 11/10 유예 만료 이후 상황이 더 악화될 수 있다는 경고입니다.' }),
  mk({ id: 'demo-n13', title: '중국 수출통제·군수 수요 확대에 따른 텅스텐 가격 557% 급등', source: 'Mining Reporters', date: '2026-03-16', category: 'material', severity: 'high', region: '글로벌', impact: 76,
    url: 'https://www.miningreporters.com/noticia/news/2026/03/tungsten-prices-china-export-curbs-defense-demand', entities: ['demo-china-mineral'],
    summary: '- 텅스텐 가격이 557% 급등했습니다.\n- 중국의 수출통제와 군수 수요 증가가 겹치며 가격이 폭등했습니다.\n- 텅스텐은 WF6 등 반도체 배선 소재의 원료로, 가격 급등이 공정 소재 단가로 전이됩니다.',
    keywords: ['텅스텐', '557% 급등', '중국 수출통제', '군수 수요'], tags: ['희소물질', '원가 급등'],
    why: '텅스텐 557% 급등은 WF6(육불화텅스텐) 등 DRAM·V-NAND 배선용 소재의 원료 단가를 직접 끌어올립니다. 중국 수출통제와 군수 수요가 겹쳐 가격이 구조적으로 높은 수준에 고착될 가능성이 큽니다. 텅스텐 급등이 이미 진행된 상태라, 11/10 통제 복원 시 WF6의 단가와 수급이 동시에 압박받는 이중 리스크가 됩니다.' }),
  mk({ id: 'demo-n14', title: '중국산 WF6 수출가 전월 대비 약 200% 상승 및 한·일 제조사 단가 인상 통보', source: 'Tiger Brokers', date: '2026-06-04', category: 'material', severity: 'high', region: '중국', impact: 77,
    url: 'https://www.itiger.com/news/1117280622', entities: ['demo-china-mineral', 'demo-samsung-xian', 'demo-sk-wuxi'],
    summary: '- 중국산 WF6(육불화텅스텐) 수출가가 전월 대비 약 200% 급등했습니다.\n- 한·일 업체들도 70~90% 인상에 나섰습니다.\n- WF6은 DRAM·V-NAND 배선 공정의 핵심 소재로 단가·수급이 동시에 압박받고 있습니다.',
    keywords: ['WF6', '육불화텅스텐', '수출가 200% 급등', 'DRAM', 'V-NAND'], tags: ['원가 급등', '배선 소재'],
    why: 'WF6 수출가 200% 급등은 DRAM·V-NAND 배선 공정의 핵심 소재 원가를 직접 끌어올려 메모리 제조 원가에 즉각 반영됩니다. 텅스텐 원료 급등이 WF6 완제품 가격으로 전가되며 한·일 업체까지 연쇄 인상에 나선 상황입니다. 대체재가 마땅치 않은 공정 소재라 가격 상승분을 사용량 축소로 상쇄하기 어려워, 원가 부담이 고스란히 누적됩니다.' }),
  mk({ id: 'demo-n15', title: '중국, MP Materials 등 미국 기업 블랙리스트 등재…11월 두 개의 데드라인', source: 'Skillings', date: '2026-09-03', category: 'geopolitical', severity: 'high', region: '중국', impact: 79,
    url: 'https://www.skillings.net/?p=99800', entities: ['demo-china-mineral'],
    summary: '- 중국이 MP Materials 등 미국 희토류 기업을 블랙리스트에 등재했습니다.\n- 11월에 두 개의 규제 데드라인이 예정되며 통제 강화 흐름이 확인됩니다.\n- 미·중 핵심광물 갈등이 기업 제재 단계로 확대되고 있습니다.',
    keywords: ['중국', 'MP Materials', '블랙리스트', '11월 데드라인'], tags: ['희소물질', '기업 제재', '규제 절벽'],
    why: '중국이 미국 희토류 기업을 블랙리스트에 올린 것은 핵심광물 갈등이 수출통제를 넘어 기업 제재로 격화됐음을 보여줍니다. 11월의 두 데드라인과 맞물려 통제가 전면화되면 서방의 희토류 자립 시도까지 견제되어 대체 공급원 확보가 더 어려워집니다. 제재가 공급망 전반의 거래 가능성을 축소시켜 조달 리스크를 구조적으로 키웁니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // C. 중·일 갈등 — N16~N19
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n16', title: '중국 상무부의 대일 이중용도 품목 수출금지 및 제3국 자회사 책임 부과', source: 'Greenberg Traurig', date: '2026-02-13', category: 'geopolitical', severity: 'medium', region: '중국', impact: 62,
    url: 'https://www.gtlaw.com/en/insights/2026/2/china-imposes-escalated-export-controls-on-dual-use-items-to-japan', entities: ['demo-tokyo-electron'],
    summary: '- 중국이 일본에 대해 이중용도 품목 수출을 금지했습니다.\n- 제3국에 있는 자회사에도 책임을 부과하는 역외 규정이 포함됐습니다.\n- 중·일 갈등이 수출금지와 역외 적용으로 본격화되는 신호입니다.\n- ※ 원문 게재일 미확인(2026-02월, 원문 확인 필요)',
    keywords: ['중국', '일본', '이중용도', '수출금지', '역외 규정'], tags: ['수출 통제', '중일 갈등'],
    why: '이중용도 품목 수출금지는 반도체 장비·소재에 쓰이는 범용 부품의 대일 공급을 차단해 일본계 장비사의 생산에 영향을 줍니다. 제3국 자회사에까지 책임을 부과하는 역외 규정은 글로벌 공급망 전반으로 통제 효과가 번지게 합니다. 중·일 갈등이 한국 팹향 일본 장비·소재의 납기·단가로 전이되는 출발점이 됩니다.' }),
  mk({ id: 'demo-n17', title: '중국, 일본 기업 감시목록 확대…장비용 중국산 부품 심사 강화', source: 'Geopolitechs', date: '2026-06-29', category: 'geopolitical', severity: 'medium', region: '중국', impact: 60,
    url: 'https://www.geopolitechs.org/p/chinas-latest-export-control-measures', entities: ['demo-tokyo-electron'],
    summary: '- 중국이 일본 기업에 대한 감시목록을 확대했습니다.\n- 장비에 들어가는 중국산 부품에 대한 심사가 강화됐습니다.\n- 금수에서 기업 등재·부품 심사로 압박 수단이 단계적으로 확대되고 있습니다.',
    keywords: ['중국', '일본 기업', '감시목록', '부품 심사'], tags: ['수출 통제', '중일 갈등'],
    why: '감시목록 확대와 부품 심사 강화는 중국의 대일 압박이 금수에서 행정적 통제로 정교해지고 있음을 보여줍니다. 일본 장비사가 쓰는 중국산 부품의 심사 기간이 늘면 장비 제작 리드타임이 길어져 한국 팹의 설비 도입·유지보수 일정에 영향을 줍니다. 압박이 단계적으로 확대되는 패턴이라 다음 단계로 소재 통제까지 번질 가능성을 경계해야 합니다.' }),
  mk({ id: 'demo-n18', title: '중국, 일본산 디클로로실란 반덤핑 조사…포토레지스트 대치 격화', source: 'DIGITIMES', date: '2026-01-13', category: 'geopolitical', severity: 'medium', region: '중국', impact: 61,
    url: 'https://www.digitimes.com/news/a20260113PD253.html?chid=12', entities: ['demo-shinetsu'],
    summary: '- 중국이 일본산 디클로로실란에 대한 반덤핑 조사에 착수했습니다.\n- 포토레지스트를 둘러싼 중·일 소재 대치가 격화되고 있습니다.\n- 디클로로실란은 증착·박막 공정의 핵심 전구체로 조달 리스크가 부각됩니다.\n- ※ 출처 신뢰도: 유료 기사(DIGITIMES) — 전문 접근 제한.',
    keywords: ['중국', '디클로로실란', '반덤핑', '포토레지스트'], tags: ['반덤핑 조사', '중일 갈등'],
    why: '디클로로실란 반덤핑 조사는 증착·박막 공정의 핵심 전구체 조달을 중·일 갈등의 사정권에 넣습니다. 일본산 소재에 반덤핑 관세가 부과되면 단가 상승과 공급 위축이 동시에 발생해 한국 팹의 전구체 조달에 영향을 줍니다. 포토레지스트 영역까지 대치가 번지면 일본의 PR 수출 통제 맞대응 가능성과 맞물려 연쇄 확전 위험이 커집니다.' }),
  mk({ id: 'demo-n19', title: '일본, 세계 PR 70%·EUV PR 95% 점유…수출 제한설 부상', source: 'TrendForce', date: '2025-12-03', category: 'geopolitical', severity: 'medium', region: '일본', impact: 63,
    url: 'https://www.trendforce.com/news/2025/12/03/news-japan-rumored-to-curb-photoresist-exports-as-china-targets-40-self-sufficiency-by-2026/', entities: ['demo-jsr', 'demo-shinetsu'],
    summary: '- 일본이 전 세계 포토레지스트(PR)의 70%, EUV용 PR의 95%를 점유하고 있습니다.\n- 중국의 자급 추진에 맞서 일본의 PR 수출 제한설이 부상하고 있습니다.\n- 핵심 소재의 과점 구조가 지정학 카드로 쓰일 수 있다는 우려입니다.',
    keywords: ['일본', '포토레지스트', 'EUV PR', '수출 제한설', '95% 점유'], tags: ['소재 과점', '중일 갈등'],
    why: '일본이 EUV용 PR의 95%를 점유한 과점 구조는 수출 제한이 현실화될 경우 대체가 거의 불가능한 치명적 리스크입니다. 중·일 갈등 속에서 일본이 PR을 지정학 카드로 쓰면, 중국의 희토류 보복과 맞물려 양측이 서로의 급소를 겨누는 연쇄 확전으로 번질 수 있습니다. 한국은 양국 소재에 모두 의존하므로 어느 방향의 통제든 포토 공정에 직접 노출됩니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // D. 미국 규제·중국 생산거점 — N20~N21
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n20', title: '미국, 삼성·SK 중국 팹에 2026년분 장비 반입 연간 허가…증설·업그레이드는 불허', source: '경향신문(영문)', date: '2025-12-30', category: 'geopolitical', severity: 'medium', region: '미국', impact: 65,
    url: 'https://www.khan.co.kr/en/article/202512301727177', entities: ['demo-samsung-xian', 'demo-sk-wuxi'],
    summary: '- 미국이 삼성·SK의 중국 팹에 2026년분 장비 반입을 연간 단위로 허가했습니다.\n- 다만 증설과 업그레이드는 허용되지 않아 공정 전환이 제약됩니다.\n- VEU(검증된 최종사용자) 체제에서 건별·연간 허가 체제로 전환된 결과입니다.',
    keywords: ['미국', '삼성', 'SK', '중국 팹', '연간 허가', '증설 불허'], tags: ['미국 규제', '중국 생산거점'],
    why: '2026년분 연간 허가로 당장의 가동은 유지되지만, 증설·업그레이드 불허로 중국 팹의 공정 전환과 경쟁력 유지가 구조적으로 제약됩니다. 1년 단위 허가 체제는 매년 갱신 불확실성을 안고 가야 한다는 뜻으로, 갱신 시점이 미·중 협상과 겹치면 레버리지로 쓰일 수 있습니다. 시안·우시 팹의 중장기 운영 리스크를 상시 점검해야 하는 근거입니다.' }),
  mk({ id: 'demo-n21', title: '4개 중국 팹 VEU 상실 후 연간 건별 허가 체제…중국 AMEC 장비 평가 보도(양사 부인)', source: 'Tech Insider', date: '2026-08-10', category: 'geopolitical', severity: 'medium', region: '중국', impact: 62,
    url: 'https://tech-insider.org/?p=20278', entities: ['demo-samsung-xian', 'demo-sk-wuxi'],
    summary: '- 4개 중국 팹이 VEU 지위를 상실한 뒤 연간 건별 허가 체제로 운영되고 있습니다.\n- 삼성·SK가 중국 AMEC 장비를 평가 중이라는 보도가 나왔으나 양사는 부인했습니다.\n- 미국산 장비 반입 제약이 중국산 장비 대체 검토로 이어질 수 있다는 관측입니다.\n- ※ 원문 게재일 미확인(2026-08월, 원문 확인 필요)',
    keywords: ['VEU 상실', '건별 허가', 'AMEC', '중국 팹'], tags: ['미국 규제', '중국 생산거점'],
    why: 'VEU 상실 후 건별 허가 체제는 중국 팹의 장비 반입을 매 건 심사에 묶어 유지보수·교체 부품의 리드타임 불확실성을 키웁니다. 중국산 AMEC 장비 평가설은(부인에도 불구하고) 미국산 장비 제약이 중국산 대체 압력으로 이어지는 딜레마를 보여줍니다. 중국산 장비 채택은 다시 미국 규제 리스크를 자극할 수 있어, 어느 쪽도 쉽지 않은 선택지에 놓인 상황입니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // E. 기타 — N22(시나리오 미연결 대조군), N23(X4 편입)
  //    AI가 일부 뉴스만 골라 묶는다는 점을 보여주기 위해 그룹에 포함하지 않음.
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n22', title: '삼성전자 노조 18일 파업 예고…임금 협상 결렬', source: 'Khaleej Times', date: '2026-05-20', category: 'esg', severity: 'medium', region: '국내', impact: 54,
    url: 'https://www.khaleejtimes.com/business/tech/samsung-major-strike-may-21-south-korea',
    summary: '- 삼성전자 노조가 임금 협상 결렬에 따라 파업을 예고했습니다.\n- 노사 갈등이 생산 안정성에 영향을 줄 수 있는 변수로 부상했습니다.\n- 이 뉴스는 특정 시나리오에 연결되지 않은 개별 리스크(대조군)입니다.',
    keywords: ['삼성전자', '노조', '파업', '임금 협상'], tags: ['노사 갈등', '생산 안정성'],
    why: '노조 파업은 핵심 생산 거점의 가동 안정성에 직접 영향을 줄 수 있는 노무 리스크입니다. 다만 이 사안은 호르무즈·핵심광물·중일 갈등 등 외부 공급망 리스크와 인과적으로 묶이지 않는 독립 이슈입니다. AI가 복합 리스크 시나리오를 구성할 때 이런 개별 뉴스는 군집에서 제외된다는 점을 보여주는 대조군 사례입니다.' }),
  mk({ id: 'demo-n23', title: 'LNG, 한국 AI·반도체 전력원으로 재부상', source: 'The Korea Times', date: '2026-07-11', category: 'financial', severity: 'low', region: '국내', impact: 40,
    url: 'https://www.koreatimes.co.kr/business/companies/20260711/lng-reemerges-as-strategic-fuel-for-koreas-ai-chip-ambitions',
    summary: '- LNG가 한국 AI·반도체 산업의 전략적 전력원으로 재부상하고 있습니다.\n- 데이터센터·팹의 급증하는 전력 수요에 대응하는 에너지 전략으로 조명됐습니다.\n- 용인 국가산단 초기 전력의 LNG 의존 계획과 맞물려, 연료 공급·탄소 비용 리스크를 함께 점검해야 하는 배경 동향입니다.',
    keywords: ['LNG', 'AI', '반도체', '전력원'], tags: ['에너지 전략', '전력 수요'],
    why: 'AI·반도체 전력 수요 급증 속 LNG의 역할 확대는 중장기 에너지·원가 전략에 참고가 되는 동향성 정보입니다. 개별로는 에너지 정책 동향이지만, 용인 산단의 LNG 전원 선택과 결합하면 카타르 불가항력 같은 연료 공급 리스크와 CBAM·RE100 같은 탄소 비용 리스크를 동시에 고착시키는 배경이 됩니다. LNG 비중 확대가 굳어질수록 전력원 다변화(PPA 등) 로드맵의 중요성이 커집니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // F. 물류·인프라 (카테고리 카드 보강) — N24~N28
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n24', title: '아시아-유럽 운임 하락…선사들 수에즈 복귀 확대, 희망봉 우회는 연료·운영비 부담', source: 'gCaptain (Drewry WCI)', date: '2026-09-03', category: 'logistics', severity: 'medium', region: '글로벌', impact: 56,
    url: 'https://gcaptain.com/container-spot-rates-hold-steady-as-transpacific-gains-offset-asia-europe-declines/', entities: ['suez-canal', 'redsea-babelmandeb'],
    summary: '- 상하이→제노바 -10%, 로테르담 -5% 등 아시아-유럽 컨테이너 운임이 하락했습니다.\n- 일부 선사가 수에즈 항로 복귀를 확대하며 운임이 조정되는 양상입니다.\n- 다만 희망봉 우회가 여전히 병행돼 연료·운영비 부담은 구조적으로 남아 있습니다.',
    keywords: ['컨테이너 운임', '수에즈', '희망봉 우회', '아시아-유럽'], tags: ['해상 운임', '항로 복귀'],
    why: '운임 하락은 표면적 완화 신호지만, 수에즈 복귀와 희망봉 우회가 혼재돼 항로 안정성이 완전히 회복된 것은 아닙니다. 선사별 항로 선택이 엇갈리면 리드타임 편차가 커져 자재 입고 일정의 예측 가능성이 떨어집니다. 운임이 내려도 우회에 따른 연료·운영비는 원가에 남아, 물류비의 구조적 상방 압력이 지속됨을 보여줍니다.' }),
  mk({ id: 'demo-n25', title: '6월 이후 중국-유럽 화물기 공급 약 30% 감소…아시아-미국 탑재율 90% 육박', source: 'DHL Global Forwarding', date: '2026-08-15', category: 'logistics', severity: 'medium', region: '글로벌', impact: 60,
    url: 'https://www.dhl.com/lb-en/home/global-forwarding/latest-news-and-webinars/air-freight-market-update.html',
    summary: '- 6월 이후 중국-유럽 노선 화물기 공급이 약 30% 감소했습니다.\n- 아시아-미국 노선 탑재율이 90%에 육박하며 항공 화물 공간이 타이트해졌습니다.\n- 반도체·전자 긴급 물량의 항공 운송 확보가 어려워질 수 있는 환경입니다.\n- ※ 원문 게재일 미확인(2026-08월, 원문 확인 필요)',
    keywords: ['항공화물', '화물기 공급', '탑재율', 'DHL'], tags: ['항공 운송', '캐파 부족'],
    why: '화물기 공급 30% 감소와 탑재율 90%는 항공 화물 캐파가 수요를 따라가지 못하는 과포화 상태를 뜻합니다. 반도체는 긴급·고가 물량을 항공으로 소화하는 경우가 많아, 공간 부족은 곧 긴급 자재의 납기 지연과 프리미엄 운임 부담으로 이어집니다. 해상에 이어 항공까지 타이트해지면 물류 리스크의 회피 경로가 줄어듭니다.' }),
  mk({ id: 'demo-n26', title: '5월 글로벌 항공화물 스팟운임 전년 대비 41% 상승…중동 사태 공급 제약이 원인', source: 'Air Cargo Week (Xeneta)', date: '2026-06-15', category: 'logistics', severity: 'high', region: '글로벌', impact: 68,
    url: 'https://aircargoweek.com/ai-overtakes-e-commerce-as-air-cargos-new-growth-engine/',
    summary: '- 5월 글로벌 항공화물 스팟운임이 전년 대비 41% 상승했습니다.\n- 중동 사태에 따른 공급 제약이 운임 급등의 주원인으로 지목됐습니다.\n- 해상 리스크가 항공 운임으로 전이되는 연쇄 효과가 확인됩니다.\n- ※ 원문 게재일 미확인(2026-06월, 원문 확인 필요)',
    keywords: ['항공화물', '스팟운임', '41% 상승', '중동'], tags: ['항공 운임', '원가 급등'],
    why: '항공 스팟운임 41% 급등은 호르무즈·중동 리스크가 해상을 넘어 항공 물류 원가로 전이됐음을 보여줍니다. 해상이 막혀 항공으로 수요가 몰리면 운임이 추가로 뛰는 악순환이 발생합니다. 긴급 반도체 물량의 운송 단가 기준선이 올라가, 물류비가 제품 원가를 구조적으로 압박하는 국면입니다.' }),
  mk({ id: 'demo-n27', title: '8월 아태 화물시장, AI·반도체 수요 강세 vs 소비재 약세 양극화', source: 'Air Cargo Week (Dimerco)', date: '2026-08-20', category: 'logistics', severity: 'low', region: '아시아', impact: 46,
    url: 'https://aircargoweek.com/ai-demand-tightens-asia-airfreight-as-consumer-volumes-soften/',
    summary: '- 8월 아시아태평양 화물시장이 AI·반도체 수요 강세와 소비재 약세로 양극화됐습니다.\n- AI·반도체 물량이 화물 공간을 선점하며 운임 구조가 품목별로 갈리고 있습니다.\n- 반도체 긴급 물량의 운송 우선순위·단가 전략에 참고가 되는 동향입니다.',
    keywords: ['항공화물', '아태', 'AI 수요', '양극화'], tags: ['수요 양극화', '항공 운송'],
    why: 'AI·반도체 수요가 화물 공간을 선점하는 양극화는 반도체 물량 자체는 운송 우선순위를 확보할 수 있다는 긍정적 측면이 있습니다. 다만 수요 집중은 성수기 운임 급등 리스크와 맞물려, 캐파가 조이면 단가 변동성이 커집니다. 즉각적 공급 차질은 아니지만 운송 단가 계획 수립에 참고할 배경성 동향입니다.' }),
  mk({ id: 'demo-n28', title: '2월 중동 확전으로 글로벌 항공화물 공급 12% 증발…항만 대기 340만 TEU', source: 'Asteelflash', date: '2026-07-10', category: 'logistics', severity: 'high', region: '글로벌', impact: 72,
    url: 'https://blog.asteelflash.com/blog/transportation-market-update-july-2026-air-sea-freight',
    summary: '- 2월 중동 확전으로 글로벌 항공화물 공급의 12%가 하룻밤 사이 사라졌습니다.\n- 아시아·유럽 항만에 대기 중인 컨테이너가 340만 TEU에 달했습니다.\n- 해상·항공 물류가 동시에 경색되며 공급망 전반에 적체가 발생했습니다.',
    keywords: ['항공화물', '중동 확전', '340만 TEU', '항만 적체'], tags: ['물류 경색', '항만 적체'],
    why: '항공 공급 12%가 하룻밤에 증발하고 340만 TEU가 항만에 묶였다는 것은 물류망이 충격에 극도로 취약해진 상태를 보여줍니다. 해상·항공이 동시에 경색되면 자재 입고의 대체 경로가 사라져 생산 일정 리스크가 급격히 커집니다. 지정학 충격이 물류 캐파에 즉각 반영되는 전형적 사례로, 재고 버퍼 점검의 근거가 됩니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // G. ESG & Compliance (카테고리 카드 보강) — N29~N32
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n29', title: 'EU CBAM 2026년 1월 본격 시행…반도체 포함 시 2026~2034년 인증서 비용 약 5.88억 달러 추정', source: 'IEEFA', date: '2026-02-12', category: 'esg', severity: 'medium', region: '유럽', impact: 58,
    url: 'https://ieefa.org/resources/europes-cbam-raises-supply-chain-carbon-risks-south-korean-technology-industries', entities: ['demo-lg-chem'],
    summary: '- EU 탄소국경조정제도(CBAM)가 2026년 1월부터 본격 시행됩니다.\n- 반도체가 대상에 포함될 경우 2026~2034년 인증서 비용이 약 5.88억 달러로 추정됩니다.\n- 한국 기술산업의 공급망 탄소 리스크가 비용으로 가시화되는 사안입니다.',
    keywords: ['CBAM', '탄소국경', 'EU', '인증서 비용'], tags: ['탄소 규제', '컴플라이언스'],
    why: 'CBAM은 탄소 배출을 수출 비용으로 전환해 반도체·소재의 대EU 수출 원가를 구조적으로 끌어올립니다. 약 5.88억 달러 규모의 인증서 비용 추정은 ESG 리스크가 추상적 평판을 넘어 실제 재무 부담으로 전이됨을 보여줍니다. 공급망 전반의 탄소 데이터 관리와 저탄소 전환이 조달 경쟁력의 전제 조건이 되는 국면입니다.' }),
  mk({ id: 'demo-n30', title: '용인시장 "삼성 1기 팹 가동 2029년 10월로 1년 앞당겨"…전력·용수 공급 1~2년 지연 우려', source: '아시아경제', date: '2026-07-22', category: 'esg', severity: 'medium', region: '국내', impact: 60,
    url: 'https://view.asiae.co.kr/article/2026072217502824098', entities: ['demo-samsung-xian'],
    summary: '- 삼성이 용인 1기 팹 가동을 2029년 10월로 1년 앞당겼습니다.\n- 반면 전력·용수 등 기반 인프라 공급은 1~2년 늦어질 수 있다는 우려가 제기됐습니다.\n- 생산 일정과 인프라 공급의 시차가 가동 리스크로 부각되고 있습니다.',
    keywords: ['용인', '삼성', '팹 가동', '전력', '용수'], tags: ['인프라 리스크', '전력·용수'],
    why: '팹 가동 일정은 앞당겨지는데 전력·용수 공급이 지체되면, 완공된 설비가 가동되지 못하는 인프라 병목이 발생합니다. 반도체 팹은 막대한 전력·용수를 전제로 설계되므로 기반 인프라 지연은 투자 효율과 생산 램프업을 직접 제약합니다. ESG·규제 영역의 인허가·인프라 리스크가 생산 일정에 실질적 영향을 주는 사례입니다.' }),
  mk({ id: 'demo-n31', title: '기후부, 용인 용수 1단계 2029년 5월로 조기 공급…국가산단 2030년까지 LNG 전력', source: '디지털데일리', date: '2026-07-22', category: 'esg', severity: 'low', region: '국내', impact: 44,
    url: 'https://www.ddaily.co.kr/page/view/2026072214423642947', entities: ['demo-samsung-xian'],
    summary: '- 기후에너지부가 용인 용수 1단계 공급을 2029년 5월로 앞당기기로 했습니다.\n- 국가산단에는 2030년까지 산단 내 LNG로 전력을 공급하는 방안이 제시됐습니다.\n- 인프라 공급 지연 우려에 대한 정부 차원의 대응책이 나온 동향입니다.',
    keywords: ['용인', '용수', 'LNG 전력', '국가산단'], tags: ['인프라 대응', '전력·용수'],
    why: '용수 조기 공급과 LNG 전력 방안은 인프라 병목 우려(N30)에 대한 완화 신호로, 리스크 대응이 진행되고 있음을 보여줍니다. 다만 LNG 기반 전력은 CBAM 등 탄소 규제와 상충할 수 있어 ESG 측면의 트레이드오프가 남습니다. 즉각적 공급 차질은 아니지만 인프라·탄소 정책의 정합성을 점검할 배경성 동향입니다.' }),
  mk({ id: 'demo-n32', title: '환경단체, 용인 국가산단 승인 무효 행정소송…비수도권 의원은 이전 주장', source: '주간경향', date: '2026-01-12', category: 'esg', severity: 'medium', region: '국내', impact: 52,
    url: 'https://weekly.khan.co.kr/article/202601120600021',
    summary: '- 환경단체가 용인 국가산단 승인 무효를 주장하며 행정소송을 제기했습니다.\n- 비수도권 의원들은 산단 이전을 주장하는 등 입지 갈등이 지속되고 있습니다.\n- 인허가·사회적 수용성 리스크가 대규모 투자 일정의 변수로 부각됩니다.',
    keywords: ['용인', '국가산단', '행정소송', '환경단체'], tags: ['인허가 리스크', '사회적 수용성'],
    why: '행정소송과 입지 갈등은 대규모 팹 투자의 인허가·사회적 수용성 리스크를 보여줍니다. 소송 결과에 따라 산단 조성 일정이 지연되면 생산 캐파 확충 로드맵 전체가 영향을 받을 수 있습니다. ESG의 거버넌스·지역사회 축이 투자 타임라인의 실질적 불확실성으로 작용하는 사례입니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // H. 재무 & 신용 (카테고리 카드 보강) — N33~N36
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n33', title: '여천NCC 신용등급 A- → BBB+ 강등…현금 528억 원 대비 1년 내 만기 차입금 약 1.2조 원', source: '뉴데일리', date: '2026-07-17', category: 'financial', severity: 'high', region: '국내', impact: 70,
    url: 'https://biz.newdaily.co.kr/site/data/html/2026/07/17/2026071700016.html', entities: ['demo-lg-chem'],
    summary: '- 여천NCC 신용등급이 A-에서 BBB+로 강등됐습니다.\n- 보유 현금 528억 원 대비 1년 내 만기 차입금이 약 1.2조 원에 달합니다.\n- 나프타 기반 석유화학사의 재무 리스크가 용제·소재 공급 안정성으로 번질 수 있습니다.',
    keywords: ['여천NCC', '신용등급 강등', 'BBB+', '차입금'], tags: ['신용 강등', '유동성 리스크'],
    why: '현금 528억 원 대비 만기 차입금 1.2조 원은 심각한 유동성 미스매치로, 등급 강등이 조달 비용 상승과 차환 리스크를 키웁니다. 석유화학사의 재무 악화는 나프타·용제 등 반도체향 소재의 안정적 공급 능력을 위협할 수 있습니다. 협력사의 재무 건전성이 공급 지속성과 직결되는 전형적 재무·신용 리스크 사례입니다.' }),
  mk({ id: 'demo-n34', title: '나이스신평 "상반기 하향 37건 > 상향 32건"…석유화학 하반기 역래깅으로 실적 재악화 가능', source: 'SBS Biz', date: '2026-07-01', category: 'financial', severity: 'medium', region: '국내', impact: 56,
    url: 'https://biz.sbs.co.kr/amp/article/20000320030',
    summary: '- 나이스신용평가 상반기 등급 하향(37건)이 상향(32건)을 앞질렀습니다.\n- 석유화학 업종은 하반기 역래깅 효과로 실적이 재악화될 수 있다는 전망입니다.\n- 소재 공급사가 포진한 업종의 신용 사이클 하강이 확인되는 동향입니다.',
    keywords: ['나이스신평', '등급 하향', '석유화학', '역래깅'], tags: ['신용 사이클', '업종 리스크'],
    why: '하향이 상향을 앞서는 것은 신용 사이클이 하강 국면에 진입했음을 뜻합니다. 석유화학의 역래깅 실적 악화 전망은 반도체향 소재·용제 공급사의 재무 체력 저하로 이어질 수 있습니다. 개별 기업이 아닌 업종 전반의 신용도 하락은 공급망 다변화 전략의 재점검을 요구하는 신호입니다.' }),
  mk({ id: 'demo-n35', title: '하나은행·기보, 반도체 소부장 기업에 1,000억 원 규모 보증 지원', source: '파이낸셜뉴스', date: '2026-07-10', category: 'financial', severity: 'low', region: '국내', impact: 42,
    url: 'https://www.fnnews.com/news/202607101444454524', entities: ['demo-soulbrain'],
    summary: '- 하나은행과 기술보증기금이 반도체 소부장 기업에 1,000억 원 규모 보증을 지원합니다.\n- 고물가·고금리로 경영 애로를 겪는 소부장 협력사가 대상입니다.\n- 협력사 유동성 리스크에 대한 금융 지원책이 나온 긍정적 동향입니다.',
    keywords: ['하나은행', '기술보증기금', '소부장', '보증 지원'], tags: ['금융 지원', '유동성 완화'],
    why: '소부장 기업 보증 지원은 협력사 유동성 리스크를 완화하는 긍정적 신호로, 공급망 하단의 재무 체력 보강에 기여합니다. 고금리 환경에서 중소 협력사의 자금 경색은 공급 안정성을 위협하는 만큼 금융 안전망은 중요합니다. 즉각적 리스크라기보다 공급망 복원력을 높이는 배경성 동향입니다.' }),
  mk({ id: 'demo-n36', title: '신한 "부정적 등급전망 80건 > 긍정적 60건"…하반기 하위·투기등급 중심 하향 압력', source: '신한금융그룹', date: '2026-07-09', category: 'financial', severity: 'medium', region: '국내', impact: 54,
    url: 'https://shinhangroup.com/kr/archive/insight/extend/detail/33107',
    summary: '- 부정적 등급전망(80건)이 긍정적 전망(60건)을 상회했습니다.\n- 하반기 하위·투기등급을 중심으로 하향 압력이 지속될 것으로 전망됩니다.\n- 신용 환경 악화가 공급망 하단 기업으로 번질 수 있는 거시 동향입니다.',
    keywords: ['신한', '등급전망', '투기등급', '하향 압력'], tags: ['신용 전망', '거시 리스크'],
    why: '부정적 전망이 긍정적 전망을 앞서는 것은 향후 등급 하향이 이어질 가능성을 예고합니다. 하위·투기등급 집중 압력은 재무 체력이 약한 공급망 하단 협력사일수록 조달·차환 리스크가 커짐을 뜻합니다. 거시 신용 환경의 악화는 협력사 재무 모니터링의 강도를 높여야 하는 선행 신호입니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // I. 협력사 동향 / 공급집중 (카테고리 카드 보강) — N37~N41
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n37', title: '원익머트리얼즈 2Q26 매출 +23%…운임비 증가·헬륨 마진 훼손으로 영업이익 컨센서스 하회', source: '하나증권', date: '2026-08-10', category: 'supply', severity: 'medium', region: '국내', impact: 58,
    url: 'https://stock.pstatic.net/stock-research/company/57/20260810_company_786070000.pdf', entities: ['demo-wonik-materials'],
    summary: '- 원익머트리얼즈 2Q26 매출이 전년 대비 23% 증가했습니다.\n- 다만 운임비 증가와 헬륨 등 상품 마진 훼손으로 영업이익이 컨센서스를 하회했습니다.\n- 특수가스 핵심 협력사의 수익성에 물류비·원료가 압력이 반영되고 있습니다.',
    keywords: ['원익머트리얼즈', '특수가스', '헬륨 마진', '운임비'], tags: ['협력사 실적', '마진 압박'],
    why: '매출 증가에도 영업이익이 꺾인 것은 운임·헬륨 원료가 상승이 협력사 수익성을 직접 잠식하고 있음을 보여줍니다. 특수가스는 반도체 공정의 필수 투입물이라, 핵심 협력사의 마진 악화가 길어지면 공급 안정성과 가격 협상력에 영향을 줍니다. 물류·원료 리스크가 협력사 재무를 거쳐 공급망으로 전이되는 경로를 드러냅니다.' }),
  mk({ id: 'demo-n38', title: 'AMAT FY26 3분기 매출 91.2억 달러(+25%)…중국 비중 35%→28%, 수출통제로 약 6억 달러 감소 예상', source: 'KuCoin News', date: '2026-08-15', category: 'supply', severity: 'medium', region: '글로벌', impact: 60,
    url: 'https://www.kucoin.com/news/flash/applied-materials-faces-600m-revenue-hit-from-china-export-controls', entities: ['demo-tokyo-electron'],
    summary: '- 어플라이드머티어리얼즈(AMAT) FY26 3분기 매출이 91.2억 달러로 25% 증가했습니다.\n- 중국 매출 비중이 35%에서 28%로 하락하고, 수출통제로 FY26 매출 약 6억 달러 감소가 예상됩니다.\n- 글로벌 장비사의 중국 익스포저 축소가 공급·납기 구조에 영향을 줍니다.\n- AMAT가 빠진 중국 시장의 공백은 비미국 장비사가 메우고 있다는 분석이 나왔습니다.\n- ※ 출처 신뢰도: 암호화폐 뉴스 플랫폼 요약 — IR 원문/로이터 교차검증 권장.',
    keywords: ['AMAT', '장비', '중국 수출통제', '매출 감소'], tags: ['장비사 실적', '수출 통제'],
    why: '세계 최대 장비사의 중국 비중 축소는 수출통제가 장비 공급 구조를 재편하고 있음을 보여줍니다. 중국향 매출 감소분을 다른 지역이 흡수하는 과정에서 장비 배정·납기 우선순위가 바뀌면 한국 팹의 설비 도입 일정에도 파급됩니다. 다만 이 수치는 요약 매체 출처라 IR 원문 교차검증이 필요한 사안입니다.' }),
  mk({ id: 'demo-n39', title: '5대 장비사 납기 1.5~2배로…6개월 걸리던 장비가 약 1년 소요', source: '36Kr', date: '2026-08-03', category: 'supply', severity: 'high', region: '글로벌', impact: 74,
    url: 'https://eu.36kr.com/en/p/3920446768852617', entities: ['demo-tokyo-electron', 'demo-asml'],
    summary: '- AMAT·ASML·Lam·TEL·KLA 등 5대 장비사의 납기가 1.5~2배로 늘었습니다.\n- 6개월이면 받던 장비가 약 1년이 걸리는 수준으로 리드타임이 급증했습니다.\n- AI 수요 폭증과 공급 제약이 겹쳐 장비 조달 병목이 심화되고 있습니다.',
    keywords: ['장비 납기', '리드타임', '5대 장비사', 'AI 수요'], tags: ['장비 병목', '리드타임 급증'],
    why: '핵심 장비 5사의 납기가 일제히 2배로 늘어난 것은 공정 증설·전환의 속도를 장비 조달이 제약하는 구조적 병목입니다. 리드타임 급증은 조기 발주와 재고 선확보 없이는 생산 캐파 확충 계획이 지연될 수밖에 없음을 뜻합니다. AI 수요 사이클과 맞물려 장비 확보 경쟁이 공급망의 핵심 리스크로 부상한 사례입니다.' }),
  mk({ id: 'demo-n40', title: '핵심 부품 부족으로 장비 리드타임 12~24개월…RF 전원장치 최대 24개월, 삼성·SK 조기 발주 검토', source: 'TrendForce', date: '2026-08-19', category: 'supply', severity: 'high', region: '글로벌', impact: 76,
    url: 'https://www.trendforce.com/news/2026/08/19/news-chip-equipment-crunch-reportedly-pushes-lead-times-to-24-months-giving-chinas-toolmakers-a-boost/', entities: ['demo-tokyo-electron', 'demo-samsung-xian', 'demo-sk-wuxi'],
    summary: '- 핵심 부품 부족으로 장비 리드타임이 12~24개월로 늘었습니다.\n- RF 전원장치 등 일부 부품은 최대 24개월이 소요됩니다.\n- 글로벌 장비 리드타임이 12개월 안팎인 반면 중국 AMEC는 약 9개월로, CXMT 등 중국 업체의 대규모 장비 입찰이 이어지고 있습니다.\n- 삼성·SK가 조기 발주를 검토하는 등 선제 대응에 나서고 있습니다.',
    keywords: ['리드타임', 'RF 전원장치', '부품 부족', '조기 발주'], tags: ['부품 병목', '리드타임 급증'],
    why: '장비 자체뿐 아니라 RF 전원장치 등 핵심 부품의 리드타임이 24개월에 달하면, 장비 조달 병목이 공급망 더 깊은 단계로 내려간 것입니다. 삼성·SK의 조기 발주 검토는 리스크가 이미 실질적 대응 단계에 진입했음을 보여줍니다. 부품 병목은 중국 장비사에 반사이익을 주며 공급 구도까지 바꿀 수 있는 변수입니다.' }),
  mk({ id: 'demo-n41', title: 'ASML CEO "이번 AI 업사이클에서 병목 되지 않겠다"…증설 램프업 진행', source: 'Bits&Chips', date: '2026-05-22', category: 'supply', severity: 'low', region: '유럽', impact: 44,
    url: 'https://bits-chips.com/magazine/bc202604/?pagenr=10', entities: ['demo-asml'],
    summary: '- ASML CEO가 이번 AI 업사이클에서 자사가 공급 병목이 되지 않겠다고 밝혔습니다.\n- 증설 램프업을 진행 중이라고 설명했습니다.\n- 핵심 노광장비 독점 공급사의 캐파 확대 의지가 확인된 동향입니다.',
    keywords: ['ASML', 'AI 업사이클', '증설', '노광장비'], tags: ['캐파 확대', '공급 안정화'],
    why: 'EUV 노광장비를 사실상 독점하는 ASML의 증설 의지는 장비 병목(N39·N40) 우려를 완화하는 긍정적 신호입니다. 다만 램프업에는 시간이 걸려 당장의 리드타임 급증을 즉시 해소하지는 못합니다. 공급 안정화 방향을 보여주는 배경성 동향으로, 장비 조달 계획의 중장기 전제로 참고할 수 있습니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // J. 사이버 & 데이터 (카테고리 카드 보강) — N42~N45
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n42', title: '테스트장비사 Advantest, 랜섬웨어 피해 확인…2월 15일 이상징후 탐지', source: 'Help Net Security', date: '2026-02-23', category: 'cyber', severity: 'high', region: '일본', impact: 70,
    url: 'https://www.helpnetsecurity.com/2026/02/23/advantest-suffers-ransomware-attack/',
    summary: '- 반도체 테스트장비사 어드반테스트(Advantest)가 랜섬웨어 피해를 확인했습니다.\n- 2월 15일 이상징후 탐지 후 공격이 확인됐습니다.\n- 테스트 공정 핵심 장비사의 사이버 피해가 공급 안정성 변수로 부각됩니다.',
    keywords: ['Advantest', '랜섬웨어', '테스트장비', '사이버 공격'], tags: ['랜섬웨어', '공급사 피해'],
    why: '테스트장비 핵심 공급사의 랜섬웨어 피해는 장비 생산·지원 시스템 중단으로 이어져 고객 팹의 테스트 공정 지원에 영향을 줄 수 있습니다. 사이버 공격은 물리적 재해 없이도 공급망을 마비시키는 리스크로, 핵심 협력사일수록 파급이 큽니다. 공급사의 보안 사고가 조달 리스크의 한 축임을 보여주는 사례입니다.' }),
  mk({ id: 'demo-n43', title: 'Advantest 미국법인, 2월 랜섬웨어 당시 개인정보 유출 확인…10월 6일자 통지', source: 'PrivacyOn', date: '2026-10-09', category: 'cyber', severity: 'medium', region: '미국', impact: 56,
    url: 'https://www.privacyon.com/blog/what-to-do-after-the-advantest-data-breach-2026', entities: [],
    summary: '- 어드반테스트 미국법인이 2월 랜섬웨어 사고 당시 개인정보가 유출됐음을 확인했습니다.\n- 10월 6일자 통지서를 통해 피해 사실이 공지됐습니다.\n- 사이버 사고의 데이터 유출 여파가 수개월 뒤 후속 확인되는 양상입니다.\n- ※ 출처 신뢰도: 개인정보 보호 블로그 — 공식 통지문 교차확인 권장.',
    keywords: ['Advantest', '개인정보 유출', '데이터 침해', '후속 통지'], tags: ['데이터 유출', '랜섬웨어'],
    why: '2월 사고의 데이터 유출이 10월에야 확인된 것은 사이버 침해의 영향이 장기간에 걸쳐 드러남을 보여줍니다. 개인정보 유출은 규제·법적 책임과 신뢰 비용으로 이어져 공급사의 운영 부담을 가중합니다. N42의 후속 보도로, 단일 사이버 사고가 꼬리가 긴 리스크임을 드러내는 사례입니다.' }),
  mk({ id: 'demo-n44', title: '반도체 테스트업체 Trio-Tech 싱가포르 자회사 랜섬웨어…3월 18일 데이터 유출로 확대', source: 'The Record', date: '2026-03-20', category: 'cyber', severity: 'medium', region: '아시아', impact: 54,
    url: 'https://therecord.media/ransomware-trio-tech-semiconductor-sec',
    summary: '- 반도체 테스트업체 Trio-Tech의 싱가포르 자회사가 랜섬웨어 피해를 입었습니다.\n- 3월 18일 데이터 유출로 피해가 확대됐습니다.\n- 아시아 소재 반도체 서비스 협력사로 사이버 리스크가 확산되는 양상입니다.',
    keywords: ['Trio-Tech', '랜섬웨어', '싱가포르', '데이터 유출'], tags: ['랜섬웨어', '공급사 피해'],
    why: '테스트 서비스 협력사의 연이은 랜섬웨어 피해는 반도체 공급망 전반이 사이버 공격의 표적이 되고 있음을 보여줍니다. 자회사를 통한 침해는 그룹 전체의 데이터·운영으로 번질 수 있어 공급 지속성에 리스크가 됩니다. 공격이 특정 기업이 아닌 업종 생태계로 확산되는 패턴을 경계해야 함을 시사합니다.' }),
  mk({ id: 'demo-n45', title: '랜섬웨어 그룹 Incransom, 반도체용 PFA·PVDF 부품 공급사 Fit-Line 공격 주장', source: 'DeXpose', date: '2026-01-13', category: 'cyber', severity: 'medium', region: '글로벌', impact: 50,
    url: 'https://www.dexpose.io/?p=21389', entities: ['demo-entegris'],
    summary: '- 랜섬웨어 그룹 Incransom이 반도체용 PFA·PVDF 부품 공급사 Fit-Line Global 공격을 주장했습니다.\n- PFA·PVDF는 고순도 유체 이송 부품의 핵심 소재입니다.\n- 소재·부품 협력사까지 사이버 공격 대상이 확산되고 있습니다.\n- ※ 출처 신뢰도: 공격 그룹의 주장 단계 — 피해 확정 전 정보.',
    keywords: ['Incransom', 'PFA', 'PVDF', 'Fit-Line'], tags: ['랜섬웨어', '소재사 피해'],
    why: 'PFA·PVDF 고순도 유체 부품 공급사가 표적이 됐다는 것은 사이버 리스크가 소재·부품 하단까지 내려갔음을 보여줍니다. 공격 그룹의 주장 단계 정보지만, 사실이면 공정용 유체 부품 조달에 차질을 줄 수 있습니다. 피해 확정 전이라도 공급사 보안 상태를 선제 점검할 근거가 되는 위협 인텔리전스입니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // K. 기술 & 지식재산권 (카테고리 카드 보강) — N46~N49
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n46', title: '삼성 18나노 D램 공정정보 CXMT 유출 전 엔지니어에 징역 7년', source: '파이낸셜뉴스', date: '2026-04-22', category: 'tech', severity: 'high', region: '국내', impact: 72,
    url: 'https://www.fnnews.com/news/202604221451132452',
    summary: '- 삼성 18나노 D램 공정 정보를 중국 CXMT에 유출한 전 삼성 엔지니어에게 징역 7년이 선고됐습니다.\n- 핵심 공정 기술의 해외 유출에 대한 사법적 제재가 내려졌습니다.\n- 기술 보안·영업비밀 보호가 공급망 경쟁력의 핵심 변수로 부각됩니다.\n- ※ 1심 판결 — 항소심 진행 중.',
    keywords: ['삼성', '18나노 D램', '기술 유출', 'CXMT'], tags: ['기술 유출', '영업비밀'],
    why: '핵심 공정 기술의 중국 경쟁사 유출은 기술 격차라는 공급망 경쟁력의 근간을 위협하는 리스크입니다. 징역 7년 선고는 사안의 중대성을 보여주지만, 유출 자체는 이미 발생한 피해로 되돌리기 어렵습니다. 인적 보안·영업비밀 관리가 기술·지식재산 리스크의 최전선임을 드러내는 사례입니다.' }),
  mk({ id: 'demo-n47', title: '미 ITC, 삼성 HBM·DDR5 대상 두 번째 337조 조사 개시…구글·엔비디아·브로드컴 고객사 명시', source: 'Longbridge', date: '2026-07-16', category: 'tech', severity: 'high', region: '미국', impact: 70,
    url: 'https://longbridge.com/news/292894441.md',
    summary: '- 미 ITC가 삼성 HBM·DDR5를 대상으로 두 번째 337조 조사를 개시했습니다.\n- 구글·엔비디아·브로드컴 등 고객사도 조사 대상에 명시됐습니다.\n- 특허 분쟁이 메모리 핵심 제품과 주요 고객으로 확대되는 사안입니다.',
    keywords: ['ITC', '337조', 'HBM', 'DDR5', '특허'], tags: ['특허 분쟁', '수입 규제'],
    why: 'ITC 337조 조사는 침해 판정 시 미국 내 수입 금지로 이어질 수 있어 HBM·DDR5의 대미 공급에 직접적 리스크가 됩니다. 고객사(구글·엔비디아 등)까지 명시된 것은 분쟁 여파가 공급망 다운스트림 전체로 번질 수 있음을 뜻합니다. 지식재산 분쟁이 통상·수입 규제와 결합해 공급 차질로 전이되는 경로를 보여줍니다.' }),
  mk({ id: 'demo-n48', title: '삼성·넷리스트, 5년 특허 라이선스·메모리 공급·기술협력 계약으로 분쟁 종결', source: 'SammyGuru', date: '2026-08-05', category: 'tech', severity: 'low', region: '글로벌', impact: 40,
    url: 'https://sammyguru.com/samsung-netlist-patent-dispute-settlement/',
    summary: '- 삼성과 넷리스트가 특허 라이선스·메모리 공급·기술협력을 포함한 5년 계약으로 분쟁을 종결했습니다.\n- 장기간 이어진 메모리 특허 분쟁이 합의로 마무리됐습니다.\n- 특허 리스크가 해소되는 긍정적 상태 전환을 보여주는 사례입니다.',
    keywords: ['삼성', '넷리스트', '특허 합의', '라이선스'], tags: ['분쟁 종결', '리스크 해소'],
    why: '장기 특허 분쟁이 라이선스 계약으로 종결된 것은 지식재산 리스크가 실제로 해소되는 긍정적 상태 전환입니다. 합의는 소송 불확실성을 제거하고 메모리 공급·기술협력의 안정적 기반을 마련합니다. 리스크가 발생·확대만 하는 것이 아니라 관리를 통해 해소될 수 있음을 보여주는 대조 사례입니다.' }),
  mk({ id: 'demo-n49', title: 'HBM 호황 속 특허괴물(NPE) 삼성·SK 공세 강화…삼성 2024년 미국서 특허소송 86건 피소', source: 'TrendForce', date: '2026-03-17', category: 'tech', severity: 'medium', region: '글로벌', impact: 58,
    url: 'https://www.trendforce.com/news/?p=54589',
    summary: '- HBM 호황을 틈타 특허괴물(NPE)의 삼성·SK 대상 공세가 강화되고 있습니다.\n- 삼성은 2024년 미국에서 특허소송 86건에 피소됐습니다.\n- 고수익 제품을 겨냥한 특허 리스크가 구조적으로 증가하는 동향입니다.',
    keywords: ['특허괴물', 'NPE', 'HBM', '특허소송'], tags: ['특허 리스크', 'NPE'],
    why: 'HBM 같은 고수익 제품은 특허괴물의 주요 표적이 되어 소송 비용과 라이선스 부담을 구조적으로 키웁니다. 연 86건 피소는 개별 사건이 아닌 상시적 리스크 환경을 보여줍니다. 지식재산 분쟁 대응이 제품 수익성과 공급 안정성에 영향을 주는 운영 비용으로 자리잡았음을 시사합니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // L. 자연재해 & 기후 (카테고리 카드 보강) — N50~N52
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n50', title: '구마모토 M7.1 지진으로 TEL 공장 가동 중단…후지필름 대피, 호리바·소니·르네사스 피해 점검', source: 'TrendForce', date: '2026-07-29', category: 'disaster', severity: 'high', region: '일본', impact: 80,
    url: 'https://www.trendforce.com/news/?p=61664', entities: ['demo-tokyo-electron'],
    summary: '- 구마모토 M7.1 지진으로 도쿄일렉트론(TEL) 공장이 가동을 중단했습니다.\n- 후지필름 소재공장이 대피하고 호리바·소니·르네사스가 피해를 점검 중입니다.\n- 일본 반도체 소재·장비 집적지의 지진 피해가 공급망 전반에 파급되는 사안입니다.',
    keywords: ['구마모토', '지진', 'TEL', '가동 중단'], tags: ['자연재해', '가동 중단'],
    why: '구마모토는 일본 반도체 소재·장비 핵심 집적지라, M7.1 지진에 따른 TEL·후지필름 등의 가동 중단은 장비·소재 공급에 직접 타격을 줍니다. 지진은 예측·회피가 불가능한 리스크로, 특정 지역 집중이 곧바로 공급망 단절로 이어집니다. 핵심 협력사의 지리적 집중이 자연재해 리스크를 증폭시키는 전형적 사례입니다.' }),
  mk({ id: 'demo-n51', title: '구마모토 지진으로 반도체·자동차 공장 연쇄 중단…일본 제조업 전반 파급 우려', source: '경향신문(영문)', date: '2026-07-30', category: 'disaster', severity: 'high', region: '일본', impact: 76,
    url: 'https://www.khan.co.kr/en/article/202607301552027',
    summary: '- 구마모토 지진으로 반도체·자동차 공장이 연쇄 중단됐습니다.\n- 일본 제조업 전반으로 피해가 파급될 수 있다는 우려가 제기됐습니다.\n- 단일 지역 재해가 다수 산업의 공급망으로 확산되는 양상입니다.',
    keywords: ['구마모토', '지진', '연쇄 중단', '일본 제조업'], tags: ['자연재해', '연쇄 파급'],
    why: '지진 피해가 반도체를 넘어 자동차 등 제조업 전반으로 번지는 것은 집적지 재해의 광범위한 파급력을 보여줍니다. 산업 간 공급망이 얽혀 있어 한 지역의 재해가 복수 산업의 생산 차질로 연쇄됩니다. N50과 함께 구마모토 재해의 공급망 영향 범위를 입체적으로 보여주는 보도입니다.' }),
  mk({ id: 'demo-n52', title: '구마모토 지진 사망 36명·이재민 9천여 명…TSMC 1공장 전면 중단 후 순차 재가동', source: 'JKN', date: '2026-08-05', category: 'disaster', severity: 'medium', region: '일본', impact: 64,
    url: 'https://news.jkn.co.kr/post/952417',
    summary: '- 구마모토 지진으로 사망 36명, 이재민 9,000명 이상의 인명 피해가 발생했습니다.\n- TSMC 구마모토 1공장이 전면 가동 중단 후 순차 재가동에 들어갔습니다.\n- 재해 복구와 생산 재개 상황을 보여주는 후속 보도입니다.\n- ※ 출처 신뢰도: 기사 이미지 AI 생성 — 수치는 N50·N51과 교차확인 필요.',
    keywords: ['구마모토', '지진', 'TSMC', '순차 재가동'], tags: ['자연재해', '복구·재가동'],
    why: 'TSMC 구마모토 공장의 전면 중단 후 순차 재가동은 재해 리스크가 생산 중단에서 복구 단계로 이행하고 있음을 보여줍니다. 다만 순차 재가동은 완전 정상화까지 시간이 걸려 당분간 공급 차질이 이어질 수 있습니다. 수치는 AI 생성 이미지 출처라 교차검증이 필요하며, 재해의 회복 경로를 보여주는 후속 동향입니다.' }),
  // ══════════════════════════════════════════════════════════════════════════════
  // M. 정치·통상 / 경쟁사 / 브롬 공급망 (P1~P3 시나리오용) — N53~N63
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n53', title: '트럼프 측근들 "신규 관세가 중간선거 생활비 메시지 덮는다" 우려…2월 대법원 판결로 관세 체계 상당 부분 무효', source: 'The Daily Beast', date: '2026-07-24', category: 'geopolitical', severity: 'medium', region: '미국', impact: 58,
    url: 'https://www.thedailybeast.com/trump-allies-panic-that-hes-creating-a-political-disaster-by-reintroducing-tariffs-ahead-of-midterms/',
    summary: '- 2월 대법원이 대통령 관세 체계의 상당 부분을 위법으로 판단한 뒤, 행정부가 관세 체계 재구축에 나섰습니다.\n- 캐나다산 약 200억 달러 규모 제품에 50%, 복제약에 100% 관세를 매기겠다는 신규 위협이 이어지고 있습니다.\n- 공화당 내부에서는 신규 관세가 11월 중간선거의 생활비 중심 메시지를 덮을 것이라는 우려가 나왔습니다(Politico 인용).',
    keywords: ['중간선거', '관세', '대법원 판결', '생활비'], tags: ['정치 일정', '관세 정책'],
    why: '중간선거를 앞두고 관세가 정치적 부담으로 인식되기 시작했다는 것은 소비재 관세의 확대 여지가 줄어든다는 뜻입니다. 동시에 대법원 판결로 기존 관세 권한이 제한되면서, 행정부는 다른 법적 근거와 다른 품목으로 압박 수단을 옮길 유인이 커집니다. 개별로는 관세 완화 신호로 읽히지만, 어떤 품목이 정치적 비용이 낮은 압박 수단으로 선택될지를 함께 봐야 하는 뉴스입니다.' }),
  mk({ id: 'demo-n54', title: '대법원 판결 이후 1974년 무역법 근거로 60개국에 10~12.5% 신규 관세 부과', source: 'AP (Action News Jax)', date: '2026-07-23', category: 'geopolitical', severity: 'high', region: '미국', impact: 70,
    url: 'https://www.actionnewsjax.com/news/latest-trump-says/TW6GSZHDJU2ENFDCYS3V3QXVWI/',
    summary: '- 행정부가 1974년 무역법 301조를 근거로 60개 교역국에 10~12.5%의 신규 관세를 부과했습니다.\n- 대상국은 미국 수입의 약 99%를 차지하며, 7월 24일 만료된 122조 임시 관세(10%)를 대체합니다.\n- 2월 대법원이 IEEPA 기반 관세를 무효화한 뒤, 다른 법적 근거로 관세 체계를 재구축하는 흐름입니다.',
    keywords: ['무역법 301조', '신규 관세', '대법원', '122조'], tags: ['관세 재구축', '법적 근거 전환'],
    why: '대법원 판결로 관세 권한이 제한됐지만, 행정부는 다른 법적 근거를 찾아 사실상 전 교역국에 관세를 다시 부과했습니다. 관세 정책이 축소되기보다 수단을 바꿔 지속된다는 점에서, 반도체 등 개별 품목 관세도 별도 근거로 추진될 수 있음을 시사합니다. 301조 관세 역시 소송 리스크가 있어 정책 불확실성이 장기화될 가능성이 큽니다.' }),
  mk({ id: 'demo-n55', title: '러트닉 상무장관 "반도체 관세율, 대미 투자 규모와 연동 검토"…TSMC는 애리조나에 2,650억 달러 투자', source: 'TrendForce', date: '2026-09-04', category: 'geopolitical', severity: 'high', region: '미국', impact: 74,
    url: 'https://www.trendforce.com/news/2026/09/04/news-u-s-chip-tariffs-could-hinge-on-investment-scale-whats-at-stake-for-tsmc-samsung-sk-hynix/',
    summary: '- 러트닉 상무장관이 CNBC 인터뷰에서 반도체 관세율을 대미 투자 규모와 연동하는 방안을 검토 중이라고 밝혔습니다.\n- 건설 기간에는 계획된 미국 내 생산능력의 2.5배, 가동 후에는 1.5배까지 무관세 수입을 허용하는 구조가 거론됩니다.\n- TSMC는 애리조나에 2,650억 달러 규모 투자를 발표했으며, 한국에서 생산한 칩에도 같은 면제가 적용될지는 불확실합니다.',
    keywords: ['러트닉', '반도체 관세', '투자 연동', 'TSMC'], tags: ['반도체 관세', '투자 요구'],
    why: '관세율이 투자 규모에 연동되면 관세는 사실상 대미 투자를 끌어내는 협상 수단이 됩니다. TSMC의 2,650억 달러 투자가 기준점이 되면, 경쟁사들은 비슷한 규모로 투자하지 않는 한 불리한 관세를 감수해야 합니다. 한국 메모리 업체는 미국 내 메모리 생산 거점이 없어 이 면제 구조에서 특히 불리할 수 있습니다.' }),
  mk({ id: 'demo-n56', title: '한미 합의서 반도체 관세율은 미정…한국, "대만보다 불리하지 않은 대우" 조항으로 대응', source: 'The Korea Herald', date: '2026-01-19', category: 'geopolitical', severity: 'medium', region: '국내', impact: 62,
    url: 'https://www.koreaherald.com/article/10657692',
    summary: '- 미국의 반도체 관세 위협이 재부상하자, 정부가 한미 공동 팩트시트의 "불리하지 않은 대우" 조항을 근거로 대응에 나섰습니다.\n- 지난해 한미 무역합의에서 다수 품목은 15% 관세로 정리됐지만, 반도체 관세율은 미정으로 남았습니다.\n- 정부는 최근 미국-대만 합의(대만 기업 2,500억 달러 투자로 면세 한도 확보)를 분석해 미국과 협의할 계획입니다.',
    keywords: ['한미 합의', '반도체 관세', '불리하지 않은 대우', '미국-대만 합의'], tags: ['통상 협상', '안전판'],
    why: '"대만보다 불리하지 않은 대우" 조항은 안전판처럼 보이지만, 대만의 관세 혜택은 대규모 대미 투자와 연동돼 있습니다. 이 기준을 그대로 적용하면 한국 기업에도 비슷한 규모의 투자가 사실상 요구될 수 있습니다. 반도체 관세율이 미정으로 남아 있는 한 삼성·SK하이닉스의 대미 수출 원가와 투자 계획에 불확실성이 이어집니다.' }),
  mk({ id: 'demo-n57', title: '삼성 테일러 1팹 연내 가동 예정…2024년 배정된 CHIPS 보조금 47.45억 달러는 아직 미수령', source: 'SamMobile', date: '2026-08-19', category: 'supply', severity: 'medium', region: '미국', impact: 60,
    url: 'https://www.sammobile.com/news/samsung-racing-ahead-to-complete-work-on-its-second-texas-chip-factory/',
    summary: '- 삼성 테일러 1팹이 연내 가동을 목표로 하고 있으며, 2팹 기초 공사도 상당 부분 진행됐습니다.\n- 2024년 배정된 CHIPS 보조금 47.45억 달러는 아직 받지 못했으며, 프로젝트 마일스톤 달성에 따라 지급될 예정입니다.\n- 2팹은 연내 착공, 2030년 양산을 목표로 하고 있습니다.',
    keywords: ['삼성', '테일러 팹', 'CHIPS 보조금', '미국 투자'], tags: ['미국 거점', '보조금 미수령'],
    why: '보조금을 받기 전에 팹 가동과 추가 투자를 먼저 진행한다는 것은, 이미 투자를 집행한 쪽의 협상력이 약해지는 구조를 뜻합니다. 보조금 지급이 마일스톤 달성에 연동돼 있어, 미국 정부는 관세·투자 협상에서 지급 조건을 지렛대로 쓸 수 있습니다. 개별로는 프로젝트 진척이지만 대미 통상 협상과 함께 봐야 하는 사안입니다.' }),
  mk({ id: 'demo-n58', title: 'CXMT, 64GB 서버 DDR5를 삼성보다 비싸게 판매…증설 시 월 60만 장 이상 생산 가능', source: 'Guru3D (Reuters 인용)', date: '2026-07-24', category: 'tech', severity: 'high', region: '중국', impact: 70,
    url: 'https://www.guru3d.com/story/chinese-memory-makers-gain-pricing-power-as-cxmt-and-ymtc-expand/',
    summary: '- 로이터에 따르면 CXMT가 동급 64GB 서버 DDR5 모듈을 삼성(약 1,240달러)보다 높은 가격에 판매했습니다.\n- 바이트댄스와 70억 달러 이상, 텐센트와 30억 달러 이상 규모의 공급 계약을 맺은 것으로 보도됐습니다(회사 측 미확인).\n- 상하이·허페이 증설이 완료되면 생산능력이 월 60만 장 이상으로 두 배 넘게 늘 수 있습니다.',
    keywords: ['CXMT', 'DDR5', '가격 결정력', '증설'], tags: ['경쟁사 동향', '가격 결정력'],
    why: '저가 대체재로 여겨지던 CXMT가 삼성보다 높은 가격을 받는다는 것은, AI 수요발 공급 부족 속에서 가격 결정력을 확보했다는 의미입니다. 대형 고객 장기 계약과 생산능력 두 배 확대 계획이 겹치면, 공급 부족이 풀리는 시점에 범용 D램 시장의 가격 경쟁이 급격히 심해질 수 있습니다. 현재의 호황이 경쟁 구도 변화를 가리고 있다는 점이 핵심입니다.' }),
  mk({ id: 'demo-n59', title: '"D램 가격 30% 낮은 CXMT, 증설·공정 고도화 시 K-메모리 최대 위협"…수율 40~50%→80~90%면 경쟁력 급상승', source: '이데일리', date: '2026-07-22', category: 'tech', severity: 'medium', region: '중국', impact: 62,
    url: 'https://en.edaily.co.kr/news/eda202607215657/',
    summary: '- CXMT가 DDR4에서 DDR5로 전환 중이며, 현재 수율은 40~50% 수준으로 알려졌습니다.\n- CXMT의 D램 평균판매가격은 삼성·SK하이닉스·마이크론보다 약 30% 낮은 것으로 추정됩니다.\n- 수율이 80~90%로 오르고 증설이 진행되면 범용 D램 가격 공세가 본격화될 수 있다는 우려가 제기됐습니다.',
    keywords: ['CXMT', '수율', '범용 D램', '가격 공세'], tags: ['경쟁사 동향', '가격 압박'],
    why: '수율은 CXMT의 원가 경쟁력을 좌우하는 핵심 변수로, 40~50%에서 80~90%로 개선되면 저가 공세를 지속할 여력이 크게 높아집니다. 평균판매가격이 이미 30% 낮은 상황에서 증설까지 더해지면 범용 D램 가격의 하방 압력이 커집니다. 향후 수율 개선 속도가 범용 D램 시장의 경쟁 구도를 가를 변수입니다.' }),
  mk({ id: 'demo-n60', title: 'CXMT, 1Q26 D램 매출 점유율 7.6%로 세계 4위…17nm DDR5 수율 90% 달성 보도', source: 'TrendForce', date: '2026-08-18', category: 'tech', severity: 'medium', region: '중국', impact: 64,
    url: 'https://www.trendforce.com/news/2026/08/18/news-cxmt-ddr5-reportedly-tops-9000-mts-on-amd-platform-narrowing-performance-gap-with-global-leaders/',
    summary: '- CXMT의 1Q26 D램 매출 점유율은 7.6%로 세계 4위입니다.\n- CXMT의 17nm급 DDR5 수율이 90%에 도달했다는 보도가 나왔습니다(회사 측 미확인).\n- CXMT DDR5가 AMD 플랫폼에서 9,000MT/s를 넘기는 등 글로벌 선두와의 성능 격차도 좁혀지고 있습니다.',
    keywords: ['CXMT', '점유율', 'DDR5 수율', '성능 격차'], tags: ['경쟁사 동향', '점유율 확대'],
    why: '점유율 4위 진입과 수율 90% 보도는 CXMT가 기술과 규모 양면에서 기존 3강을 추격하고 있음을 보여줍니다. 수율이 실제로 90% 수준이라면 원가 경쟁력이 빠르게 개선돼 범용 D램 가격 압박이 앞당겨질 수 있습니다. 수율 수치는 회사 측 확인이 없는 보도인 만큼 후속 지표로 검증이 필요합니다.' }),
  mk({ id: 'demo-n61', title: '한국 브롬 수입 97.5% 이스라엘산…이란 미사일, ICL 사해 시설 35km 이내 타격', source: 'War on the Rocks', date: '2026-04-14', category: 'material', severity: 'high', region: '중동', impact: 80,
    url: 'https://warontherocks.com/the-bromine-chokepoint-how-strife-in-the-middle-east-could-halt-production-of-the-worlds-memory-chips/',
    summary: '- 한국은 브롬 수입의 97.5%를 이스라엘에서 들여오고 있습니다.\n- 브롬은 D램·낸드 식각에 쓰이는 브롬화수소(HBr) 가스의 원료이며, ICL은 사해 소돔 시설에서 채취와 반도체급 전환을 함께 수행합니다.\n- 이란 미사일이 ICL 사해 시설 35km 이내 지역을 타격하며 공급 중단 우려가 커졌습니다.\n- 반도체급 HBr 전환 설비를 새로 짓는 데는 인허가·장비·인증에 수년이 걸립니다.',
    keywords: ['브롬', 'HBr', '이스라엘', 'ICL', '사해'], tags: ['단일 의존', '식각 소재'],
    why: '한국 브롬 수입의 97.5%가 이스라엘 한 곳에 집중돼 있고, 채취와 반도체급 전환이 같은 시설에서 이뤄져 단일 시설 타격이 곧 공급 중단으로 이어질 수 있습니다. HBr은 D램·낸드 식각에 필수적인 가스로, 전환 설비를 새로 짓는 데 수년이 걸려 단기 대체가 사실상 어렵습니다. 이스라엘 물동량은 호르무즈를 거치지 않아 호르무즈 중심 모니터링에서 놓치기 쉬운 리스크입니다.' }),
  mk({ id: 'demo-n62', title: '국내 칩메이커의 헬륨 물량 확보 및 HBr 원료 브롬의 이스라엘 집중', source: 'TrendForce', date: '2026-04-17', category: 'material', severity: 'high', region: '일본', impact: 74,
    url: 'https://www.trendforce.com/news/2026/04/17/news-korea-chip-supply-risks-rise-material-disruptions-may-outweigh-energy-uncertainty-israeli-bromine-imports-at-97-5/',
    summary: '- 국내 칩메이커들이 헬륨 물량을 확보해 6월까지는 가동을 유지할 수 있는 것으로 나타났습니다.\n- 다만 헬륨 외에도 브롬 등 여러 소재가 공급망 리스크로 지목됐습니다.\n- 한국무역협회 분석에 따르면 한국의 HBr 수입은 일본(47.1%)과 미국(23.5%)이 주요 공급원이지만, 최대 공급국인 일본도 액체 브롬 수입의 70% 이상을 이스라엘에 의존합니다.\n- 세계 액체 브롬 생산은 이스라엘(46.5%)과 요르단(25.6%)에 집중돼 있으며, 무역협회는 브롬을 공급 안정 관리 핵심 품목으로 분류했습니다.',
    keywords: ['헬륨', 'HBr', '브롬화수소', '이스라엘 브롬'], tags: ['헬륨 확보', '상류 집중'],
    why: '헬륨은 대체 물량을 확보해 6월까지 가동을 유지할 수 있지만, 확보 물량이 소진된 이후에는 대체 공급원의 실제 입고 여부가 관건이 됩니다. 한편 HBr 수입선은 일본·미국으로 나뉘어 있어 겉으로는 다변화된 것처럼 보이지만, 일본의 원료 브롬 역시 대부분 이스라엘산입니다. 1차 공급선의 국적만으로 집중도를 판단하면 상류 원료의 단일 의존을 놓칠 수 있습니다.' }),
  mk({ id: 'demo-n63', title: '후티, 사우디 해상봉쇄 선언 후 바브엘만데브서 화물선 티하마호 공격…사망자 6명', source: 'Container News', date: '2026-08-12', category: 'logistics', severity: 'high', region: '중동', impact: 72,
    url: 'https://container-news.com/death-toll-rises-to-six-after-houthi-attack-on-tihamah-in-bab-el-mandeb/', entities: ['redsea-babelmandeb'],
    summary: '- 8월 11일 바브엘만데브 해협 페림섬 인근에 정박 중이던 화물선 티하마(Tihamah)호가 후티의 공격을 받았습니다.\n- 승조원 4명과 구조대원 2명 등 6명이 숨졌으며, 이란 전쟁 이후 후티와 연계된 첫 해운 사망 사고입니다.\n- 후티는 7월 20일 사우디 항만·선박에 대한 해상봉쇄를 선언한 뒤 사우디 관련 선박 공격을 이어가고 있습니다.',
    keywords: ['후티', '바브엘만데브', '티하마호', '해상봉쇄'], tags: ['홍해 리스크', '선박 피격'],
    why: '후티가 사우디 해상봉쇄를 선언한 뒤 실제 사망자가 나오는 공격으로 이어지면서 홍해·바브엘만데브 항로의 위험이 다시 높아졌습니다. 선사들이 수에즈 항로 복귀를 늘리는 시점이라 피격 위험에 노출되는 선박이 오히려 늘어날 수 있습니다. 개별로는 사우디 관련 이슈로 보이지만, 수에즈·홍해를 거쳐 아시아로 오는 화물 전반에 영향을 줄 수 있습니다.' }),
  // ══════════════════════════════════════════════════════════════════════════════
  // N. WF6 공급 중단 / 헬륨 운송 컨테이너 (G1·H1 시나리오용) — N73~N75, N80~N81
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n73', title: '일본 칸토덴카·센트럴글래스의 7월 WF6 생산 중단 발표', source: '더구루', date: '2026-06-15', category: 'material', severity: 'high', region: '일본', impact: 84,
    url: 'https://theguru.co.kr/news/article.html?no=103073',
    summary: '- 일본 칸토덴카와 센트럴글래스가 7월 1일부터 육불화텅스텐(WF6) 생산을 중단한다고 밝혔습니다.\n- 두 회사는 글로벌 WF6 공급의 약 25%를 차지하며, 중국의 대일 핵심광물 수출통제로 원료 텅스텐 조달에 차질이 생긴 것이 원인입니다.\n- 삼성전자·SK하이닉스 등 국내 반도체 기업의 WF6 조달에도 영향이 불가피할 전망입니다.\n- ※ 센트럴글래스가 이후 고객 주문 대응에 필요한 원료를 확보했다고 밝혔다는 보도도 있어 후속 확인이 필요합니다.',
    keywords: ['WF6', '칸토덴카', '센트럴글래스', '생산 중단'], tags: ['공급 중단', '원료 조달 차질'],
    why: '텅스텐 가격 급등과 중국의 대일 수출통제가 일본 WF6 제조사의 원료 조달 경로에서 겹치며, 가격 문제가 실제 생산 중단으로 현실화됐습니다. 글로벌 공급의 약 25%가 한꺼번에 빠지면서 남은 공급사로 수요가 몰려 단가와 물량 부담이 동시에 커집니다. WF6는 DRAM·V-NAND 배선 증착에 필수적이고 공급원 전환에 긴 인증 기간이 필요해, 단기 대체가 어려운 공급 공백입니다.' }),
  mk({ id: 'demo-n74', title: 'WF6 가격 전년 대비 232.7% 상승 및 국내 공급사 70~90% 단가 인상 통보', source: '더구루', date: '2026-06-10', category: 'material', severity: 'high', region: '국내', impact: 76,
    url: 'https://theguru.co.kr/news/article.html?no=102878', entities: ['demo-sk-specialty', 'demo-foosung'],
    summary: '- 중국 내 5N급 WF6 가격이 kg당 1,670~1,810위안으로 전년 대비 232.7% 상승했습니다.\n- SK스페셜티·후성 등 국내 WF6 공급사는 반도체 제조사에 공급 단가를 70~90% 인상하겠다고 통보했습니다.\n- 일본 공급 이탈로 국내 공급사에 대체 수요가 몰리면서 가격과 물량 부담이 함께 커지고 있습니다.',
    keywords: ['WF6', '가격 상승', '단가 인상', '대체 조달'], tags: ['원가 상승', '대체 조달'],
    why: '일본산 WF6 공급 이탈 이후 국내 공급사로의 대체가 진행되고 있지만, 대체 조달은 70~90%의 단가 인상을 동반합니다. 중국 시장 가격이 1년 새 세 배 이상 오른 만큼 원료 원가 부담이 공급사 단가로 계속 전가될 가능성이 큽니다. 대체 공급선은 확보되더라도 원가 측면의 충격은 장기화될 수 있습니다.' }),
  mk({ id: 'demo-n75', title: 'WF6 공급원 전환 시 18~24개월 인증 기간 소요에 따른 대체 지연', source: 'Payne Institute', date: '2026-07-13', category: 'material', severity: 'medium', region: '글로벌', impact: 64,
    url: 'https://payneinstitute.mines.edu/chinas-tungsten-controls-expose-a-semiconductor-chokepoint/',
    summary: '- 중국의 텅스텐 원료 통제가 반도체 공정 가스인 WF6의 공급 병목으로 드러났다는 분석입니다.\n- 반도체 제조사가 WF6 공급원을 바꾸려면 18~24개월의 인증 기간이 필요해 단기 대체가 어렵습니다.\n- 일본 공급 이탈 이후 대체 공급원 확보가 늦어질 수 있다는 점이 지적됐습니다.\n- ※ 출처 유형: 연구기관 분석',
    keywords: ['WF6', '인증 기간', '공급원 전환', '텅스텐 통제'], tags: ['대체 지연', '인증 리스크'],
    why: '공급원을 바꾸는 데 18~24개월의 인증 기간이 필요하다는 것은, 일본산 공급 공백을 새 공급사로 메우는 데 최소 1년 반 이상이 걸린다는 뜻입니다. 그 기간 동안에는 기존 인증 공급사의 증설과 단가 인상에 의존할 수밖에 없습니다. 공급사별 인증 일정이 실제 대체 시점을 결정하는 핵심 변수입니다.' }),
  mk({ id: 'demo-n80', title: '헬륨 운송용 ISO 컨테이너의 페르시아만 내 발 묶임 및 유통 수량 감소', source: 'ASP Isotopes (보도자료)', date: '2026-06-23', category: 'logistics', severity: 'medium', region: '중동', impact: 58,
    url: 'https://www.barchart.com/story/news/2601747/asp-isotopes-inc-announces-that-a-subsidiary-of-renergen-limited-has-entered-into-its-first-take-or-pay-contract-for-the-supply-of-contained-helium-to-be-produced-at-the-virginia-gas-project-in-south-africa', entities: ['hormuz-strait'],
    summary: '- ASP Isotopes 자회사(Tetra4)가 남아공 버지니아 가스 프로젝트에서 생산할 헬륨에 대해 아시아 산업가스 업체와 5년 테이크오어페이 계약을 체결했습니다.\n- 헬륨 운송용 ISO 컨테이너가 페르시아만 안에 묶이면서 시장에 유통되는 컨테이너 수가 줄었다는 점이 언급됐습니다.\n- 대체 헬륨 공급원 확보와 함께 운송 장비 제약이 수급 변수로 떠오르고 있습니다.\n- ※ 출처 유형: 기업 보도자료 — ISO 컨테이너 관련 내용은 원문 교차확인 필요',
    keywords: ['헬륨', 'ISO 컨테이너', '페르시아만', '테이크오어페이'], tags: ['운송 장비 제약', '대체 공급원'],
    why: '헬륨은 극저온 ISO 컨테이너로만 운송할 수 있어, 컨테이너가 페르시아만에 묶이면 다른 지역의 대체 물량도 운송 수단 부족을 겪게 됩니다. 새 공급 계약이 체결되더라도 컨테이너가 부족하면 실제 입고량이 계약량에 못 미칠 수 있습니다. 개별로는 특수 컨테이너에 국한된 물류 이슈지만, 헬륨 대체 조달 전반의 병목이 될 수 있습니다.' }),
  mk({ id: 'demo-n81', title: '헬륨 공용기 재배치 차질에 따른 역물류 문제 부상', source: 'Horn Review', date: '2026-04-09', category: 'logistics', severity: 'medium', region: '글로벌', impact: 54,
    url: 'https://hornreview.org/2026/04/09/helium-geopolitics-scarcity-and-ethiopias-strategic-window/',
    summary: '- 아시아로 향하던 헬륨 공급이 경로를 바꾸면서 대체 생산지와 운송망에 부담이 커지고 있다는 분석입니다.\n- 헬륨 해상 운송에는 수량이 한정된 ISO 극저온 컨테이너가 필요하며, 빈 용기를 제때 재배치하지 못하는 "역물류 위기"가 헬륨 부족만큼 중요한 문제로 지적됐습니다.\n- 운송 경로가 길어질수록 증발 손실도 커집니다.\n- ※ 출처 유형: 분석 매체',
    keywords: ['헬륨', 'ISO 극저온 컨테이너', '역물류', '공용기'], tags: ['역물류', '운송 장비 제약'],
    why: '빈 컨테이너를 회수·재배치하지 못하면 헬륨을 확보하더라도 운송할 용기가 부족해집니다. 운송 경로가 길어질수록 용기 회전이 느려지고 증발 손실까지 커져, 실제 공급 가능 물량이 줄어듭니다. 업계 분석 수준의 경고지만, 헬륨 공급 리스크가 원료에서 운송 장비로 옮겨가는 신호입니다.' }),
  // ══════════════════════════════════════════════════════════════════════════════
  // O. 핵심광물 시한 연장·텅스텐 가격 반락 (S2 보완) — N82~N83
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n82', title: '미·중 무역 휴전 2027년 1월 10일까지 연장…확대 희토류 통제 유예 포함', source: 'CNBC', date: '2026-09-24', category: 'geopolitical', severity: 'medium', region: '글로벌', impact: 72,
    url: 'https://www.cnbc.com/2026/09/24/us-china-trade-truce-bessent-trump-xi.html', entities: ['demo-china-mineral'],
    summary: '- 베선트 미 재무장관이 미·중 무역 휴전을 2027년 1월 10일까지 연장한다고 밝혔습니다.\n- 연장 범위에는 중국의 확대 희토류 수출통제 유예도 포함된 것으로 전해졌습니다.\n- 11월 10일로 예정됐던 휴전·희토류 유예 시한이 약 두 달 늦춰졌습니다.\n- ※ 중국 측의 희토류 유예 연장 확인은 불분명하며, 일부 보도는 여전히 11월 10일을 시한으로 언급 — 교차확인 필요.',
    keywords: ['미중 휴전', '연장', '희토류 유예', '2027년 1월 10일'], tags: ['규제 시한', '수출 통제', '단기 연장'],
    why: '시한 연장으로 11월 10일 동시 만료 리스크는 1월로 이연됐지만, 통제가 철회된 것이 아니라 두 달 남짓 미뤄진 것이라 불확실성은 지속됩니다. 2025년 4월 7종 통제는 연장과 무관하게 유효하고, 갈륨 대미 금수 유예(11/27)의 연장은 확인되지 않았습니다. 시한이 짧게 반복 연장되는 구조는 매 시한마다 조달 계획을 재점검하게 만드는 부담입니다.' }),
  mk({ id: 'demo-n83', title: '텅스텐 APT 가격 3월 고점 대비 약 69% 하락…중국 수출통제는 지속', source: 'GlobeNewswire', date: '2026-10-20', category: 'material', severity: 'medium', region: '글로벌', impact: 60,
    url: 'https://www.financialcontent.com/article/gnwcq-2026-10-20-tungsten-gave-back-most-of-its-2026-rally-the-pentagons-january-deadline-stayed-put', entities: ['demo-china-mineral'],
    summary: '- 중국산 텅스텐 APT 가격이 10월 중순 기준 3월 고점 대비 약 69% 하락했습니다.\n- 가격은 내려왔지만 중국의 텅스텐 수출은 허가 업체 15곳으로 제한돼 있고, 대일 수출 중단도 이어지고 있습니다.\n- 미 국방부의 2027년 1월 중국산 텅스텐 조달 제한 시한은 그대로 유지됐습니다.\n- ※ 출처 유형: 기업 보도자료(GlobeNewswire 배포)',
    keywords: ['텅스텐', 'APT', '가격 하락', '수출통제'], tags: ['가격 반락', '물량 통제'],
    why: '가격 급등세는 꺾였지만 수출 허가 업체 제한과 대일 수출 중단 등 물량 통제는 유지돼, 리스크가 가격에서 물량·인증 쪽으로 옮겨가는 국면입니다. 원료 가격 하락이 WF6 단가에 반영되기까지는 시차가 있고, 이미 인상된 공급 단가가 바로 내려간다는 보장도 없습니다. 가격 지표만 보고 리스크 해소로 판단하지 않도록 통제 현황을 함께 추적해야 합니다.' }),
  // ══════════════════════════════════════════════════════════════════════════════
  // P. 수출 호황 이면의 장비·소부장 캐파 확보 경쟁 (C1 시나리오용) — N84~N88
  //    개별로는 업황 호조·상생 금융·산업 분석·제한적 관세로 '낮음' 판정, 묶어 보면 공급사 캐파 경쟁이 드러나는 구조
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n84', title: '10월 초순 수출 261억달러 102% 증가…반도체 제조장비 수입 208.8% 급증', source: '조세금융신문', date: '2026-10-12', category: 'supply', severity: 'low', region: '국내', impact: 38,
    url: 'https://www.tfmedia.co.kr/news/article.html?no=207901',
    summary: '- 관세청 잠정치 기준 10월 1~10일 수출은 261억 달러로 전년 같은 기간보다 102.0% 늘었습니다.\n- 반도체 수출은 122억 달러로 170.9% 증가하며 전체 수출의 46.7%를 차지했습니다.\n- 같은 기간 반도체 제조장비 수입은 8억4800만 달러로 208.8% 늘었습니다.\n- 반도체 투자가 늘면서 장비 수입이 함께 증가했다는 분석입니다.',
    keywords: ['10월 초순 수출', '반도체 수출', '반도체 제조장비 수입', '관세청'], tags: ['수출 호조', '설비 투자 확대'],
    why: '반도체 수출과 장비 수입이 함께 늘어난 것은 업황 호조와 설비 투자 확대를 보여주는 긍정적 지표로, 이 뉴스만으로는 공급망 리스크 신호가 아닙니다. 10일치 잠정치라 변동 폭도 큽니다. 다만 장비 수입 증가는 업계 전체의 장비 수요가 한꺼번에 늘고 있다는 뜻이라, 장비 조달 여건을 볼 때 참고할 만한 배경 지표입니다.' }),
  mk({ id: 'demo-n88', title: '[232조] 반도체 관세: 현행 25% 관세의 범위와 2단계 조치 전망', source: 'USKoreaTrade', date: '2026-10-17', category: 'geopolitical', severity: 'low', region: '미국', impact: 40,
    url: 'https://uskoreatrade.com/232%EC%A1%B0-%EB%B0%98%EB%8F%84%EC%B2%B4-%EA%B4%80%EC%84%B8/',
    summary: '- 미국 무역확장법 232조에 따른 현행 25% 반도체 관세(1단계)는 첨단 컴퓨팅 칩 등 매우 제한된 품목에만 적용됩니다.\n- 미국 내 데이터센터·연구개발·수리 교체 등 다수 용도는 예외로 인정됩니다.\n- 포고령은 협상 결과에 따라 2단계에서 반도체·반도체 제조장비·파생제품 전반으로 관세를 넓히고, 미국 내 투자 기업에 관세 상쇄 프로그램을 둘 수 있다고 밝히고 있습니다.\n- 2단계의 시점과 세율은 아직 정해지지 않았습니다.\n- ※ 출처 유형: 통상 정보 사이트 해설',
    keywords: ['232조', '반도체 관세', '25%', '2단계 조치'], tags: ['관세 정책', '통상 해설'],
    why: '현행 1단계 관세는 일부 첨단 컴퓨팅 칩에 한정돼 메모리 제조나 장비 조달에 직접 영향은 제한적이며, 2단계도 아직 발표 전인 전망 단계입니다. 이 해설만으로는 즉각적인 공급망 리스크로 보기 어렵습니다. 다만 2단계 적용 대상에 반도체 제조장비가 거론된다는 점은 미국 거점의 장비 반입 비용과 연결될 수 있어 지켜볼 만합니다.' }),
  mk({ id: 'demo-n86', title: 'SK하이닉스, 정부·금융권과 반도체 소부장 협력사에 2조원 보증 지원', source: '머니투데이', date: '2026-10-19', category: 'financial', severity: 'low', region: '국내', impact: 36,
    url: 'https://www.mt.co.kr/article/2026101909390358950',
    summary: '- SK하이닉스와 4대 시중은행이 1,000억 원을 출연하고, 한국무역보험공사가 그 20배인 2조 원 규모의 보증을 제공합니다.\n- 지원 대상은 SK하이닉스가 추천하는 반도체 소재·부품·장비 협력사로, 3년 만기 100% 보증과 금리 인하·보증료 지원을 받습니다.\n- 협력사는 지원 자금을 설비투자와 기술개발 등에 쓸 수 있습니다.\n- 정부는 반도체 분야 상생 무역금융을 최소 5조 원 이상으로 늘릴 계획입니다.',
    keywords: ['SK하이닉스', '소부장 협력사', '2조원 보증', '수출공급망 강화보증'], tags: ['상생 금융', '소부장 생태계'],
    why: '국내 소부장 협력사의 자금 여력을 키우는 상생 금융 프로그램으로, 협력사 재무 안정과 생태계 강화 측면에서는 긍정적인 소식입니다. 이 뉴스만으로는 삼성 공급망에 대한 리스크가 아닙니다. 다만 지원 대상이 경쟁사가 추천한 협력사라는 점에서, 지원 자금으로 늘어나는 생산능력이 어느 고객사에 먼저 배정될지는 볼 필요가 있습니다.' }),
  mk({ id: 'demo-n85', title: '10월 1~20일 수출 616억달러 역대 최대…반도체 222.5% 증가, 반도체 제조장비 수입 93.4% 증가', source: '국제뉴스', date: '2026-10-21', category: 'supply', severity: 'low', region: '국내', impact: 38,
    url: 'https://www.gukjenews.com/news/articleView.html?idxno=3727757',
    summary: '- 10월 1~20일 수출은 616억 달러로 전년 같은 기간보다 105.4% 늘어 역대 최대를 기록했습니다.\n- 반도체 수출은 275억 달러로 222.5% 증가했고, 전체 수출에서 차지하는 비중은 44.7%입니다.\n- 반도체 제조장비 수입은 18억4700만 달러로 93.4% 늘었습니다.\n- 조업일수가 13일로 지난해(10.5일)보다 2.5일 많았지만, 일평균 수출액도 65.9% 증가했습니다.',
    keywords: ['10월 수출', '반도체 222.5%', '반도체 제조장비 수입', '역대 최대'], tags: ['수출 호조', '설비 투자 확대'],
    why: '10월 중순까지 누적으로도 반도체 수출이 세 배 이상 늘어 업황 호조가 이어지고 있음을 확인해 주는 지표로, 그 자체로는 리스크가 아닙니다. 장비 수입이 두 배 가까이 늘어난 것도 투자 확대의 결과입니다. 다만 팹 가동률과 증설 투자가 함께 높아지는 국면에서는 장비·소재 공급사의 생산능력이 빠듯해질 수 있다는 점을 염두에 둘 만합니다.' }),
  mk({ id: 'demo-n87', title: '토스증권 "일본, 반도체 소재 약 50%·장비 약 30% 점유…검증된 공급사 교체 어려워"', source: '이투데이', date: '2026-10-22', category: 'supply', severity: 'low', region: '일본', impact: 34,
    url: 'https://www.etoday.co.kr/news/view/2638753',
    summary: '- 토스증권 리서치센터가 도쿄일렉트론·레이저텍·이비덴 등 일본 반도체 기업 10여 곳을 분석한 보고서를 냈습니다.\n- 일본이 주요 반도체 소재 시장의 약 50%, 장비 시장의 약 30%를 차지한다고 분석했습니다.\n- 반도체 제조사는 검증된 소재·장비 공급사를 쉽게 바꾸지 않아 진입장벽이 높다고 봤습니다.\n- 한국 메모리 기업의 HBM 생산이 늘면 일본 장비·소재 수요도 함께 늘어난다는 분석입니다.\n- ※ 출처 유형: 증권사 분석 보고서 소개 기사',
    keywords: ['토스증권', '일본 소부장', '소재 점유율 50%', '도쿄일렉트론'], tags: ['산업 분석', '일본 소부장'],
    why: '투자자 대상의 산업 분석으로, 일본 소부장의 시장 지위는 이미 알려진 구조라 새로운 공급 차질 신호는 아닙니다. 그 자체로는 리스크가 아닌 시장 정보입니다. 다만 공급사 교체가 어렵고 HBM 증산이 일본산 수요를 키운다는 점은, 수요가 몰릴 때 일본산 물량을 다른 곳에서 구하기 어렵다는 뜻이기도 합니다.' }),
]


// ─── AI 핵심 인사이트: 복합리스크 시나리오 15그룹 (G1·H1 + P1~P3 + C1 + X1~X5 + S1~S4) ────
// 정의 순서 = G1·H1 → P1~P2 → C1 → P3 → X1~X5 → S1~S4. 화면 노출은 DEMO_FEATURED_GROUP_IDS(X2 → C1 → S2)만 기본, 나머지는 기본 숨김.
// N11은 S2·S4에 동시 연결(N:M). N40은 X1·X2·P2, N31·N39는 X·P1에 중복 연결. N23은 X4에 편입되어 그룹 미연결 대조군은 N22와 N24~N63 중 X·P 시나리오에 쓰이지 않은 뉴스.
export const DEMO_GROUPS: NewsGroup[] = [
  // ── G1·H1: 원자재·지정학·물류 리스크가 결합된 시나리오 (인사이트는 명사형 종결) ──
  {
    id: 'demo:g1-wf6-japan',
    title: '중국 텅스텐 통제·대일 수출규제 중첩에 따른 일본산 WF6 공급 중단',
    newsIds: ['demo-n13', 'demo-n16', 'demo-n14', 'demo-n73', 'demo-n74', 'demo-n75'],
    rationale:
      '텅스텐 가격 급등(원자재)과 대일 수출통제(지정학)가 일본 WF6 제조사의 원료 조달 경로에서 중첩되며 공급 중단으로 전이\n' +
      '일본 2개사의 7월 생산 중단으로 글로벌 WF6 공급의 25% 이탈\n' +
      '국내 공급사로의 대체 진행 중이나 단가 70~90% 인상 및 공급원 전환 시 18~24개월 인증 기간 소요\n' +
      '점검 필요: WF6 공급사별 텅스텐 원료 원산지 및 국내 공급사 증설·인증 일정',
    status: 'active',
    severity: 'high',
    memberNotes: {
      'demo-n13': '관심 — 가격 이슈이며 텅스텐 직접 구매 없음',
      'demo-n16': '관심 — 중·일 양자 분쟁, 한국은 대상 아님',
      'demo-n14': '관심 — 원가 상승일 뿐 공급은 유지',
      'demo-n73': '검증 — 실제 생산 중단 발표',
      'demo-n74': '후속 — 대체 조달 현황',
      'demo-n75': '후속 — 대체 조달 현황',
    },
  },
  {
    id: 'demo:h1-helium-iso',
    title: '헬륨 대체 조달 물량의 운송용 ISO 컨테이너 부족 우려',
    newsIds: ['demo-n62', 'demo-n01', 'demo-n80', 'demo-n81'],
    rationale:
      '대체 물량 계약에도 운송용 ISO 극저온 컨테이너의 걸프 내 발 묶임으로 실제 입고량의 계약량 미달 가능성\n' +
      '대체 공급원인 러시아(수출통제)와 미국(자국 수요 우선)의 상이한 사유에 따른 동시 제약\n' +
      '6월까지는 확보 물량으로 대응했으나 10월 현재 호르무즈 봉쇄 지속으로 컨테이너 회수 지연\n' +
      '점검 필요: 공급사별 계약 물량 대비 실제 입고량 및 가스 공급사의 ISO 컨테이너 가용 대수',
    status: 'active',
    severity: 'medium',
    memberNotes: {
      'demo-n62': '정상 — 대체 물량 확보',
      'demo-n01': '관심 — 러시아·미국은 한국의 주 공급국이 아님',
      'demo-n80': '관심 — 특수 컨테이너 대상의 제한적 물류 이슈',
      'demo-n81': '관심 — 업계 분석 수준의 경고',
    },
  },
  // ── P1~P3: 시점 중첩이 아닌 연결 논리(행위자 동기·정책의 역설·다변화 착시)로 묶은 시나리오 ──
  // 원문에 없는 분석 문장은 ""으로 표기.
  {
    // 연결 유형: 행위자 동기 — 정책 결정자가 어떤 수단을 고를 유인이 있는가
    id: 'demo:p1-midterm-tariff',
    title: '중간선거 국면의 관세 압박 반도체 집중 및 대미 투자 요구 확대',
    newsIds: ['demo-n53', 'demo-n54', 'demo-n55', 'demo-n56', 'demo-n57', 'demo-n31', 'demo-n39'],
    rationale:
      "선거 국면에서 소비재 관세는 정치적 비용이 크지만, 반도체는 중간재이고 '투자 유치'로 포장할 수 있어 정치적 비용이 낮은 압박 수단입니다. 그래서 '관세가 완화될 것'이라는 일반적 해석과 달리, 압박이 반도체 투자 요구로 집중될 수 있습니다. 관세 혜택이 투자 규모에 연동되면 TSMC의 대미 투자 규모가 삼성에 요구되는 사실상의 기준이 되고, '대만보다 불리하지 않은 대우' 조항도 비슷한 규모의 투자를 요구하는 기준으로 작동합니다. 삼성은 같은 시기 용인 메모리 증설도 앞당기고 있어, 대미 투자 압박과 국내 증설이 한정된 장비 납기·인력·자본을 두고 경합합니다. 테일러 팹은 보조금을 받지 못한 채 가동이 임박해, 이미 투자를 집행한 삼성이 협상에서 불리한 위치에 있습니다.",
    status: 'active',
    severity: 'high',
    memberNotes: {
      'demo-n53': '관세 완화 신호',
      'demo-n54': '일반 통상 이슈',
      'demo-n55': '협상 진행 중',
      'demo-n56': '안전판 확보, 긍정',
      'demo-n57': '프로젝트 진척, 긍정',
      'demo-n31': '국내 인프라 이슈',
      'demo-n39': '장비 업황 지표',
    },
  },
  {
    // 연결 유형: 정책의 역설 — 규제가 겨냥한 대상이 오히려 강해지는 2차 효과
    id: 'demo:p2-cxmt-paradox',
    title: '미국 대중 장비 규제에 따른 중국 CXMT 부상 및 삼성 범용 D램 경쟁력 약화',
    newsIds: ['demo-n38', 'demo-n40', 'demo-n58', 'demo-n59', 'demo-n60', 'demo-n46'],
    rationale:
      '미국의 대중 장비 규제로 중국이 자국산 장비 비중을 늘렸고, 글로벌 장비 리드타임이 12~24개월로 늘어난 사이 중국 장비사(AMEC 약 9개월)는 납기 우위까지 확보했습니다. 규제가 겨냥한 CXMT는 오히려 장비 조달 제약을 덜 받으며 증설 속도를 높이고 있고, 삼성은 글로벌 장비 납기 리스크를 그대로 안고 있습니다. 삼성·SK가 HBM으로 생산능력을 돌리며 생긴 범용 D램 공백을 CXMT가 흡수해 점유율이 1Q26 7.6%에서 2Q26 9.5~10%로 올랐습니다. CXMT의 평균 판매가는 삼성·SK 대비 5~10% 낮고, 연말 월 35만 장에서 2028년 월 50만 장으로 증설이 예정돼 삼성 범용 D램의 가격·점유율 방어 여력이 약해지고 있습니다. 삼성 18나노 D램 공정 정보 유출 사건(1심 징역 7년, 항소심 진행 중)도 기술 추격을 앞당긴 배경입니다. 현재의 공급 부족이 리스크를 가리고 있어, CXMT 생산능력이 시장에 풀리는 시점에 삼성 범용 D램의 가격 압박으로 전환될 수 있습니다. 수율 정보가 출처마다 엇갈려(40~50% vs 90%) 경쟁력 판단의 핵심 변수로 지속 추적이 필요합니다.',
    status: 'active',
    severity: 'medium',
    memberNotes: {
      'demo-n38': '장비사 실적 이슈',
      'demo-n40': '중국 장비 시장 이슈',
      'demo-n58': '경쟁사 동향',
      'demo-n59': '경쟁사 동향',
      'demo-n60': '경쟁사 동향',
      'demo-n46': '1심 판결, 항소심 진행 중',
    },
  },
  {
    // 시연 2번째 그룹 — 개별 뉴스는 모두 '낮음'(업황 호조·상생 금융·산업 분석·제한적 관세)이지만, 묶어 보면 공급사 캐파 경쟁이 드러나는 구조
    id: 'demo:c1-capa-race',
    title: '반도체 수출 호황 이면의 장비 반입 비용 상승 및 국내외 소부장 공급 캐파 확보 경쟁 심화',
    newsIds: ['demo-n84', 'demo-n88', 'demo-n86', 'demo-n85', 'demo-n87'],
    rationale:
      '수출 호조, 상생 금융, 증권사 분석, 제한적 관세 해설로 개별 뉴스는 모두 리스크가 아니지만, 같은 시기의 다섯 뉴스를 묶어 보면 장비·소부장 공급사의 생산능력을 두고 경쟁이 동시에 심화되는 구조가 드러납니다. 반도체 수출이 10월 1~20일 222.5% 늘고 제조장비 수입도 10월 초순 208.8%, 1~20일 누적 93.4% 급증해, 업계 전체의 장비·소재 수요가 한꺼번에 몰리고 있습니다. 공급사 생산능력은 단기간에 늘기 어려워, 수요가 몰리는 국면에서는 고객사별 물량 배정이 조달 일정을 좌우합니다. 같은 시기 경쟁사 SK하이닉스는 추천 협력사에 2조 원 규모의 보증을 제공해 설비투자를 지원하기로 해, 국내 소부장 협력사의 증설 물량이 경쟁사 수요에 우선 배정될 가능성이 있습니다. 일본은 반도체 소재의 약 50%, 장비의 약 30%를 차지하고 공급사 교체가 어려워, HBM 증산으로 늘어난 일본산 물량을 국내 메모리 업체가 함께 확보해야 하는 상황입니다. 미국 232조 관세가 2단계에서 반도체 제조장비까지 넓어지면 테일러 팹 등 미국 거점의 장비 반입 비용도 늘어날 수 있습니다. 경쟁사 금융 지원에 참여하는 공용 협력사, 주요 장비·소재 공급사의 삼성향 캐파 배정 계획, 일본산 단일 공급 품목의 재고 일수, 232조 2단계 발표 동향이 점검 대상입니다.',
    status: 'active',
    severity: 'high',
    memberNotes: {
      'demo-n84': '업황 호조 지표',
      'demo-n88': '현행 영향 제한적',
      'demo-n86': '상생 금융',
      'demo-n85': '업황 호조 지표',
      'demo-n87': '증권사 산업 분석',
    },
  },
  {
    // 연결 유형: 다변화 착시 — 1차 공급선은 분산돼 보이지만 상류 원료가 한 곳
    id: 'demo:p3-bromine',
    title: '브롬 공급선 다변화 착시 및 HBr 원료의 이스라엘 집중',
    newsIds: ['demo-n61', 'demo-n62', 'demo-n24', 'demo-n63'],
    rationale:
      'HBr은 D램·낸드 식각에 쓰이며, 한국은 일본산 HBr을 주로 쓰지만 일본 HBr의 원료 브롬도 이스라엘산이라 공급선을 나눠도 상류는 같습니다. 이스라엘 물동량은 지중해 항구를 써서 호르무즈를 거치지 않기 때문에 호르무즈 중심 모니터링에서 빠지기 쉽습니다. 한국 HBr의 최대 공급원인 일본도 원료 브롬을 이스라엘에 의존해, 1차 공급선 다변화가 상류에서 무력화됩니다. 반도체급 HBr 전환 설비는 새로 짓는 데 수년이 걸려 이스라엘 밖에서 단기간에 대체하기 어렵습니다. 이스라엘발 아시아행 해상 경로는 수에즈·홍해를 지나는데, 선사들이 수에즈로 복귀하는 시점에 후티의 공격 대상이 넓어지고 있습니다. HBr 공급사별 원료 브롬 원산지(2차 이상 공급망)와 재고 일수, 홍해 경유 운송 비중이 점검 대상입니다.',
    status: 'active',
    severity: 'high',
    memberNotes: {
      'demo-n61': '영향 제한(HBr은 일본산 위주)',
      'demo-n62': '다변화된 것으로 보임',
      'demo-n24': '운임 하락, 긍정',
      'demo-n63': '사우디 관련 이슈',
    },
  },
  // ── X1~X5: 서로 다른 카테고리의 뉴스를 "공통 노드"로 묶은 시나리오 ──────────────
  // S1~S4는 같은 사건의 시간 흐름으로 묶였고, X1~X5는 서로 다른 사건이 공통 노드로 묶인다.
  // severity는 멤버 최고 심각도 대신 지정값, memberNotes는 타임라인의 "개별 판단" 라벨.
  {
    // 공통 노드: 자원 경합 — 같은 한정 자원(아시아발 항공 화물칸)을 두고 경쟁
    id: 'demo:x1-air-cargo',
    title: 'AI 수요 확대에 따른 항공 화물칸 경합 및 장비 부품 조달 지연',
    newsIds: ['demo-n27', 'demo-n25', 'demo-n28', 'demo-n40'],
    rationale:
      "AI 서버 물량 호조, 화물기 공급 축소, 중동발 항공 캐파 증발, 장비 리드타임 급증은 카테고리가 서로 다르지만 모두 '아시아발 항공 화물칸'이라는 같은 한정 자원을 두고 부딪힙니다. 장비 예비부품과 모듈은 긴급 시 항공으로 들여오는데, 그 화물칸을 고객사 AI 서버 물량이 선점하고 있습니다. AI 서버 화물이 아시아발 항공 캐파를 잠식하는 가운데 중동 사태로 글로벌 항공화물 공급의 12%가 사라졌습니다. 장비 리드타임이 이미 12~24개월이라 긴급 부품을 항공으로 받아야 하는 빈도는 오히려 늘어납니다. 메모리 호황이 장비 유지보수 물류를 스스로 압박하는 자기 제약 구조입니다. 미국·유럽발 장비 부품의 항공 블록 스페이스 계약 여부와 해상 전환 시 리드타임이 점검 대상입니다.",
    status: 'active',
    severity: 'medium',
    memberNotes: {
      'demo-n27': '업황 호조 신호',
      'demo-n25': '화주 일반 이슈',
      'demo-n28': '중동 이슈',
      'demo-n40': '장비 시장 이슈',
    },
  },
  {
    // 공통 노드: 일정 누적 — 무관한 원인들이 같은 목표 일정(용인 1기 팹)을 지연
    id: 'demo:x2-fab-schedule',
    title: '재해·장비 납기·인프라 지연 누적에 따른 용인 증설 일정 차질 우려',
    newsIds: ['demo-n50', 'demo-n39', 'demo-n40', 'demo-n30'],
    rationale:
      "지진(TEL 가동 중단), 장비 수요 폭증(납기 1.5~2배), 인프라 인허가(전력·용수 1~2년 지연 우려)는 원인이 서로 무관하지만, 모두 용인 1기 팹(2029년 10월 목표)이라는 같은 증설 일정에 동시에 걸려 있습니다. 각각은 감당 가능한 수준이어도 지연은 더해지며, 장비 납기에 여유가 없는 상황에서는 공급사의 며칠짜리 중단도 대기열 순번을 밀어냅니다. 장비 납기·공급사 재해·인프라 일정이라는 서로 다른 원인의 지연이 같은 증설 일정에 누적되고 있습니다. 장비 리드타임이 1년을 넘는 시장에서는 TEL의 짧은 가동 중단도 출하 대기열 전체를 지연시킵니다. 장비가 제때 도착해도 전력·용수가 없으면 팹을 가동할 수 없습니다. 장비 조기 발주 일정과 인프라 공급 일정 간 정합성 점검이 필요합니다.",
    status: 'active',
    severity: 'high',
    memberNotes: {
      'demo-n50': '일시 중단, 재가동됨',
      'demo-n39': '업황 지표',
      'demo-n40': '업황 지표',
      'demo-n30': '지역 정책 이슈',
    },
  },
  {
    // 공통 노드: 재무→공급 전이 — 공급망 상류 기업의 재무 악화를 공급 리스크로 해석
    id: 'demo:x3-credit-signal',
    title: '석유화학사 신용등급 강등에 따른 반도체 용제 공급 차질 우려',
    newsIds: ['demo-n33', 'demo-n34', 'demo-n04', 'demo-n37'],
    rationale:
      '반도체 용제의 원료 사슬은 나프타 → 프로필렌 → PGME·PGMEA → PR·Thinner로 이어지며, 그 상류(3~4차 공급사)인 석유화학사가 재무적으로 무너지는 중입니다. 나프타·프로필렌 부족에 따른 물량 차질 뉴스는 잦아들었지만, 신용 뉴스는 향후 감산·설비 폐쇄의 선행지표입니다. 용제 원료 사슬 상류의 석화사가 신용 강등과 유동성 압박을 동시에 받고 있습니다. 하반기 역래깅으로 석화 실적이 다시 악화되면 감산이나 설비 정리가 공급 차질로 이어질 수 있습니다. 1차 협력사(원익머트리얼즈)도 헬륨·운임 원가를 전가하지 못해 마진이 훼손되고 있어 단가 인상 요구 가능성이 있습니다. 2~4차 공급사의 신용등급·단기차입 비율까지 재무 모니터링 범위를 넓혀야 합니다.',
    status: 'active',
    severity: 'high',
    memberNotes: {
      'demo-n33': '석화업계 신용 이슈',
      'demo-n34': '업종 전망',
      'demo-n04': '봄철 이슈, 진정 국면',
      'demo-n37': '실적 이슈',
    },
  },
  {
    // 공통 노드: 의사결정 양면성 — 한 결정이 서로 다른 카테고리 리스크를 동시에 증폭
    id: 'demo:x4-yongin-lng',
    title: '용인 산단 LNG 전원 선택에 따른 연료 공급·탄소 비용 리스크 동시 고착',
    newsIds: ['demo-n31', 'demo-n23', 'demo-n03', 'demo-n29', 'demo-n32'],
    rationale:
      '증설 속도를 위해 택한 용인 국가산단의 LNG 전원이 공급 안보(카타르 불가항력으로 취약성 입증)와 탄소 비용(CBAM·고객사 RE100)이라는 두 방향의 리스크를 동시에 키웁니다. 하나의 결정이 지정학 리스크와 ESG 리스크를 함께 고착시키는 구조라, 카테고리별 개별 분석으로는 드러나지 않습니다. 용인 초기 전력을 LNG에 의존하는 계획이 연료 공급 리스크와 탄소 리스크를 동시에 고정합니다. 카타르 불가항력 사례처럼 LNG 단가 급등은 팹 전력비로 직결될 수 있습니다. 반도체가 CBAM 대상에 포함되거나 고객사 RE100 요구가 강화되면 LNG 기반 생산분의 경쟁력이 약해집니다. 승인 무효 소송까지 겹쳐 인프라 일정 불확실성이 상존하므로, PPA 등 전력원 다변화 로드맵 점검이 필요합니다.',
    status: 'active',
    severity: 'medium',
    memberNotes: {
      'demo-n31': '인프라 진척, 긍정',
      'demo-n23': '에너지 정책',
      'demo-n03': '봄철 단기 쇼크',
      'demo-n29': '미래의 가정',
      'demo-n32': '지역 갈등',
    },
  },
  {
    // 공통 노드: 기능 군집 — 같은 기능(테스트)을 하는 공급사들에 사건이 반복 발생
    id: 'demo:x5-test-leak',
    title: '테스트·후공정 공급사 대상 사이버 공격 반복에 따른 기술 유출 우려',
    newsIds: ['demo-n42', 'demo-n43', 'demo-n44', 'demo-n45', 'demo-n46'],
    rationale:
      "2026년 반도체 사이버 피해가 테스트·후공정 공급사에 집중되고 있으며, 테스트 장비사와 테스트 서비스사는 고객사의 테스트 프로그램과 수율 데이터를 다룹니다. HBM에서는 테스트가 경쟁력의 핵심인데, 기술 유출 경로가 '내부자'에서 '공급사 침해'로 넓어지는 반면 공개 시점은 크게 늦습니다. 테스트 장비·서비스 공급사에서 사이버 피해가 반복 발생하고 있습니다. Advantest는 '운영 영향 없음' 공시 후 233일 만에 데이터 유출을 통지했듯, 초기 공시만으로 판단하면 피해를 과소평가할 위험이 있습니다. 기술 유출은 내부자 경로뿐 아니라 고객 데이터를 보유한 공급사 경로로도 발생할 수 있습니다. 테스트 공급사와 공유한 HBM 테스트 프로그램·수율 데이터의 범위와 접근 통제 현황이 점검 대상입니다.",
    status: 'active',
    severity: 'medium',
    memberNotes: {
      'demo-n42': '운영 영향 없음',
      'demo-n43': '사후 통지, 운영 영향 없음',
      'demo-n44': '소규모 업체 사고',
      'demo-n45': '주장 단계',
      'demo-n46': '내부자 사건, 항소심 진행 중',
    },
  },
  {
    id: 'demo:s1-hormuz',
    title: '호르무즈 사태 장기화에 따른 헬륨·LNG·나프타 공정 투입물 고갈',
    newsIds: ['demo-n06', 'demo-n07', 'demo-n08', 'demo-n01', 'demo-n02', 'demo-n03', 'demo-n04', 'demo-n05', 'demo-n09'],
    rationale:
      '헬륨·LNG·나프타가 모두 "호르무즈"라는 같은 원인으로 동시에 막혀 있습니다. 3월에 "재고로 영향 제한"이라 판단했던 근거(재고 버퍼)가 7개월째 소진되는 중이며, 10월 통항이 평시의 5% 수준으로 떨어지고 장기화 전망이 굳어졌습니다. 원가 이슈가 공급 이슈로 전환되는 국면으로, 헬륨 배정 비율·PGMEA 기반 PR/Thinner·용인·평택 전력 단가가 점검 대상입니다.',
    status: 'active',
  },
  {
    id: 'demo:s2-nov-cliff',
    title: '미·중 휴전·희토류 유예의 1월 단기 연장 및 갈륨·텅스텐 수급 불확실성 지속',
    newsIds: ['demo-n82', 'demo-n10', 'demo-n11', 'demo-n15', 'demo-n12', 'demo-n13', 'demo-n14', 'demo-n83'],
    rationale:
      '미·중 휴전과 확대 희토류 통제 유예가 2027년 1월 10일까지 연장되며 11월 10일 동시 만료 리스크는 1월로 이연됐습니다. 다만 중국 측의 희토류 유예 연장 확인은 불분명하고 일부 보도는 여전히 11월 10일을 시한으로 언급하고 있어, 두 달 남짓의 단기 연장으로는 불확실성이 해소되지 않습니다. 11월에는 갈륨 대미 금수 유예(11/27)만 남았는데, 연장 소식이 없고 중국 갈륨 수출은 이미 94% 줄어든 상태입니다. 텅스텐 APT 가격은 3월 고점 대비 약 69% 내려왔지만 수출 허가 업체 제한과 대일 수출 중단은 이어져, WF6(DRAM·V-NAND 배선)는 가격보다 물량·인증 리스크가 남아 있습니다. 1월 시한에 확대 통제가 복원되면 0.1% 역외 규정을 통해 장비사 부품으로 간접 노출되며, 이트륨(식각 챔버 코팅) 등 2025년 4월 7종 통제는 연장과 무관하게 유효해 장비 소모품 리드타임에 먼저 영향이 예상됩니다. 갈륨 유예 연장 여부, 1월 10일 재연장 협상, 중국 측 희토류 유예 공식 확인이 점검 대상입니다.',
    status: 'active',
  },
  {
    id: 'demo:s3-china-japan',
    title: '중·일 갈등의 한국 전이에 따른 포토레지스트·장비 부품 조달 리스크',
    newsIds: ['demo-n16', 'demo-n17', 'demo-n18', 'demo-n19'],
    rationale:
      '중국의 대일 압박이 금수 → 기업 등재 → 장비 부품 심사로 단계적으로 확대되고 있습니다. 일본 장비·소재사의 조달 비용과 심사 기간 증가분이 한국 팹향 납기·단가로 전가될 가능성이 있으며, 일본이 PR 수출 통제로 맞대응하면 중국 희토류 보복과 연쇄 확전 위험이 있습니다. 일본계 PR·식각/증착 장비 예비부품·실리콘 전구체 공급사의 납기 재확인이 점검 대상입니다.',
    status: 'active',
  },
  {
    id: 'demo:s4-china-fab',
    title: '중국 팹 연간 라이선스 갱신과 미·중 휴전 만료 시점 충돌',
    newsIds: ['demo-n20', 'demo-n21', 'demo-n11'],
    rationale:
      '시안 팹은 2026년분 1년 허가로 운영 중이며, 2027년분 갱신이 미·중 휴전 만료 시점과 겹칩니다. 증설·업그레이드 불허로 공정 전환이 이미 제약된 상태에서, 갱신이 협상 카드가 되면 유지보수용 장비·부품 반입이 지연될 수 있습니다(시안은 삼성 NAND의 약 35%). BIS 2027년분 허가 발표 시점과 시안 팹 예비부품 재고 일수가 점검 대상입니다.',
    status: 'active',
  },
]

// ─── 시연 노출 그룹: X2 → C1 → S2 순으로만 노출 (나머지는 기본 숨김, 데이터는 유지) ───
// 관리자 화면에서 다시 켤 수 있도록 삭제하지 않고 기본 숨김 처리만 한다.
export const DEMO_FEATURED_GROUP_IDS = [
  'demo:x2-fab-schedule',
  'demo:c1-capa-race',
  'demo:s2-nov-cliff',
]

/** 시연 노출 그룹을 지정 순서대로 앞에 두고, 나머지는 기존 배열 순서를 유지 */
export function sortDemoGroupsFeaturedFirst<T extends { id: string }>(groups: T[]): T[] {
  const rank = (id: string) => {
    const i = DEMO_FEATURED_GROUP_IDS.indexOf(id)
    return i === -1 ? DEMO_FEATURED_GROUP_IDS.length : i
  }
  return [...groups].sort((a, b) => rank(a.id) - rank(b.id))
}

// ─── 태그 팝업 (요청 5) — 그룹별 "연관 태그" 칩 + 클릭 시 엑셀 1행 표 ──────────────
export interface DemoTagRow {
  label: string
  value: string
}
export interface DemoTagDetail {
  tagId: string
  tagName: string
  kind: 'material' | 'supplier'
  rows: DemoTagRow[]
}

// groupId → 연관 태그 칩(개별 자재/협력사)
export const DEMO_GROUP_TAGS: Record<string, { tagId: string; tagName: string }[]> = {
  'demo:g1-wf6-japan': [
    { tagId: 'tag-mat-wf6', tagName: '육불화텅스텐(WF6)' },
    { tagId: 'tag-mat-tungsten', tagName: '텅스텐' },
    { tagId: 'tag-sup-kanto-denka', tagName: '칸토덴카' },
    { tagId: 'tag-sup-central-glass', tagName: '센트럴글래스' },
  ],
  'demo:h1-helium-iso': [
    { tagId: 'tag-mat-helium', tagName: '고순도 헬륨' },
    { tagId: 'tag-mat-iso-container', tagName: 'ISO 극저온 컨테이너' },
    { tagId: 'tag-site-ras-laffan', tagName: '카타르 라스라판 가스단지' },
  ],
  'demo:p1-midterm-tariff': [
    { tagId: 'tag-site-taylor', tagName: '삼성 테일러 팹' },
    { tagId: 'tag-site-yongin', tagName: '용인 1기 팹' },
  ],
  'demo:p2-cxmt-paradox': [
    { tagId: 'tag-sup-amat', tagName: 'AMAT' },
    { tagId: 'tag-sup-tokyo-electron', tagName: '도쿄일렉트론' },
    { tagId: 'tag-mat-rf-power', tagName: 'RF 전원장치' },
  ],
  'demo:c1-capa-race': [
    { tagId: 'tag-sup-tokyo-electron', tagName: '도쿄일렉트론' },
    { tagId: 'tag-sup-jsr', tagName: 'JSR' },
    { tagId: 'tag-site-taylor', tagName: '삼성 테일러 팹' },
  ],
  'demo:p3-bromine': [
    { tagId: 'tag-mat-hbr', tagName: '브롬화수소(HBr)' },
    { tagId: 'tag-mat-bromine', tagName: '액체 브롬' },
    { tagId: 'tag-sup-icl', tagName: 'ICL' },
  ],
  'demo:x1-air-cargo': [
    { tagId: 'tag-mat-rf-power', tagName: 'RF 전원장치' },
    { tagId: 'tag-sup-tokyo-electron', tagName: '도쿄일렉트론' },
    { tagId: 'tag-sup-asml', tagName: 'ASML' },
  ],
  'demo:x2-fab-schedule': [
    { tagId: 'tag-site-yongin', tagName: '용인 1기 팹' },
    { tagId: 'tag-sup-tokyo-electron', tagName: '도쿄일렉트론' },
    { tagId: 'tag-sup-asml', tagName: 'ASML' },
    { tagId: 'tag-mat-rf-power', tagName: 'RF 전원장치' },
  ],
  'demo:x3-credit-signal': [
    { tagId: 'tag-mat-propylene', tagName: '프로필렌' },
    { tagId: 'tag-mat-pgmea', tagName: 'PGMEA 용제' },
    { tagId: 'tag-sup-yncc', tagName: '여천NCC' },
    { tagId: 'tag-sup-lg-chem', tagName: 'LG화학' },
    { tagId: 'tag-sup-wonik-materials', tagName: '원익머트리얼즈' },
  ],
  'demo:x4-yongin-lng': [
    { tagId: 'tag-mat-lng', tagName: 'LNG' },
    { tagId: 'tag-site-yongin', tagName: '용인 1기 팹' },
    { tagId: 'tag-site-ras-laffan', tagName: '카타르 라스라판 가스단지' },
  ],
  'demo:x5-test-leak': [
    { tagId: 'tag-sup-advantest', tagName: 'Advantest' },
    { tagId: 'tag-sup-trio-tech', tagName: 'Trio-Tech' },
    { tagId: 'tag-sup-fit-line', tagName: 'Fit-Line' },
  ],
  'demo:s1-hormuz': [
    { tagId: 'tag-mat-helium', tagName: '고순도 헬륨' },
    { tagId: 'tag-mat-lng', tagName: 'LNG' },
    { tagId: 'tag-mat-pgmea', tagName: 'PGMEA 용제' },
    { tagId: 'tag-sup-lg-chem', tagName: 'LG화학' },
  ],
  'demo:s2-nov-cliff': [
    { tagId: 'tag-mat-ree', tagName: '희토류' },
    { tagId: 'tag-mat-gallium', tagName: '갈륨' },
    { tagId: 'tag-mat-tungsten', tagName: '텅스텐' },
    { tagId: 'tag-mat-wf6', tagName: '육불화텅스텐(WF6)' },
  ],
  'demo:s3-china-japan': [
    { tagId: 'tag-mat-euv-pr', tagName: 'EUV 포토레지스트' },
    { tagId: 'tag-mat-dcs', tagName: '디클로로실란' },
    { tagId: 'tag-sup-jsr', tagName: 'JSR' },
    { tagId: 'tag-sup-tokyo-electron', tagName: '도쿄일렉트론' },
  ],
  'demo:s4-china-fab': [
    { tagId: 'tag-mat-wf6', tagName: '육불화텅스텐(WF6)' },
    { tagId: 'tag-sup-samsung-xian', tagName: '삼성 시안 NAND 팹' },
    { tagId: 'tag-sup-sk-wuxi', tagName: 'SK하이닉스 우시 DRAM 팹' },
  ],
}

// tagId → 엑셀 해당 1행의 컬럼-값 (자재가설.xlsx / 협력사가설.xlsx 원본)
export const DEMO_TAG_DETAIL: Record<string, DemoTagDetail> = {
  // ── G1·H1 ── (⚠️ 엑셀에 없는 항목은 시연용으로 코드·좌표를 새로 부여)
  'tag-sup-kanto-denka': {
    tagId: 'tag-sup-kanto-denka', tagName: '칸토덴카', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S049' },
      { label: 'name_kor', value: '칸토덴카공업' },
      { label: 'name_eng', value: 'Kanto Denka Kogyo Co., Ltd.' },
      { label: 'country', value: '일본' },
      { label: 'region', value: '도쿄' },
      { label: 'latitude', value: '35.6850' },
      { label: 'longitude', value: '139.7600' },
    ],
  },
  'tag-sup-central-glass': {
    tagId: 'tag-sup-central-glass', tagName: '센트럴글래스', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S050' },
      { label: 'name_kor', value: '센트럴글래스' },
      { label: 'name_eng', value: 'Central Glass Co., Ltd.' },
      { label: 'country', value: '일본' },
      { label: 'region', value: '도쿄' },
      { label: 'latitude', value: '35.6900' },
      { label: 'longitude', value: '139.7650' },
    ],
  },
  'tag-mat-iso-container': {
    // 신규 부여 코드(운송 장비)
    tagId: 'tag-mat-iso-container', tagName: 'ISO 극저온 컨테이너', kind: 'material',
    rows: [
      { label: 'material_code', value: '2201-000001' },
      { label: 'name_kor', value: 'ISO 극저온 컨테이너' },
      { label: 'name_eng', value: 'ISO Cryogenic Container' },
      { label: '투입공정', value: '헬륨 해상·육상 운송' },
    ],
  },
  // ── P1~P3 ── (⚠️ 엑셀에 없는 항목은 시연용으로 코드·좌표를 새로 부여)
  'tag-site-taylor': {
    tagId: 'tag-site-taylor', tagName: '삼성 테일러 팹', kind: 'supplier',
    rows: [
      { label: 'site_code', value: 'SITE-TAYLOR-01' },
      { label: 'name_kor', value: '삼성 테일러 파운드리 팹' },
      { label: 'name_eng', value: 'Samsung Taylor Fab' },
      { label: 'country', value: '미국' },
      { label: 'region', value: '텍사스 테일러' },
      { label: 'latitude', value: '30.5700' },
      { label: 'longitude', value: '-97.4100' },
    ],
  },
  'tag-sup-amat': {
    tagId: 'tag-sup-amat', tagName: 'AMAT', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S047' },
      { label: 'name_kor', value: '어플라이드머티어리얼즈' },
      { label: 'name_eng', value: 'Applied Materials, Inc.' },
      { label: 'country', value: '미국' },
      { label: 'region', value: '캘리포니아 산타클라라' },
      { label: 'latitude', value: '37.3541' },
      { label: 'longitude', value: '-121.9552' },
    ],
  },
  'tag-mat-hbr': {
    // 신규 부여 코드(특수가스 1301 계열)
    tagId: 'tag-mat-hbr', tagName: '브롬화수소(HBr)', kind: 'material',
    rows: [
      { label: 'material_code', value: '1301-000007' },
      { label: 'name_kor', value: '브롬화수소' },
      { label: 'name_eng', value: 'Hydrogen Bromide (HBr)' },
      { label: '투입공정', value: 'D램·낸드 식각' },
    ],
  },
  'tag-mat-bromine': {
    // 신규 부여 코드(원료 2001 계열)
    tagId: 'tag-mat-bromine', tagName: '액체 브롬', kind: 'material',
    rows: [
      { label: 'material_code', value: '2001-000004' },
      { label: 'name_kor', value: '액체 브롬' },
      { label: 'name_eng', value: 'Liquid Bromine' },
      { label: '투입공정', value: 'HBr 원료' },
    ],
  },
  'tag-sup-icl': {
    tagId: 'tag-sup-icl', tagName: 'ICL', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S048' },
      { label: 'name_kor', value: 'ICL (사해 브롬 시설)' },
      { label: 'name_eng', value: 'ICL Group Ltd.' },
      { label: 'country', value: '이스라엘' },
      { label: 'region', value: '사해 소돔' },
      { label: 'latitude', value: '31.0300' },
      { label: 'longitude', value: '35.3700' },
    ],
  },
  // ── X1~X5: 공통 노드 시나리오 ──
  // ⚠️ 자재가설·협력사가설.xlsx에 없는 항목은 시연용으로 코드·좌표를 새로 부여했다(아래 각 항목 주석).
  'tag-mat-rf-power': {
    // 신규 부여 코드(장비 핵심 부품군)
    tagId: 'tag-mat-rf-power', tagName: 'RF 전원장치', kind: 'material',
    rows: [
      { label: 'material_code', value: '2101-000001' },
      { label: 'name_kor', value: 'RF 전원장치' },
      { label: 'name_eng', value: 'RF Power Generator' },
      { label: '투입공정', value: '식각·증착 장비 핵심 모듈(예비부품)' },
    ],
  },
  'tag-mat-propylene': {
    // 신규 부여 코드(나프타 1901-000001 계열)
    tagId: 'tag-mat-propylene', tagName: '프로필렌', kind: 'material',
    rows: [
      { label: 'material_code', value: '1901-000002' },
      { label: 'name_kor', value: '프로필렌' },
      { label: 'name_eng', value: 'Propylene' },
      { label: '투입공정', value: 'PGME·PGMEA 용제 원료' },
    ],
  },
  'tag-sup-asml': {
    tagId: 'tag-sup-asml', tagName: 'ASML', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S041' },
      { label: 'name_kor', value: 'ASML' },
      { label: 'name_eng', value: 'ASML Holding N.V.' },
      { label: 'country', value: '네덜란드' },
      { label: 'region', value: '노르트브라반트' },
      { label: 'latitude', value: '51.4231' },
      { label: 'longitude', value: '5.4623' },
    ],
  },
  'tag-sup-wonik-materials': {
    tagId: 'tag-sup-wonik-materials', tagName: '원익머트리얼즈', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S042' },
      { label: 'name_kor', value: '원익머트리얼즈' },
      { label: 'name_eng', value: 'WONIK Materials Co., Ltd.' },
      { label: 'country', value: '한국' },
      { label: 'region', value: '충북' },
      { label: 'latitude', value: '36.6424' },
      { label: 'longitude', value: '127.489' },
    ],
  },
  'tag-sup-yncc': {
    tagId: 'tag-sup-yncc', tagName: '여천NCC', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S043' },
      { label: 'name_kor', value: '여천NCC' },
      { label: 'name_eng', value: 'Yeochun NCC Co., Ltd.' },
      { label: 'country', value: '한국' },
      { label: 'region', value: '전남 여수' },
      { label: 'latitude', value: '34.8370' },
      { label: 'longitude', value: '127.6900' },
    ],
  },
  'tag-sup-advantest': {
    tagId: 'tag-sup-advantest', tagName: 'Advantest', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S044' },
      { label: 'name_kor', value: '어드반테스트' },
      { label: 'name_eng', value: 'Advantest Corporation' },
      { label: 'country', value: '일본' },
      { label: 'region', value: '도쿄' },
      { label: 'latitude', value: '35.6812' },
      { label: 'longitude', value: '139.7671' },
    ],
  },
  'tag-sup-trio-tech': {
    tagId: 'tag-sup-trio-tech', tagName: 'Trio-Tech', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S045' },
      { label: 'name_kor', value: '트리오테크 (싱가포르 법인)' },
      { label: 'name_eng', value: 'Trio-Tech International (Singapore)' },
      { label: 'country', value: '싱가포르' },
      { label: 'region', value: '싱가포르' },
      { label: 'latitude', value: '1.3521' },
      { label: 'longitude', value: '103.8198' },
    ],
  },
  'tag-sup-fit-line': {
    tagId: 'tag-sup-fit-line', tagName: 'Fit-Line', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S046' },
      { label: 'name_kor', value: '핏라인 (PFA·PVDF 유체부품)' },
      { label: 'name_eng', value: 'Fit-Line Global' },
      { label: 'country', value: '미국' },
      { label: 'region', value: '캘리포니아' },
      { label: 'latitude', value: '33.6400' },
      { label: 'longitude', value: '-117.6031' },
    ],
  },
  'tag-site-yongin': {
    tagId: 'tag-site-yongin', tagName: '용인 1기 팹', kind: 'supplier',
    rows: [
      { label: 'site_code', value: 'SITE-YONGIN-01' },
      { label: 'name_kor', value: '용인 반도체 국가산단 1기 팹' },
      { label: 'name_eng', value: 'Yongin Semiconductor Cluster Fab 1' },
      { label: 'country', value: '한국' },
      { label: 'region', value: '경기 용인' },
      { label: 'latitude', value: '37.1300' },
      { label: 'longitude', value: '127.1700' },
    ],
  },
  'tag-site-ras-laffan': {
    tagId: 'tag-site-ras-laffan', tagName: '카타르 라스라판 가스단지', kind: 'supplier',
    rows: [
      { label: 'site_code', value: 'SITE-QAT-01' },
      { label: 'name_kor', value: '카타르 라스라판 가스단지' },
      { label: 'name_eng', value: 'Ras Laffan Industrial City' },
      { label: 'country', value: '카타르' },
      { label: 'region', value: '라스라판' },
      { label: 'latitude', value: '25.9028' },
      { label: 'longitude', value: '51.5333' },
    ],
  },
  // ── S1: 호르무즈 → 공정 투입물 ──
  'tag-mat-helium': {
    tagId: 'tag-mat-helium', tagName: '고순도 헬륨', kind: 'material',
    rows: [
      { label: 'material_code', value: '1601-000009' },
      { label: 'name_kor', value: '고순도 헬륨' },
      { label: 'name_eng', value: 'High-Purity Helium' },
      { label: '투입공정', value: '이온주입 & 열처리' },
    ],
  },
  'tag-mat-lng': {
    tagId: 'tag-mat-lng', tagName: 'LNG', kind: 'material',
    rows: [
      { label: 'material_code', value: '1902-000001' },
      { label: 'name_kor', value: '액화천연가스' },
      { label: 'name_eng', value: 'Liquefied Natural Gas' },
      { label: '투입공정', value: '팹 전력·유틸리티' },
    ],
  },
  'tag-mat-pgmea': {
    tagId: 'tag-mat-pgmea', tagName: 'PGMEA 용제', kind: 'material',
    rows: [
      { label: 'material_code', value: '1201-000005' },
      { label: 'name_kor', value: 'PGMEA 용제' },
      { label: 'name_eng', value: 'Propylene Glycol Monomethyl Ether Acetate' },
      { label: '투입공정', value: '포토레지스트·시너(Thinner)' },
    ],
  },
  // ── S2: 핵심광물 ──
  'tag-mat-ree': {
    tagId: 'tag-mat-ree', tagName: '희토류', kind: 'material',
    rows: [
      { label: 'material_code', value: '2001-000001' },
      { label: 'name_kor', value: '희토류(이트륨 등)' },
      { label: 'name_eng', value: 'Rare Earth Elements' },
      { label: '투입공정', value: '식각 챔버 코팅·연마' },
    ],
  },
  'tag-mat-gallium': {
    tagId: 'tag-mat-gallium', tagName: '갈륨', kind: 'material',
    rows: [
      { label: 'material_code', value: '2001-000002' },
      { label: 'name_kor', value: '갈륨' },
      { label: 'name_eng', value: 'Gallium' },
      { label: '투입공정', value: '화합물 반도체·전력 소자' },
    ],
  },
  'tag-mat-tungsten': {
    tagId: 'tag-mat-tungsten', tagName: '텅스텐', kind: 'material',
    rows: [
      { label: 'material_code', value: '2001-000003' },
      { label: 'name_kor', value: '텅스텐' },
      { label: 'name_eng', value: 'Tungsten' },
      { label: '투입공정', value: 'WF6 원료·배선' },
    ],
  },
  'tag-mat-wf6': {
    tagId: 'tag-mat-wf6', tagName: '육불화텅스텐(WF6)', kind: 'material',
    rows: [
      { label: 'material_code', value: '1301-000006' },
      { label: 'name_kor', value: '육불화텅스텐' },
      { label: 'name_eng', value: 'Tungsten Hexafluoride (WF6)' },
      { label: '투입공정', value: 'DRAM·V-NAND 배선 증착' },
    ],
  },
  // ── S3: 중·일 소재/장비 ──
  'tag-mat-euv-pr': {
    tagId: 'tag-mat-euv-pr', tagName: 'EUV 포토레지스트', kind: 'material',
    rows: [
      { label: 'material_code', value: '1201-000001' },
      { label: 'name_kor', value: 'EUV 포토레지스트' },
      { label: 'name_eng', value: 'EUV Photoresist' },
      { label: '투입공정', value: '포토리소그래피' },
    ],
  },
  'tag-mat-dcs': {
    tagId: 'tag-mat-dcs', tagName: '디클로로실란', kind: 'material',
    rows: [
      { label: 'material_code', value: '1301-000005' },
      { label: 'name_kor', value: '디클로로실란' },
      { label: 'name_eng', value: 'Dichlorosilane (DCS)' },
      { label: '투입공정', value: '증착·박막 전구체' },
    ],
  },
  'tag-sup-jsr': {
    tagId: 'tag-sup-jsr', tagName: 'JSR', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S012' },
      { label: 'name_kor', value: 'JSR' },
      { label: 'name_eng', value: 'JSR Corporation' },
      { label: 'country', value: '일본' },
      { label: 'region', value: '도쿄' },
      { label: 'latitude', value: '35.6762' },
      { label: 'longitude', value: '139.6503' },
    ],
  },
  'tag-sup-tokyo-electron': {
    tagId: 'tag-sup-tokyo-electron', tagName: '도쿄일렉트론', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S021' },
      { label: 'name_kor', value: '도쿄일렉트론' },
      { label: 'name_eng', value: 'Tokyo Electron Ltd.' },
      { label: 'country', value: '일본' },
      { label: 'region', value: '도쿄' },
      { label: 'latitude', value: '35.6895' },
      { label: 'longitude', value: '139.6917' },
    ],
  },
  // ── S1·S4: 생산 거점 ──
  'tag-sup-lg-chem': {
    tagId: 'tag-sup-lg-chem', tagName: 'LG화학', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S033' },
      { label: 'name_kor', value: 'LG화학' },
      { label: 'name_eng', value: 'LG Chem, Ltd.' },
      { label: 'country', value: '한국' },
      { label: 'region', value: '전남 여수' },
      { label: 'latitude', value: '34.7604' },
      { label: 'longitude', value: '127.6622' },
    ],
  },
  'tag-sup-samsung-xian': {
    tagId: 'tag-sup-samsung-xian', tagName: '삼성 시안 NAND 팹', kind: 'supplier',
    rows: [
      { label: 'site_code', value: 'SITE-XIAN-01' },
      { label: 'name_kor', value: '삼성 시안 NAND 팹' },
      { label: 'name_eng', value: "Samsung Xi'an Fab" },
      { label: 'country', value: '중국' },
      { label: 'region', value: '시안' },
      { label: 'latitude', value: '34.3416' },
      { label: 'longitude', value: '108.9398' },
    ],
  },
  'tag-sup-sk-wuxi': {
    tagId: 'tag-sup-sk-wuxi', tagName: 'SK하이닉스 우시 DRAM 팹', kind: 'supplier',
    rows: [
      { label: 'site_code', value: 'SITE-WUXI-01' },
      { label: 'name_kor', value: 'SK하이닉스 우시 DRAM 팹' },
      { label: 'name_eng', value: 'SK hynix Wuxi Fab' },
      { label: 'country', value: '중국' },
      { label: 'region', value: '우시' },
      { label: 'latitude', value: '31.4912' },
      { label: 'longitude', value: '120.3119' },
    ],
  },
}

// ─── admin/insights: AdminGroup 변환 (fetchAdminGroups 병합용) ───────────────────
export const DEMO_ADMIN_GROUPS: AdminGroup[] = sortDemoGroupsFeaturedFirst(DEMO_GROUPS).map((g) => ({
  id: g.id,
  title: g.title,
  theme: g.rationale.slice(0, 40),
  memberCount: g.newsIds.length,
  newsIds: g.newsIds,
  autoDisplayed: true,
  adminOverride: null,
  currentlyShown: true,
}))

// ─── Reporting: 그룹별 사전 작성 보고서 (docx 기반) ──────────────────────────────
// 원본: poc-a/data/시연용/복합리스크보고서.docx (①종합요약 ②뉴스개별요약표 ③구매영향도).
// ④ 협력사·자재 종합 테이블은 그룹 뉴스의 연관 협력사·자재를 종합해 새로 추가한 것.
// reporting 화면 "AI 초안 생성" 시 hasDummySelection/그룹 감지로 이 마크다운을 스트리밍한다.
export const DEMO_GROUP_REPORTS: Record<string, string> = {
  'demo:g1-wf6-japan': `# 복합 리스크 보고서 G1 · 중국 텅스텐 통제·대일 수출규제 중첩에 따른 일본산 WF6 공급 중단

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB · 종합 판단: 위험(현실화)

## 1. 종합 요약

2~5월에 나온 세 건의 뉴스는 각각 '관심' 수준으로 판단됐습니다. 텅스텐 가격 557% 급등은 텅스텐을 직접 구매하지 않는 가격 이슈였고, 중국의 대일 이중용도 수출금지는 한국이 대상이 아닌 중·일 양자 분쟁이었으며, 중국산 WF6 수출가 상승은 공급이 유지되는 원가 이슈였습니다.

그러나 세 뉴스는 일본 WF6 제조사의 원료 조달 경로에서 겹칩니다. 텅스텐 원료 가격이 오르고 중국의 대일 수출통제로 원료 조달 자체가 막히면서, 일본 칸토덴카·센트럴글래스는 7월부터 WF6 생산 중단을 발표했습니다(글로벌 공급의 약 25%). 이후 국내 공급사로의 대체가 진행되고 있지만, 단가 70~90% 인상과 공급원 전환 시 18~24개월의 인증 기간이 부담으로 남아 있습니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 | 개별 판단 |
| --- | --- | --- | --- |
| 2026-02-13 | Greenberg Traurig | 중국 상무부의 대일 이중용도 품목 수출금지 및 제3국 자회사 책임 부과. | 관심 — 중·일 양자 분쟁, 한국은 대상 아님 |
| 2026-03-16 | Mining Reporters | 중국 수출통제·군수 수요 확대에 따른 텅스텐 가격 557% 급등. | 관심 — 가격 이슈이며 텅스텐 직접 구매 없음 |
| 2026-06-04 | Tiger Brokers | 중국산 WF6 수출가 전월 대비 약 200% 상승 및 한·일 제조사 단가 인상 통보. | 관심 — 원가 상승일 뿐 공급은 유지 |
| 2026-06-10 | 더구루 | WF6 가격 전년 대비 232.7% 상승(중국 시장) 및 국내 공급사 70~90% 단가 인상 통보. | 후속 — 대체 조달 현황 |
| 2026-06-15 | 더구루 | 일본 칸토덴카·센트럴글래스의 7월 WF6 생산 중단 발표(글로벌 공급의 약 25%). | 검증 — 실제 생산 중단 |
| 2026-07-13 | Payne Institute | WF6 공급원 전환 시 18~24개월 인증 기간 소요에 따른 대체 지연. | 후속 — 대체 조달 현황 |

## 3. 구매 영향도

- **WF6 — 공급 중단 현실화** — 글로벌 공급의 약 25%가 빠지면서 일본산 WF6를 쓰던 물량은 국내 공급사 중심으로 재배정해야 합니다.
- **대체 조달 원가** — 국내 공급사의 70~90% 단가 인상 통보로 DRAM·V-NAND 배선 공정의 소재 원가가 크게 오릅니다.
- **인증 기간에 따른 공백** — 공급원 전환에 18~24개월이 걸려, 기존 인증 공급사의 증설 속도가 실제 대체 시점을 결정합니다.
- **점검 사항** — WF6 공급사별 텅스텐 원료 원산지, 국내 공급사의 증설·인증 일정을 점검해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 칸토덴카 · 센트럴글래스 | 일본 | 육불화텅스텐 WF6(1301-000006) | 원료 텅스텐 조달 차질·7월 생산 중단 |
| SK스페셜티 · 후성 | 한국 | 육불화텅스텐 WF6(1301-000006) | 대체 수요 집중·단가 70~90% 인상 |
| 중국 핵심광물 가공거점 | 중국 | 텅스텐(2001-000003) | 수출통제·대일 이중용도 수출금지 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:h1-helium-iso': `# 복합 리스크 보고서 H1 · 헬륨 대체 조달 물량의 운송용 ISO 컨테이너 부족 우려

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB · 종합 판단: 주의

## 1. 종합 요약

국내 칩메이커들은 헬륨 물량을 확보해 6월까지 가동을 유지했습니다. 카타르 헬륨 생산 중단이 장기화되고 러시아가 헬륨 수출통제를 시행했지만, 러시아와 미국은 한국의 주 공급국이 아니어서 개별로는 '관심' 수준으로 판단됐습니다. 헬륨 운송용 ISO 컨테이너 문제도 특수 컨테이너에 국한된 물류 이슈나 업계 분석 수준의 경고로 보였습니다.

그러나 헬륨은 ISO 극저온 컨테이너로만 운송할 수 있습니다. 컨테이너가 걸프 지역에 발이 묶이고 빈 용기 재배치가 늦어지면, 대체 물량을 계약하더라도 실제 입고량이 계약량에 못 미칠 수 있습니다. 대체 공급원인 러시아는 수출통제, 미국은 자국 수요 우선이라는 서로 다른 이유로 동시에 제약을 받고 있고, 10월 현재 호르무즈 봉쇄가 이어지며 컨테이너 회수도 지연되고 있습니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 | 개별 판단 |
| --- | --- | --- | --- |
| 2026-04-09 | Horn Review | 헬륨 공용기 재배치 차질에 따른 역물류 문제 부상. | 관심 — 업계 분석 수준의 경고 |
| 2026-04-17 | TrendForce | 국내 칩메이커의 헬륨 물량 확보에 따른 6월까지 가동 유지. | 정상 — 대체 물량 확보 |
| 2026-06-09 | IUMI | 카타르 헬륨 생산 중단 장기화 및 러시아 헬륨 수출통제 시행. | 관심 — 러시아·미국은 한국의 주 공급국이 아님 |
| 2026-06-23 | ASP Isotopes (보도자료) | 헬륨 운송용 ISO 컨테이너의 페르시아만 내 발 묶임 및 유통 수량 감소. | 관심 — 특수 컨테이너 대상의 제한적 물류 이슈 |

## 3. 구매 영향도

- **계약량과 입고량의 괴리** — 대체 물량 계약이 있어도 운송 컨테이너가 부족하면 실제 입고가 늦어지거나 줄어들 수 있습니다.
- **대체 공급원의 동시 제약** — 러시아(수출통제)와 미국(자국 수요 우선)이 서로 다른 이유로 동시에 제약돼, 대체 공급선 선택지가 좁습니다.
- **확보 물량 소진 이후** — 6월까지는 확보 물량으로 대응했지만, 호르무즈 봉쇄가 이어지면서 컨테이너 회수가 늦어지고 있습니다.
- **점검 사항** — 공급사별 계약 물량 대비 실제 입고량, 가스 공급사의 ISO 컨테이너 가용 대수를 점검해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 카타르 라스라판 가스단지 | 카타르 | 고순도 헬륨(1601-000009) | 생산 중단 장기화·호르무즈 봉쇄 |
| 헬륨 운송 컨테이너 | 걸프 지역 | ISO 극저온 컨테이너(2201-000001) | 걸프 내 발 묶임·재배치 차질 |
| SK스페셜티 · 원익머트리얼즈 | 한국 | 고순도 헬륨(1601-000009) | 대체 물량 입고 지연 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:p1-midterm-tariff': `# 복합 리스크 보고서 P1 · 중간선거 국면의 관세 압박 반도체 집중 및 대미 투자 요구 확대

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

2월 대법원 판결로 관세 체계의 상당 부분이 무효가 됐고, 공화당 내부에서는 신규 관세가 중간선거의 생활비 메시지를 덮을 것이라는 우려가 나옵니다. 따로 보면 '관세 완화 신호'로 읽히는 뉴스입니다. 그러나 행정부는 1974년 무역법을 근거로 60개국에 신규 관세를 다시 부과했고, 반도체 관세율은 대미 투자 규모와 연동하는 방안이 검토되고 있습니다.

선거 국면에서 소비재 관세는 정치적 비용이 크지만, 반도체는 중간재이고 '투자 유치'로 포장할 수 있어 정치적 비용이 낮은 압박 수단입니다(AI 추론). 관세 혜택의 기준점이 TSMC의 2,650억 달러 투자가 되면, 한국이 확보한 '대만보다 불리하지 않은 대우' 조항은 사실상 비슷한 규모의 투자를 요구하는 기준이 됩니다. 삼성은 테일러 팹 보조금을 받지 못한 채 가동을 앞두고 있고, 같은 시기 용인 증설도 앞당기고 있어 한정된 장비·인력·자본을 두 나라의 증설 요구가 나눠 쓰게 됩니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 | 개별 판단 |
| --- | --- | --- | --- |
| 2026-01-19 | The Korea Herald | 한미 합의서 반도체 관세율 미정, '대만보다 불리하지 않은 대우' 조항으로 대응. | 안전판 확보, 긍정 |
| 2026-07-22 | 디지털데일리 | 용인 용수 1단계 2029년 5월로 조기 공급, 국가산단 2030년까지 LNG 전력. | 국내 인프라 이슈 |
| 2026-07-23 | AP (Action News Jax) | 1974년 무역법 근거로 60개국에 10~12.5% 신규 관세 부과. | 일반 통상 이슈 |
| 2026-07-24 | The Daily Beast | 공화당 내부, 신규 관세가 중간선거 생활비 메시지를 덮을 것이라 우려. | 관세 완화 신호 |
| 2026-08-03 | 36Kr | 5대 장비사 납기 1.5~2배, 6개월 걸리던 장비가 약 1년 소요. | 장비 업황 지표 |
| 2026-08-19 | SamMobile | 삼성 테일러 1팹 연내 가동 예정, CHIPS 보조금 47.45억 달러 미수령. | 프로젝트 진척, 긍정 |
| 2026-09-04 | TrendForce | 러트닉, 반도체 관세율을 대미 투자 규모와 연동 검토, TSMC 2,650억 달러. | 협상 진행 중 |

## 3. 구매 영향도

- **관세 압박의 반도체 집중** — 소비재 관세가 정치적 부담이 되는 만큼, 압박이 반도체 투자 요구로 옮겨올 수 있습니다(AI 추론). 대미 수출 원가 시나리오에 반도체 품목 관세를 별도로 반영해야 합니다.
- **'불리하지 않은 대우'의 실제 의미** — 관세 혜택이 투자 규모에 연동되면, 안전판으로 보였던 조항이 TSMC 수준의 투자를 요구하는 기준으로 작동할 수 있습니다.
- **대미·국내 증설의 자원 경합** — 테일러와 용인 증설이 동시에 진행되면, 이미 1년 안팎으로 늘어난 장비 납기와 한정된 인력·자본을 두 거점이 나눠 써야 합니다.
- **보조금 미수령에 따른 협상력 약화** — 보조금이 마일스톤에 연동된 상태에서 투자를 먼저 집행해, 관세·투자 협상에서 불리한 위치에 설 수 있습니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 삼성 테일러 팹 | 미국 | 파운드리 생산 | 보조금 미수령·투자 연동 관세 |
| 용인 1기 팹 | 한국 | 팹 전력·용수 | 국내 증설 가속과 자원 경합 |
| 도쿄일렉트론 · ASML | 일본 · 네덜란드 | 식각·증착·노광 장비 | 장비 납기 1.5~2배 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다. 선거 결과를 예측하거나 특정 정당을 평가하지 않으며, 정책 결정자의 유인 구조만 다룹니다.
`,
  'demo:p2-cxmt-paradox': `# 복합 리스크 보고서 P2 · 미국 대중 장비 규제에 따른 중국 CXMT 부상 및 삼성 범용 D램 경쟁력 약화

작성 기준일: 2026-10-21 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

미국의 대중 장비 수출통제로 AMAT의 중국 매출 비중이 줄었고, 그 공백은 비미국 장비사와 중국 장비사가 메우고 있습니다. 글로벌 장비 리드타임이 12~24개월로 늘어난 사이 중국 장비사는 납기 우위까지 확보했습니다. 각각은 '장비사 실적 이슈', '중국 장비 시장 이슈'로 보이는 뉴스입니다.

그러나 이 흐름은 CXMT의 증설 속도를 끌어올리고, 그만큼 삼성의 범용 D램 경쟁력을 약화시킵니다. 삼성·SK가 HBM으로 생산능력을 돌리며 생긴 범용 D램 공백을 CXMT가 채우고 있고, 일부 64GB 서버 DDR5는 삼성보다 비싸게 팔 만큼 가격 결정력도 확보했습니다. 점유율은 1Q26 7.6%(세계 4위)에서 2Q26 9.5~10%로 올랐고, 평균 판매가는 삼성·SK보다 5~10% 낮아 범용 제품 전반의 가격 경쟁 압력이 커지고 있습니다. 생산능력은 연말 월 35만 장에서 2028년 월 50만 장으로 늘어날 계획입니다. 견제 정책과 시장 공백이 함께 경쟁자를 키우는 구조로, 지금의 공급 부족이 풀리는 시점에 삼성 범용 D램의 가격·점유율 압박으로 돌아올 수 있습니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 | 개별 판단 |
| --- | --- | --- | --- |
| 2026-04-22 | 파이낸셜뉴스 | 삼성 18나노 D램 공정정보 CXMT 유출 전 엔지니어에 징역 7년. | 1심 판결, 항소심 진행 중 |
| 2026-07-22 | 이데일리 | CXMT D램 가격 30% 낮아, 수율 40~50%→80~90%면 경쟁력 급상승. | 경쟁사 동향 |
| 2026-07-24 | Guru3D (Reuters 인용) | CXMT, 64GB 서버 DDR5를 삼성보다 비싸게 판매, 증설 시 월 60만 장 이상. | 경쟁사 동향 |
| 2026-08-15 | KuCoin News | AMAT 중국 매출 비중 35%→28%, 비미국 경쟁사가 공백을 메움. | 장비사 실적 이슈 |
| 2026-08-18 | TrendForce | CXMT 1Q26 점유율 7.6%로 4위, 17nm DDR5 수율 90% 달성 보도. | 경쟁사 동향 |
| 2026-08-19 | TrendForce | 장비 리드타임 12~24개월, 중국 AMEC 약 9개월, CXMT 대규모 장비 입찰. | 중국 장비 시장 이슈 |

## 3. 구매 영향도

- **삼성 범용 D램 가격·점유율 압박의 시차** — 지금은 공급 부족으로 모두 이익을 보지만, CXMT 생산능력이 시장에 풀리는 시점에 삼성 범용 D램의 가격 하방 압력과 점유율 잠식이 커질 수 있습니다.
- **장비 조달 경쟁 구도 변화** — 중국 장비사가 납기 우위를 갖게 되면서 CXMT의 증설은 글로벌 장비 부족의 영향을 덜 받습니다. 삼성의 장비 납기 리스크는 그대로입니다.
- **수율 정보의 불확실성** — CXMT 수율은 출처마다 40~50%와 90%로 엇갈립니다. 경쟁력 판단의 핵심 변수인 만큼 지속적으로 추적해야 합니다.
- **기술 유출의 누적 효과** — 삼성 18나노 공정 정보 유출 사건(1심 징역 7년, 항소심 진행 중)은 경쟁사의 기술 추격을 앞당긴 배경으로 남아 있습니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| AMAT | 미국 | 증착·식각 장비 | 대중 수출통제로 중국 매출 감소 |
| 도쿄일렉트론 | 일본 | 식각·증착 장비 | 중국 공백 대체·납기 지연 |
| 장비 부품 공급망 | 글로벌 | RF 전원장치(2101-000001) | 리드타임 최대 24개월 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:c1-capa-race': `# 복합 리스크 보고서 C1 · 반도체 수출 호황 이면의 장비 반입 비용 상승 및 국내외 소부장 공급 캐파 확보 경쟁 심화

작성 기준일: 2026-10-22 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

10월 셋째 주 전후의 다섯 뉴스는 각각 보면 리스크가 아닙니다. 반도체 수출과 장비 수입이 크게 늘었다는 통계는 업황 호조 지표이고, SK하이닉스의 2조 원 보증은 상생 금융이며, 일본 소부장 분석은 증권사 리포트, 232조 관세 해설은 현행 영향이 제한적이라는 내용입니다.

그러나 함께 보면 하나의 흐름이 드러납니다. 반도체 수출이 10월 1~20일 222.5% 늘고 제조장비 수입도 초순 208.8%, 1~20일 누적 93.4% 급증해 업계 전체의 장비·소재 수요가 한꺼번에 몰리고 있습니다. 같은 시기 경쟁사는 추천 협력사의 설비투자 자금을 지원하고, 소재의 약 50%·장비의 약 30%를 차지하는 일본 공급사는 쉽게 대체할 수 없습니다. 여기에 미국 232조 관세가 2단계에서 반도체 제조장비까지 넓어질 가능성이 남아 있습니다. 공급사 생산능력이 단기간에 늘지 않는 상황에서, 국내 협력사와 일본 공급사 양쪽의 물량 배정 경쟁과 미국 거점 장비 반입 비용 부담이 동시에 커질 수 있습니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 | 개별 판단 |
| --- | --- | --- | --- |
| 2026-10-12 | 조세금융신문 | 10월 1~10일 수출 261억 달러(102%↑), 반도체 170.9%↑, 반도체 제조장비 수입 208.8%↑. | 업황 호조 지표 |
| 2026-10-17 | USKoreaTrade | 232조 현행 25% 관세는 첨단 컴퓨팅 칩에 한정, 2단계에서 장비·파생제품 확대 가능성. | 현행 영향 제한적 |
| 2026-10-19 | 머니투데이 | SK하이닉스·4대 은행·무역보험공사, 추천 소부장 협력사에 2조 원 보증 지원. | 상생 금융 |
| 2026-10-21 | 국제뉴스 | 10월 1~20일 수출 616억 달러 역대 최대, 반도체 222.5%↑, 반도체 제조장비 수입 93.4%↑. | 업황 호조 지표 |
| 2026-10-22 | 이투데이 | 토스증권, 일본이 반도체 소재 약 50%·장비 약 30% 점유, 공급사 교체 장벽 높다고 분석. | 증권사 산업 분석 |

## 3. 구매 영향도

- **장비·부품 — 수요 집중에 따른 생산 슬롯 경쟁** — 장비 수입이 두세 배로 늘어나는 국면에서는 장비사와 부품사의 생산 슬롯 배정이 반입 일정을 좌우합니다. 신규 라인 셋업 일정과 장비 발주 시점의 정합성을 점검해야 합니다.
- **국내 협력사 — 경쟁사 금융 지원에 따른 캐파 선점** — 경쟁사가 자금을 지원한 협력사의 증설 물량은 경쟁사 수요에 우선 배정될 수 있습니다. 삼성과 공급사를 함께 쓰는 협력사의 지원 참여 여부와 캐파 배정 계획을 확인해야 합니다.
- **일본산 소재·장비 — 대체 어려움** — 공급사 전환에 긴 검증이 필요해 수요가 몰릴 때 다른 공급선으로 피하기 어렵습니다. 일본산 단일 공급 품목의 재고 일수와 할당 물량을 점검해야 합니다.
- **미국 거점 장비 — 232조 2단계 가능성** — 2단계에서 반도체 제조장비가 관세 대상에 포함되면 테일러 팹 등 미국 거점의 장비 반입 비용이 늘 수 있습니다. 2단계 발표 시점과 관세 상쇄 프로그램 요건을 추적해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 도쿄일렉트론 | 일본 | 식각·증착 장비 | 일본산 장비 수요 집중·생산 슬롯 배정 |
| JSR | 일본 | EUV 포토레지스트(1201-000001) | 일본산 소재 수요 집중·공급사 전환 장벽 |
| 국내 소부장 공용 협력사 | 한국 | 장비 부품·공정 소재 | 경쟁사 금융 지원에 따른 증설 물량 배정 |
| 삼성 테일러 팹 | 미국 | 반도체 제조장비 | 232조 2단계 시 장비 반입 관세 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:p3-bromine': `# 복합 리스크 보고서 P3 · 브롬 공급선 다변화 착시 및 HBr 원료의 이스라엘 집중

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

한국은 브롬 수입의 97.5%를 이스라엘에 의존하지만, D램·낸드 식각에 쓰는 HBr은 일본(47.1%)과 미국(23.5%)에서 주로 들여옵니다. 따로 보면 'HBr은 일본산 위주라 영향 제한', '다변화된 것으로 보임'으로 판단되는 구조입니다.

그러나 일본도 액체 브롬의 70% 이상을 이스라엘에 의존합니다. 1차 공급선은 나뉘어 있어도 상류 원료는 같은 곳에서 나옵니다. 이스라엘 물동량은 지중해 항구를 써서 호르무즈를 거치지 않아, 호르무즈 중심 모니터링에서 빠지기 쉬운 사각지대입니다. 이란 미사일이 ICL 사해 시설 35km 이내를 타격했고, 반도체급 HBr 전환 설비는 새로 짓는 데 수년이 걸려 단기 대체가 어렵습니다. 여기에 선사들이 수에즈로 복귀하는 시점에 후티가 사우디 봉쇄를 선언하고 바브엘만데브에서 공격을 이어가고 있어, 이스라엘발 아시아행 해상 경로의 위험도 커지고 있습니다(AI 추론).

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 | 개별 판단 |
| --- | --- | --- | --- |
| 2026-04-14 | War on the Rocks | 한국 브롬 97.5% 이스라엘산, 이란 미사일이 ICL 사해 시설 35km 이내 타격. | 영향 제한(HBr은 일본산 위주) |
| 2026-04-17 | TrendForce | 한국 HBr 최대 공급국은 일본(47.1%), 일본도 액체 브롬 70% 이상 이스라엘 의존. | 다변화된 것으로 보임 |
| 2026-08-12 | Container News | 후티, 사우디 봉쇄 선언 후 바브엘만데브서 티하마호 공격, 6명 사망. | 사우디 관련 이슈 |
| 2026-09-03 | gCaptain (Drewry WCI) | 아시아-유럽 운임 하락, 선사들 수에즈 복귀 확대. | 운임 하락, 긍정 |

## 3. 구매 영향도

- **HBr — 다변화 착시** — 일본·미국으로 나뉜 HBr 공급선이 원료 단계에서는 이스라엘 한 곳에 묶여 있습니다. 이스라엘 공급이 끊기면 대체 공급선이 함께 막힐 수 있습니다.
- **모니터링 사각지대** — 중동 리스크 모니터링이 호르무즈에 쏠려 있어, 지중해·홍해 경로의 이스라엘발 원료 리스크를 놓칠 수 있습니다.
- **단기 대체 불가** — 반도체급 HBr 전환 설비는 인허가·장비·인증에 수년이 걸려, 차질 발생 시 재고 외에는 대응 수단이 제한됩니다.
- **점검 사항** — HBr 공급사별 원료 브롬 원산지(2차 이상 공급망)와 재고 일수, 홍해 경유 운송 비중을 점검해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| ICL (사해 브롬 시설) | 이스라엘 | 액체 브롬(2001-000004) · HBr(1301-000007) | 이란 미사일 타격 반경·단일 시설 |
| 일본 HBr 공급사 | 일본 | 브롬화수소 HBr(1301-000007) | 원료 브롬 70% 이상 이스라엘 의존 |
| 홍해·바브엘만데브 | 예멘 | 브롬·HBr 해상 운송 | 후티 공격·사우디 봉쇄 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:x1-air-cargo': `# 복합 리스크 보고서 X1 · AI 수요 확대에 따른 항공 화물칸 경합 및 장비 부품 조달 지연

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

네 건의 뉴스는 각각 '업황 호조', '화주 일반 이슈', '중동 이슈', '장비 시장 이슈'로 따로 보면 반도체 구매와 직접 연결되지 않습니다. 그러나 모두 '아시아발 항공 화물칸'이라는 같은 한정 자원을 두고 부딪힙니다. 장비 예비부품과 모듈은 긴급 시 항공으로 들여오는데, 그 화물칸을 고객사 AI 서버 물량이 선점하고 있습니다.

2월 중동 확전으로 글로벌 항공화물 공급의 12%가 사라졌고, 6월 이후 중국-유럽 화물기 공급은 약 30% 줄었으며, 아시아-미국 탑재율은 90%에 육박합니다. 동시에 장비 리드타임이 12~24개월로 늘어 긴급 부품을 항공으로 받아야 하는 빈도는 오히려 늘어납니다. 메모리 호황이 장비 유지보수 물류를 스스로 압박하는 자기 제약 구조입니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 | 개별 판단 |
| --- | --- | --- | --- |
| 2026-07-10 | Asteelflash | 2월 중동 확전으로 글로벌 항공화물 공급 12% 증발, 항만 대기 340만 TEU. | 중동 이슈 |
| 2026-08-15 | DHL Global Forwarding | 중국-유럽 화물기 공급 약 30% 감소, 아시아-미국 탑재율 90% 육박. | 화주 일반 이슈 |
| 2026-08-19 | TrendForce | 장비 리드타임 12~24개월, RF 전원장치 최대 24개월, 삼성·SK 조기 발주 검토. | 장비 시장 이슈 |
| 2026-08-20 | Air Cargo Week | 아태 화물시장, AI·반도체 수요 강세 vs 소비재 약세 양극화. | 업황 호조 신호 |

## 3. 구매 영향도

- **긴급 부품 항공 운송 — 캐파 확보 경쟁** — AI 서버 화물이 아시아발 항공 공간을 선점하면서, 장비 예비부품의 긴급 항공 운송이 운임 상승과 선적 지연을 동시에 겪을 수 있습니다.
- **리드타임과 운송 빈도의 역설** — 장비 리드타임이 길어질수록 가동 중인 장비의 유지보수 부품을 긴급 조달할 일이 늘어, 항공 의존도가 커지는 악순환이 생깁니다.
- **RF 전원장치 등 핵심 모듈** — 최대 24개월이 걸리는 부품은 고장 시 대체가 어렵습니다. 예비 재고 수준과 항공 긴급 조달 경로를 함께 확인해야 합니다.
- **점검 사항** — 미국·유럽발 장비 부품의 항공 블록 스페이스 계약 여부, 해상 전환 시 리드타임 증가분을 점검해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 도쿄일렉트론 | 일본 | 식각·증착 장비 · RF 전원장치(2101-000001) | 장비·예비부품 항공 긴급 운송 |
| ASML | 네덜란드 | EUV·DUV 노광장비 | 유럽발 장비 모듈 항공 운송 |
| 아시아-미국·중국-유럽 항공 노선 | 글로벌 | 장비 예비부품 전반 | AI 서버 화물과 캐파 경합 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:x2-fab-schedule': `# 복합 리스크 보고서 X2 · 재해·장비 납기·인프라 지연 누적에 따른 용인 증설 일정 차질 우려

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

구마모토 지진에 따른 TEL 공장 가동 중단, AI 수요 폭증에 따른 장비 납기 1.5~2배 증가, 용인 산단의 전력·용수 공급 지연 우려는 원인이 서로 무관합니다. 따로 보면 각각 '일시 중단 후 재가동', '업황 지표', '지역 정책 이슈'로 감당 가능한 수준입니다.

그러나 세 지연은 모두 용인 1기 팹(2029년 10월 목표)이라는 같은 증설 일정에 동시에 걸려 있고, 지연은 더해집니다. 장비 리드타임이 1년을 넘는 시장에서는 공급사의 며칠짜리 가동 중단도 출하 대기열 순번을 밀어내며, 장비가 제때 도착해도 전력·용수가 없으면 팹을 가동할 수 없습니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 | 개별 판단 |
| --- | --- | --- | --- |
| 2026-07-22 | 아시아경제 | 삼성 용인 1기 팹 가동 2029년 10월로 1년 앞당김, 전력·용수 1~2년 지연 우려. | 지역 정책 이슈 |
| 2026-07-29 | TrendForce | 구마모토 M7.1 지진으로 TEL 공장 가동 중단, 후지필름 대피. | 일시 중단, 재가동됨 |
| 2026-08-03 | 36Kr | 5대 장비사 납기 1.5~2배, 6개월 걸리던 장비가 약 1년 소요. | 업황 지표 |
| 2026-08-19 | TrendForce | 핵심 부품 부족으로 장비 리드타임 12~24개월, 삼성·SK 조기 발주 검토. | 업황 지표 |

## 3. 구매 영향도

- **장비 대기열 지연의 증폭** — 리드타임이 12~24개월인 상황에서 TEL의 짧은 가동 중단도 출하 대기열 전체를 뒤로 미룹니다. 발주 순번과 출하 예정일을 공급사별로 재확인해야 합니다.
- **장비 도착과 인프라 준비의 시차** — 1기 팹 가동이 1년 앞당겨진 반면 전력·용수는 1~2년 늦어질 수 있어, 장비가 도착해도 가동하지 못하는 구간이 생길 수 있습니다.
- **조기 발주의 양면성** — 조기 발주는 대기열 확보에 유리하지만, 인프라 지연 시 장비 보관·검수 일정과 대금 지급 조건이 부담으로 돌아옵니다.
- **점검 사항** — 장비 조기 발주 일정과 인프라(전력·용수) 공급 일정 간 정합성을 점검해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 도쿄일렉트론 | 일본 | 식각·증착 장비 | 구마모토 지진 가동 중단·납기 지연 |
| ASML | 네덜란드 | EUV·DUV 노광장비 | 장비 납기 1.5~2배 |
| 장비 부품 공급망 | 글로벌 | RF 전원장치(2101-000001) | 부품 부족으로 리드타임 최대 24개월 |
| 용인 1기 팹 | 한국 | 팹 전력·용수 | 인프라 공급 1~2년 지연 우려 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:x3-credit-signal': `# 복합 리스크 보고서 X3 · 석유화학사 신용등급 강등에 따른 반도체 용제 공급 차질 우려

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

반도체 용제의 원료 사슬은 나프타 → 프로필렌 → PGME·PGMEA → PR·Thinner로 이어집니다. 이 사슬의 상류(3~4차 공급사)인 석유화학사가 재무적으로 무너지는 중입니다. 여천NCC는 신용등급이 BBB+로 강등됐고 보유 현금 528억 원 대비 1년 내 만기 차입금이 약 1.2조 원에 달하며, 석유화학 업종은 하반기 역래깅으로 실적이 다시 악화될 수 있다는 전망이 나왔습니다.

봄철 나프타·프로필렌 부족에 따른 PGME·PGMEA 차질 뉴스는 잦아들었지만, 신용 뉴스는 향후 감산·설비 폐쇄의 선행지표입니다. 1차 협력사인 원익머트리얼즈도 운임·헬륨 원가를 전가하지 못해 이익이 컨센서스를 하회했습니다. 물량 리스크가 재무 리스크의 모습으로 다시 다가오고 있습니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 | 개별 판단 |
| --- | --- | --- | --- |
| 2026-04-27 | 딜사이트 | 나프타 부족으로 PGME·PGMEA 생산 연쇄 차질, PR·시너 용제 공급 비상. | 봄철 이슈, 진정 국면 |
| 2026-07-01 | SBS Biz | 나이스신평 상반기 하향 37건 > 상향 32건, 석유화학 하반기 역래깅 우려. | 업종 전망 |
| 2026-07-17 | 뉴데일리 | 여천NCC A- → BBB+ 강등, 현금 528억 원 vs 1년 내 만기 차입금 약 1.2조 원. | 석화업계 신용 이슈 |
| 2026-08-10 | 하나증권 | 원익머트리얼즈 매출 +23%에도 운임·헬륨 마진 훼손으로 이익 컨센서스 하회. | 실적 이슈 |

## 3. 구매 영향도

- **상류 석화사 감산·설비 정리 가능성** — 신용 강등과 유동성 압박이 겹친 석화사는 감산이나 설비 정리로 대응할 수 있으며, 이는 프로필렌·PGMEA 공급 차질로 이어집니다.
- **용제 공급의 숨은 단일 의존** — PGMEA는 대체·재고 확보가 쉽지 않아, 상류 원료 공급사 한 곳의 차질이 PR·Thinner 조달 전반에 영향을 줄 수 있습니다.
- **1차 협력사 단가 인상 요구** — 원익머트리얼즈처럼 원가를 전가하지 못한 협력사는 단가 인상을 요구할 가능성이 큽니다. 계약 갱신 일정을 미리 파악해야 합니다.
- **점검 사항** — 2~4차 공급사까지 신용등급·단기차입 비율 등 재무 모니터링 범위를 확대해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 여천NCC | 한국 | 나프타(1901-000001) · 프로필렌(1901-000002) | 신용 강등·유동성 압박 |
| LG화학 | 한국 | 나프타(1901-000001) · PGMEA 용제(1201-000005) | 석화 업종 역래깅·가동률 저하 |
| 원익머트리얼즈 | 한국 | 고순도 헬륨(1601-000009) · 특수가스 | 운임·헬륨 원가 전가 실패 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:x4-yongin-lng': `# 복합 리스크 보고서 X4 · 용인 산단 LNG 전원 선택에 따른 연료 공급·탄소 비용 리스크 동시 고착

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

정부는 용인 국가산단 1단계 전력을 2030년까지 산단 내 LNG로 공급하기로 했고, LNG는 AI·반도체 전력원으로 재부상하고 있습니다. 따로 보면 인프라 진척과 에너지 정책이라는 긍정적 뉴스입니다.

그러나 증설 속도를 위해 택한 LNG 전원은 서로 반대 방향인 두 리스크를 동시에 키웁니다. 하나는 공급 안보로, 카타르의 대한국 LNG 장기계약 불가항력 선언이 그 취약성을 이미 보여줬습니다. 다른 하나는 탄소 비용으로, EU CBAM이 반도체로 확대되거나 고객사 RE100 요구가 강화되면 LNG 기반 생산분의 경쟁력이 약해집니다. 여기에 산단 승인 무효 소송까지 겹쳐 있습니다. 하나의 결정이 지정학 리스크와 ESG 리스크를 함께 고착시키는 구조라, 카테고리별 개별 분석으로는 드러나지 않습니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 | 개별 판단 |
| --- | --- | --- | --- |
| 2026-01-12 | 주간경향 | 환경단체, 용인 국가산단 승인 무효 행정소송, 비수도권 의원은 이전 주장. | 지역 갈등 |
| 2026-02-12 | IEEFA | EU CBAM 본격 시행, 반도체 포함 시 2026~2034년 인증서 비용 약 5.88억 달러. | 미래의 가정 |
| 2026-03-20 | Korea JoongAng Daily | 카타르, 대한국 장기 LNG 계약 불가항력 선언·전력단가 변동성 경고. | 봄철 단기 쇼크 |
| 2026-07-11 | The Korea Times | LNG, 한국 AI·반도체 전력원으로 재부상. | 에너지 정책 |
| 2026-07-22 | 디지털데일리 | 용인 용수 1단계 2029년 5월로 조기 공급, 국가산단 2030년까지 LNG 전력. | 인프라 진척, 긍정 |

## 3. 구매 영향도

- **전력 단가 — 연료 공급 리스크에 고정** — 용인 초기 전력이 LNG에 묶이면, 카타르 불가항력 사례처럼 LNG 단가 급등이 팹 전력비로 곧바로 전가됩니다.
- **탄소 비용 — 고객사·규제 리스크에 고정** — 반도체가 CBAM 대상에 포함되거나 고객사 RE100 요구가 강화되면, LNG 기반 생산분은 인증서 비용과 공급사 평가에서 불리해집니다.
- **인프라 일정 불확실성** — 승인 무효 소송이 진행 중이라 전력·용수 일정 자체가 변동될 수 있습니다.
- **점검 사항** — PPA 등 전력원 다변화 로드맵과 LNG 장기계약의 공급처 분산 현황을 점검해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 카타르 라스라판 가스단지 | 카타르 | LNG(1902-000001) | 장기계약 불가항력·호르무즈 경유 |
| 용인 1기 팹 | 한국 | 팹 전력·용수 | 산단 내 LNG 전원 의존·소송 |
| EU 수출 물량 | 유럽 | 반도체 완제품 | CBAM 인증서 비용 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:x5-test-leak': `# 복합 리스크 보고서 X5 · 테스트·후공정 공급사 대상 사이버 공격 반복에 따른 기술 유출 우려

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

2026년 반도체 사이버 피해가 테스트·후공정 공급사에 집중되고 있습니다. 테스트장비사 Advantest가 2월 랜섬웨어 피해를 입었고, 테스트업체 Trio-Tech 싱가포르 자회사는 데이터 유출까지 확인됐으며, 유체부품 공급사 Fit-Line도 공격을 받았다는 주장이 나왔습니다. 개별로는 '운영 영향 없음', '소규모 업체 사고', '주장 단계'로 판단되는 사건들입니다.

그러나 테스트 장비사와 테스트 서비스사는 고객사의 테스트 프로그램과 수율 데이터를 다룹니다(분석가 판단). HBM에서는 테스트가 경쟁력의 핵심입니다. 기술 유출 경로는 18나노 D램 공정정보 유출 사건 같은 '내부자'에서 '공급사 침해'로 넓어지는데, 공개 시점은 크게 늦습니다. Advantest는 공격 후 233일 만에 데이터 유출을 통지했습니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 | 개별 판단 |
| --- | --- | --- | --- |
| 2026-01-13 | DeXpose | 랜섬웨어 그룹 Incransom, PFA·PVDF 부품 공급사 Fit-Line 공격 주장. | 주장 단계 |
| 2026-02-23 | Help Net Security | 테스트장비사 Advantest 랜섬웨어 피해 확인(2/15 이상징후 탐지). | 운영 영향 없음 |
| 2026-03-20 | The Record | Trio-Tech 싱가포르 자회사 랜섬웨어, 3월 18일 데이터 유출로 확대. | 소규모 업체 사고 |
| 2026-04-22 | 파이낸셜뉴스 | 삼성 18나노 D램 공정정보 CXMT 유출 전 엔지니어에 징역 7년. | 내부자 사건, 항소심 진행 중 |
| 2026-10-09 | PrivacyOn | Advantest 미국법인, 2월 랜섬웨어 당시 개인정보 유출 확인(10/6 통지). | 사후 통지, 운영 영향 없음 |

## 3. 구매 영향도

- **초기 공시의 과소평가 위험** — '운영 영향 없음' 공시가 수개월 뒤 데이터 유출 확인으로 바뀌는 패턴이 반복됩니다. 초기 공시만으로 공급사 리스크를 종결 처리하면 안 됩니다.
- **테스트 데이터 노출** — HBM 테스트 프로그램과 수율 데이터는 핵심 경쟁력 정보입니다. 이를 보유한 테스트 공급사의 침해는 곧 기술 유출 경로가 됩니다.
- **공급사 보안 수준 편차** — 소규모 테스트·부품 공급사는 보안 투자가 상대적으로 약해 공격 표적이 되기 쉽습니다.
- **점검 사항** — 테스트 공급사와 공유한 HBM 테스트 프로그램·수율 데이터의 범위, 접근 통제 현황, 침해 시 통지 의무 조항을 점검해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| Advantest | 일본 | 메모리·SoC 테스트장비 | 랜섬웨어·개인정보 유출(233일 후 통지) |
| Trio-Tech (싱가포르 법인) | 싱가포르 | 반도체 테스트 서비스 | 랜섬웨어·데이터 유출 |
| Fit-Line | 미국 | PFA·PVDF 유체 이송 부품 | 랜섬웨어 공격 주장 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:s1-hormuz': `# 복합 리스크 보고서 S1 · 호르무즈 사태 장기화에 따른 헬륨·LNG·나프타 공정 투입물 고갈

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

헬륨·LNG·나프타, 성격이 전혀 다른 세 가지 공정 투입물이 '호르무즈'라는 하나의 원인으로 동시에 막혀 있습니다. 3월 카타르 라스라판 피격으로 헬륨 생산이 멈췄고, 카타르는 대한국 LNG 장기계약에 불가항력을 선언했으며, 원유·나프타 수급 불안은 PGMEA 용제 생산 차질로 번졌습니다.

당초 3월에는 "재고 버퍼로 영향이 제한적"이라는 판단이 있었지만, 그 버퍼가 7개월째 소진되는 중입니다. 10월 들어 호르무즈 통항이 평시의 5% 수준(하루 4척)으로 떨어지고 장기화 전망이 굳어지면서, 이제는 '가격'의 문제가 아니라 '물량 확보 자체'의 문제로 국면이 전환되고 있습니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 |
| --- | --- | --- |
| 2026-03-16 | Caixin Global | 카타르 헬륨 중단, 한국 70%+ 의존으로 칩 공급망 신규 리스크. |
| 2026-03-20 | Korea JoongAng Daily | 카타르, 대한국 LNG 장기계약 불가항력 선언·전력단가 변동성 경고. |
| 2026-03-23 | Oxford Economics | 에너지 쇼크는 시차를 두고 반도체 생산에 파급(재고 소진 후 현실화). |
| 2026-04-02 | 파이낸셜뉴스 | LG화학 NCC 가동률 50~60%대 하향, 폴리머·용제 출하 지연 가능. |
| 2026-04-27 | 딜사이트 | 나프타 부족으로 PGME·PGMEA 생산 연쇄 차질, PR·시너 용제 비상. |
| 2026-06-09 | IUMI | 라스라판 피격으로 카타르 헬륨 생산 중단, 러시아 수출통제 겹침. |
| 2026-08-20 | Baird Maritime | 골드만삭스, 중동 해운 차질 내년까지 지속 전망·유가 전망 상향. |
| 2026-09-30 | Lloyd's List | 호르무즈 위협 수준 '심각' 유지, 선박 피격 지속. |
| 2026-10-07 | Straits(AI 브리핑) | 호르무즈 통항 하루 4척(평시 85척), 브렌트유 약 101달러. |

## 3. 구매 영향도

- **헬륨 — 물량 리스크로 전환** — 카타르 생산 중단에 러시아 수출통제가 겹쳐, 가격 협상이 아니라 배정 물량 확보가 관건이 됐습니다. 이온주입·열처리 공정의 헬륨 배정 비율을 재점검해야 합니다.
- **전력 단가 변동성** — 카타르 LNG 불가항력으로 발전 연료 수급이 흔들리면 용인·평택 팹의 전력 유틸리티 단가가 출렁일 수 있습니다.
- **포토 공정 용제** — 나프타발 PGMEA 생산 차질은 포토레지스트·시너의 조달에 직접 영향을 줍니다. PGMEA 기반 소재의 대체·재고를 확인해야 합니다.
- **재고 버퍼 소진** — '재고로 버틴다'는 전제의 유효기간이 임박했습니다. 투입물별 잔여 재고 일수를 D-day 기준으로 관리해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 라스라판 가스단지 | 카타르 | 고순도 헬륨(1601-000009) · LNG(1902-000001) | 생산 거점 피격·호르무즈 경유 |
| SK스페셜티 | 한국 | 고순도 헬륨(1601-000009) | 조헬륨 중동 수입 의존 |
| 에어리퀴드 | 프랑스 | 고순도 헬륨(1601-000009) | 카타르산 헬륨 호르무즈 경유 |
| LG화학 | 한국 | 나프타(1901-000001) · PGMEA 용제(1201-000005) | 원유·나프타 수급 불안 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:s2-nov-cliff': `# 복합 리스크 보고서 S2 · 미·중 휴전·희토류 유예의 1월 단기 연장 및 갈륨·텅스텐 수급 불확실성 지속

작성 기준일: 2026-10-21 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

11월 10일에 겹쳐 있던 미·중 휴전 만료와 중국 확대 희토류 통제 유예 만료는 2027년 1월 10일로 연장됐습니다. 다만 중국 측의 희토류 유예 연장 확인은 불분명하고, 일부 보도는 여전히 11월 10일을 시한으로 언급합니다. 두 달 남짓의 단기 연장이라 리스크가 해소된 것이 아니라 시점이 이연된 상태입니다.

11월에는 갈륨 대미 금수 유예 만료(11/27)만 남았고, 연장 소식은 아직 없습니다. 갈륨 수출은 미·중 휴전에도 94% 감소한 상태입니다. 텅스텐은 3월 고점 대비 약 69% 반락했지만 수출 허가 업체 제한과 대일 수출 중단이 이어지고 있고, 그 사이 WF6(DRAM·V-NAND 배선 소재) 공급 단가는 이미 크게 올랐습니다. 가격 압박은 일부 완화됐지만 물량 통제와 반복되는 단기 시한이 조달 불확실성으로 남아 있습니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 |
| --- | --- | --- |
| 2026-03-16 | Mining Reporters | 텅스텐 가격 557% 급등(중국 통제 + 군수 수요). |
| 2026-05-11 | CSIS | 미·중 휴전에도 갈륨 문제 미해결, 중국 갈륨 수출 94% 감소. |
| 2026-06-04 | Tiger Brokers | 중국산 WF6 수출가 전월 대비 약 200% 급등, 한·일 70~90% 인상. |
| 2026-08-27 | Mining Technology | 확대 희토류 통제 유예 11/10 만료, 2025년 4월 7종 통제는 유효. |
| 2026-09-03 | Skillings | 중국, MP Materials 등 미국 기업 블랙리스트 등재·11월 두 데드라인. |
| 2026-09-24 | CNBC | 미·중 휴전 2027년 1월 10일까지 연장, 확대 희토류 통제 유예 포함(중국 측 확인 불분명). |
| 2026-10-04 | Timewell | '11월 10일 절벽': 미·중 휴전 만료와 희토류 유예 만료 동시 도래. |
| 2026-10-20 | GlobeNewswire | 텅스텐 APT 3월 고점 대비 약 69% 하락, 중국 수출통제는 지속. |

## 3. 구매 영향도

- **WF6 — 가격보다 물량·인증 리스크** — 텅스텐 원료 가격은 반락했지만 이미 인상된 WF6 공급 단가에 반영되기까지 시차가 있고, 수출 허가 제한·대일 수출 중단으로 물량 리스크는 그대로입니다.
- **갈륨 — 11/27 유예 만료** — 11월에 남은 유일한 시한입니다. 연장 소식이 없고 수출이 이미 94% 줄어든 상태라, 만료 시 사실상 금수가 공식화될 수 있습니다.
- **이트륨 — 리드타임 선행 영향** — 식각 챔버 코팅용 이트륨은 2025년 4월부터 건별 허가 대상이며, 이번 연장과 무관하게 유효합니다. 장비 소모품 리드타임이 가장 먼저 길어질 품목입니다.
- **1월 10일 재연장 불확실성** — 단기 연장이 반복되면 시한마다 조달 계획을 다시 점검해야 합니다. 확대 통제가 복원되면 0.1% 역외 규정을 통해 장비사 부품으로 간접 노출될 수 있어, 중국 측 희토류 유예 공식 확인과 1월 협상 동향을 추적해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 중국 핵심광물 가공거점 | 중국 | 희토류(2001-000001) · 갈륨(2001-000002) · 텅스텐(2001-000003) | 수출통제·유예 시한 |
| 중국 핵심광물 가공거점 | 중국 | 육불화텅스텐 WF6(1301-000006) | 텅스텐 원료 통제·단가 전가 |
| 삼성 시안 NAND 팹 | 중국 | WF6(1301-000006) | 배선 공정 소재 수급 |
| SK하이닉스 우시 DRAM 팹 | 중국 | WF6(1301-000006) | 배선 공정 소재 수급 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:s3-china-japan': `# 복합 리스크 보고서 S3 · 중·일 갈등의 한국 전이에 따른 포토레지스트·장비 부품 조달 리스크

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

중국의 대일(對日) 압박이 단계적으로 수위를 높이고 있습니다. 이중용도 품목 수출금지(2월)로 시작해, 일본 기업 감시목록 확대와 장비용 중국산 부품 심사 강화(6월)로 이어졌습니다. 수단이 '금수 → 기업 등재 → 부품 심사'로 정교해지는 패턴입니다.

핵심은 이 갈등이 일본에서 끝나지 않고 한국으로 우회 전이된다는 점입니다. 일본 장비·소재사가 떠안는 조달 비용과 심사 지연이 한국 팹향 납기·단가로 전가될 수 있습니다. 더 큰 위험은 연쇄 확전입니다. 일본은 세계 포토레지스트의 70%, EUV용의 95%를 쥐고 있어, 일본이 PR 수출 통제로 맞대응하면 중국의 희토류 보복과 맞물려 양측이 서로의 급소를 겨누게 됩니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 |
| --- | --- | --- |
| 2025-12-03 | TrendForce | 일본, 세계 PR 70%·EUV PR 95% 점유, 수출 제한설 부상. |
| 2026-01-13 | DIGITIMES(유료) | 중국, 일본산 디클로로실란 반덤핑 조사, 포토레지스트 대치. |
| 2026-02-13 | Greenberg Traurig | 중국, 대일 이중용도 품목 수출금지·제3국 자회사에도 책임. |
| 2026-06-29 | Geopolitechs | 중국, 일본 기업 감시목록 확대·장비용 중국산 부품 심사 강화. |

## 3. 구매 영향도

- **일본 장비 납기·단가 전가** — 일본 장비사가 중국산 부품 심사 지연과 비용을 떠안으면, 그 부담이 한국 팹향 식각·증착 장비의 납기와 단가로 넘어옵니다.
- **전구체 조달 리스크** — 디클로로실란 반덤핑 조사는 증착·박막 공정 전구체의 단가 상승과 공급 위축을 부릅니다. 일본계 실리콘 전구체 공급사의 납기를 재확인해야 합니다.
- **PR 과점 — 치명적 단일점** — 일본이 EUV PR 95%를 쥔 상황에서 수출 통제가 현실화되면 대체가 사실상 불가능합니다. 포토 공정의 최대 급소입니다.
- **연쇄 확전 시나리오** — 일본 PR 통제 ↔ 중국 희토류 보복의 상호 보복 구도를 전제로, 양방향 노출을 함께 점검해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| JSR | 일본 | EUV 포토레지스트(1201-000001) | 일본 PR 수출 제한설 |
| 신에츠화학 | 일본 | 디클로로실란(1301-000005) | 중국 반덤핑 조사 대치 |
| 도쿄일렉트론 | 일본 | 식각·증착 장비 | 중국산 부품 심사 강화 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:s4-china-fab': `# 복합 리스크 보고서 S4 · 중국 팹 연간 라이선스 갱신과 미·중 휴전 만료 시점 충돌

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

삼성·SK의 중국 팹은 더 이상 자유롭게 운영되지 않습니다. VEU(검증된 최종사용자) 지위를 잃은 뒤 미국산 장비 반입은 '연간·건별 허가' 체제로 바뀌었습니다. 2026년분은 허가를 받았지만, 증설과 업그레이드는 불허되어 공정 전환이 이미 묶여 있습니다.

진짜 리스크는 타이밍입니다. 2027년분 허가 갱신 시점이 미·중 휴전 만료(11/10)와 겹칩니다. 갱신이 미·중 협상의 카드가 되면, 유지보수용 장비·부품 반입마저 지연될 수 있습니다. 시안 팹이 삼성 NAND의 약 35%를 담당하는 점을 감안하면, 갱신 불확실성은 곧 생산 가용성 리스크입니다. (※ 이 시나리오는 11/10 절벽을 다루는 S2와 N11 뉴스를 공유합니다.)

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 |
| --- | --- | --- |
| 2025-12-30 | 경향신문(영문) | 미국, 삼성·SK 중국 팹에 2026년분 장비 반입 연간 허가·증설 불허. |
| 2026-08-10 | Tech Insider | 4개 중국 팹 VEU 상실 후 건별 허가 체제, 중국 AMEC 장비 평가설(부인). |
| 2026-10-04 | Timewell | '11월 10일 절벽': 미·중 휴전 만료와 희토류 유예 만료 동시 도래. (S2 공유) |

## 3. 구매 영향도

- **갱신 지연 = 유지보수 차질** — 2027년분 허가가 협상 카드가 되면, 교체 부품·유지보수 장비 반입이 늦어져 가동률이 떨어질 수 있습니다. 시안 팹 예비부품 재고 일수를 확인해야 합니다.
- **공정 전환 제약 고착** — 증설·업그레이드 불허로 중국 팹은 현 공정에 묶입니다. 미세공정 전환이 막혀 원가·경쟁력이 서서히 잠식됩니다.
- **중국산 장비 대체의 딜레마** — 미국산 장비 제약을 피해 중국산(AMEC 등)으로 돌리면 이번엔 미국 규제 리스크를 자극합니다. 어느 쪽도 쉽지 않은 선택입니다.
- **NAND 35% 집중 리스크** — 시안 단일 거점에 삼성 NAND의 약 35%가 걸려 있어, 갱신 리스크가 곧 공급 가용성 리스크로 직결됩니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 삼성 시안 NAND 팹 | 중국 | NAND 플래시 · WF6(1301-000006) | 2027년분 라이선스 갱신 |
| SK하이닉스 우시 DRAM 팹 | 중국 | DRAM · WF6(1301-000006) | 건별 허가 체제 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
}

// ─── 헬퍼 ──────────────────────────────────────────────────────────────────────
const DEMO_NEWS_IDS = new Set(DEMO_NEWS.map((n) => n.id))
const DEMO_ENTITY_IDS = new Set(DEMO_ENTITIES.map((e) => e.id))
export const DEMO_GROUP_IDS = new Set(DEMO_GROUPS.map((g) => g.id))

/** 시연용 3그룹 id 여부 */
export function isDemoGroupId(id: string): boolean {
  return DEMO_GROUP_IDS.has(id)
}

/** 그룹 id → 사전 작성 보고서 마크다운 (없으면 null) */
export function demoGroupReport(id: string): string | null {
  return DEMO_GROUP_REPORTS[id] ?? null
}

/** 그룹 id → 소속 뉴스 id 목록 (없으면 빈 배열) */
export function demoGroupNewsIds(id: string): string[] {
  return DEMO_GROUPS.find((g) => g.id === id)?.newsIds ?? []
}

// ─── admin 토글: 데모 그룹 숨김 상태 localStorage 저장 (프론트 전용) ──────────────
// 백엔드는 데모 그룹 id를 모르므로 저장 대상이 아니다. 새로고침 후에도 관리자 토글을
// 유지하기 위해, 숨긴 데모 그룹 id 집합을 브라우저 localStorage에만 보관한다.
// v3: 시연 노출 그룹(X2·C1·S2) 외에는 기본 숨김. 노출 그룹이 바뀔 때마다 키를 올려 기존 브라우저 저장값도 새 기본값으로 시작.
const DEMO_HIDDEN_KEY = 'demo:hidden-group-ids:v3'

/** 저장값이 없을 때의 기본 숨김 집합: 시연 노출 그룹을 제외한 전체 데모 그룹 */
function defaultHiddenDemoGroupIds(): Set<string> {
  return new Set(DEMO_GROUPS.map((g) => g.id).filter((id) => !DEMO_FEATURED_GROUP_IDS.includes(id)))
}

/** 숨김 처리된 데모 그룹 id 집합 (SSR/미지원 환경에서는 기본 숨김 집합) */
export function getHiddenDemoGroupIds(): Set<string> {
  if (typeof window === 'undefined') return defaultHiddenDemoGroupIds()
  try {
    const raw = window.localStorage.getItem(DEMO_HIDDEN_KEY)
    if (!raw) return defaultHiddenDemoGroupIds()
    const arr = JSON.parse(raw)
    return new Set(Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : [])
  } catch {
    return defaultHiddenDemoGroupIds()
  }
}

/**
 * 노출 대상 id 목록(shownIds)을 받아, 더미 그룹의 숨김 상태를 localStorage에 반영.
 * managedGroupIds: 숨김 여부를 관리할 전체 더미 그룹 id (기본은 데모 3그룹).
 * 이란 그룹처럼 별도 정의된 더미 그룹도 유지하려면 호출부에서 함께 넘긴다.
 */
export function saveHiddenDemoGroupIds(
  shownIds: string[],
  managedGroupIds: Iterable<string> = DEMO_GROUP_IDS,
): void {
  if (typeof window === 'undefined') return
  const shown = new Set(shownIds)
  const hidden = [...managedGroupIds].filter((id) => !shown.has(id))
  try {
    window.localStorage.setItem(DEMO_HIDDEN_KEY, JSON.stringify(hidden))
  } catch {
    // 저장 실패는 무시 (시크릿 모드 등)
  }
}

export function isDemoNewsId(id: string): boolean {
  return DEMO_NEWS_IDS.has(id)
}

export function isDemoEntityId(id: string): boolean {
  return DEMO_ENTITY_IDS.has(id)
}

/** 특정 거점 id와 관련된 DEMO 뉴스 (relatedEntityIds에 포함된 것) */
export function demoNewsForEntity(entityId: string): NewsItem[] {
  return DEMO_NEWS.filter((n) => n.relatedEntityIds.includes(entityId))
}

/** 태그 팝업 상세 (없으면 null) */
export function getDemoTagDetail(tagId: string): DemoTagDetail | null {
  return DEMO_TAG_DETAIL[tagId] ?? null
}

// ─── 뉴스 상세 "리스크 태그" 클릭 → 공급망 정보 (fetchTagSupplyChain 병합용) ────────
const DEMO_SUPPLY_TAGS: Record<string, TagSupplyChain> = Object.fromEntries(
  Object.values(ENTITY_TAG_META).map((m) => [m.tagId, m.chain]),
)

export function isDemoSupplyTagId(tagId: string): boolean {
  return tagId in DEMO_SUPPLY_TAGS
}

/** 뉴스 상세 태그 클릭 시 반환할 공급망 정보 (없으면 null) */
export function demoTagSupplyChain(tagId: string): TagSupplyChain | null {
  return DEMO_SUPPLY_TAGS[tagId] ?? null
}
