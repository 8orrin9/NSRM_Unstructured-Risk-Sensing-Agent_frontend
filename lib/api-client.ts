/**
 * Backend API 클라이언트
 * FastAPI Backend와 통신
 */
import type { NewsItem, NewsGroup, SupplyEntity } from './types'

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

  return res.json()
}

/**
 * 특정 뉴스 조회
 */
export async function fetchNewsById(id: string): Promise<NewsItem> {
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

  return res.json()
}

/**
 * 특정 거점과 관련된 뉴스 조회
 */
export async function fetchEntityNews(entityId: string): Promise<NewsItem[]> {
  const res = await fetch(`${API_BASE_URL}/entities/${entityId}/news`)

  if (!res.ok) {
    throw new Error(`Failed to fetch entity news: ${res.statusText}`)
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
