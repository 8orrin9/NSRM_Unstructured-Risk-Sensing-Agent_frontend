/**
 * 시연용 더미 데이터 — 이란 전쟁 / 호르무즈·홍해 봉쇄
 *
 * 실제 수집 파이프라인·DB(golden dataset 포함)를 건드리지 않고,
 * 프론트엔드 API 클라이언트(api-client.ts)에서만 병합해 화면에 노출하기 위한 더미.
 * Daily News · Explorer MAP · Reporting 전 영역에 자동 반영된다.
 *
 * ⚠️ 시연 종료 후 이 파일과 api-client.ts의 병합 분기를 제거하면 원복된다.
 */
import type { NewsItem, NewsGroup, SupplyEntity, TagSupplyChain, AdminGroup } from './types'

// ─── 신규 중동 물류 결절점 거점 ────────────────────────────────────────────────
export const DUMMY_IRAN_ENTITIES: SupplyEntity[] = [
  {
    id: 'hormuz-strait',
    name: 'Strait of Hormuz',
    nameKo: '호르무즈 해협',
    type: 'supplier',
    tier: 1,
    category: '해상 물류 요충지 (원유·LNG)',
    country: 'Iran / Oman',
    city: 'Strait of Hormuz',
    lat: 26.57,
    lng: 56.25,
    criticality: 'critical',
    status: 'disrupted',
    products: ['원유 해상 수송로', 'LNG 수송로', '컨테이너 항로'],
    activeRiskIds: ['iran-01', 'iran-02', 'iran-03'],
  },
  {
    id: 'redsea-babelmandeb',
    name: 'Red Sea / Bab-el-Mandeb',
    nameKo: '홍해·바브엘만데브',
    type: 'supplier',
    tier: 1,
    category: '해상 물류 요충지 (아시아–유럽 항로)',
    country: 'Yemen',
    city: 'Bab-el-Mandeb',
    lat: 12.58,
    lng: 43.33,
    criticality: 'high',
    status: 'disrupted',
    products: ['아시아–유럽 컨테이너 항로', '수에즈 연결 항로'],
    activeRiskIds: ['iran-03', 'iran-04'],
  },
  {
    id: 'suez-canal',
    name: 'Suez Canal',
    nameKo: '수에즈 운하',
    type: 'supplier',
    tier: 1,
    category: '해상 물류 요충지 (운하)',
    country: 'Egypt',
    city: 'Suez',
    lat: 30.42,
    lng: 32.35,
    criticality: 'high',
    status: 'watch',
    products: ['아시아–유럽 최단 항로', '컨테이너·유조선 통항'],
    activeRiskIds: ['iran-04'],
  },
]

// ─── 더미 뉴스 4건 ─────────────────────────────────────────────────────────────
// publishedAt 오름차순(iran-01 → iran-04)으로 두면 그룹 타임라인이 1→2→3→4 순서로 노출된다.
export const DUMMY_IRAN_NEWS: NewsItem[] = [
  {
    id: 'iran-01',
    title: '이란-이스라엘 전면전 확대…중동 지정학 리스크 최고조',
    source: 'Reuters',
    publishedAt: '2026-07-19T08:20:00+09:00',
    category: 'geopolitical',
    severity: 'critical',
    summary:
      '이란과 이스라엘 간 군사 충돌이 전면전 양상으로 확대되며 중동 전역의 지정학 리스크가 급격히 고조되고 있다. 주요국이 자국민 대피령을 발령했다.',
    detail:
      '이란과 이스라엘의 상호 미사일 공격이 연일 이어지며 충돌이 전면전으로 비화하고 있다. 미국과 유럽 주요국은 자국민 대피령을 내렸고, 국제 유가는 하루 만에 8% 급등했다. 시장은 이번 사태가 호르무즈 해협 등 핵심 물류 요충지로 번질 가능성을 우려하고 있으며, 반도체 공급망 역시 원자재·에너지 가격 상승과 물류 지연이라는 이중 압박에 노출될 전망이다. 전문가들은 사태 장기화 시 중동을 경유하는 모든 해상 물류에 광범위한 차질이 불가피하다고 진단했다.',
    keywords: ['이란', '이스라엘', '전면전', '중동', '지정학', '유가'],
    recommendedKeywords: [],
    tags: ['지정학 리스크', '군사 충돌', '중동 정세'],
    tagRefs: [
      { tagId: 'iran-tag-geopolitical', tagName: '지정학 리스크', tagType: 'EVENT', linkable: false },
      { tagId: 'iran-tag-conflict', tagName: '군사 충돌', tagType: 'EVENT', linkable: false },
      { tagId: 'iran-tag-mideast', tagName: '중동 정세', tagType: 'EVENT', linkable: false },
    ],
    relatedEntityIds: ['hormuz-strait'],
    region: 'Middle East',
    url: 'https://www.reuters.com/world/middle-east/',
    impactScore: 92,
    riskJustification:
      '중동 전면전은 에너지·물류·원자재 전반에 연쇄 충격을 유발하는 상위 리스크로, 반도체 공급망에 미치는 간접 노출도가 매우 크다.',
    isRisk: true,
  },
  {
    id: 'iran-02',
    title: '이란, 호르무즈 해협 봉쇄 위협…글로벌 원유·물류 대란 우려',
    source: 'Bloomberg',
    publishedAt: '2026-07-20T10:05:00+09:00',
    category: 'logistics',
    severity: 'critical',
    summary:
      '이란이 호르무즈 해협 봉쇄를 공식 위협하면서 전 세계 원유 수송의 20%가 지나는 요충지가 마비될 위기에 놓였다. 해상 운임과 보험료가 급등하고 있다.',
    detail:
      '이란 혁명수비대가 호르무즈 해협 봉쇄 가능성을 공식 언급하면서 글로벌 에너지·물류 시장이 요동치고 있다. 호르무즈 해협은 전 세계 해상 원유 수송의 약 20%, LNG의 상당량이 통과하는 최대 요충지다. 봉쇄가 현실화될 경우 유가 추가 급등은 물론, 해당 수역을 경유하는 컨테이너 선박의 우회로 지연·운임 폭등이 예상된다. 이미 주요 선사들이 위험 할증료(War Risk Surcharge)를 인상했고, 한국·일본·대만 등 아시아 반도체 생산 거점으로 향하는 에너지·소재 조달 비용 상승이 우려된다.',
    keywords: ['호르무즈', '해협 봉쇄', '원유', '해상운임', '물류', '이란'],
    recommendedKeywords: [],
    tags: ['호르무즈 해협', '해상 봉쇄', '운임 급등'],
    tagRefs: [
      { tagId: 'iran-tag-hormuz', tagName: '호르무즈 해협', tagType: 'SITE', linkable: true },
      { tagId: 'iran-tag-blockade', tagName: '해상 봉쇄', tagType: 'EVENT', linkable: false },
      { tagId: 'iran-tag-freight', tagName: '운임 급등', tagType: 'EVENT', linkable: false },
    ],
    relatedEntityIds: ['hormuz-strait', 'samsung-giheung'],
    region: 'Middle East',
    url: 'https://www.bloomberg.com/',
    impactScore: 89,
    riskJustification:
      '호르무즈 해협은 대체 불가능한 에너지·물류 요충지로, 봉쇄 시 아시아 반도체 거점의 조달 비용과 리드타임에 직접 타격을 준다.',
    isRisk: true,
  },
  {
    id: 'iran-03',
    title: '이란, 예멘 후티 반군에 무기·정보 지원 확대 정황',
    source: 'Financial Times',
    publishedAt: '2026-07-21T09:30:00+09:00',
    category: 'logistics',
    severity: 'high',
    summary:
      '이란이 예멘 후티 반군에 대한 무기·정보 지원을 확대하고 있다는 정황이 포착됐다. 홍해 일대 해상 물류의 위협이 한층 커질 전망이다.',
    detail:
      '복수의 정보 소식통에 따르면 이란이 예멘 후티 반군에 대한 드론·미사일 부품과 표적 정보 지원을 대폭 확대하고 있는 정황이 확인됐다. 이는 홍해·바브엘만데브 해협을 지나는 상선에 대한 후티의 공격 능력을 강화시켜, 아시아–유럽을 잇는 핵심 항로의 안전을 위협한다. 호르무즈에 이어 홍해까지 리스크가 확산될 경우, 중동을 경유하는 사실상 모든 해상 물류가 동시다발적 차질에 직면하게 된다. 유럽 소재·장비 공급사로부터의 반도체 부품 조달에도 지연 리스크가 번지고 있다.',
    keywords: ['이란', '후티', '예멘', '무기 지원', '홍해', '해상 위협'],
    recommendedKeywords: [],
    tags: ['홍해 항로', '무기 지원', '해상 위협'],
    tagRefs: [
      { tagId: 'iran-tag-redsea', tagName: '홍해 항로', tagType: 'SITE', linkable: true },
      { tagId: 'iran-tag-armssupport', tagName: '무기 지원', tagType: 'EVENT', linkable: false },
      { tagId: 'iran-tag-maritimethreat', tagName: '해상 위협', tagType: 'EVENT', linkable: false },
    ],
    relatedEntityIds: ['redsea-babelmandeb', 'hormuz-strait'],
    region: 'Middle East',
    url: 'https://www.ft.com/',
    impactScore: 78,
    riskJustification:
      '이란의 후티 지원 확대는 홍해 항로 위협을 증폭시켜 물류 리스크를 호르무즈에서 홍해로 확산시키는 촉매로 작용한다.',
    isRisk: true,
  },
  {
    id: 'iran-04',
    title: '후티 반군, 홍해 상선 공격 재개…수에즈 우회로 물류 마비',
    source: 'Reuters',
    publishedAt: '2026-07-22T07:45:00+09:00',
    category: 'logistics',
    severity: 'high',
    summary:
      '후티 반군이 홍해 상선에 대한 공격을 재개하며 수에즈 운하 경유 항로가 사실상 마비됐다. 주요 선사들이 희망봉 우회를 결정, 리드타임이 크게 늘어나고 있다.',
    detail:
      '예멘 후티 반군이 홍해를 통과하는 상선에 대한 미사일·드론 공격을 재개하면서, 아시아–유럽 최단 항로인 수에즈 운하 경유 노선이 사실상 마비 상태에 빠졌다. Maersk, MSC 등 주요 글로벌 선사들은 안전을 위해 아프리카 희망봉 우회를 결정했고, 이로 인해 아시아–유럽 간 해상 운송 리드타임이 10~14일가량 증가했다. 운임은 봉쇄 이전 대비 2배 이상 치솟았다. 유럽에 위치한 반도체 장비·특수소재 공급사(ASML, Merck 등)로부터의 조달 리드타임과 비용이 동반 상승하며, 국내 생산 거점의 재고 운영 부담이 가중되고 있다.',
    keywords: ['후티', '홍해', '수에즈', '희망봉 우회', '해상운임', '리드타임'],
    recommendedKeywords: [],
    tags: ['수에즈 운하', '해상 봉쇄', '운임 급등', '리드타임 증가'],
    tagRefs: [
      { tagId: 'iran-tag-suez', tagName: '수에즈 운하', tagType: 'SITE', linkable: true },
      { tagId: 'iran-tag-blockade', tagName: '해상 봉쇄', tagType: 'EVENT', linkable: false },
      { tagId: 'iran-tag-freight', tagName: '운임 급등', tagType: 'EVENT', linkable: false },
      { tagId: 'iran-tag-leadtime', tagName: '리드타임 증가', tagType: 'EVENT', linkable: false },
    ],
    relatedEntityIds: ['redsea-babelmandeb', 'suez-canal', 'asml', 'merck'],
    region: 'Middle East',
    url: 'https://www.reuters.com/business/',
    impactScore: 81,
    riskJustification:
      '홍해 항로 마비와 희망봉 우회는 유럽발 반도체 장비·소재의 리드타임·물류비를 직접 끌어올려 공급망에 실질적 차질을 야기한다.',
    isRisk: true,
  },
]

// ─── AI 핵심 인사이트: 4건을 하나의 그룹으로 묶음 ──────────────────────────────
export const DUMMY_IRAN_GROUP: NewsGroup = {
  id: 'dummy:iran-hormuz',
  title: '이란 전쟁 격화 → 호르무즈·홍해 봉쇄로 이어지는 중동 물류 리스크 확산',
  // 순서는 feed.resolveGroup()이 publishedAt 오름차순으로 재정렬한다.
  newsIds: ['iran-01', 'iran-02', 'iran-03', 'iran-04'],
  rationale:
    '이란-이스라엘 전면전(①)이 호르무즈 해협 봉쇄 위협(②)으로 번지고, 이란의 후티 지원 확대(③)가 홍해 상선 공격 재개(④)로 이어지는 단일 인과 사슬이다. 중동의 두 핵심 해상 요충지(호르무즈·홍해)가 동시에 위협받으면서 아시아–유럽 물류 전반의 리드타임·운임·에너지 비용이 연쇄 상승, 반도체 공급망에 광범위한 간접 충격이 예상된다.',
  status: 'active',
}

// ─── Reporting: 백엔드 무수정 시연을 위한 사전 작성 리포트 초안 ────────────────
// reports.py 시스템 프롬프트와 동일한 4섹션 구조.
export const DUMMY_REPORT_MARKDOWN = `# 공급망 리스크 리포트

## 1. 핵심 요약 (Executive Summary)

이란-이스라엘 전면전이 호르무즈 해협 봉쇄 위협과 홍해 상선 공격 재개로 확산되면서, 중동의 양대 해상 물류 요충지가 동시에 위협받고 있습니다. 전 세계 원유 수송의 약 20%가 통과하는 호르무즈와 아시아–유럽 최단 항로인 수에즈(홍해) 경유 노선이 모두 마비되며, 해상 운임은 2배 이상 급등하고 리드타임은 10~14일 늘어났습니다. 반도체 공급망은 에너지·원자재 가격 상승과 유럽발 장비·소재 조달 지연이라는 이중 압박에 직접 노출되어 있어 즉각적인 대응이 필요합니다.

## 2. 주요 리스크 상세

### ① 이란-이스라엘 전면전 확대 (심각)
- 상호 미사일 공격이 전면전으로 비화, 국제 유가 하루 8% 급등
- 중동 전역 지정학 리스크가 물류·에너지·원자재로 연쇄 전이될 우려

### ② 호르무즈 해협 봉쇄 위협 (심각)
- 이란 혁명수비대가 봉쇄 가능성 공식 언급, 세계 해상 원유의 20% 통과 요충지
- 선사들의 전쟁 위험 할증료 인상, 아시아 생산거점 조달 비용 상승

### ③ 이란의 후티 반군 지원 확대 (높음)
- 드론·미사일 부품 및 표적 정보 지원 정황, 홍해 항로 위협 증폭
- 리스크가 호르무즈에서 홍해로 확산되는 촉매

### ④ 후티의 홍해 상선 공격 재개 (높음)
- 수에즈 경유 노선 사실상 마비, 주요 선사 희망봉 우회 결정
- 아시아–유럽 리드타임 10~14일 증가, 운임 2배 이상 급등

## 3. 공급망 영향 평가

- **호르무즈 해협·홍해·수에즈**: 대체 불가능한 해상 요충지 동시 차질로 우회로 지연 불가피
- **자사 기흥 캠퍼스**: 에너지·소재 조달 비용 상승 및 재고 운영 부담 가중
- **ASML(네덜란드)·Merck(독일)**: 유럽발 장비·특수소재 조달 리드타임·물류비 동반 상승
- 단일 사건이 아닌 **연쇄 확산형 리스크**로, 사태 장기화 시 영향 범위가 계속 확대될 전망

## 4. 권고 조치 (Recommended Actions)

1. **단기 대응 (0~2주)**
   - 유럽발 핵심 장비·소재(ASML·Merck 등) 재고 수준 긴급 점검 및 안전재고 4주분 확보 검토
   - 홍해·호르무즈 경유 예정 화물의 대체 항로(희망봉 우회) 리드타임 반영해 발주 일정 재조정
2. **중기 대응 (1~2개월)**
   - 항로 다변화 및 항공 운송 병행 등 물류 이원화 방안 수립
   - 전쟁 위험 할증료·유가 상승분을 반영한 조달 비용 시나리오별 재무 영향 분석
3. **모니터링**
   - 호르무즈 봉쇄 현실화 여부 및 홍해 항로 재개 시점 일일 모니터링 체계 가동
`

// ─── 리스크 태그 클릭 → 공급망 정보 (SITE 태그만 linkable) ──────────────────────
// SupplyRef.code는 실제 entity id로 채워, 클릭 시 /explorer?entity=code 링크가 살아있게 한다.
export const DUMMY_TAG_SUPPLY: Record<string, TagSupplyChain> = {
  'iran-tag-hormuz': {
    tagId: 'iran-tag-hormuz',
    tagType: 'SITE',
    tagName: '호르무즈 해협',
    suppliers: [],
    sites: [
      { code: 'hormuz-strait', nameKo: '호르무즈 해협', country: 'Iran / Oman' },
      { code: 'samsung-giheung', nameKo: '삼성 기흥 캠퍼스', country: '대한민국', region: '경기' },
    ],
    materials: [],
    rawMaterials: [],
  },
  'iran-tag-redsea': {
    tagId: 'iran-tag-redsea',
    tagType: 'SITE',
    tagName: '홍해 항로',
    suppliers: [],
    sites: [
      { code: 'redsea-babelmandeb', nameKo: '홍해·바브엘만데브', country: 'Yemen' },
    ],
    materials: [],
    rawMaterials: [],
  },
  'iran-tag-suez': {
    tagId: 'iran-tag-suez',
    tagType: 'SITE',
    tagName: '수에즈 운하',
    suppliers: [
      { code: 'asml', nameKo: 'ASML', nameEng: 'ASML', country: 'Netherlands' },
      { code: 'merck', nameKo: 'Merck', nameEng: 'Merck Electronics', country: 'Germany' },
    ],
    sites: [
      { code: 'suez-canal', nameKo: '수에즈 운하', country: 'Egypt' },
    ],
    materials: [],
    rawMaterials: [],
  },
}

// ─── admin/insights: fetchAdminGroups()용 AdminGroup 변환 ───────────────────────
export const DUMMY_IRAN_ADMIN_GROUP: AdminGroup = {
  id: DUMMY_IRAN_GROUP.id,
  title: DUMMY_IRAN_GROUP.title,
  theme: '중동 지정학 → 물류 요충지 봉쇄 리스크 확산',
  memberCount: DUMMY_IRAN_GROUP.newsIds.length,
  newsIds: DUMMY_IRAN_GROUP.newsIds,
  autoDisplayed: true,
  adminOverride: null,
  currentlyShown: true, // Daily News에 이미 노출 중이므로 admin 상태와 일관
}

// ─── 헬퍼 ──────────────────────────────────────────────────────────────────────
const DUMMY_NEWS_IDS = new Set(DUMMY_IRAN_NEWS.map((n) => n.id))
const DUMMY_ENTITY_IDS = new Set(DUMMY_IRAN_ENTITIES.map((e) => e.id))

export function isDummyNewsId(id: string): boolean {
  return DUMMY_NEWS_IDS.has(id)
}

export function isDummyEntityId(id: string): boolean {
  return DUMMY_ENTITY_IDS.has(id)
}

export function hasDummySelection(ids: string[]): boolean {
  return ids.some((id) => DUMMY_NEWS_IDS.has(id))
}

/** 특정 거점 id와 관련된 더미 뉴스 (relatedEntityIds에 포함된 것) */
export function dummyNewsForEntity(entityId: string): NewsItem[] {
  return DUMMY_IRAN_NEWS.filter((n) => n.relatedEntityIds.includes(entityId))
}

export function isDummyTagId(tagId: string): boolean {
  return tagId in DUMMY_TAG_SUPPLY
}

/** 더미 태그 클릭 시 반환할 공급망 정보 (없으면 null) */
export function dummyTagSupplyChain(tagId: string): TagSupplyChain | null {
  return DUMMY_TAG_SUPPLY[tagId] ?? null
}
