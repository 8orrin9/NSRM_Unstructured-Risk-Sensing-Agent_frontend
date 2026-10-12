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
  mk({ id: 'demo-n01', title: '라스라판 피격으로 카타르 헬륨 생산 중단…한국 헬륨 64.7% 카타르 의존·러시아 수출통제 겹쳐', source: 'IUMI', date: '2026-06-09', category: 'material', severity: 'high', region: '중동', impact: 86,
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
  mk({ id: 'demo-n10', title: '중국 확대 희토류 통제 유예 11/10 만료…2025년 4월 7종 통제는 유효', source: 'Mining Technology', date: '2026-10-05', category: 'geopolitical', severity: 'high', region: '중국', impact: 80,
    url: 'https://www.mining-technology.com/?p=708896', entities: ['demo-china-mineral'],
    summary: '- 중국의 확대 희토류 수출통제 유예가 11월 10일 만료됩니다.\n- 2025년 4월에 시행된 7종(이트륨·스칸듐 등) 통제는 여전히 유효합니다.\n- 유예 만료 시 희토류 수출통제가 전면 복원될 수 있어 조달 불확실성이 커집니다.\n- ※ 원문 게재일 미확인(2026, 원문 확인 필요)',
    keywords: ['중국', '희토류', '수출통제', '유예 만료', '11월 10일'], tags: ['희소물질', '수출 통제', '규제 절벽'],
    why: '희토류 통제 유예가 11/10 만료되면 그간 완화됐던 수출통제가 전면 복원되어 조달 가용성이 급격히 떨어질 수 있습니다. 이미 유효한 7종 통제에 더해 확대 통제까지 복원되면 식각 챔버 코팅용 이트륨 등 장비 소모품의 리드타임이 먼저 타격받습니다. 특정 만료일에 리스크가 몰려 있어 D-day 기준의 선제 재고 확보가 필요한 사안입니다.' }),
  mk({ id: 'demo-n11', title: "'11월 10일 절벽': 미·중 휴전 만료와 희토류 유예 만료 동시 도래", source: 'Timewell', date: '2026-10-01', category: 'geopolitical', severity: 'high', region: '글로벌', impact: 84,
    url: 'https://timewell.jp/en/columns/monozukuri-whitepaper-2026-export-control-shift', entities: ['demo-china-mineral', 'demo-samsung-xian'],
    summary: '- 미·중 휴전 만료와 중국 희토류 통제 유예 만료가 11월 10일 동시에 도래합니다.\n- 두 개의 규제 데드라인이 같은 날 겹치며 "11월 10일 절벽"으로 불립니다.\n- 핵심광물 조달과 중국 생산거점 라이선스가 동시에 불확실성에 노출됩니다.\n- ※ 원문 게재일 미확인(2026, 원문 확인 필요)',
    keywords: ['11월 10일', '미중 휴전', '희토류 유예', '규제 절벽'], tags: ['규제 절벽', '수출 통제', '복합 리스크'],
    why: '미·중 휴전 만료와 희토류 유예 만료가 같은 날 겹치는 "11월 10일 절벽"은 통상·소재 리스크가 단일 시점에 집중되는 복합 사건입니다. 핵심광물 조달 불확실성과 중국 팹 라이선스 리스크가 동시에 발동되면 대응 자원이 분산돼 충격이 증폭됩니다. 이 뉴스는 S2(핵심광물 절벽)와 S4(중국 팹 라이선스) 두 시나리오를 잇는 공통 분기점으로, 11/10을 기준으로 한 통합 대비가 필요합니다.' }),
  mk({ id: 'demo-n12', title: '미·중 휴전에도 갈륨 문제 미해결…중국 갈륨 수출 94% 감소', source: 'CSIS', date: '2026-09-15', category: 'geopolitical', severity: 'high', region: '중국', impact: 78,
    url: 'https://www.csis.org/analysis/us-china-trade-truce-has-not-solved-gallium-problem', entities: ['demo-china-mineral'],
    summary: '- 미·중 휴전에도 불구하고 갈륨 수출 문제는 해결되지 않았다는 분석입니다.\n- 중국의 갈륨 수출이 94% 감소하며 사실상 금수에 가까운 수준입니다.\n- 화합물 반도체·전력 소자용 핵심 소재의 조달 리스크가 지속되고 있습니다.\n- ※ 원문 게재일 미확인(2026, 원문 확인 필요)',
    keywords: ['갈륨', '중국', '수출 94% 감소', '미중 휴전'], tags: ['희소물질', '수출 통제'],
    why: '갈륨 수출 94% 감소는 휴전이라는 외형과 달리 실질적 금수가 지속되고 있음을 보여줍니다. 갈륨은 화합물 반도체·전력 소자의 핵심 소재라 중국의 압도적 점유율을 고려하면 단기 대체가 사실상 불가능합니다. 휴전에도 핵심광물 통제가 풀리지 않는다는 점은 11/10 유예 만료 이후 상황이 더 악화될 수 있다는 경고입니다.' }),
  mk({ id: 'demo-n13', title: '텅스텐 가격 557% 급등…중국 수출통제 + 군수 수요 겹쳐', source: 'Mining Reporters', date: '2026-03-16', category: 'material', severity: 'high', region: '글로벌', impact: 76,
    url: 'https://www.miningreporters.com/noticia/news/2026/03/tungsten-prices-china-export-curbs-defense-demand', entities: ['demo-china-mineral'],
    summary: '- 텅스텐 가격이 557% 급등했습니다.\n- 중국의 수출통제와 군수 수요 증가가 겹치며 가격이 폭등했습니다.\n- 텅스텐은 WF6 등 반도체 배선 소재의 원료로, 가격 급등이 공정 소재 단가로 전이됩니다.',
    keywords: ['텅스텐', '557% 급등', '중국 수출통제', '군수 수요'], tags: ['희소물질', '원가 급등'],
    why: '텅스텐 557% 급등은 WF6(육불화텅스텐) 등 DRAM·V-NAND 배선용 소재의 원료 단가를 직접 끌어올립니다. 중국 수출통제와 군수 수요가 겹쳐 가격이 구조적으로 높은 수준에 고착될 가능성이 큽니다. 텅스텐 급등이 이미 진행된 상태라, 11/10 통제 복원 시 WF6의 단가와 수급이 동시에 압박받는 이중 리스크가 됩니다.' }),
  mk({ id: 'demo-n14', title: '중국산 WF6 수출가 전월 대비 약 200% 급등…한·일 업체 70~90% 인상', source: 'Tiger Brokers', date: '2026-05-15', category: 'material', severity: 'high', region: '중국', impact: 77,
    url: 'https://www.itiger.com/news/1117280622', entities: ['demo-china-mineral', 'demo-samsung-xian', 'demo-sk-wuxi'],
    summary: '- 중국산 WF6(육불화텅스텐) 수출가가 전월 대비 약 200% 급등했습니다.\n- 한·일 업체들도 70~90% 인상에 나섰습니다.\n- WF6은 DRAM·V-NAND 배선 공정의 핵심 소재로 단가·수급이 동시에 압박받고 있습니다.\n- ※ 원문 게재일 미확인(2026-05월, 원문 확인 필요)',
    keywords: ['WF6', '육불화텅스텐', '수출가 200% 급등', 'DRAM', 'V-NAND'], tags: ['원가 급등', '배선 소재'],
    why: 'WF6 수출가 200% 급등은 DRAM·V-NAND 배선 공정의 핵심 소재 원가를 직접 끌어올려 메모리 제조 원가에 즉각 반영됩니다. 텅스텐 원료 급등이 WF6 완제품 가격으로 전가되며 한·일 업체까지 연쇄 인상에 나선 상황입니다. 대체재가 마땅치 않은 공정 소재라 가격 상승분을 사용량 축소로 상쇄하기 어려워, 원가 부담이 고스란히 누적됩니다.' }),
  mk({ id: 'demo-n15', title: '중국, MP Materials 등 미국 기업 블랙리스트 등재…11월 두 개의 데드라인', source: 'Skillings', date: '2026-09-25', category: 'geopolitical', severity: 'high', region: '중국', impact: 79,
    url: 'https://www.skillings.net/?p=99800', entities: ['demo-china-mineral'],
    summary: '- 중국이 MP Materials 등 미국 희토류 기업을 블랙리스트에 등재했습니다.\n- 11월에 두 개의 규제 데드라인이 예정되며 통제 강화 흐름이 확인됩니다.\n- 미·중 핵심광물 갈등이 기업 제재 단계로 확대되고 있습니다.',
    keywords: ['중국', 'MP Materials', '블랙리스트', '11월 데드라인'], tags: ['희소물질', '기업 제재', '규제 절벽'],
    why: '중국이 미국 희토류 기업을 블랙리스트에 올린 것은 핵심광물 갈등이 수출통제를 넘어 기업 제재로 격화됐음을 보여줍니다. 11월의 두 데드라인과 맞물려 통제가 전면화되면 서방의 희토류 자립 시도까지 견제되어 대체 공급원 확보가 더 어려워집니다. 제재가 공급망 전반의 거래 가능성을 축소시켜 조달 리스크를 구조적으로 키웁니다.' }),

  // ══════════════════════════════════════════════════════════════════════════════
  // C. 중·일 갈등 — N16~N19
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n16', title: '중국, 대일 이중용도 품목 수출금지…제3국 자회사에도 책임 부과', source: 'Greenberg Traurig', date: '2026-02-15', category: 'geopolitical', severity: 'medium', region: '중국', impact: 62,
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
  // E. 기타 (시나리오 미연결, 대조군) — N22~N23
  //    AI가 일부 뉴스만 골라 묶는다는 점을 보여주기 위해 그룹에 포함하지 않음.
  // ══════════════════════════════════════════════════════════════════════════════
  mk({ id: 'demo-n22', title: '삼성전자 노조 18일 파업 예고…임금 협상 결렬', source: 'Khaleej Times', date: '2026-05-20', category: 'esg', severity: 'medium', region: '국내', impact: 54,
    url: 'https://www.khaleejtimes.com/business/tech/samsung-major-strike-may-21-south-korea',
    summary: '- 삼성전자 노조가 임금 협상 결렬에 따라 파업을 예고했습니다.\n- 노사 갈등이 생산 안정성에 영향을 줄 수 있는 변수로 부상했습니다.\n- 이 뉴스는 특정 시나리오에 연결되지 않은 개별 리스크(대조군)입니다.',
    keywords: ['삼성전자', '노조', '파업', '임금 협상'], tags: ['노사 갈등', '생산 안정성'],
    why: '노조 파업은 핵심 생산 거점의 가동 안정성에 직접 영향을 줄 수 있는 노무 리스크입니다. 다만 이 사안은 호르무즈·핵심광물·중일 갈등 등 외부 공급망 리스크와 인과적으로 묶이지 않는 독립 이슈입니다. AI가 복합 리스크 시나리오를 구성할 때 이런 개별 뉴스는 군집에서 제외된다는 점을 보여주는 대조군 사례입니다.' }),
  mk({ id: 'demo-n23', title: 'LNG, 한국 AI·반도체 전력원으로 재부상', source: 'The Korea Times', date: '2026-07-11', category: 'financial', severity: 'low', region: '국내', impact: 40,
    url: 'https://www.koreatimes.co.kr/business/companies/20260711/lng-reemerges-as-strategic-fuel-for-koreas-ai-chip-ambitions',
    summary: '- LNG가 한국 AI·반도체 산업의 전략적 전력원으로 재부상하고 있습니다.\n- 데이터센터·팹의 급증하는 전력 수요에 대응하는 에너지 전략으로 조명됐습니다.\n- 이 뉴스는 특정 시나리오에 연결되지 않은 개별 동향(대조군)입니다.',
    keywords: ['LNG', 'AI', '반도체', '전력원'], tags: ['에너지 전략', '전력 수요'],
    why: 'AI·반도체 전력 수요 급증 속 LNG의 역할 확대는 중장기 에너지·원가 전략에 참고가 되는 동향성 정보입니다. 다만 즉각적 공급 차질이나 특정 리스크 사슬과 직접 연결되지는 않는 독립 뉴스입니다. AI가 긴급 복합 리스크 군집을 구성할 때 이런 배경성 동향은 묶이지 않는다는 점을 보여주는 대조군 사례입니다.' }),
]


// ─── AI 핵심 인사이트: 복합리스크 시나리오 4그룹 (S1~S4) ──────────────────────────
// N11은 S2·S4에 동시 연결(N:M). N20~N23은 어느 그룹에도 넣지 않는 대조군.
export const DEMO_GROUPS: NewsGroup[] = [
  {
    id: 'demo:s1-hormuz',
    title: '호르무즈 장기화 → 공정 투입물 3중 고갈 (헬륨·LNG·나프타)',
    newsIds: ['demo-n06', 'demo-n07', 'demo-n08', 'demo-n01', 'demo-n02', 'demo-n03', 'demo-n04', 'demo-n05', 'demo-n09'],
    rationale:
      '헬륨·LNG·나프타가 모두 "호르무즈"라는 같은 원인으로 동시에 막혀 있습니다. 3월에 "재고로 영향 제한"이라 판단했던 근거(재고 버퍼)가 7개월째 소진되는 중이며, 10월 통항이 평시의 5% 수준으로 떨어지고 장기화 전망이 굳어졌습니다. 원가 이슈가 공급 이슈로 전환되는 국면으로, 헬륨 배정 비율·PGMEA 기반 PR/Thinner·용인·평택 전력 단가가 점검 대상입니다.',
    status: 'active',
  },
  {
    id: 'demo:s2-nov-cliff',
    title: "11월 '규제 절벽'과 핵심광물 고갈의 중첩 (희토류·갈륨·텅스텐)",
    newsIds: ['demo-n10', 'demo-n11', 'demo-n15', 'demo-n12', 'demo-n13', 'demo-n14'],
    rationale:
      '희토류 유예(11/10), 미·중 휴전 만료(11/10), 갈륨 유예(11/27)가 3주 안에 몰려 있습니다. 텅스텐이 이미 557% 급등한 상태라 WF6(DRAM·V-NAND 배선) 단가와 수급이 동시에 압박받고 있습니다. 0.1% 역외 규정이 발동되면 장비사 부품을 통해 간접 노출되며, 이트륨(식각 챔버 코팅)은 이미 건별 허가 대상이라 장비 소모품 리드타임에 먼저 영향이 예상됩니다.',
    status: 'active',
  },
  {
    id: 'demo:s3-china-japan',
    title: '중·일 갈등의 한국 우회 전이 (PR·장비 부품·전구체)',
    newsIds: ['demo-n16', 'demo-n17', 'demo-n18', 'demo-n19'],
    rationale:
      '중국의 대일 압박이 금수 → 기업 등재 → 장비 부품 심사로 단계적으로 확대되고 있습니다. 일본 장비·소재사의 조달 비용과 심사 기간 증가분이 한국 팹향 납기·단가로 전가될 가능성이 있으며, 일본이 PR 수출 통제로 맞대응하면 중국 희토류 보복과 연쇄 확전 위험이 있습니다. 일본계 PR·식각/증착 장비 예비부품·실리콘 전구체 공급사의 납기 재확인이 점검 대상입니다.',
    status: 'active',
  },
  {
    id: 'demo:s4-china-fab',
    title: '중국 팹 연간 라이선스 갱신과 미·중 절벽의 충돌 (시안·우시)',
    newsIds: ['demo-n20', 'demo-n21', 'demo-n11'],
    rationale:
      '시안 팹은 2026년분 1년 허가로 운영 중이며, 2027년분 갱신이 미·중 휴전 만료 시점과 겹칩니다. 증설·업그레이드 불허로 공정 전환이 이미 제약된 상태에서, 갱신이 협상 카드가 되면 유지보수용 장비·부품 반입이 지연될 수 있습니다(시안은 삼성 NAND의 약 35%). BIS 2027년분 허가 발표 시점과 시안 팹 예비부품 재고 일수가 점검 대상입니다.',
    status: 'active',
  },
]

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
export const DEMO_ADMIN_GROUPS: AdminGroup[] = DEMO_GROUPS.map((g) => ({
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
  'demo:s1-hormuz': `# 복합 리스크 보고서 S1 · 호르무즈 장기화 → 공정 투입물 3중 고갈

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
  'demo:s2-nov-cliff': `# 복합 리스크 보고서 S2 · 11월 '규제 절벽'과 핵심광물 고갈의 중첩

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

11월, 세 개의 규제 시한이 3주 안에 몰려 있습니다. 중국 희토류 통제 유예 만료(11/10), 미·중 휴전 만료(11/10), 갈륨 유예 만료(11/27)가 연달아 도래합니다. 문제는 이 '절벽'이 이미 진행 중인 핵심광물 고갈 위에 겹친다는 점입니다.

텅스텐은 중국 수출통제와 군수 수요가 겹쳐 이미 557% 급등했고, 그 여파로 WF6(DRAM·V-NAND 배선 소재) 수출가가 전월 대비 약 200% 뛰었습니다. 갈륨 수출은 미·중 휴전에도 94% 감소한 상태입니다. 유예가 만료되면 완화됐던 통제가 전면 복원되어, 가격 급등과 물량 차단이 동시에 닥칠 수 있습니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 |
| --- | --- | --- |
| 2026-03-16 | Mining Reporters | 텅스텐 가격 557% 급등(중국 통제 + 군수 수요). |
| 2026-05-15 | Tiger Brokers | 중국산 WF6 수출가 전월 대비 약 200% 급등, 한·일 70~90% 인상. |
| 2026-09-15 | CSIS | 미·중 휴전에도 갈륨 문제 미해결, 중국 갈륨 수출 94% 감소. |
| 2026-09-25 | Skillings | 중국, MP Materials 등 미국 기업 블랙리스트 등재·11월 두 데드라인. |
| 2026-10-01 | Timewell | '11월 10일 절벽': 미·중 휴전 만료와 희토류 유예 만료 동시 도래. |
| 2026-10-05 | Mining Technology | 확대 희토류 통제 유예 11/10 만료, 2025년 4월 7종 통제는 유효. |

## 3. 구매 영향도

- **WF6 — 단가·수급 동시 압박** — 텅스텐 원료 급등이 WF6 완제품 가격으로 전가된 상태에서 11/10 통제 복원이 겹치면, DRAM·V-NAND 배선 소재가 가격과 물량 양쪽에서 타격받습니다.
- **이트륨 — 리드타임 선행 영향** — 식각 챔버 코팅용 이트륨은 2025년 4월부터 이미 건별 허가 대상입니다. 장비 소모품 리드타임이 가장 먼저 길어질 품목입니다.
- **0.1% 역외 규정 간접 노출** — 역외 규정이 발동되면 장비사 부품을 통해 간접적으로 공급이 제약될 수 있어, 직접 거래가 없어도 안심할 수 없습니다.
- **D-29 카운트다운** — 11/10까지 남은 시간이 짧습니다. 핵심광물·WF6의 선제 재고 확보와 대체 공급원 검토를 지금 시작해야 합니다.

## 4. 협력사·자재 종합

| 협력사/거점 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 중국 핵심광물 가공거점 | 중국 | 희토류(2001-000001) · 갈륨(2001-000002) · 텅스텐(2001-000003) | 수출통제·유예 만료 |
| 중국 핵심광물 가공거점 | 중국 | 육불화텅스텐 WF6(1301-000006) | 텅스텐 원료 급등 전가 |
| 삼성 시안 NAND 팹 | 중국 | WF6(1301-000006) | 배선 공정 소재 수급 |
| SK하이닉스 우시 DRAM 팹 | 중국 | WF6(1301-000006) | 배선 공정 소재 수급 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:s3-china-japan': `# 복합 리스크 보고서 S3 · 중·일 갈등의 한국 우회 전이

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

중국의 대일(對日) 압박이 단계적으로 수위를 높이고 있습니다. 이중용도 품목 수출금지(2월)로 시작해, 일본 기업 감시목록 확대와 장비용 중국산 부품 심사 강화(6월)로 이어졌습니다. 수단이 '금수 → 기업 등재 → 부품 심사'로 정교해지는 패턴입니다.

핵심은 이 갈등이 일본에서 끝나지 않고 한국으로 우회 전이된다는 점입니다. 일본 장비·소재사가 떠안는 조달 비용과 심사 지연이 한국 팹향 납기·단가로 전가될 수 있습니다. 더 큰 위험은 연쇄 확전입니다. 일본은 세계 포토레지스트의 70%, EUV용의 95%를 쥐고 있어, 일본이 PR 수출 통제로 맞대응하면 중국의 희토류 보복과 맞물려 양측이 서로의 급소를 겨누게 됩니다.

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 |
| --- | --- | --- |
| 2025-12-03 | TrendForce | 일본, 세계 PR 70%·EUV PR 95% 점유, 수출 제한설 부상. |
| 2026-01-13 | DIGITIMES(유료) | 중국, 일본산 디클로로실란 반덤핑 조사, 포토레지스트 대치. |
| 2026-02-15 | Greenberg Traurig | 중국, 대일 이중용도 품목 수출금지·제3국 자회사에도 책임. |
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
  'demo:s4-china-fab': `# 복합 리스크 보고서 S4 · 중국 팹 연간 라이선스 갱신과 미·중 절벽의 충돌

작성 기준일: 2026-10-12 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 시나리오 뉴스 DB

## 1. 종합 요약

삼성·SK의 중국 팹은 더 이상 자유롭게 운영되지 않습니다. VEU(검증된 최종사용자) 지위를 잃은 뒤 미국산 장비 반입은 '연간·건별 허가' 체제로 바뀌었습니다. 2026년분은 허가를 받았지만, 증설과 업그레이드는 불허되어 공정 전환이 이미 묶여 있습니다.

진짜 리스크는 타이밍입니다. 2027년분 허가 갱신 시점이 미·중 휴전 만료(11/10)와 겹칩니다. 갱신이 미·중 협상의 카드가 되면, 유지보수용 장비·부품 반입마저 지연될 수 있습니다. 시안 팹이 삼성 NAND의 약 35%를 담당하는 점을 감안하면, 갱신 불확실성은 곧 생산 가용성 리스크입니다. (※ 이 시나리오는 11/10 절벽을 다루는 S2와 N11 뉴스를 공유합니다.)

## 2. 뉴스 개별 요약

| 날짜 | 출처 | 한 줄 요약 |
| --- | --- | --- |
| 2025-12-30 | 경향신문(영문) | 미국, 삼성·SK 중국 팹에 2026년분 장비 반입 연간 허가·증설 불허. |
| 2026-08-10 | Tech Insider | 4개 중국 팹 VEU 상실 후 건별 허가 체제, 중국 AMEC 장비 평가설(부인). |
| 2026-10-01 | Timewell | '11월 10일 절벽': 미·중 휴전 만료와 희토류 유예 만료 동시 도래. (S2 공유) |

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
const DEMO_HIDDEN_KEY = 'demo:hidden-group-ids'

/** 숨김 처리된 데모 그룹 id 집합 (SSR/미지원 환경에서는 빈 집합) */
export function getHiddenDemoGroupIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(DEMO_HIDDEN_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    return new Set(Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : [])
  } catch {
    return new Set()
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
