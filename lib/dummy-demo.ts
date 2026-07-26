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
    products: ['실리콘 웨이퍼', '포토레지스트'], activeRiskIds: [],
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

// ─── DEMO 뉴스 (엑셀 "뉴스 전체" 57건) ──────────────────────────────────────────
export const DEMO_NEWS: NewsItem[] = [
  // ── 협력사 동향 (supply) 6건 ──
  mk({ id: 'demo-001', title: '반도체장비 수주 3배 껑충… AI 투자 훈풍 확산 본격화 조짐', source: '서울신문', date: '2026-06-21', category: 'supply', severity: 'low', region: '국내', impact: 42,
    url: 'https://www.seoul.co.kr/news/economy/industry/2026/06/22/20260622031006',
    summary: '- AI 투자 확대에 힘입어 국내 반도체 장비 업계의 수주가 전년 대비 3배 수준으로 급증했습니다.\n- 후공정·증착 장비를 중심으로 발주가 집중되며 업황 회복 기대가 커지고 있습니다.\n- 장비 협력사의 실적과 가동률 개선으로 이어질 긍정적 신호로 해석됩니다.',
    keywords: ['반도체장비', '수주', 'AI 투자', '업황 회복'], tags: ['반도체 장비', '수주 증가'],
    why: 'AI 투자 사이클에 따른 장비 수주 급증은 협력사 가동률과 실적 안정성을 높이는 긍정적 신호입니다. 다만 발주가 특정 장비군에 집중되면 해당 협력사의 생산능력 병목이 새로운 공급 제약으로 작용할 수 있습니다. 수주가 실제 매출로 반영되는 시점과 규모를 함께 점검할 필요가 있습니다.' }),
  mk({ id: 'demo-002', title: 'SK증권 "원익IPS 급증 수주 3분기부터 실적 체감…목표가↑"', source: '연합뉴스', date: '2026-07-13', category: 'supply', severity: 'low', region: '국내', impact: 40,
    url: 'https://www.yna.co.kr/amp/view/AKR20260713021000008', entities: ['demo-wonik-ips'],
    summary: '- 증권가가 원익IPS의 수주 급증이 3분기부터 실적에 본격 반영될 것으로 보고 목표주가를 상향했습니다.\n- 국내 증착·열처리 장비 협력사의 가동률이 개선되고 있다는 신호로 해석됩니다.\n- 협력사 실적 회복은 공급 안정성 측면에서도 긍정적으로 평가됩니다.',
    keywords: ['원익IPS', '수주', '목표가', '증착장비'], tags: ['협력사 실적', '장비 수주'],
    why: '핵심 장비 협력사인 원익IPS의 실적 개선 전망은 조달 안정성과 납기 신뢰도 측면에서 긍정적입니다. 협력사 재무 체력이 강화되면 증설·투자 여력이 늘어 공급 병목 완화에 기여할 수 있습니다. 다만 실적 반영이 3분기 이후로 예상되는 만큼 단기 가동률 지표를 함께 확인할 필요가 있습니다.' }),
  mk({ id: 'demo-003', title: '예스티, HPSP 고압어닐링장비 특허분쟁 2심도 승소…"특허 리스크 해소"', source: '이데일리', date: '2026-06-18', category: 'supply', severity: 'low', region: '국내', impact: 38,
    url: 'https://v2.www.edaily.co.kr/News/Read?mediaCodeNo=257&newsId=04555926645483032', entities: ['demo-yest'],
    summary: '- 예스티가 고압어닐링장비 특허분쟁 2심에서도 승소하며 특허 리스크를 해소했습니다.\n- 열처리 장비 국산화를 추진해 온 협력사의 사업 불확실성이 크게 줄었습니다.\n- 국산 장비 공급 기반이 안정되며 조달 다변화에도 긍정적으로 작용합니다.',
    keywords: ['예스티', '고압어닐링', '특허분쟁', '승소'], tags: ['특허 분쟁', '리스크 해소'],
    why: '협력사의 특허분쟁 승소는 국산 장비의 공급 지속성을 위협하던 법적 리스크를 제거한다는 점에서 의미가 있습니다. 특허 리스크가 해소되면 해당 장비의 도입·확대에 대한 불확실성이 줄어 조달 계획의 안정성이 높아집니다. 국산화 협력사의 입지 강화는 특정 해외 벤더 의존도를 낮추는 다변화 측면에서도 긍정적입니다.' }),
  mk({ id: 'demo-004', title: '[미국 특징주] 엔비디아, 앰코와 15억 달러 반도체 패키징 계약…美 AI 공급망 강화', source: '뉴스핌', date: '2026-07-24', category: 'supply', severity: 'medium', region: '미국', impact: 60,
    url: 'https://www.newspim.com/news/view/20260724000049', entities: ['demo-amkor'],
    summary: '- 엔비디아가 앰코와 15억 달러 규모의 반도체 패키징 계약을 체결했습니다.\n- 후공정 물량이 미국으로 집중되며 미국 내 AI 공급망 강화 흐름이 뚜렷해지고 있습니다.\n- 국내 패키징 협력사의 물량 배분과 경쟁 구도에 영향이 예상됩니다.',
    keywords: ['엔비디아', '앰코', '패키징', 'AI 공급망'], tags: ['첨단 패키징', '공급망 재편'],
    why: '대형 패키징 계약이 미국으로 집중되는 흐름은 후공정 물량의 지역 재편을 시사하며 국내 협력사의 수주 구도에 영향을 줄 수 있습니다. 첨단 패키징 생산능력이 미국 중심으로 확대되면 국내 후공정 파트너의 상대적 비중이 조정될 가능성이 있습니다. 공급망 관점에서 후공정 이원화 전략과 협력사 물량 확보를 점검할 필요가 있습니다.' }),
  mk({ id: 'demo-005', title: 'Entegris and JSR/Inpria, EUV 리소그래피 비독점 상호 라이선싱 발표', source: 'Entegris', date: '2026-05-26', category: 'supply', severity: 'low', region: '글로벌', impact: 36,
    url: 'https://investor.entegris.com/news/news-details/2026/', entities: ['demo-entegris', 'demo-jsr'],
    summary: '- 엔테그리스와 JSR·Inpria가 EUV 리소그래피 소재에 대한 비독점 상호 라이선싱에 합의했습니다.\n- EUV용 포토레지스트 소재 생태계의 협력 구도가 넓어졌습니다.\n- 핵심 소재의 특허 장벽이 완화되며 공급 다변화 여지가 커졌습니다.',
    keywords: ['엔테그리스', 'JSR', 'EUV', '라이선싱'], tags: ['EUV 소재', '특허 라이선싱'],
    why: 'EUV 소재의 상호 라이선싱은 특정 업체의 특허 독점을 완화해 핵심 소재의 공급 다변화 가능성을 높입니다. 포토레지스트는 EUV 공정의 필수 소재라 소수 공급사에 대한 의존이 리스크였는데, 협력 구도 확대는 그 취약성을 일부 완화합니다. 다만 실제 양산 공급으로 이어지는 데는 시간이 필요해 중장기 관점의 모니터링이 필요합니다.' }),
  mk({ id: 'demo-006', title: 'JSR, 대만 첫 포토레지스트 공장 설립…TSMC와 첨단 레지스트 공동개발', source: 'Tom\'s Hardware', date: '2026-05-05', category: 'supply', severity: 'low', region: '대만', impact: 44,
    url: 'https://www.tomshardware.com/tech-industry/jsr-to-build-first-taiwan-photoresist-plant', entities: ['demo-jsr'],
    summary: '- JSR이 대만에 첫 포토레지스트 공장을 세우고 TSMC와 첨단 레지스트를 공동개발합니다.\n- EUV 핵심 소재의 생산 거점이 일본 외 대만으로 확대되고 있습니다.\n- 소재 공급의 지역 다변화가 진행되며 조달 안정성 개선이 기대됩니다.',
    keywords: ['JSR', '포토레지스트', 'TSMC', '대만 공장'], tags: ['소재 국산화·다변화', 'EUV 소재'],
    why: '핵심 소재의 생산 거점이 대만으로 확대되는 것은 일본 편중이던 포토레지스트 공급을 지역적으로 다변화한다는 점에서 긍정적입니다. 지진·재해 등 단일 지역 리스크에 대한 노출을 분산해 공급 안정성을 높일 수 있습니다. 다만 대만 역시 지정학 리스크가 있는 지역이라 다변화 효과를 절대적으로 볼 수는 없습니다.' }),

  // ── 지정학 & 규제 (geopolitical) 14건 ──
  mk({ id: 'demo-007', title: "'반도체의 힘' 7월 중순 수출 역대 최고⋯'美관세·홍해 리스크' 복병", source: '이투데이', date: '2026-07-21', category: 'geopolitical', severity: 'medium', region: '국내', impact: 62,
    url: 'https://www.etoday.co.kr/news/view/2605572', entities: ['redsea-babelmandeb'],
    summary: '- 7월 중순 수출이 반도체 호조에 힘입어 역대 최고를 기록했습니다.\n- 그러나 미국 관세와 홍해 물류 리스크가 하반기 복병으로 지목됐습니다.\n- 수출 개선세가 지정학·통상 변수에 크게 노출되어 있음이 드러났습니다.',
    keywords: ['반도체 수출', '미국 관세', '홍해', '지정학'], tags: ['수출', '관세 리스크'],
    why: '사상 최고 수출 실적에도 미국 관세와 홍해 물류라는 두 변수는 하반기 수출 채산성을 좌우할 핵심 리스크입니다. 관세는 가격 경쟁력을, 홍해 물류 차질은 납기와 운임을 직접 압박해 실적 개선세를 되돌릴 수 있습니다. 호실적에 가려진 구조적 취약성을 함께 관리해야 하는 국면입니다.' }),
  mk({ id: 'demo-008', title: "'레드라인' 넘은 미·이란…다시 전면전 기로", source: '경향신문', date: '2026-07-19', category: 'geopolitical', severity: 'high', region: '중동', impact: 90,
    url: 'https://www.khan.co.kr/article/202607192106005/', entities: ['hormuz-strait'],
    summary: '- 미국과 이란이 상호 설정한 레드라인을 넘어서며 6월 종전 합의가 사실상 무산되고 전면전 재개 기로에 섰다.\n- 양측의 강경 발언과 군사 배치가 맞물려 중동 정세가 개전 초기 수준으로 급격히 되돌아갔다.\n- 에너지·물류·원자재로 이어지는 지정학 리스크가 다시 최고조에 달하며 시장 불확실성이 확대됐다.',
    keywords: ['미국', '이란', '전면전', '중동', '지정학'], tags: ['지정학 리스크', '중동 정세', '군사 충돌'],
    why: '미·이란 전면전 재개는 유가·물류·원자재로 연쇄 전이되는 상위 리스크로, 반도체 공급망 전반의 간접 노출도가 매우 크다. 6월 종전 합의로 완화됐던 리스크가 원점으로 회귀하며 시나리오 전제가 무너졌다. 특히 호르무즈 해협을 낀 무력 충돌은 에너지 가격과 해상 물류를 동시에 압박해 조달 비용의 구조적 상승을 유발한다.' }),
  mk({ id: 'demo-009', title: '미군, 이틀째 이란 공습 재개...트럼프 "선박 공격 시 더 심하게 당할 것"', source: 'YTN', date: '2026-07-09', category: 'geopolitical', severity: 'high', region: '중동', impact: 87,
    url: 'https://www.ytn.co.kr/_ln/0104_202607091301068555', entities: ['hormuz-strait'],
    summary: '- 미군이 7월 9일 이틀 연속으로 이란 본토에 대한 공습을 재개하며 무력 충돌이 다시 본격화됐다.\n- 트럼프 대통령이 "선박 공격 시 더 강하게 대응하겠다"며 호르무즈 해상 안보를 직접 겨냥한 경고를 내놓았다.\n- 육상 전투를 넘어 해상으로 전선이 확대될 조짐이 뚜렷해지며 원유·물류 통로에 대한 위협이 고조됐다.',
    keywords: ['미군', '이란 공습', '트럼프', '해상 위협'], tags: ['군사 충돌', '해상 위협'],
    why: '미군의 공습 재개와 선박 공격 경고는 호르무즈 해상로의 물리적 차질 가능성을 직접 끌어올린다. 전쟁의 무대가 육상에서 해상으로 옮겨가는 전환점으로, 이후 호르무즈 봉쇄 선언의 직접적 전조가 된다. 해상 안보 위협은 곧바로 전쟁위험 할증보험료 인상과 통항 기피로 이어져 물류비를 자극한다.' }),
  mk({ id: 'demo-010', title: "韓 '800조 메가 프로젝트' 가동에…대만 반도체 업계 '수급 압박' 촉각", source: '뉴시스', date: '2026-07-02', category: 'geopolitical', severity: 'medium', region: '대만', impact: 58,
    url: 'https://www.newsis.com/view/NISX20260701_0003692265', entities: ['demo-asml', 'demo-shinetsu'],
    summary: '- 한국의 800조 원 규모 반도체 메가 프로젝트 가동에 대만 업계가 촉각을 세우고 있습니다.\n- 대규모 투자로 소재·장비 수요가 급증하며 글로벌 수급 압박 우려가 제기됐습니다.\n- 대규모 투자가 글로벌 공급망의 물량 배분에 파장을 예고하고 있습니다.',
    keywords: ['메가 프로젝트', '대만', '수급 압박', '투자'], tags: ['공급망 경쟁', '투자'],
    why: '초대형 투자로 인한 소재·장비 수요 급증은 한정된 글로벌 공급 물량을 놓고 국가·기업 간 확보 경쟁을 심화시킬 수 있습니다. 대만 등 경쟁 지역이 수급 압박을 우려한다는 것은 핵심 소재·장비의 가용성이 빠듯해질 수 있다는 신호입니다. 조달 관점에서는 장기 계약과 선제적 물량 확보로 경쟁 리스크에 대비할 필요가 있습니다.' }),
  mk({ id: 'demo-011', title: '삼성전자·SK하이닉스·마이크론, 미국서 담합 혐의 피소', source: '이투데이', date: '2026-06-30', category: 'geopolitical', severity: 'medium', region: '미국', impact: 64,
    url: 'https://www.etoday.co.kr/news/view/2598475',
    summary: '- 삼성전자·SK하이닉스·마이크론이 미국에서 메모리 가격 담합 혐의로 피소됐습니다.\n- 규제·소송 리스크가 주요 메모리 3사에 동시에 노출됐습니다.\n- 소송 결과에 따라 배상·규제 부담이 확대될 수 있어 예의주시가 필요합니다.',
    keywords: ['담합', '피소', '메모리', '규제'], tags: ['규제 리스크', '소송'],
    why: '주요 메모리 3사가 동시에 피소된 것은 개별 기업이 아닌 산업 전반에 걸친 규제·소송 리스크가 부각됐음을 의미합니다. 담합 소송은 대규모 배상과 추가 규제로 이어질 수 있어 관련 기업의 재무·평판에 영향을 줄 수 있습니다. 공급망 관점에서는 핵심 메모리 공급사의 법적 불확실성이 장기 조달 전략에 변수로 작용할 수 있습니다.' }),
  mk({ id: 'demo-012', title: '미·이란 전쟁에서 종전 합의까지 주요 일지', source: 'SBS', date: '2026-06-15', category: 'geopolitical', severity: 'low', region: '중동', impact: 34,
    url: 'https://news.sbs.co.kr/amp/news.amp?news_id=N1008609988',
    summary: '- 미·이란 개전(2/28)부터 종전 합의(6/14)까지의 주요 국면을 정리한 일지성 보도입니다.\n- 사태의 경과와 분기점을 시계열로 정리해 배경 이해를 돕습니다.\n- 이후 종전 합의 무산과 전면전 재개를 이해하기 위한 참고 자료입니다.',
    keywords: ['미·이란', '전쟁 일지', '종전 합의'], tags: ['중동 정세', '배경'],
    why: '사태의 전개 과정을 정리한 배경 자료로, 개별 리스크 이벤트를 맥락 속에서 해석하는 데 도움이 됩니다. 종전 합의가 있었던 국면을 확인함으로써, 이후 합의 무산과 전면전 재개가 왜 시나리오 전제를 뒤집는 사건인지 파악할 수 있습니다. 직접적 리스크보다는 상황 판단의 기준선을 제공하는 참고성 정보입니다.' }),
  mk({ id: 'demo-013', title: '이란·이스라엘 "전면전 재개 불사"…중동 확전 기로', source: '뉴스1', date: '2026-06-08', category: 'geopolitical', severity: 'low', region: '중동', impact: 50,
    url: 'https://www.news1.kr/world/middleeast-africa/6191221',
    summary: '- 이란과 이스라엘이 전면전 재개 불사 입장을 언급하며 긴장이 다시 고조됐습니다.\n- 중동이 재차 확전 기로에 서며 지정학 불확실성이 커졌습니다.\n- 긴장 고조가 유가·물류 리스크의 배경 요인으로 작용하고 있습니다.',
    keywords: ['이란', '이스라엘', '확전', '중동'], tags: ['중동 정세', '배경'],
    why: '중동 긴장 재고조는 그 자체로 즉각적 차질은 아니지만 유가·해상 물류 리스크를 언제든 촉발할 수 있는 배경 요인입니다. 전면전 재개 가능성이 거론되는 국면은 이후 실제 봉쇄·공습으로 전개되는 리스크의 전조로 볼 수 있습니다. 조달 관점에서는 확전 시나리오에 대비한 재고·대체 조달 점검의 필요성을 환기합니다.' }),
  mk({ id: 'demo-014', title: '국제유가, 이란 협상 기대감 약화에 상승‥WTI 100달러 위로', source: 'MBC', date: '2026-05-13', category: 'geopolitical', severity: 'low', region: '글로벌', impact: 48,
    url: 'https://imnews.imbc.com/news/2026/world/article/6821984_36925.html',
    summary: '- 이란 협상 기대감이 약화되며 국제유가가 WTI 기준 100달러를 넘어섰습니다.\n- 지정학 불확실성이 에너지 가격에 직접 반영되는 국면이 이어지고 있습니다.\n- 유가 상승이 제조·물류 원가 부담의 배경 변수로 부각됐습니다.',
    keywords: ['국제유가', 'WTI', '이란 협상', '에너지'], tags: ['유가', '배경'],
    why: '유가 상승은 소재·부품 원가와 운송비에 광범위하게 반영되는 기초 변수로, 제조 원가 전반에 완만한 압력을 가합니다. WTI 100달러 돌파는 지정학 리스크가 실제 에너지 가격으로 전이되고 있음을 보여주는 지표입니다. 봉쇄 등 추가 악재가 겹치면 원가 부담이 가파르게 확대될 수 있어 선제적 모니터링이 필요합니다.' }),
  mk({ id: 'demo-015', title: "이란 공습 이후 국내 유가 폭등… 작년 '12일 전쟁' 대비 최대 7배", source: '호남뉴스24', date: '2026-03-11', category: 'geopolitical', severity: 'high', region: '국내', impact: 82,
    url: 'https://www.honamnews24.com/news/articleView.html?idxno=68051', entities: ['hormuz-strait'],
    summary: '- 2월 28일 개전한 미·이스라엘의 이란 공습 이후 국내 유가가 지난해 12일 전쟁 대비 최대 7배 수준으로 폭등했다.\n- 중동발 에너지 충격이 시차 없이 국내 주유·산업용 연료 가격으로 전이되며 물가 전반을 자극했다.\n- 이번 복합 리스크 시나리오의 최초 발단으로, 이후 물류·헬륨 수급 위기로 번지는 출발점이 됐다.',
    keywords: ['이란 공습', '국내 유가', '유가 폭등', '중동'], tags: ['유가 급등', '중동 정세'],
    why: '개전 초기 국내 유가 7배 급등은 에너지 원가 급등을 통해 반도체 제조·물류 비용에 직접 압력을 가한다. 유가는 소재·부품 원가와 해상·육상 운송비에 광범위하게 반영되는 기초 변수다. 초기 단계의 급등폭이 큰 만큼, 사태 장기화 시 조달 원가의 누적 부담이 빠르게 확대될 수 있다.' }),
  mk({ id: 'demo-044', title: '이란군 "호르무즈 해협, 추가 공지까지 전면 봉쇄"', source: '연합뉴스', date: '2026-07-12', category: 'geopolitical', severity: 'high', region: '중동', impact: 95,
    url: 'https://www.yna.co.kr/view/AKR20260712007400009', entities: ['hormuz-strait'],
    summary: '- 이란군이 7월 12일 호르무즈 해협을 "추가 공지 시까지" 전면 봉쇄한다고 공식 선언했다.\n- 전 세계 해상 원유의 약 20%와 LNG 상당량이 통과하는 최대 요충지가 마비 위기에 놓였다.\n- 카타르산 헬륨 등 중동 경유 자재의 선적이 동시에 위협받으며 물류·헬륨 수급 위기의 핵심 트리거가 됐다.',
    keywords: ['이란', '호르무즈', '전면 봉쇄', '원유'], tags: ['호르무즈 봉쇄', '해상 봉쇄'],
    why: '호르무즈 전면 봉쇄 선언은 원유·헬륨·해상 물류의 대체 불가능한 통로를 차단해 물류 차질·헬륨 수급 위기를 동시에 촉발하는 핵심 사건이다. 대체 항로가 사실상 없어 봉쇄가 지속될수록 조달 리드타임과 비용이 기하급수적으로 악화된다. 이 사건을 기점으로 지정학 리스크가 실제 공급망 차질로 전환된다.' }),
  mk({ id: 'demo-045', title: '미군 "이란 해상봉쇄 재개"…한국시간 15일 오전 5시 시작', source: '연합뉴스', date: '2026-07-14', category: 'geopolitical', severity: 'high', region: '중동', impact: 88,
    url: 'https://www.yna.co.kr/view/AKR20260714004800071', entities: ['hormuz-strait'],
    summary: '- 미군이 한국시간 7월 15일 오전 5시를 기해 이란에 대한 해상봉쇄를 공식 재개한다고 발표했다.\n- 이란의 호르무즈 봉쇄에 미국이 맞봉쇄로 응수하며 해협 양측이 서로를 차단하는 이중 봉쇄 국면이 시작됐다.\n- 봉쇄 개시 시점이 특정되며 호르무즈를 통과하려던 선박들의 통항 계획에 즉각적 혼란이 예상된다.',
    keywords: ['미군', '해상봉쇄', '이란', '호르무즈'], tags: ['해상 봉쇄', '군사 충돌'],
    why: '미군의 맞봉쇄는 호르무즈 통항을 양측에서 동시에 압박해 해상 물류 리드타임과 비용 리스크를 증폭시킵니다. 이란 단독 봉쇄와 달리 미·이란 양측이 통항을 통제하면서 우회로 확보나 협상을 통한 조기 해소 가능성이 현저히 낮아집니다. 봉쇄 개시 시점까지 못박히며 조달 관점에서는 대체 항로·재고 소진 시나리오를 즉시 가동해야 하는 상황이 됐습니다.' }),
  mk({ id: 'demo-046', title: '"이란, \'미국이 우리 전력망 치면 홍해 막아라\' 후티에 지시"', source: '연합뉴스', date: '2026-07-16', category: 'geopolitical', severity: 'high', region: '중동', impact: 84,
    url: 'https://www.yna.co.kr/amp/view/AKR20260716211600079', entities: ['redsea-babelmandeb', 'hormuz-strait'],
    summary: '- 이란이 "미국이 우리 전력망을 공격하면 홍해를 막으라"고 예멘 후티 반군에 지시한 정황이 전해졌다.\n- 호르무즈에 국한됐던 봉쇄 리스크가 후티를 대리 세력으로 삼아 홍해까지 조건부로 확대되는 구도가 드러났다.\n- 중동 리스크가 단일 해협을 넘어 아시아–유럽을 잇는 핵심 항로 전반으로 번지는 전환점이 됐다.',
    keywords: ['이란', '후티', '홍해', '확전 지시'], tags: ['홍해 항로', '해상 위협'],
    why: '이란의 홍해 봉쇄 지시는 호르무즈에 이어 아시아–유럽을 잇는 홍해 항로까지 위협을 확대하는 리스크 전이의 촉매입니다. 후티를 통한 대리 봉쇄는 이란이 직접 나서지 않고도 홍해를 마비시킬 수 있음을 의미해, 두 해협이 동시에 막히는 최악의 시나리오 가능성을 크게 높입니다. 호르무즈 우회로로 기능하던 홍해까지 위협받으면 사실상 대체 항로가 사라져 조달 리드타임 리스크가 구조적으로 악화됩니다.' }),
  mk({ id: 'demo-047', title: '예멘 후티 반군, 사우디 대상 해상 봉쇄 선언…"즉각 발효"(종합2보)', source: '연합뉴스', date: '2026-07-20', category: 'geopolitical', severity: 'high', region: '중동', impact: 86,
    url: 'https://www.yna.co.kr/view/AKR20260720167952079', entities: ['redsea-babelmandeb'],
    summary: '- 예멘 후티 반군이 사우디를 겨냥한 해상 봉쇄를 즉각 발효한다고 선언했습니다.\n- 홍해 봉쇄가 현실화되며 호르무즈와 함께 이중 봉쇄 위기가 고조됐습니다.\n- 아시아–유럽을 잇는 핵심 항로가 실제로 차단될 국면에 진입했습니다.',
    keywords: ['후티', '사우디', '해상 봉쇄', '홍해'], tags: ['홍해 항로', '해상 봉쇄'],
    why: '후티의 사우디 해상 봉쇄 선언은 호르무즈에 이어 홍해까지 막히는 이중 봉쇄를 현실화해 글로벌 물류 차질을 심화시킵니다. 두 요충지가 동시에 차단되면 우회 항로가 사실상 소멸해 리드타임과 운임·보험료가 다층적으로 급등합니다. 선언이 실제 발효로 이어지는 단계라 조달 관점에서는 최악의 이중 봉쇄 시나리오를 즉시 가동해야 하는 상황입니다.' }),
  mk({ id: 'demo-057', title: "중국, 반도체 생산 핵심 소재 '헬륨' 수출 금지…\"즉시 시행\"", source: '연합뉴스', date: '2026-07-10', category: 'geopolitical', severity: 'high', region: '중국', impact: 89,
    url: 'https://www.yna.co.kr/view/AKR20260710157000083', entities: ['demo-sk-specialty', 'demo-wonik-materials'],
    summary: '- 중국이 반도체 핵심 소재인 헬륨의 수출을 "즉시 시행"으로 전면 금지했다.\n- 호르무즈 봉쇄로 카타르산 공급이 흔들리는 상황에서 또 다른 주요 공급원까지 차단됐다.\n- 카타르·러시아·중국이 순차로 막히며 헬륨 수급 위기가 임계 국면으로 치달았다.',
    keywords: ['중국', '헬륨', '수출 금지', '수출 통제'], tags: ['수출 통제', '헬륨 수급'],
    why: '중국의 헬륨 수출 금지는 카타르 공급 차질과 겹쳐 대체 공급원을 동시에 차단하며 반도체용 헬륨 수급을 임계로 몰아갑니다. 앞서 러시아 통제까지 더해지면서 주요 공급원 3곳이 사실상 모두 막히는 최악의 조합이 완성됐습니다. 대체 조달선이 소진된 상황에서 이 조치는 재고 소진 시한을 앞당겨 생산 차질 리스크를 현실화하는 결정적 방아쇠가 됩니다.' }),

  // ── 원자재 & 희소물질 (material) 11건 ──
  mk({ id: 'demo-016', title: '중국 6월 희토류 수출 34% 급감…수출 통제 강화에 글로벌 공급망 긴장', source: '뉴스비전e', date: '2026-07-14', category: 'material', severity: 'high', region: '중국', impact: 80,
    url: 'https://www.nvp.co.kr/news/articleView.html?idxno=318732',
    summary: '- 중국의 6월 희토류 수출이 전년 대비 34% 급감했습니다.\n- 수출 통제 강화 우려가 커지며 글로벌 공급망에 긴장이 확산되고 있습니다.\n- 대체 조달이 어려운 희소물질의 가용성 리스크가 부각됐습니다.',
    keywords: ['중국', '희토류', '수출 통제', '공급망'], tags: ['희소물질', '수출 통제'],
    why: '중국발 희토류 수출 급감은 대체 조달이 어려운 희소물질의 가용성을 직접 위협합니다. 희토류는 중국의 공급 점유율이 압도적이어서 수출 통제가 강화되면 단기간에 대체선을 확보하기 어렵습니다. 가격 급등과 물량 확보 경쟁이 동시에 발생할 수 있어 관련 소재의 재고·조달 전략을 선제적으로 점검할 필요가 있습니다.' }),
  mk({ id: 'demo-017', title: '호르무즈 재봉쇄·中 헬륨 통제…원자재 공급망 더 속도내야', source: '서울경제', date: '2026-07-13', category: 'material', severity: 'medium', region: '국내', impact: 66,
    url: 'https://www.sedaily.com/article/20066770', entities: ['hormuz-strait', 'demo-sk-specialty'],
    summary: '- 호르무즈 재봉쇄와 중국 헬륨 통제가 동시에 겹치며 복합 리스크가 부각됐습니다.\n- 원자재 공급망 다변화 대응을 서둘러야 한다는 지적이 제기됐습니다.\n- 개별 사안이 아닌 중첩된 리스크에 대한 종합적 진단을 담았습니다.',
    keywords: ['호르무즈', '헬륨', '원자재', '공급망'], tags: ['헬륨 수급', '복합 리스크'],
    why: '해상 봉쇄와 소재 수출 통제가 동시에 발생하는 복합 리스크는 단일 대응책으로는 감당하기 어렵습니다. 호르무즈 봉쇄가 물류를, 중국 헬륨 통제가 소재 조달을 각각 압박하면서 리스크가 상호 증폭됩니다. 원자재 다변화와 재고 확충을 병행하는 종합적 공급망 전략의 필요성을 환기하는 진단입니다.' }),
  mk({ id: 'demo-018', title: "'반도체 핵심' 헬륨도 막았다…중국 '수출 금지 즉시 시행'", source: '한국경제', date: '2026-07-10', category: 'material', severity: 'low', region: '중국', impact: 52,
    url: 'https://www.hankyung.com/article/2026071087527', entities: ['demo-sk-specialty', 'demo-wonik-materials'],
    summary: '- 중국이 반도체 핵심 소재인 헬륨의 수출 금지를 즉시 시행했습니다.\n- 호르무즈 봉쇄로 카타르산 공급이 흔들리는 가운데 나온 추가 악재입니다.\n- 앞선 보도와 같은 사안을 다룬 보조 기사로 헬륨 수급 위기를 재확인합니다.',
    keywords: ['헬륨', '중국', '수출 금지'], tags: ['헬륨 수급', '수출 통제'],
    why: '중국의 헬륨 수출 금지는 카타르 공급 차질과 겹쳐 주요 공급원을 동시에 차단하며 반도체용 헬륨 수급을 압박합니다. 대체재가 없는 필수 공정 가스의 공급원이 순차로 막히면서 재고 소진 시한이 앞당겨질 수 있습니다. 조달 다변화가 이미 어려운 상황에서 나온 조치라 수급 리스크의 심각성이 한층 높아집니다.' }),
  mk({ id: 'demo-019', title: '반도체 고점론 무색…"DDR4 가격 최대 50% 이상 인상"', source: 'Investing.com', date: '2026-07-10', category: 'material', severity: 'medium', region: '글로벌', impact: 63,
    url: 'https://kr.investing.com/news/stock-market-news/article-2011350',
    summary: '- DDR4 가격이 최대 50% 이상 인상될 것으로 전망됐습니다.\n- 공급 제약과 수요 회복이 맞물리며 메모리 원가 부담이 커지고 있습니다.\n- 반도체 고점론이 무색할 만큼 가격 강세가 이어지고 있습니다.',
    keywords: ['DDR4', '가격 인상', '메모리', '원가'], tags: ['메모리 가격', '원가 상승'],
    why: 'DDR4 가격의 급격한 인상은 메모리를 조달하는 세트·모듈 업체의 원가 부담을 직접 키웁니다. 레거시 공정 감축에 따른 공급 제약과 수요 회복이 겹쳐 가격 강세가 구조적으로 지속될 수 있습니다. 원가 상승분의 판가 전가 여부에 따라 관련 협력사의 채산성이 갈릴 수 있어 모니터링이 필요합니다.' }),
  mk({ id: 'demo-020', title: '"삼성·SK하이닉스 원가 부담 비상" 헬륨값 2배 폭등… 이란發 공급망 직격탄', source: '글로벌이코노믹', date: '2026-06-12', category: 'material', severity: 'high', region: '국내', impact: 83,
    url: 'https://www.g-enews.com/article/Global-Biz/2026/06/', entities: ['demo-sk-specialty', 'demo-air-liquide'],
    summary: '- 헬륨 가격이 이란발 공급망 충격으로 2배 폭등하며 삼성·SK하이닉스 원가 부담에 비상이 걸렸다.\n- 지정학 리스크가 재고·수급 우려를 넘어 실제 조달 단가 급등으로 전이된 것이 확인됐다.\n- 이온주입·열처리 등 필수 공정에 쓰이는 헬륨값 상승이 제조 원가에 직접 반영됐다.',
    keywords: ['헬륨', '가격 폭등', '삼성', 'SK하이닉스', '원가'], tags: ['헬륨 수급', '원가 상승'],
    why: '헬륨값 2배 폭등은 이온주입·열처리 등 핵심 공정 원가에 직접 반영되는 실질적 비용 충격입니다. 헬륨은 대체재가 없고 공정상 필수라 가격이 올라도 사용량을 줄이기 어려워, 상승분이 고스란히 제조 원가로 전가됩니다. 수급 우려가 실제 가격 급등으로 나타났다는 점에서 리스크가 관측 단계에서 손익 영향 단계로 넘어갔음을 보여줍니다.' }),
  mk({ id: 'demo-021', title: '러시아, 헬륨 수출 통제 조치 시행...한국 반도체 산업 어쩌나', source: 'CNews', date: '2026-04-15', category: 'material', severity: 'high', region: '러시아', impact: 78,
    url: 'https://www.thecommoditiesnews.com/news/articleView.html?idxno=10994', entities: ['demo-air-liquide', 'demo-linde'],
    summary: '- 러시아가 헬륨 수출 통제 조치를 시행하며 카타르 외 주요 대체 공급원 하나가 위축됐다.\n- 카타르 의존을 낮추기 위한 다변화 후보였던 러시아산까지 막히며 조달 선택지가 좁아졌다.\n- 한국 반도체 산업의 헬륨 조달 다변화 필요성과 그 어려움이 동시에 부각됐다.',
    keywords: ['러시아', '헬륨', '수출 통제', '조달'], tags: ['헬륨 수급', '수출 통제'],
    why: '러시아의 헬륨 수출 통제는 카타르·미국 외 대체 공급원을 축소시켜 조달 다변화의 여지를 좁힙니다. 카타르 편중을 완화할 유력 후보가 막히면서, 남은 공급원에 대한 의존과 가격 협상력 약화가 동시에 발생합니다. 이는 이후 중국의 수출 금지와 겹칠 경우 대체 조달이 사실상 불가능해지는 상황을 예고하는 중간 단계의 악재입니다.' }),
  mk({ id: 'demo-022', title: '"반도체 원료 헬륨 65% 카타르에 의존…호르무즈 봉쇄시 직격탄"', source: '한국경제TV', date: '2026-03-16', category: 'material', severity: 'low', region: '국내', impact: 51,
    url: 'https://plus.hankyung.com/apps/newsinside.view?aid=2026031650945', entities: ['hormuz-strait', 'demo-air-liquide'],
    summary: '- 국내 반도체용 헬륨의 약 65%를 카타르 단일 지역에 의존하는 구조적 취약성이 지적됐다.\n- 카타르산 헬륨은 대부분 호르무즈 해협을 거쳐 들어와 해협 봉쇄 시 직격탄이 우려된다.\n- 봉쇄가 현실화되기 전 단계에서 이미 공급 편중 리스크를 환기한 선행 경고성 보도다.',
    keywords: ['헬륨', '카타르', '호르무즈', '의존도'], tags: ['헬륨 수급', '단일 의존'],
    why: '반도체용 헬륨의 카타르 65% 의존은 특정 지역·항로에 공급이 편중된 구조적 리스크의 핵심입니다. 카타르산 헬륨 대부분이 호르무즈를 경유하므로, 해협 봉쇄는 곧 국내 헬륨 공급의 절반 이상을 즉시 위협합니다. 이 편중은 헬륨 수급 위기 시나리오 전체의 출발점이자, 이후 러시아·중국 통제가 겹치며 위기가 증폭되는 구조적 배경이 됩니다.' }),
  mk({ id: 'demo-053', title: '반도체에 불똥튀나…중동전쟁 장기화 땐 헬륨 공급 차질(종합)', source: '연합뉴스', date: '2026-03-27', category: 'material', severity: 'low', region: '중동', impact: 50,
    url: 'https://www.yna.co.kr/amp/view/AKR20260327042451009', entities: ['demo-air-liquide'],
    summary: '- 중동전쟁이 장기화되면 반도체용 헬륨 공급에 차질이 빚어질 수 있다는 경고입니다.\n- 사태 초기 단계에서 헬륨 수급 리스크를 선제적으로 환기한 종합 기사입니다.\n- 이후 현실화되는 헬륨 수급 위기의 초기 인식을 보여줍니다.',
    keywords: ['중동전쟁', '헬륨', '공급 차질'], tags: ['헬륨 수급', '배경'],
    why: '사태 초기에 헬륨 공급 차질 가능성을 짚은 선행 경고로, 리스크가 뒤늦게 부각된 것이 아님을 보여줍니다. 중동전쟁 장기화가 카타르산 헬륨 조달에 미칠 영향을 미리 진단했다는 점에서 이후 실제 수급 위기의 예고편 성격을 갖습니다. 조기 경고 단계에서 대비했는지 여부가 이후 대응 여력을 좌우하는 배경 정보입니다.' }),
  mk({ id: 'demo-054', title: '삼성·SK, 반도체용 헬륨 공급망 안정화 착수…이란 전쟁 장기화 대비', source: '전자신문', date: '2026-03-31', category: 'material', severity: 'medium', region: '국내', impact: 61,
    url: 'https://m.etnews.com/20260331000122', entities: ['demo-sk-specialty', 'demo-wonik-materials'],
    summary: '- 삼성·SK가 이란 전쟁 장기화 가능성에 대비해 반도체용 헬륨 공급망 안정화에 착수했다.\n- 재고 추가 확보와 조달선 다변화 등 기업 차원의 선제적 리스크 관리가 시작됐다.\n- 사태 초기부터 헬륨을 핵심 관리 품목으로 지정했다는 점에서 수급 리스크의 심각성을 방증한다.',
    keywords: ['삼성', 'SK', '헬륨', '공급망 안정화'], tags: ['헬륨 수급', '기업 대응'],
    why: '삼성·SK가 사태 초기부터 헬륨 공급망 안정화에 나섰다는 것은 헬륨이 대체·감축이 어려운 필수 공정 가스임을 보여줍니다. 기업이 재고 확보와 조달 다변화를 서두른다는 사실 자체가 향후 공급 차질을 심각하게 전망하고 있다는 신호입니다. 다만 이 선제 대응에도 불구하고 이후 러시아·중국의 수출 통제가 겹치며 재고만으로는 버티기 어려운 국면으로 전개됩니다.' }),
  mk({ id: 'demo-055', title: '中, 4개월 만에 일본에 갈륨 수출 재개…민간용 선별허용 관측', source: '연합뉴스', date: '2026-06-21', category: 'material', severity: 'low', region: '중국', impact: 45,
    url: 'https://www.yna.co.kr/view/AKR20260621045800083',
    summary: '- 중국이 4개월 만에 일본에 갈륨 수출을 재개했습니다.\n- 민간용에 한한 선별 허용이라는 관측이 나오고 있습니다.\n- 희소물질 통제 국면에서 부분적 완화 신호로 읽힙니다.',
    keywords: ['중국', '갈륨', '수출 재개', '희소물질'], tags: ['희소물질', '완화 신호'],
    why: '중국의 갈륨 수출 재개는 경색됐던 희소물질 통제 국면에 부분적 완화 신호를 줍니다. 다만 민간용 선별 허용에 그칠 경우 통제 기조 자체가 해소된 것으로 보기는 어렵습니다. 수출 재개가 안정적으로 지속되는지, 다른 희소물질로 확산되는지 여부가 실질적 리스크 완화의 판단 기준이 됩니다.' }),
  mk({ id: 'demo-056', title: '"호르무즈 공급차질 시뮬레이션 해보니…한국 8월까진 잘 관리"', source: '연합뉴스', date: '2026-06-30', category: 'material', severity: 'medium', region: '국내', impact: 65,
    url: 'https://www.yna.co.kr/view/AKR20260630196000071', entities: ['hormuz-strait', 'demo-sk-specialty'],
    summary: '- 호르무즈 공급차질을 시뮬레이션한 결과 한국은 8월까지 재고로 버틸 수 있다는 평가가 나왔다.\n- 재고 소진 시한이 8월로 못박히며 대응 여력의 명확한 한계선이 드러났다.\n- 봉쇄가 8월을 넘겨 지속되면 재고만으로는 수급을 감당할 수 없다는 경고를 담았다.',
    keywords: ['호르무즈', '시뮬레이션', '재고', '8월'], tags: ['헬륨 수급', '영향 평가'],
    why: '재고 소진 시한이 8월로 제시된 것은 헬륨 수급 위기가 감내 가능한 기간에 명확한 상한이 있음을 뜻합니다. 8월이라는 구체적 시한은 조달·생산 계획에서 반드시 그 전에 대체 공급을 확보해야 한다는 의사결정 기준선이 됩니다. 봉쇄와 수출 통제가 이 시한을 넘겨 이어질 경우, 관리 가능하던 리스크가 실제 생산 차질로 전환되는 임계점이 됩니다.' }),

  // ── 기술 & 지식재산 (tech) 2건 ──
  mk({ id: 'demo-023', title: "반도체·AI 등 첨단기술 유출 '원천봉쇄'", source: '헤럴드경제', date: '2026-06-29', category: 'tech', severity: 'medium', region: '국내', impact: 60,
    url: 'https://biz.heraldcorp.com/article/10791301',
    summary: '- 정부가 반도체·AI 등 첨단기술의 해외 유출을 원천봉쇄하기 위한 강화 방안을 내놨습니다.\n- 기술보호 규제가 강화되며 협력사 관리·보안 부담이 커질 전망입니다.\n- 핵심 인력·기술 유출 방지가 산업 정책의 우선순위로 부상했습니다.',
    keywords: ['첨단기술', '기술 유출', '원천봉쇄', '규제'], tags: ['기술 보호', '규제'],
    why: '기술 유출 방지 규제 강화는 협력사에 대한 보안 요구와 실사 부담을 높여 공급망 관리 비용을 증가시킬 수 있습니다. 규제 준수를 위한 협력사 검증·계약 조건 정비가 필요해지며, 미준수 협력사와의 거래에는 법적 리스크가 따를 수 있습니다. 기술 보호와 공급망 유연성 사이의 균형을 관리해야 하는 과제가 부각됩니다.' }),
  mk({ id: 'demo-024', title: 'HBM 특허전 재점화…넷리스트, 삼성전자 상대 신규 소송', source: '아이뉴스24', date: '2026-06-18', category: 'tech', severity: 'medium', region: '미국', impact: 62,
    url: 'https://v.daum.net/v/20260618143619650',
    summary: '- 넷리스트가 삼성전자를 상대로 HBM 관련 신규 소송을 제기했습니다.\n- 잠잠했던 HBM 특허전이 재점화되며 지식재산 리스크가 다시 부각됐습니다.\n- 고부가 메모리 시장의 특허 분쟁 불확실성이 커지고 있습니다.',
    keywords: ['HBM', '특허전', '넷리스트', '삼성전자'], tags: ['지식재산', '특허 소송'],
    why: 'HBM은 AI 반도체 수요의 핵심 부품이라 관련 특허 소송은 고부가 제품의 생산·공급 안정성에 영향을 줄 수 있습니다. 특허전 재점화는 배상·라이선스 비용 부담은 물론 제품 설계·공급 일정의 불확실성을 키웁니다. 핵심 메모리 공급사의 지식재산 리스크는 이를 조달하는 세트 업체에도 간접적으로 파급될 수 있습니다.' }),

  // ── 물류 & 인프라 (logistics) 14건 ──
  mk({ id: 'demo-025', title: "호르무즈·홍해 '동시 봉쇄' 지정학 리스크 덮쳤다… 韓수출 '물류비 폭탄' 비상", source: '파이낸셜뉴스', date: '2026-07-23', category: 'logistics', severity: 'medium', region: '국내', impact: 70,
    url: 'https://www.fnnews.com/news/202607220914066586', entities: ['hormuz-strait', 'redsea-babelmandeb'],
    summary: '- 호르무즈와 홍해가 동시에 봉쇄되며 한국 수출 물류에 "물류비 폭탄" 우려가 현실이 됐다.\n- 양대 요충지가 함께 막히자 우회 항로 운임과 전쟁위험 보험료가 동반 급등했다.\n- 반도체 등 수출 주력 품목의 조달·선적 비용이 구조적으로 뛰며 채산성 악화가 우려된다.',
    keywords: ['호르무즈', '홍해', '동시 봉쇄', '물류비'], tags: ['이중 봉쇄', '물류비 급등'],
    why: '호르무즈·홍해 동시 봉쇄는 한국 수출입 물류의 두 핵심 통로를 한꺼번에 차단해 물류비를 폭발적으로 끌어올립니다. 우회 항로로 물동이 몰리며 운임이 급등하고, 전쟁위험 할증보험료까지 겹쳐 단위 물류비가 다층적으로 상승합니다. 이중 봉쇄는 반도체 장비·소재의 조달 원가와 완제품 수출 채산성을 동시에 압박하는 종합 리스크입니다.' }),
  mk({ id: 'demo-026', title: '후티, 사우디 봉쇄 현실화…홍해서 유조선 2척 공격', source: '이투데이', date: '2026-07-23', category: 'logistics', severity: 'high', region: '중동', impact: 85,
    url: 'https://www.etoday.co.kr/news/view/2606462', entities: ['redsea-babelmandeb'],
    summary: '- 후티 반군이 홍해에서 유조선 2척을 실제로 공격하며 사우디 대상 봉쇄가 현실화됐다.\n- 봉쇄 선언에 그쳤던 홍해 리스크가 물리적 공격으로 확인되며 위협 단계가 한 차원 높아졌다.\n- 공격이 현실화되자 선사들의 홍해 회피가 불가피해지며 항로 이용 자체가 봉쇄됐다.',
    keywords: ['후티', '홍해', '유조선', '공격'], tags: ['홍해 항로', '해상 봉쇄'],
    why: '실제 유조선 공격은 홍해 항로 회피를 강제해 우회 리드타임과 운임·보험료를 즉각 끌어올립니다. 위협이 말이 아닌 실제 타격으로 입증되면서 선사들은 안전을 이유로 홍해 통항을 전면 중단할 수밖에 없습니다. 이는 호르무즈 봉쇄와 맞물려 아시아–유럽 물류의 이중 병목을 확정하는 사건으로, 수출입 원가 구조 전반을 바꿉니다.' }),
  mk({ id: 'demo-027', title: "봉쇄된 호르무즈의 '숨통' 셔틀선도 이란 공격 위협 직면", source: '경향신문', date: '2026-07-15', category: 'logistics', severity: 'medium', region: '중동', impact: 68,
    url: 'https://www.khan.co.kr/article/202607151023001/', entities: ['hormuz-strait'],
    summary: '- 호르무즈 봉쇄의 숨통 역할을 하던 셔틀선마저 이란의 공격 위협에 직면했습니다.\n- 봉쇄를 우회하던 최소한의 통항 수단마저 위축되고 있습니다.\n- 대체 수단이 좁아지며 물류 차질이 한층 심화됐습니다.',
    keywords: ['호르무즈', '셔틀선', '이란', '공격 위협'], tags: ['호르무즈 봉쇄', '물류 차질'],
    why: '봉쇄 우회 통로로 기능하던 셔틀선까지 위협받으면서 호르무즈의 실질적 통항 여력이 더욱 줄어듭니다. 최소한의 물동을 유지하던 수단이 막히면 자재·원유 입고의 불확실성이 커져 조달 계획 수립이 어려워집니다. 우회 여지가 소진될수록 재고 소진 시한이 앞당겨지는 압력으로 작용합니다.' }),
  mk({ id: 'demo-028', title: '해상 노동 분쟁과 수출입 리스크: 공급망 비용 구조를 바꾸는 핵심 변수', source: '전국인력신문', date: '2026-07-11', category: 'logistics', severity: 'low', region: '글로벌', impact: 40,
    url: 'https://www.kjob.news/news/503600',
    summary: '- 해상 노동 분쟁이 수출입 비용 구조를 바꾸는 변수로 부상하고 있습니다.\n- 항만 파업·인력 이슈가 물류비와 리드타임에 미치는 영향이 커지고 있습니다.\n- 물류 리스크의 구조적 배경을 짚은 분석 기사입니다.',
    keywords: ['해상 노동', '노동 분쟁', '수출입', '물류비'], tags: ['물류 비용', '배경'],
    why: '해상 노동 분쟁은 봉쇄·기후와 별개로 물류비와 납기를 흔드는 상시적 구조 변수입니다. 항만 파업이나 인력 부족은 특정 거점의 처리 능력을 떨어뜨려 우회·지연 비용을 유발합니다. 지정학 리스크에 가려지기 쉬우나 누적적으로 물류 원가에 반영되는 배경 요인으로 관리가 필요합니다.' }),
  mk({ id: 'demo-029', title: '파나마운하, 엘니뇨에 네오파나막스 흘수 제한', source: '해양통신', date: '2026-07-07', category: 'logistics', severity: 'low', region: '글로벌', impact: 43,
    url: 'https://www.oceanpress.co.kr/news/article.html?no=30535', entities: ['suez-canal'],
    summary: '- 엘니뇨에 따른 가뭄으로 파나마운하가 네오파나막스급 선박의 흘수를 제한했습니다.\n- 수위 저하로 대형 선박의 통항 물량이 축소되고 있습니다.\n- 대체 우회로의 통항 제약이 현실화되며 항로 여력이 줄었습니다.',
    keywords: ['파나마운하', '엘니뇨', '흘수 제한', '우회로'], tags: ['우회로 제약', '기후'],
    why: '파나마운하의 흘수 제한은 호르무즈·홍해 대체 항로의 여력을 갉아먹어 글로벌 물류 우회 옵션을 좁힙니다. 기후로 인한 통항 제약은 예측이 어렵고 장기화될 수 있어 물류 계획의 불확실성을 키웁니다. 주요 요충지가 동시에 제약받는 상황에서 우회로마저 좁아지면 운임 상승 압력이 가중됩니다.' }),
  mk({ id: 'demo-030', title: "가뭄에 파나마운하도 막힐라…해운·정유업계 '막막'", source: '경향신문', date: '2026-06-24', category: 'logistics', severity: 'low', region: '글로벌', impact: 42,
    url: 'https://www.khan.co.kr/article/202606242055035', entities: ['suez-canal'],
    summary: '- 가뭄으로 파나마운하 통항마저 제약되며 해운·정유업계의 우려가 커졌습니다.\n- 호르무즈·홍해 봉쇄 국면에서 우회로의 여력 축소가 예고됐습니다.\n- 주요 항로가 동시에 제약받는 다중 병목 우려가 부각됐습니다.',
    keywords: ['파나마운하', '가뭄', '해운', '우회로'], tags: ['우회로 제약', '기후'],
    why: '파나마운하 제약은 중동 항로 봉쇄와 겹칠 경우 글로벌 물류의 대체 경로를 전방위로 축소시킵니다. 주요 요충지가 동시에 병목에 걸리면 우회 수요가 한정된 항로에 몰려 운임 급등을 초래합니다. 기후·지정학 리스크가 중첩되는 다중 병목 국면에 대한 선제적 물류 대응이 필요함을 시사합니다.' }),
  mk({ id: 'demo-031', title: "'물류 대란' 2라운드… 7월 운임 폭등 앞두고 화물 '밀어내기' 전쟁", source: '글로벌이코노믹', date: '2026-06-20', category: 'logistics', severity: 'low', region: '글로벌', impact: 47,
    url: 'https://www.g-enews.com/article/Global-Biz/2026/06/', entities: ['redsea-babelmandeb'],
    summary: '- 7월 운임 폭등을 앞두고 화물 밀어내기 경쟁이 벌어지고 있습니다.\n- 물류 대란 2라운드가 예고되며 선적 확보 전쟁이 나타났습니다.\n- 운임 급등의 선행 동향으로 물류비 상승 압력을 보여줍니다.',
    keywords: ['물류 대란', '운임', '화물', '해운'], tags: ['운임 급등', '배경'],
    why: '운임 인상 전 화물 밀어내기 경쟁은 물류비 급등이 임박했다는 시장의 선행 신호입니다. 선적 공간 확보 경쟁이 심화되면 계약 운임 외 추가 비용과 지연 리스크가 발생합니다. 봉쇄로 인한 항로 제약과 맞물릴 경우 운임 상승폭이 예상을 웃돌 수 있어 선제적 물류 계약이 중요해집니다.' }),
  mk({ id: 'demo-032', title: '후티 반군 "홍해 봉쇄 검토 중"‥호르무즈 우회로마저 막히나', source: 'MBC', date: '2026-03-29', category: 'logistics', severity: 'low', region: '중동', impact: 49,
    url: 'https://imnews.imbc.com/replay/2026/nwdesk/article/6811095_37004.html', entities: ['redsea-babelmandeb'],
    summary: '- 후티 반군이 홍해 봉쇄를 검토 중이라고 밝혔습니다.\n- 호르무즈 우회로 역할을 하던 홍해마저 막힐 우려가 제기됐습니다.\n- 이후 현실화되는 홍해 봉쇄 리스크의 선행 경고입니다.',
    keywords: ['후티', '홍해 봉쇄', '호르무즈', '우회로'], tags: ['홍해 항로', '선행 경고'],
    why: '홍해 봉쇄 검토 발언은 호르무즈 우회로로 기능하던 항로까지 위협받을 수 있음을 알리는 조기 경고입니다. 두 해협이 상호 대체 역할을 못하게 되면 우회 옵션이 소멸해 물류 리스크가 구조적으로 악화됩니다. 선언 이전 검토 단계에서 나온 신호인 만큼, 봉쇄 현실화에 대비한 재고·항로 시나리오 점검의 계기가 됩니다.' }),
  mk({ id: 'demo-033', title: '수에즈 운하 교통량 5개월 연속 감소, 홍해 안보 위협 지속으로 회복 지연', source: '전국인력신문', date: '2026-03-04', category: 'logistics', severity: 'low', region: '글로벌', impact: 41,
    url: 'https://www.kjob.news/news/470833', entities: ['suez-canal', 'redsea-babelmandeb'],
    summary: '- 홍해 안보 위협 지속으로 수에즈 운하 교통량이 5개월 연속 감소했습니다.\n- 회복이 지연되며 아시아–유럽 물류의 위축이 장기화되고 있습니다.\n- 물류 차질의 선행 신호로 기록된 추세성 지표입니다.',
    keywords: ['수에즈', '교통량 감소', '홍해', '안보'], tags: ['수에즈 운하', '선행 신호'],
    why: '수에즈 교통량의 지속적 감소는 홍해 안보 위협이 실제 물동에 누적적으로 반영되고 있음을 보여주는 추세 지표입니다. 5개월 연속 감소는 일시적 충격이 아니라 구조적 회피가 굳어지고 있다는 신호입니다. 아시아–유럽 항로의 위축이 장기화되면 우회에 따른 리드타임·운임 부담이 상시화될 수 있습니다.' }),
  mk({ id: 'demo-048', title: '호르무즈 봉쇄 후 13번째 한국선박 홍해 통해 원유 운송', source: '연합뉴스', date: '2026-07-12', category: 'logistics', severity: 'medium', region: '국내', impact: 67,
    url: 'https://www.yna.co.kr/view/AKR20260712039800051', entities: ['hormuz-strait', 'redsea-babelmandeb'],
    summary: '- 호르무즈 봉쇄 이후 13번째 한국 국적 선박이 홍해 항로를 통해 원유를 운송했다.\n- 호르무즈가 막히자 국내 물동량이 위험을 무릅쓰고 홍해로 우회하는 흐름이 굳어지고 있다.\n- 우회 항로 집중은 홍해마저 봉쇄될 경우 국내 원유·자재 수급이 동시에 끊길 취약성을 드러냈다.',
    keywords: ['호르무즈', '한국선박', '홍해', '원유 운송'], tags: ['국내 물동 우회', '물류 차질'],
    why: '호르무즈 봉쇄 후 국내 물동량이 홍해로 몰리면서 우회 항로에 대한 의존도가 급격히 높아지고 있습니다. 이는 홍해가 추가로 봉쇄될 경우 대체 경로가 소멸해 원유·자재 수급이 한꺼번에 마비될 수 있다는 구조적 경고입니다. 위험을 감수한 통항이 반복된다는 것은 정상적 물류가 이미 임계에 다다랐음을 방증합니다.' }),
  mk({ id: 'demo-049', title: "좁아지는 호르무즈…미 '이란 항구 봉쇄' 재개 첫날 13척만 통과", source: '연합뉴스', date: '2026-07-17', category: 'logistics', severity: 'high', region: '중동', impact: 84,
    url: 'https://www.yna.co.kr/view/AKR20260717013300009', entities: ['hormuz-strait'],
    summary: '- 미국의 이란 항구 봉쇄 재개 첫날 호르무즈를 통과한 선박이 단 13척에 그쳤다.\n- 평소 대비 통항량이 급격히 줄며 봉쇄의 실제 물류 차질이 처음으로 수치로 확인됐다.\n- 좁아진 통항 여력은 선적 대기·우회 결정을 강요하며 리드타임 불확실성을 키웠다.',
    keywords: ['호르무즈', '항구 봉쇄', '통항', '급감'], tags: ['호르무즈 봉쇄', '통항 급감'],
    why: '호르무즈 통항량 급감은 우회 항로로의 물동 집중과 리드타임 급증으로 이어져 조달 안정성을 직접 훼손합니다. 봉쇄가 선언에 그치지 않고 실제 통항 데이터로 확인됐다는 점에서 리스크가 현실화 단계로 진입했음을 보여줍니다. 통과 선박이 극소수로 줄면 자재 입고 일정을 예측할 수 없게 되어 생산 계획 전반에 연쇄 차질이 발생합니다.' }),
  mk({ id: 'demo-050', title: '호르무즈 이어 홍해 봉쇄 위기…"둘 다 막히면 글로벌 경기침체"', source: '연합뉴스', date: '2026-07-18', category: 'logistics', severity: 'high', region: '글로벌', impact: 86,
    url: 'https://www.yna.co.kr/amp/view/AKR20260718037700009', entities: ['hormuz-strait', 'redsea-babelmandeb', 'demo-asml'],
    summary: '- 호르무즈에 이어 홍해까지 봉쇄 위기에 놓이며 양대 요충지가 동시에 막힐 가능성이 부각됐다.\n- 두 해협이 모두 막히면 글로벌 경기침체가 불가피하다는 강도 높은 경고가 제기됐다.\n- ASML 등 유럽발 장비·소재의 해상 리드타임이 직접 위협받으며 조달 리스크가 최고조에 달했다.',
    keywords: ['호르무즈', '홍해', '이중 봉쇄', '경기침체'], tags: ['이중 봉쇄', '물류 차질'],
    why: '호르무즈·홍해 동시 봉쇄는 유럽발 장비·소재 리드타임과 에너지 비용을 동반 상승시켜 공급망 전반에 광범위한 충격을 줍니다. 특히 ASML 노광장비처럼 유럽에서 해상으로 들여오는 핵심 설비의 입고가 지연되면 팹 증설·유지보수 일정에 직접 타격이 됩니다. 두 항로가 상호 우회로 역할을 하지 못하게 되어, 단일 봉쇄와는 차원이 다른 조달 마비가 현실화됩니다.' }),
  mk({ id: 'demo-051', title: "홍해 '원유 생명줄' 막히면…\"한일 등 아시아 수입국 타격\"", source: '연합뉴스', date: '2026-07-21', category: 'logistics', severity: 'medium', region: '글로벌', impact: 69,
    url: 'https://www.yna.co.kr/view/AKR20260721006700072', entities: ['redsea-babelmandeb'],
    summary: '- 홍해 원유 생명줄이 막히면 한일 등 아시아 수입국이 큰 타격을 받는다는 분석입니다.\n- 아시아 에너지 수입 구조가 특정 항로에 크게 의존하는 취약성이 지적됐습니다.\n- 봉쇄 현실화 시 수입국별 파급 경로를 진단한 영향 분석입니다.',
    keywords: ['홍해', '원유', '아시아', '수입국'], tags: ['홍해 항로', '영향 분석'],
    why: '홍해 원유 항로 차단은 아시아 수입국의 에너지 조달을 직접 위협해 유가와 물류비를 동반 상승시킵니다. 한국·일본 등은 중동산 원유 의존도가 높아 홍해·호르무즈 봉쇄에 특히 취약합니다. 에너지 수입 구조의 항로 편중이 곧 제조 원가 리스크로 전이될 수 있음을 보여주는 분석입니다.' }),
  mk({ id: 'demo-052', title: '홍해 입구 유조선 회항 속출…후티 봉쇄로 원유 수송 비상', source: '연합뉴스', date: '2026-07-22', category: 'logistics', severity: 'high', region: '중동', impact: 83,
    url: 'https://www.yna.co.kr/view/AKR20260722027600009', entities: ['redsea-babelmandeb'],
    summary: '- 후티 봉쇄가 조여들며 홍해 입구에서 유조선들이 진입을 포기하고 회항하는 사례가 속출했다.\n- 원유 수송에 비상이 걸리며 홍해 항로의 마비가 선언이 아닌 실제 운항 데이터로 확인됐다.\n- 호르무즈 우회로였던 홍해마저 막히면서 아시아행 원유·자재의 대체 경로가 사실상 소멸됐다.',
    keywords: ['홍해', '유조선', '회항', '원유 수송'], tags: ['홍해 항로', '해상 봉쇄'],
    why: '유조선 회항 속출은 홍해 항로의 실질적 마비를 뜻해 우회·지연에 따른 물류비와 리드타임 급등을 확정합니다. 선박이 스스로 진입을 포기한다는 것은 위험 할증보험료로도 감당되지 않는 수준의 위협임을 방증합니다. 호르무즈에 이어 홍해까지 회피 대상이 되면서, 남은 우회로는 희망봉 우회 등 리드타임이 크게 늘어나는 경로뿐이라 조달 원가 상승이 불가피해집니다.' }),

  // ── 사이버 & 데이터 (cyber) 2건 ──
  mk({ id: 'demo-034', title: '인도 최대 원전 협력사 해킹, 한국 기업 자료도 2,432건 노출…공급망 타고 번진 정보유출', source: '데일리시큐', date: '2026-07-21', category: 'cyber', severity: 'high', region: '글로벌', impact: 79,
    url: 'https://www.dailysecu.com/news/articleView.html?idxno=207719',
    summary: '- 인도 최대 원전 협력사가 해킹당하며 한국 기업 자료 2,432건이 노출됐습니다.\n- 공급망을 타고 정보유출이 번지는 3자 리스크가 현실화됐습니다.\n- 직접 거래 상대가 아닌 협력사 경유로도 기밀이 유출될 수 있음이 확인됐습니다.',
    keywords: ['해킹', '정보유출', '공급망', '사이버'], tags: ['사이버 침해', '3자 리스크'],
    why: '협력사 경유 정보유출은 자사 기밀·설계자산 노출로 직결되는 공급망 사이버 리스크의 전형입니다. 자사 보안이 견고해도 연결된 협력사가 뚫리면 통제 밖에서 정보가 새어나갈 수 있습니다. 실제 한국 기업 자료가 대량 노출된 사례인 만큼, 협력사 보안 수준에 대한 실사와 계약상 보안 요건 강화가 시급함을 보여줍니다.' }),
  mk({ id: 'demo-035', title: 'Apple·Tesla 협력사 Tata Electronics, 사이버 침해 확인', source: 'Computing', date: '2026-06-24', category: 'cyber', severity: 'medium', region: '글로벌', impact: 58,
    url: 'https://www.computing.co.uk/news/2026/security/tata-electronics-confirms-cyber-breach',
    summary: '- Apple·Tesla의 협력사인 Tata Electronics가 사이버 침해를 공식 확인했습니다.\n- 글로벌 전자 공급망의 보안 취약성이 다시 부각됐습니다.\n- 협력사를 경유한 3자 리스크 노출 우려가 커지고 있습니다.',
    keywords: ['Tata', '사이버 침해', '협력사', '보안'], tags: ['사이버 침해', '공급망 보안'],
    why: '주요 완성품 업체의 협력사에서 발생한 사이버 침해는 공급망을 통한 정보·운영 리스크 전이의 전형적 사례입니다. 협력사가 침해되면 연결된 발주사의 설계·거래 정보까지 노출되거나 생산 차질로 이어질 수 있습니다. 3자 보안 관리가 공급망 리스크 관리의 필수 항목임을 보여주는 사건입니다.' }),

  // ── ESG & Compliance (esg) 3건 ──
  mk({ id: 'demo-036', title: "'강제노동 부품' 한개만 섞여도 큰일…현대차, 협력사 검증 강화", source: '이데일리', date: '2026-07-02', category: 'esg', severity: 'medium', region: '국내', impact: 57,
    url: 'https://edaily.co.kr/News/Read?mediaCodeNo=257&newsId=05018406645510584',
    summary: '- 현대차가 강제노동 부품 유입을 막기 위해 협력사 검증을 강화했습니다.\n- 부품 하나만 섞여도 문제가 될 만큼 ESG 실사 기준이 엄격해지고 있습니다.\n- ESG 규제 강화에 따른 공급망 실사 부담이 커지고 있습니다.',
    keywords: ['강제노동', '협력사 검증', 'ESG', '실사'], tags: ['ESG 실사', '규제'],
    why: '강제노동 등 ESG 규제 강화는 협력사 전 단계에 대한 실사 의무를 높여 공급망 관리 부담과 비용을 키웁니다. 부품 하나의 컴플라이언스 위반이 완제품 수출 제한이나 평판 훼손으로 번질 수 있어 리스크의 파급력이 큽니다. 협력사 검증 체계 정비와 대체 조달선 확보가 ESG 리스크 관리의 핵심 과제가 됩니다.' }),
  // [시연 비가시화 20260726] demo-037 노동부 해명 뉴스 숨김 — 되살리려면 주석 해제
  // mk({ id: 'demo-037', title: '노동부 "반도체 초과이익 공유제·성과급 협약 백지화, 사실과 달라"', source: '뉴스핌', date: '2026-07-01', category: 'esg', severity: 'low', region: '국내', impact: 36,
  //   url: 'https://www.newspim.com/news/view/20260701000238',
  //   summary: '- 노동부가 반도체 초과이익 공유제·성과급 협약 백지화 보도를 반박했습니다.\n- 해당 보도가 사실과 다르다는 점을 공식 해명했습니다.\n- 노사 이슈 관련 불확실성을 진화하려는 발표입니다.',
  //   keywords: ['노동부', '초과이익 공유제', '성과급', '노사'], tags: ['노사', '해명'],
  //   why: '노사 관련 제도 이슈는 생산 안정성과 직결되지만, 이번 사안은 당국의 해명으로 불확실성이 일부 해소된 성격입니다. 초과이익 공유제·성과급 협약은 현장 사기와 가동 안정성에 영향을 줄 수 있는 변수입니다. 다만 백지화가 사실이 아니라는 해명인 만큼, 실제 제도 향방이 확정되기 전까지는 배경 정보로 관리하면 충분합니다.' }),
  mk({ id: 'demo-038', title: 'EU, 반도체 공급망 위기 시 개입 위한 비상권한 입법 추진', source: '뉴스핌', date: '2026-05-29', category: 'esg', severity: 'medium', region: '유럽', impact: 59,
    url: 'https://www.newspim.com/news/view/20260529000244',
    summary: '- EU가 반도체 공급망 위기 시 개입할 수 있는 비상권한 입법을 추진합니다.\n- 위기 상황에서 규제 당국의 시장 개입 여지가 확대될 전망입니다.\n- 역내 공급 우선 배분 등 통상·조달 환경 변화가 예상됩니다.',
    keywords: ['EU', '반도체', '비상권한', '규제'], tags: ['규제', '공급망 개입'],
    why: 'EU의 비상권한 입법은 공급망 위기 시 역내 우선 배분이나 수출 제한 등으로 이어질 수 있어 조달 환경의 변수로 작용합니다. 당국이 시장에 직접 개입할 근거가 마련되면 유럽 소재·장비의 확보 예측 가능성이 떨어질 수 있습니다. ASML 등 유럽 의존도가 높은 품목의 조달 전략에 규제 리스크를 반영할 필요가 있습니다.' }),

  // ── 재무 & 신용 (financial) 2건 ──
  mk({ id: 'demo-039', title: "'메모리 슈퍼사이클 최대 수혜'…삼성전자, S&P 전망까지 바뀌었다", source: '헤럴드경제', date: '2026-07-22', category: 'financial', severity: 'low', region: '국내', impact: 38,
    url: 'https://biz.heraldcorp.com/article/10816792',
    summary: '- 메모리 슈퍼사이클 수혜로 삼성전자에 대한 S&P의 전망이 개선됐습니다.\n- 실적·신용 측면에서 긍정적 신호가 확인됐습니다.\n- 메모리 업황 회복이 신용등급 전망에까지 반영되고 있습니다.',
    keywords: ['삼성전자', '슈퍼사이클', 'S&P', '신용등급'], tags: ['신용등급', '실적'],
    why: '핵심 공급사의 신용 전망 개선은 재무 안정성과 투자 여력 측면에서 공급망에 긍정적으로 작용합니다. 실적·신용이 개선되면 증설·R&D 투자가 원활해져 공급 안정성과 기술 경쟁력에 기여합니다. 다만 업황 사이클 의존도가 높은 만큼, 다운턴 전환 시 신용 여건이 빠르게 되돌아갈 수 있다는 점도 함께 볼 필요가 있습니다.' }),
  mk({ id: 'demo-040', title: "하반기 기업신용등급, 업종별로 온도차 클듯... '관건은 기업 체력'", source: '글로벌경제신문', date: '2026-07-17', category: 'financial', severity: 'medium', region: '국내', impact: 55,
    url: 'https://www.getnews.co.kr/news/articleView.html?idxno=875386',
    summary: '- 하반기 기업신용등급이 업종별로 큰 온도차를 보일 것으로 전망됐습니다.\n- 재무 체력에 따라 협력사별 신용 리스크가 갈릴 수 있습니다.\n- 관건은 개별 기업의 체력이라는 진단이 제시됐습니다.',
    keywords: ['신용등급', '기업 체력', '재무', '하반기'], tags: ['신용 리스크', '재무'],
    why: '업종·기업별 신용등급 양극화는 재무 체력이 약한 협력사의 공급 지속성 리스크를 부각시킵니다. 신용이 악화된 협력사는 자금 조달과 투자에 제약을 받아 납기·품질에 영향을 줄 수 있습니다. 공급망 관점에서는 핵심 협력사의 재무 건전성을 선제적으로 점검하고 이원화 여부를 판단할 필요가 있습니다.' }),

  // ── 자연재해 & 기후 (disaster) 3건 ──
  mk({ id: 'demo-041', title: '"25년 만에 강력 태풍 온다"…항공편 끊기고 증시도 휴장', source: '한국경제', date: '2026-07-10', category: 'disaster', severity: 'high', region: '국내', impact: 76,
    url: 'https://www.hankyung.com/article/2026071077727',
    summary: '- 25년 만의 강력 태풍이 예고되며 항공편 결항과 증시 휴장이 잇따랐습니다.\n- 항만·항공 마비로 물류·생산 차질 우려가 급격히 커졌습니다.\n- 자연재해가 단기간에 광범위한 운영 차질을 유발할 수 있음이 부각됐습니다.',
    keywords: ['태풍', '항공편 결항', '증시 휴장', '자연재해'], tags: ['자연재해', '물류 차질'],
    why: '초강력 태풍은 항만·항공 마비와 생산 중단을 통해 단기 물류·가동 리스크를 급격히 키웁니다. 지정학 리스크와 달리 예측 시점이 짧아 사전 대응 여력이 제한적이라는 특성이 있습니다. 물류 결항과 거점 가동 중단이 동시에 발생하면 자재 입고와 출하가 함께 막혀 공급망 전반에 단기 충격을 줄 수 있습니다.' }),
  mk({ id: 'demo-042', title: "태풍에 中 남부 물난리…'20년 만 가장 심각한 홍수'", source: '연합뉴스TV', date: '2026-07-07', category: 'disaster', severity: 'medium', region: '중국', impact: 56,
    url: 'https://v.daum.net/v/20260707124419623',
    summary: '- 태풍으로 중국 남부에 20년 만의 심각한 홍수가 발생했습니다.\n- 중국 내 생산·물류 거점의 가동 차질 우려가 제기됐습니다.\n- 자연재해가 역내 공급망 거점을 직접 위협하는 국면입니다.',
    keywords: ['태풍', '중국 남부', '홍수', '자연재해'], tags: ['자연재해', '기후'],
    why: '중국 남부는 전자·부품 생산이 밀집한 지역이라 대규모 홍수는 현지 협력사의 가동과 물류에 직접 차질을 줄 수 있습니다. 거점 침수나 도로·항만 마비는 자재 입고 지연과 생산 중단으로 이어질 수 있습니다. 특정 지역에 생산이 집중된 품목일수록 기후 재해에 따른 공급 충격의 파급이 커집니다.' }),
  mk({ id: 'demo-043', title: 'SK하이닉스 청주공장 화재로 3600명 대피…"생산 차질 없어"', source: '전자신문', date: '2026-06-01', category: 'disaster', severity: 'medium', region: '국내', impact: 60,
    url: 'https://www.etnews.com/20260601000421',
    summary: '- SK하이닉스 청주공장 화재로 3,600명이 대피했습니다.\n- 다행히 생산 차질은 없는 것으로 파악됐습니다.\n- 핵심 생산 거점의 재해 대응 역량이 시험대에 올랐습니다.',
    keywords: ['SK하이닉스', '청주공장', '화재', '대피'], tags: ['생산 거점', '재해'],
    why: '핵심 생산 거점의 화재는 생산 차질이 없었더라도 단일 거점 집중 리스크를 환기하는 사건입니다. 대규모 인원 대피가 발생한 만큼, 상황이 악화됐다면 주력 라인의 가동 중단으로 이어질 수 있었습니다. 거점의 재해 대응·복구 역량과 백업 생산 체계가 공급 안정성의 중요한 변수임을 보여줍니다.' }),
]

// ─── AI 핵심 인사이트: 복합리스크 타임라인 3그룹 (취사선택) ──────────────────────
export const DEMO_GROUPS: NewsGroup[] = [
  {
    id: 'demo:iran-war',
    title: '미·이란 전쟁 격화에 따른 중동 지정학 리스크',
    newsIds: ['demo-015', 'demo-009', 'demo-008', 'demo-044', 'demo-045', 'demo-046'],
    rationale:
      '개전 초기 국내 유가 7배 급등이라는 발단으로 시작된 미·이란 충돌이 공습 재개와 전면전 기로를 거쳐 격화됐습니다. 이후 이란군의 호르무즈 전면 봉쇄 선언과 미군 맞봉쇄, 후티를 통한 홍해 확전 지시로 확산되는 단일 인과 사슬을 이룹니다. 이 중동 지정학 리스크는 뒤이은 물류 차질과 헬륨 수급 위기의 공통 트리거로 작동합니다.',
    status: 'active',
  },
  {
    id: 'demo:logistics',
    title: '호르무즈·홍해 이중 봉쇄로 인한 글로벌 해상 물류 차질',
    newsIds: ['demo-048', 'demo-049', 'demo-050', 'demo-052', 'demo-026', 'demo-025'],
    rationale:
      '호르무즈 봉쇄 이후 한국 선박이 위험을 무릅쓰고 홍해로 우회하는 상황에서 시작됐습니다. 이후 통항량 급감과 홍해 봉쇄 위기 경고, 유조선 회항 속출과 실제 공격으로 이어지며 호르무즈·홍해 이중 봉쇄가 현실화됐습니다. 아시아–유럽 항로의 리드타임과 운임, 물류비가 동반 급등하며 반도체 장비·소재 조달에 직접 차질을 주고 있습니다.',
    status: 'active',
  },
  {
    id: 'demo:helium',
    title: '중동·러시아·중국 동시 통제로 인한 반도체용 헬륨 수급 위기',
    newsIds: ['demo-022', 'demo-054', 'demo-021', 'demo-020', 'demo-057', 'demo-056'],
    rationale:
      '카타르 65% 의존이라는 구조적 취약성과 이에 대응한 기업의 공급망 안정화 착수가 배경을 이룹니다. 이 상황에서 러시아 수출 통제와 헬륨값 2배 폭등, 중국 수출 금지가 순차로 발생하며 주요 공급원이 동시에 차단됐습니다. 시뮬레이션상 국내 재고는 8월까지만 관리 가능해, 이온주입·열처리 공정용 헬륨 수급이 임계에 다다랐습니다.',
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
  'demo:iran-war': [
    { tagId: 'tag-mat-helium', tagName: '고순도 헬륨' },
    { tagId: 'tag-sup-air-liquide', tagName: '에어리퀴드' },
  ],
  'demo:logistics': [
    { tagId: 'tag-sup-asml', tagName: 'ASML' },
    { tagId: 'tag-sup-jsr', tagName: 'JSR' },
    { tagId: 'tag-mat-euv-pr', tagName: 'EUV 포토레지스트' },
  ],
  'demo:helium': [
    { tagId: 'tag-mat-helium', tagName: '고순도 헬륨' },
    { tagId: 'tag-sup-sk-specialty', tagName: 'SK스페셜티' },
    { tagId: 'tag-sup-wonik-materials', tagName: '원익머트리얼즈' },
  ],
}

// tagId → 엑셀 해당 1행의 컬럼-값 (자재가설.xlsx / 협력사가설.xlsx 원본)
export const DEMO_TAG_DETAIL: Record<string, DemoTagDetail> = {
  'tag-mat-helium': {
    tagId: 'tag-mat-helium', tagName: '고순도 헬륨', kind: 'material',
    rows: [
      { label: 'material_code', value: '1601-000009' },
      { label: 'name_kor', value: '고순도 헬륨' },
      { label: 'name_eng', value: 'High-Purity Helium' },
      { label: '투입공정', value: '이온주입 & 열처리' },
    ],
  },
  'tag-mat-euv-pr': {
    tagId: 'tag-mat-euv-pr', tagName: 'EUV 포토레지스트', kind: 'material',
    rows: [
      { label: 'material_code', value: '1201-000001' },
      { label: 'name_kor', value: 'EUV 포토레지스트' },
      { label: 'name_eng', value: 'EUV Photoresist' },
      { label: '투입공정', value: '포토리소그래피' },
    ],
  },
  'tag-sup-air-liquide': {
    tagId: 'tag-sup-air-liquide', tagName: '에어리퀴드', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S016' },
      { label: 'name_kor', value: '에어리퀴드' },
      { label: 'name_eng', value: 'Air Liquide S.A.' },
      { label: 'country', value: '프랑스' },
      { label: 'region', value: '일드프랑스' },
      { label: 'latitude', value: '48.8566' },
      { label: 'longitude', value: '2.3522' },
    ],
  },
  'tag-sup-asml': {
    tagId: 'tag-sup-asml', tagName: 'ASML', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S001' },
      { label: 'name_kor', value: 'ASML' },
      { label: 'name_eng', value: 'ASML Holding N.V.' },
      { label: 'country', value: '네덜란드' },
      { label: 'region', value: '노르트브라반트' },
      { label: 'latitude', value: '51.4231' },
      { label: 'longitude', value: '5.4623' },
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
  'tag-sup-sk-specialty': {
    tagId: 'tag-sup-sk-specialty', tagName: 'SK스페셜티', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S046' },
      { label: 'name_kor', value: 'SK스페셜티' },
      { label: 'name_eng', value: 'SK Specialty Co., Ltd.' },
      { label: 'country', value: '한국' },
      { label: 'region', value: '경북' },
      { label: 'latitude', value: '36.8057' },
      { label: 'longitude', value: '128.624' },
    ],
  },
  'tag-sup-wonik-materials': {
    tagId: 'tag-sup-wonik-materials', tagName: '원익머트리얼즈', kind: 'supplier',
    rows: [
      { label: 'supplier_code', value: 'S044' },
      { label: 'name_kor', value: '원익머트리얼즈' },
      { label: 'name_eng', value: 'WONIK Materials Co., Ltd.' },
      { label: 'country', value: '한국' },
      { label: 'region', value: '충북' },
      { label: 'latitude', value: '36.6424' },
      { label: 'longitude', value: '127.489' },
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
  'demo:iran-war': `# 복합 리스크 보고서 ① 이란 전쟁 — 중동 분쟁의 해상 봉쇄전 전환

작성 기준일: 2026-07-24 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 타임라인 뉴스 DB

## 1. 종합 요약

이란 전쟁이 새로운 국면에 들어섰습니다. 2월 개전 이후 6월 종전 합의로 마무리되는 듯했지만, 7월 9일 미군이 공습을 재개하면서 상황은 원점으로 돌아갔습니다. 더 중요한 변화는 전쟁의 무대가 육상 전투에서 바다로 옮겨간 점입니다. 7월 12일 이란이 호르무즈 해협을 봉쇄하겠다고 선언했고, 미군이 맞봉쇄로 응수하자 이란은 후티 반군을 앞세워 홍해까지 전선을 넓혔습니다.

결국 중동의 두 핵심 길목인 호르무즈와 홍해가 동시에 막힐 위기에 놓였습니다. 전쟁의 파장은 유가를 넘어 물류비와 원자재 수급으로 옮겨붙고 있어, 구매·조달 전반의 리스크로 확대될 가능성이 큽니다.

## 2. 뉴스 개별 요약

| 날짜 | 언론사 | 한 줄 요약 |
| --- | --- | --- |
| 2026-03-11 | 호남뉴스24 | 미·이스라엘의 이란 공습(2/28 개전) 이후 국내 유가가 작년 '12일 전쟁' 대비 최대 7배 수준으로 폭등. |
| 2026-07-09 | YTN | 미군이 이틀 연속 이란 공습을 재개, 트럼프는 선박 공격 시 더 강한 대응을 경고. |
| 2026-07-12 | 연합뉴스 | 이란군이 호르무즈 해협을 '추가 공지 시까지' 전면 봉쇄한다고 선언. |
| 2026-07-14 | 연합뉴스 | 미군이 이란 해상봉쇄 재개를 발표, 한국시간 15일 오전 5시부 시행. |
| 2026-07-16 | 연합뉴스 | 이란이 '미국이 전력망을 공격하면 홍해를 막아라'고 후티에 지시한 정황이 보도됨. |
| 2026-07-19 | 경향신문 | 미·이란이 상호 '레드라인'을 넘어서며 다시 전면전 기로에 진입. |

## 3. 구매 영향도

- **원가 상승** — 유가가 배럴당 100달러를 넘어서면서 소재·부품 원가와 운송비가 잇따라 오르고 있습니다. 주요 자재의 구매 단가에도 인상 압력이 이어집니다.
- **중동 물자 조달 불안** — 카타르 헬륨·LNG처럼 중동을 거치는 자재는 언제든 선적이 끊길 수 있습니다. 봉쇄가 길어지면 이미 계약한 물량조차 인도받지 못할 수 있습니다.
- **협력사 부담 전가** — 오른 에너지·물류비가 협력사 원가에 쌓이면 납품가 인상 요구로 돌아옵니다. 체력이 약한 중소 협력사는 재무 부담이 크게 늘 수 있습니다.
- **계약 이행 리스크** — 전면전이 재현되면 중동 관련 공급계약에서 불가항력(Force Majeure) 선언이 나올 수 있습니다.

## 4. 협력사·자재 종합

| 협력사 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 에어리퀴드 | 프랑스 | 고순도 헬륨(1601-000009) | 카타르산 헬륨 호르무즈 경유 |
| SK스페셜티 | 한국 | 고순도 헬륨(1601-000009) · 삼불화질소(1301-000003) | 헬륨 원료 중동 의존 |
| 원익머트리얼즈 | 한국 | 고순도 헬륨(1601-000009) | 헬륨 원료 중동 의존 |
| ASML | 네덜란드 | EUV 노광장비 | 유럽발 해상 물류(호르무즈·홍해) |
| JSR | 일본 | EUV 포토레지스트(1201-000001) | 아시아–유럽 항로 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:logistics': `# 복합 리스크 보고서 ② 물류 차질 — 호르무즈·홍해 요충지 동시 제약

작성 기준일: 2026-07-24 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 타임라인 뉴스 DB

## 1. 종합 요약

세계 물류의 핵심 관문이 한꺼번에 좁아지고 있습니다. 홍해는 안보 위협으로 수에즈 통항이 다섯 달째 줄었고, 7월 들어 이란의 호르무즈 봉쇄와 미군 맞봉쇄가 겹치며 통과 선박이 하루 13척까지 급감했습니다. 여기에 후티의 홍해 봉쇄까지 더해져 유조선이 뱃머리를 돌리는 일이 속출하고 있습니다.

호르무즈 우회로 역할을 하던 홍해마저 막히면서 아시아–유럽을 잇는 대체 항로가 사실상 소멸됐습니다. 중동발 지정학 리스크가 양대 해상 요충지를 동시에 덮치면서, 운임과 보험료는 뛰고 납기는 들쭉날쭉해지고 있습니다.

## 2. 뉴스 개별 요약

| 날짜 | 언론사 | 한 줄 요약 |
| --- | --- | --- |
| 2026-07-12 | 연합뉴스 | 호르무즈 봉쇄 이후 13번째 한국 선박이 홍해 경유로 원유를 운송하며 우회 수송 지속. |
| 2026-07-17 | 연합뉴스 | 미국의 이란 항구 봉쇄 재개 첫날 호르무즈 통과 선박이 13척에 그치며 통항 급감. |
| 2026-07-18 | 연합뉴스 | 호르무즈에 이어 홍해 봉쇄 위기가 고조, 동시 봉쇄 시 글로벌 경기침체 경고 제기. |
| 2026-07-22 | 연합뉴스 | 후티 봉쇄로 홍해 입구에서 유조선 회항이 속출, 원유 수송에 비상. |
| 2026-07-23 | 이투데이 | 후티가 홍해에서 유조선 2척을 공격하며 사우디 대상 봉쇄가 현실화. |
| 2026-07-23 | 파이낸셜뉴스 | 호르무즈·홍해 '동시 봉쇄' 리스크로 한국 수출 물류비 급등 비상. |

## 3. 구매 영향도

- **물류비 급등** — 운임에 전쟁위험 할증보험료까지 더해지면서 수입 자재와 수출 완제품의 물류비가 구조적으로 상승하고 있습니다.
- **납기 예측 불가** — 봉쇄 해역을 피해 도는 우회 항로와 잇단 회항으로 자재 입고 일정을 예측하기 어려워졌습니다.
- **선박·컨테이너 확보 경쟁** — 운항 가능한 선박이 줄면서 선복 확보 경쟁이 치열해지고, 웃돈을 주고도 물량을 잡기 어려운 상황이 늘고 있습니다.
- **항공 전환 비용** — 긴급 자재를 항공으로 돌릴 경우 항공운임 부담과 화물 공간 확보 경쟁이 뒤따릅니다.

## 4. 협력사·자재 종합

| 협력사 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| ASML | 네덜란드 | EUV 노광장비 | 유럽발 해상 물류(호르무즈·홍해) |
| JSR | 일본 | EUV 포토레지스트(1201-000001) | 아시아–유럽 항로 |
| 에어리퀴드 | 프랑스 | 고순도 헬륨(1601-000009) | 호르무즈 경유 원유·가스 물류 |
| SK스페셜티 | 한국 | 고순도 헬륨(1601-000009) | 중동산 원료 해상 수입 |

※ 이 보고서는 리스크 진단에 집중합니다. 구체적 대응 방안과 영향 협력사·자재는 내부 데이터 연동 후 별도로 정리할 예정입니다.
`,
  'demo:helium': `# 복합 리스크 보고서 ③ 헬륨 수급 — 3대 공급원 순차 차단과 재고 시한 리스크

작성 기준일: 2026-07-24 · 관점: 삼성전자 구매(조달) · 출처: Risk Sensing 복합리스크 타임라인 뉴스 DB

## 1. 종합 요약

반도체 생산에 없어서는 안 되는 헬륨의 공급줄이 하나씩 끊기고 있습니다. 한국은 헬륨의 65%를 카타르에서 들여오는데, 3월부터 전쟁이 길어지면 공급이 막힐 거란 경고가 나왔고 삼성·SK는 곧바로 공급처 다변화에 나섰습니다(당시 재고 약 6개월분). 하지만 4월엔 러시아가 수출 문을 닫았고, 6월엔 가격이 두 배로 뛰었습니다.

6월 30일만 해도 '8월까지는 버틸 수 있다'는 진단이 나왔지만, 열흘 만에 중국이 헬륨 수출을 전면 금지했고 호르무즈 재봉쇄로 카타르 물량까지 다시 막혔습니다. 카타르(전쟁)·러시아(수출통제)·중국(수출금지) 세 갈래 공급원이 한꺼번에 잠긴 셈입니다. 재고가 바닥나는 시점은 코앞인데 언제 풀릴지는 알 수 없어, 구매 관점에서 가장 시급하게 대비해야 할 사안입니다.

## 2. 뉴스 개별 요약

| 날짜 | 언론사 | 한 줄 요약 |
| --- | --- | --- |
| 2026-03-16 | 한국경제TV | 한국 헬륨 수입의 65%가 카타르산으로, 호르무즈 봉쇄 시 직격탄이라는 경고 제기. |
| 2026-03-31 | 전자신문 | 삼성·SK가 카타르 의존(64.7%) 완화를 위한 헬륨 공급망 안정화에 착수, 재고는 6개월 안팎. |
| 2026-04-15 | CNews | 러시아가 2027년 말까지 헬륨 수출 통제를 시행, 글로벌 공급의 최대 10% 이탈 우려. |
| 2026-06-12 | 글로벌이코노믹 | 이란발 공급 차질로 헬륨 가격이 2배로 폭등, 삼성·SK 원가 부담 비상. |
| 2026-06-30 | 연합뉴스 | 호르무즈 공급차질 시뮬레이션 결과 한국은 8월까지는 관리 가능하다고 평가. |
| 2026-07-10 | 연합뉴스 | 중국이 반도체 핵심 소재 헬륨의 수출 금지를 즉시 시행. |

## 3. 구매 영향도

- **조달 단가 급등** — 이미 두 배로 오른 가격에 중국 수출금지와 호르무즈 재봉쇄가 겹쳐 추가 상승을 피하기 어렵습니다.
- **재고 소진 임박** — '8월까지 버틴다'던 전제가 7월 이후 사건들로 무너지면서, 재고가 떨어진 뒤의 공백이 생산 차질로 이어질 수 있습니다.
- **물량 확보 경쟁** — 전 세계 공급이 줄어드는 국면이라, 스팟 물량을 잡으려면 장기계약보다 훨씬 비싼 값을 치러야 합니다.
- **대체 공급원의 함정** — 미국 등으로 공급처를 바꾸면 품질 인증과 먼 거리 운송이라는 새로운 변수가 따라붙습니다.
- **규제 확산 우려** — 중국의 통제가 헬륨을 넘어 네온·크립톤·갈륨 같은 다른 특수가스로 번지면 원자재 리스크가 전방위로 커집니다.

## 4. 협력사·자재 종합

| 협력사 | 국가 | 관련 자재(코드) | 노출 경로 |
| --- | --- | --- | --- |
| 에어리퀴드 | 프랑스 | 고순도 헬륨(1601-000009) | 카타르·러시아 원료 의존 |
| SK스페셜티 | 한국 | 고순도 헬륨(1601-000009) · 삼불화질소(1301-000003) | 조헬륨 중동·러시아 수입 |
| 원익머트리얼즈 | 한국 | 고순도 헬륨(1601-000009) | 조헬륨 수입 정제 |
| 린데 | 영국 | 고순도 헬륨(1601-000009) | 천연가스 부생 헬륨 |

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
