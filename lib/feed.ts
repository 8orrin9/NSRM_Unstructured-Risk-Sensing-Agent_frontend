import { SEVERITY_META } from './risk-config'
import type { FeedEntry, NewsItem, NewsGroup, ResolvedGroup, Severity } from './types'

const RISK_SEVERITIES: Severity[] = ['critical', 'high']

export function isRiskNews(n: NewsItem) {
  return RISK_SEVERITIES.includes(n.severity)
}

function maxSeverity(items: NewsItem[]): Severity {
  return items.reduce<Severity>((acc, n) => {
    return SEVERITY_META[n.severity].order < SEVERITY_META[acc].order ? n.severity : acc
  }, 'low')
}

// Resolve a group definition into a denormalized group with computed meta.
export function resolveGroup(groupId: string, NEWS: NewsItem[], NEWS_GROUPS: NewsGroup[]): ResolvedGroup | null {
  const group = NEWS_GROUPS.find((g) => g.id === groupId)
  if (!group) return null
  const items = group.newsIds
    .map((id) => NEWS.find((n) => n.id === id))
    .filter((n): n is NewsItem => Boolean(n))
    .sort((a, b) => +new Date(a.publishedAt) - +new Date(b.publishedAt))
  if (items.length === 0) return null

  const severity = maxSeverity(items)
  // category = category of the most severe / latest driving item
  const driver = [...items].sort(
    (a, b) =>
      SEVERITY_META[a.severity].order - SEVERITY_META[b.severity].order ||
      b.impactScore - a.impactScore,
  )[0]
  const relatedEntityIds = Array.from(new Set(items.flatMap((n) => n.relatedEntityIds)))

  return {
    id: group.id,
    title: group.title,
    rationale: group.rationale,
    status: group.status,
    items,
    severity,
    category: driver.category,
    isRisk: RISK_SEVERITIES.includes(severity),
    relatedEntityIds,
    latestAt: items[items.length - 1].publishedAt,
    earliestAt: items[0].publishedAt,
  }
}

export function getAllGroups(NEWS: NewsItem[], NEWS_GROUPS: NewsGroup[]): ResolvedGroup[] {
  return NEWS_GROUPS.map((g) => resolveGroup(g.id, NEWS, NEWS_GROUPS)).filter(
    (g): g is ResolvedGroup => Boolean(g),
  )
}

// News that do not belong to any group.
export function getUngroupedNews(NEWS: NewsItem[], NEWS_GROUPS: NewsGroup[]): NewsItem[] {
  const groupedIds = new Set(NEWS_GROUPS.flatMap((g) => g.newsIds))
  return NEWS.filter((n) => !groupedIds.has(n.id))
}

// Build a unified daily feed of groups + individual news, newest activity first.
// 그룹 멤버 뉴스도 개별 카드로 함께 노출한다(그룹 카드 + 개별 카드 양쪽 등장).
export function buildFeed(NEWS: NewsItem[], NEWS_GROUPS: NewsGroup[]): FeedEntry[] {
  const groupEntries: FeedEntry[] = getAllGroups(NEWS, NEWS_GROUPS).map((group) => ({
    kind: 'group',
    group,
    latestAt: group.latestAt,
  }))
  const singleEntries: FeedEntry[] = NEWS.map((news) => ({
    kind: 'single',
    news,
    latestAt: news.publishedAt,
  }))
  return [...groupEntries, ...singleEntries].sort(
    (a, b) => +new Date(b.latestAt) - +new Date(a.latestAt),
  )
}
