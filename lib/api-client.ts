/**
 * Backend API 클라이언트
 * FastAPI Backend와 통신
 */
import type {
  NewsItem, NewsGroup, SupplyEntity, AdminGroup,
  OpKeyword, OpTag, RecommendedKeyword, RecommendedTag,
  TagSupplyChain,
  RawMaterialRow, MaterialRow, SiteRow, SupplierRow,
} from './types'

import {
  DUMMY_IRAN_NEWS, DUMMY_IRAN_GROUP, DUMMY_IRAN_ENTITIES, DUMMY_IRAN_ADMIN_GROUP,
  DUMMY_REPORT_MARKDOWN,
  isDummyNewsId, isDummyEntityId, isDummyTagId, hasDummySelection,
  dummyNewsForEntity, dummyTagSupplyChain,
} from './dummy-iran'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8007/api'

/**
 * 뉴스 목록 조회
 */
export async function fetchNews(params?: {
  severity?: 'critical' | 'high' | 'medium' | 'low'
  risk_factor?: string
  limit?: number
  offset?: number
  domestic_only?: boolean
}): Promise<NewsItem[]> {
  const query = new URLSearchParams()
  if (params?.severity) query.set('severity', params.severity)
  if (params?.risk_factor) query.set('risk_factor', params.risk_factor)
  if (params?.limit) query.set('limit', params.limit.toString())
  if (params?.offset) query.set('offset', params.offset.toString())
  if (params?.domestic_only) query.set('domestic_only', 'true')

  const url = `${API_BASE_URL}/news${query.toString() ? '?' + query.toString() : ''}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Failed to fetch news: ${res.statusText}`)
  }

  const news: NewsItem[] = await res.json()

  // 시연용 더미(이란 전쟁·호르무즈/홍해) 병합. 국내 한정(domestic_only)에는 미포함.
  if (!params?.domestic_only) {
    let dummies = DUMMY_IRAN_NEWS
    if (params?.severity) dummies = dummies.filter((n) => n.severity === params.severity)
    return [...dummies, ...news]
  }

  return news
}

/**
 * 특정 뉴스 조회
 */
export async function fetchNewsById(id: string): Promise<NewsItem> {
  // 시연용 더미 뉴스는 백엔드 조회 없이 반환
  if (isDummyNewsId(id)) {
    const found = DUMMY_IRAN_NEWS.find((n) => n.id === id)
    if (found) return found
  }

  const res = await fetch(`${API_BASE_URL}/news/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch news by id: ${res.statusText}`)
  }

  return res.json()
}

/**
 * 뉴스 그룹 목록 조회
 */
export async function fetchNewsGroups(): Promise<NewsGroup[]> {
  const res = await fetch(`${API_BASE_URL}/news/groups`)

  if (!res.ok) {
    throw new Error(`Failed to fetch news groups: ${res.statusText}`)
  }

  const groups: NewsGroup[] = await res.json()
  // 시연용 더미 그룹(이란) 병합
  return [DUMMY_IRAN_GROUP, ...groups]
}

/**
 * 관리자: 검증된 전체 그룹(숨김 포함) + 노출 상태 조회
 */
export async function fetchAdminGroups(): Promise<AdminGroup[]> {
  const res = await fetch(`${API_BASE_URL}/admin/groups`)

  if (!res.ok) {
    throw new Error(`Failed to fetch admin groups: ${res.statusText}`)
  }

  const groups: AdminGroup[] = await res.json()
  // 시연용 더미 그룹(이란) 병합 — fetchNewsGroups와 동일 패턴
  return [DUMMY_IRAN_ADMIN_GROUP, ...groups]
}

/**
 * 관리자: 노출 그룹 선택 저장 (노출할 그룹 id 전체 목록)
 */
export async function saveAdminGroupDisplay(shownIds: string[]): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/admin/groups/display`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shownIds }),
  })

  if (!res.ok) {
    throw new Error(`Failed to save admin group display: ${res.statusText}`)
  }
}

/**
 * 관리자: 뉴스 수집용 키워드 (OP_KEYWORD)
 */
export async function fetchKeywords(): Promise<OpKeyword[]> {
  const res = await fetch(`${API_BASE_URL}/admin/keywords`)
  if (!res.ok) throw new Error(`Failed to fetch keywords: ${res.statusText}`)
  return res.json()
}

export async function createKeyword(payload: Partial<OpKeyword> & { keyword: string }): Promise<OpKeyword> {
  const res = await fetch(`${API_BASE_URL}/admin/keywords`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to create keyword: ${res.statusText}`)
  return res.json()
}

export async function deleteKeywords(ids: number[]): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/admin/keywords/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  })
  if (!res.ok) throw new Error(`Failed to delete keywords: ${res.statusText}`)
}

export async function fetchKeywordRecommendations(): Promise<RecommendedKeyword[]> {
  const res = await fetch(`${API_BASE_URL}/admin/keywords/recommendations`)
  if (!res.ok) throw new Error(`Failed to fetch keyword recommendations: ${res.statusText}`)
  return res.json()
}

/**
 * 관리자: 태그 (OP_TAG)
 */
export async function fetchTags(): Promise<OpTag[]> {
  const res = await fetch(`${API_BASE_URL}/admin/tags`)
  if (!res.ok) throw new Error(`Failed to fetch tags: ${res.statusText}`)
  return res.json()
}

export async function createTag(payload: Partial<OpTag> & { name: string }): Promise<OpTag> {
  const res = await fetch(`${API_BASE_URL}/admin/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to create tag: ${res.statusText}`)
  return res.json()
}

export async function deleteTags(ids: number[]): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/admin/tags/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  })
  if (!res.ok) throw new Error(`Failed to delete tags: ${res.statusText}`)
}

export async function fetchTagRecommendations(): Promise<RecommendedTag[]> {
  const res = await fetch(`${API_BASE_URL}/admin/tags/recommendations`)
  if (!res.ok) throw new Error(`Failed to fetch tag recommendations: ${res.statusText}`)
  return res.json()
}

/**
 * 관리자: 공급망 Database 마스터 조회 (supply_chain.db, 조회 전용)
 */
export async function fetchRawMaterials(): Promise<RawMaterialRow[]> {
  const res = await fetch(`${API_BASE_URL}/admin/supply-chain/raw-materials`)
  if (!res.ok) throw new Error(`Failed to fetch raw materials: ${res.statusText}`)
  return res.json()
}

export async function fetchMaterials(): Promise<MaterialRow[]> {
  const res = await fetch(`${API_BASE_URL}/admin/supply-chain/materials`)
  if (!res.ok) throw new Error(`Failed to fetch materials: ${res.statusText}`)
  return res.json()
}

export async function fetchSites(): Promise<SiteRow[]> {
  const res = await fetch(`${API_BASE_URL}/admin/supply-chain/sites`)
  if (!res.ok) throw new Error(`Failed to fetch sites: ${res.statusText}`)
  return res.json()
}

export async function fetchSuppliers(): Promise<SupplierRow[]> {
  const res = await fetch(`${API_BASE_URL}/admin/supply-chain/suppliers`)
  if (!res.ok) throw new Error(`Failed to fetch suppliers: ${res.statusText}`)
  return res.json()
}

/**
 * 뉴스 통계 조회
 */
export async function fetchNewsStats(): Promise<{
  total: number
  critical: number
  high: number
  medium: number
  low: number
  groups: number
}> {
  const res = await fetch(`${API_BASE_URL}/news/stats`)

  if (!res.ok) {
    throw new Error(`Failed to fetch news stats: ${res.statusText}`)
  }

  return res.json()
}

/**
 * 공급망 거점 목록 조회
 */
export async function fetchEntities(params?: {
  status?: 'normal' | 'watch' | 'disrupted'
  tier?: number
}): Promise<SupplyEntity[]> {
  const query = new URLSearchParams()
  if (params?.status) query.set('status', params.status)
  if (params?.tier) query.set('tier', params.tier.toString())

  const url = `${API_BASE_URL}/entities${query.toString() ? '?' + query.toString() : ''}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Failed to fetch entities: ${res.statusText}`)
  }

  const entities: SupplyEntity[] = await res.json()
  // 시연용 더미 중동 물류 거점 병합
  return [...entities, ...DUMMY_IRAN_ENTITIES]
}

/**
 * 특정 거점과 관련된 뉴스 조회
 */
export async function fetchEntityNews(entityId: string): Promise<NewsItem[]> {
  const dummies = dummyNewsForEntity(entityId)

  // 신규 더미 거점(호르무즈/홍해/수에즈)은 백엔드에 없으므로 더미만 반환
  if (isDummyEntityId(entityId)) {
    return dummies
  }

  const res = await fetch(`${API_BASE_URL}/entities/${entityId}/news`)

  if (!res.ok) {
    throw new Error(`Failed to fetch entity news: ${res.statusText}`)
  }

  const news: NewsItem[] = await res.json()
  // 기존 거점(asml/merck/samsung-giheung 등)에 편입된 이란 더미 뉴스 병합
  return [...dummies, ...news]
}

/**
 * 특정 태그와 관련된 공급망 정보 조회 (자재/원재료/협력사/거점)
 */
export async function fetchTagSupplyChain(tagId: string): Promise<TagSupplyChain> {
  // 시연용 더미 태그(이란)는 백엔드 조회 없이 사전 정의 공급망 반환
  if (isDummyTagId(tagId)) {
    const found = dummyTagSupplyChain(tagId)
    if (found) return found
  }

  const res = await fetch(`${API_BASE_URL}/tags/${encodeURIComponent(tagId)}/supply-chain`)

  if (!res.ok) {
    throw new Error(`Failed to fetch tag supply chain: ${res.statusText}`)
  }

  return res.json()
}

/**
 * AI 리포트 생성 (스트리밍)
 */
export async function generateReport(params: {
  newsIds: string[]
  recipient?: string
  sender?: string
  tone?: string
  instruction?: string
}): Promise<Response> {
  // 시연용: 선택에 더미 뉴스가 포함되면 백엔드(DB 재조회) 대신
  // 사전 작성 리포트를 청크 단위로 흘려보내는 스트리밍 Response를 반환한다.
  if (hasDummySelection(params.newsIds)) {
    const encoder = new TextEncoder()
    const text = DUMMY_REPORT_MARKDOWN
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        // 문단 단위로 끊어 타이핑되는 듯한 스트리밍 효과
        const chunks = text.match(/[\s\S]{1,24}/g) ?? [text]
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk))
          await new Promise((r) => setTimeout(r, 20))
        }
        controller.close()
      },
    })
    return new Response(stream, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const res = await fetch(`${API_BASE_URL}/reports/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    throw new Error(`Failed to generate report: ${res.statusText}`)
  }

  return res
}
