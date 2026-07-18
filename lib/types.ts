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
