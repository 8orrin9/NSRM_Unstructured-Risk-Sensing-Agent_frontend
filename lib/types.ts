export type Severity = 'critical' | 'high' | 'medium' | 'low'

export type RiskCategory =
  | 'geopolitical'
  | 'supply'
  | 'material'
  | 'tech'
  | 'logistics'
  | 'cyber'
  | 'esg'
  | 'financial'
  | 'disaster'

export interface RiskCategoryMeta {
  id: RiskCategory
  ko: string
  en: string
}

export type TagType = 'EVENT' | 'SITE' | 'RAW_MATERIAL' | 'SUPPLIER' | 'MATERIAL'

// 태그 클릭 → 공급망 조인용 메타 (tags[i]와 1:1 정합)
export interface TagRef {
  tagId: string
  tagName: string
  tagType: TagType
  linkable: boolean // EVENT 및 공급망 연결키 없는 태그는 false
}

export interface NewsItem {
  id: string
  title: string
  source: string
  publishedAt: string // ISO
  category: RiskCategory
  severity: Severity
  summary: string
  detail: string
  keywords: string[]
  recommendedKeywords: string[] // 신규 Pool 추천 키워드
  tags: string[] // risk tags
  tagRefs?: TagRef[] // tags와 1:1 정합. 없으면 태그 비클릭(하위호환)
  recommendedTags?: string[] // 신규 EVENT 태그 추천 (매핑 실패 키워드 기반)
  relatedEntityIds: string[] // supplier / site ids
  region: string
  url: string
  impactScore: number // 0-100
  riskJustification?: string // AI 리스크 판단 근거
  isRisk?: boolean // AGENT4.is_risk — Individual News 노출 게이트
}

export interface NewsGroup {
  id: string
  title: string // group topic
  newsIds: string[] // member news, chronological order
  rationale: string // why these are grouped / why it is a risk cluster
  status: 'active' | 'dissolving' // dynamic grouping state
}

// 관리자 화면용: 검증된 전체 그룹(숨김 포함) + 노출 상태
export interface AdminGroup {
  id: string // `${run_id}:${group_id}`
  title: string
  theme: string
  memberCount: number // 렌더 가능 멤버 수
  newsIds: string[] // 렌더 가능 멤버 news_id (하위 뉴스 리스트용)
  autoDisplayed: boolean // compute_group_serving 자동계산 결과
  adminOverride: boolean | null // 관리자 수동 지정(null=미개입)
  currentlyShown: boolean // 최종 노출 여부 (override 우선)
}

// 관리자: 뉴스 수집용 키워드 (OP_KEYWORD)
export interface OpKeyword {
  id: number
  risk_category_code: string | null
  risk_category_name: string | null
  risk_factor: string | null
  keyword_group_name: string | null
  keyword: string | null
  target_region: string | null
  description: string | null
  source: string
}

// 관리자: 태그 (OP_TAG)
export interface OpTag {
  id: number
  tag_id: string | null
  target_region: string | null
  tag_type: string | null
  name: string | null
  domain: string | null
  risk_factor: string | null
  keyword_count: number | null
  keywords_full: string | null
  description: string | null
  target_table_column: string | null
  db_matched_count: number | null
  source: string
}

// AI 추천 신규 키워드
export interface RecommendedKeyword {
  keyword: string
  count: number
}

// AI 추천 신규 태그 (EVENT 한정)
export interface RecommendedTag {
  name: string
  tag_type: string
  risk_factor: string | null
  description: string | null
  keywords_full: string | null
}

// 공급망 Database 마스터 조회 (supply_chain.db, 조회 전용) — 백엔드 모델과 1:1
export interface RawMaterialRow {
  no: number
  raw_material_code: string
  name_kor: string
  name_eng: string
  raw_material_type: string | null
}

export interface MaterialRow {
  no: number
  material_code: string
  name_kor: string
  name_eng: string
  material_type: string | null
}

export interface SiteRow {
  no: number
  site_code: string
  supplier_code: string
  name: string
  country: string | null
  region: string | null
  latitude: number | null
  longitude: number | null
}

export interface SupplierRow {
  no: number
  supplier_code: string
  name_kor: string
  name_eng: string
  country: string | null
  region: string | null
  latitude: number | null
  longitude: number | null
}

// A derived, denormalized group with computed meta + resolved member items
export interface ResolvedGroup {
  id: string
  title: string
  rationale: string
  status: 'active' | 'dissolving'
  items: NewsItem[]
  severity: Severity
  category: RiskCategory
  isRisk: boolean
  relatedEntityIds: string[]
  latestAt: string
  earliestAt: string
}

// A unified daily-feed entry: either a multi-news group or a standalone news item
export type FeedEntry =
  | { kind: 'group'; group: ResolvedGroup; latestAt: string }
  | { kind: 'single'; news: NewsItem; latestAt: string }

// 9 high-level Risk Factor categories (for Daily News top section)
export type RiskFactor =
  | 'geopolitical_regulatory'   // 지정학 & 규제
  | 'supply_singlesource'       // 공급 집중 & 단일소싱
  | 'rawmaterial_critical'      // 원자재 & 희소물질
  | 'tech_ip'                   // 기술 & 지식재산
  | 'logistics_infra'           // 물류 & 인프라
  | 'cyber_data'                // 사이버 & 데이터
  | 'esg_compliance'            // ESG & Compliance
  | 'financial_credit'          // 재무 & 신용
  | 'disaster_climate'          // 자연재해 & 기후

export interface RiskFactorMeta {
  id: RiskFactor
  ko: string
  en: string
  // which RiskCategory items map to this factor
  categories: RiskCategory[]
}

// Keyword pool entry (추천 키워드 → 수집 키워드 Pool)
export interface KeywordPoolItem {
  keyword: string
  addedAt: string // ISO
  source: 'recommended' | 'manual'
}

// 태그와 연결된 공급망 엔티티 참조 (협력사/거점/자재/원재료 공통)
export interface SupplyRef {
  code: string
  nameKo: string
  nameEng?: string
  country?: string // supplier / site 만
  region?: string // supplier / site 만
}

// 태그 클릭 시 반환되는 공급망 정보
export interface TagSupplyChain {
  tagId: string
  tagType: TagType
  tagName: string
  suppliers: SupplyRef[] // 협력사
  sites: SupplyRef[] // 거점
  materials: SupplyRef[] // 자재
  rawMaterials: SupplyRef[] // 원재료
}

export type EntityType = 'supplier' | 'site' | 'material'

export interface SupplyEntity {
  id: string
  name: string
  nameKo: string
  type: EntityType
  tier: 1 | 2 | 3
  category: string // what they provide
  country: string
  city: string
  lat: number
  lng: number
  criticality: Severity // how critical to Samsung supply
  status: 'normal' | 'watch' | 'disrupted'
  products: string[]
  activeRiskIds: string[] // news ids currently affecting
}
