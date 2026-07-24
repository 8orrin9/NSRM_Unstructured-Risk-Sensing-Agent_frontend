'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { fetchNews, fetchNewsGroups, fetchEntities } from '@/lib/api-client'
import { buildFeed } from '@/lib/feed'
import { severityClasses, SEVERITY_META, SEVERITY_HEX } from '@/lib/risk-config'
import type { EntityType, FeedEntry, NewsItem, NewsGroup, ResolvedGroup, Severity, SupplyEntity } from '@/lib/types'
import { SeverityBadge, CategoryBadge } from '@/components/risk-badges'
import { NewsPanel } from '@/components/explorer/news-panel'
import { NewsOverlay } from '@/components/news-overlay'
import { formatDateTime } from '@/lib/format'
import { fetchNewsById } from '@/lib/api-client'
import { cn } from '@/lib/utils'
import {
  Globe2,
  Search,
  Building2,
  Factory,
  Boxes,
  Newspaper,
  Layers,
  ChevronDown,
  Eye,
  ArrowRight,
  CalendarDays,
  X,
} from 'lucide-react'

const RiskMap = dynamic(() => import('@/components/explorer/risk-map'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-muted/40">
      <span className="text-sm text-muted-foreground">지도를 불러오는 중…</span>
    </div>
  ),
})

const SEVERITIES: Severity[] = ['high', 'medium', 'low']

function isoDate(iso: string) {
  return iso.slice(0, 10)
}

const TYPE_META: Record<EntityType, { ko: string; icon: typeof Building2 }> = {
  supplier: { ko: '공급사', icon: Building2 },
  site: { ko: '자사 생산지', icon: Factory },
  material: { ko: '원자재', icon: Boxes },
}

// ─── View modes ───────────────────────────────────────────────────────────────
type LeftMode = 'news' | 'entities'

export function RiskExplorer() {
  const params = useSearchParams()
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null) // 지도 하이라이트 전용
  const [panelEntityId, setPanelEntityId] = useState<string | null>(null) // 하단 상세 패널 open 전용
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null)
  const [leftMode, setLeftMode] = useState<LeftMode>('news')

  // API 데이터 상태
  const [NEWS, setNEWS] = useState<NewsItem[]>([])
  const [NEWS_GROUPS, setNEWS_GROUPS] = useState<NewsGroup[]>([])
  const [ENTITIES, setENTITIES] = useState<SupplyEntity[]>([])
  const [loading, setLoading] = useState(true)

  // News list state
  const [newsQuery, setNewsQuery] = useState('')
  const [newsSevFilter, setNewsSevFilter] = useState<Severity | 'all'>('all')
  const [newsDateFrom, setNewsDateFrom] = useState('')
  const [newsDateTo, setNewsDateTo] = useState('')
  const [openEntryId, setOpenEntryId] = useState<string | null>(null)
  const [showMoreGroups, setShowMoreGroups] = useState(false)
  const [showMoreNews, setShowMoreNews] = useState(false)

  // Entity list state
  const [entityQuery, setEntityQuery] = useState('')

  // News overlay state
  const [overlayNews, setOverlayNews] = useState<NewsItem | null>(null)

  // API 데이터 로드
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [newsData, groupsData, entities] = await Promise.all([
          fetchNews({ limit: 250 }), // 그룹 멤버 뉴스를 모두 포함하기 위해 증가
          fetchNewsGroups(),
          fetchEntities(),
        ])
        setNEWS(newsData)
        setNEWS_GROUPS(groupsData)
        setENTITIES(entities)
        console.log('[RiskExplorer] Loaded:', newsData.length, 'news,', entities.length, 'entities')
        console.log('[RiskExplorer] Sample news relatedEntityIds:', newsData.slice(0, 3).map(n => ({ id: n.id, entities: n.relatedEntityIds })))
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const e = params.get('entity')
    if (e) {
      // 딥링크 진입 시 지도 하이라이트만 (패널은 지도 마커 클릭으로 오픈)
      setSelectedEntityId(e)
      setLeftMode('entities')
    }
  }, [params])

  // 관련 거점이 1개 이상인 뉴스만 필터링 (심각도 무관)
  const relevantNews = useMemo(() => {
    return NEWS.filter(n => n.relatedEntityIds.length > 0)
  }, [NEWS])

  // When a news is selected: compute related entity ids for highlight
  const selectedNews = useMemo(
    () => (selectedNewsId ? relevantNews.find((n) => n.id === selectedNewsId) ?? null : null),
    [selectedNewsId, relevantNews],
  )
  const highlightedEntityIds = useMemo(() => {
    const ids = selectedNews?.relatedEntityIds ?? []
    console.log('[RiskExplorer] Selected news:', selectedNews?.id, 'Related entities:', ids)
    return ids
  }, [selectedNews])

  // Build feed and separate groups from individual news (관련 거점 있는 뉴스)
  const { groups, ungroupedNews } = useMemo(() => {
    if (relevantNews.length === 0 || NEWS_GROUPS.length === 0) {
      return { groups: [], ungroupedNews: relevantNews }
    }
    const feed = buildFeed(relevantNews, NEWS_GROUPS)
    const groups: ResolvedGroup[] = []
    const ungroupedNews: NewsItem[] = []

    feed.forEach((entry) => {
      if (entry.kind === 'group') {
        // 관련 거점이 있는 그룹만 (심각도 무관)
        if (entry.group.relatedEntityIds.length > 0) {
          groups.push(entry.group)
        }
      } else {
        ungroupedNews.push(entry.news)
      }
    })

    return { groups, ungroupedNews }
  }, [relevantNews, NEWS_GROUPS])

  // Filtered groups and news with date filter
  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      // Date range filter (그룹은 최신 활동 시각 기준)
      if (newsDateFrom && isoDate(group.latestAt) < newsDateFrom) return false
      if (newsDateTo && isoDate(group.latestAt) > newsDateTo) return false

      if (newsSevFilter !== 'all' && group.severity !== newsSevFilter) return false
      if (!newsQuery) return true
      const q = newsQuery.toLowerCase()
      return (
        group.title.toLowerCase().includes(q) ||
        group.rationale.toLowerCase().includes(q)
      )
    })
  }, [groups, newsQuery, newsSevFilter, newsDateFrom, newsDateTo])

  const filteredNews = useMemo(() => {
    return ungroupedNews.filter((n) => {
      // Date range filter
      if (newsDateFrom && isoDate(n.publishedAt) < newsDateFrom) return false
      if (newsDateTo && isoDate(n.publishedAt) > newsDateTo) return false

      if (newsSevFilter !== 'all' && n.severity !== newsSevFilter) return false
      if (!newsQuery) return true
      const q = newsQuery.toLowerCase()
      return (
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.keywords.some((k) => k.toLowerCase().includes(q))
      )
    }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }, [ungroupedNews, newsQuery, newsSevFilter, newsDateFrom, newsDateTo])

  // 관련 뉴스가 있는 entities만 필터링 (심각도 무관)
  const relevantEntities = useMemo(() => {
    const relevantEntityIds = new Set<string>()
    relevantNews.forEach(news => {
      news.relatedEntityIds.forEach(id => relevantEntityIds.add(id))
    })
    return ENTITIES.filter(e => relevantEntityIds.has(e.id))
  }, [ENTITIES, relevantNews])

  // Pagination
  const displayedGroups = showMoreGroups ? filteredGroups : filteredGroups.slice(0, 5)
  const displayedNews = showMoreNews ? filteredNews : filteredNews.slice(0, 10)

  // 각 거점의 관련 뉴스 최고 심각도 + 건수 (지도 마커 색과 동일 기준)
  const entitiesWithSeverity = useMemo(() => {
    return relevantEntities.map((entity) => {
      const related = relevantNews.filter((n) => n.relatedEntityIds.includes(entity.id))
      const maxSeverity = related.reduce<Severity>(
        (acc, n) => (SEVERITY_META[n.severity].order < SEVERITY_META[acc].order ? n.severity : acc),
        'low',
      )
      return { ...entity, maxSeverity, newsCount: related.length }
    })
  }, [relevantEntities, relevantNews])

  // Filtered entities (검색만 적용)
  const filteredEntities = useMemo(() => {
    return entitiesWithSeverity.filter(
      (e) =>
        entityQuery === '' ||
        e.nameKo.includes(entityQuery) ||
        e.name.toLowerCase().includes(entityQuery.toLowerCase()) ||
        e.country.toLowerCase().includes(entityQuery.toLowerCase()),
    )
  }, [entitiesWithSeverity, entityQuery])

  function selectNews(id: string) {
    // Toggle selection and highlight related entities on map
    setSelectedNewsId((prev) => (prev === id ? null : id))
    setSelectedEntityId(null)
  }

  async function openNewsOverlay(id: string) {
    // Fetch full news data and open overlay
    try {
      const fullNews = await fetchNewsById(id)
      setOverlayNews(fullNews)
      setSelectedNewsId(id)
    } catch (error) {
      console.error('Failed to fetch news:', error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-primary">
          <Globe2 className="size-4" />
          <span className="text-xs font-semibold uppercase tracking-wide">Explorer MAP</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">Daily News 관련 생산지 · 공급사 탐색</h1>
        <p className="text-sm text-muted-foreground">
          Daily News에서 도출된 생산지·공급사를 지도에서 탐색합니다. 뉴스를 선택하면 관련 생산지가 강조되고, 지도에서 생산지를 클릭하면 관련 뉴스를 확인할 수 있습니다.
        </p>
      </div>

      {/* Main: left panel + right map */}
      <div className="grid gap-4 lg:grid-cols-[440px_1fr]">
        {/* ── Left panel ── */}
        <div className="flex h-[600px] flex-col overflow-hidden rounded-xl border border-border bg-card">
          {/* Mode tabs */}
          <div className="flex items-center gap-0 border-b border-border">
            <button
              onClick={() => setLeftMode('news')}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors',
                leftMode === 'news'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Newspaper className="size-3.5" />
              뉴스 목록
            </button>
            <button
              onClick={() => setLeftMode('entities')}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors',
                leftMode === 'entities'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Layers className="size-3.5" />
              생산지 / 공급사
            </button>
          </div>

          {/* News panel */}
          {leftMode === 'news' && (
            <>
              <div className="flex flex-col gap-2 border-b border-border p-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={newsQuery}
                    onChange={(e) => setNewsQuery(e.target.value)}
                    placeholder="뉴스 검색…"
                    className="w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <select
                    value={newsSevFilter}
                    onChange={(e) => setNewsSevFilter(e.target.value as Severity | 'all')}
                    className="shrink-0 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-primary"
                  >
                    <option value="all">전체</option>
                    {SEVERITIES.map((s) => (
                      <option key={s} value={s}>{SEVERITY_META[s].en}</option>
                    ))}
                  </select>
                  <CalendarDays className="size-3.5 shrink-0" />
                  <input
                    type="date"
                    value={newsDateFrom}
                    onChange={(e) => setNewsDateFrom(e.target.value)}
                    className="min-w-0 flex-1 rounded border border-border bg-background px-1.5 py-1 text-xs text-foreground outline-none focus:border-primary"
                  />
                  <span className="shrink-0">~</span>
                  <input
                    type="date"
                    value={newsDateTo}
                    onChange={(e) => setNewsDateTo(e.target.value)}
                    className="min-w-0 flex-1 rounded border border-border bg-background px-1.5 py-1 text-xs text-foreground outline-none focus:border-primary"
                  />
                  {(newsDateFrom || newsDateTo) && (
                    <button
                      onClick={() => { setNewsDateFrom(''); setNewsDateTo('') }}
                      className="shrink-0 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>
                {selectedNewsId && (
                  <div className="flex items-center gap-2 rounded-md bg-primary/10 px-2.5 py-1.5 text-xs text-primary">
                    <span className="size-1.5 rounded-full bg-primary" />
                    뉴스 선택됨 — 지도에서 관련 생산지 {highlightedEntityIds.length}개 강조 중
                    <button onClick={() => setSelectedNewsId(null)} className="ml-auto font-semibold hover:opacity-70">
                      해제
                    </button>
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-y-auto">
                {/* Groups first */}
                {displayedGroups.map((group) => {
                  const entryId = `group-${group.id}`
                  const expanded = openEntryId === entryId
                  return (
                    <ExplorerGroupItem
                      key={entryId}
                      group={group}
                      entities={ENTITIES}
                      expanded={expanded}
                      onExpand={() => setOpenEntryId(expanded ? null : entryId)}
                      onSelectNews={selectNews}
                      onOpenNewsOverlay={openNewsOverlay}
                    />
                  )
                })}
                {!showMoreGroups && filteredGroups.length > 5 && (
                  <button
                    onClick={() => setShowMoreGroups(true)}
                    className="w-full border-b border-border bg-muted/20 py-2 text-xs text-muted-foreground hover:bg-muted/40"
                  >
                    그룹 {filteredGroups.length - 5}개 더보기
                  </button>
                )}
                {/* Individual news */}
                {displayedNews.map((n) => {
                  const entryId = `news-${n.id}`
                  return (
                    <ExplorerNewsItem
                      key={entryId}
                      news={n}
                      selected={selectedNewsId === n.id}
                      onSelect={() => selectNews(n.id)}
                      onOpenOverlay={() => openNewsOverlay(n.id)}
                    />
                  )
                })}
                {!showMoreNews && filteredNews.length > 10 && (
                  <button
                    onClick={() => setShowMoreNews(true)}
                    className="w-full border-b border-border bg-muted/20 py-2 text-xs text-muted-foreground hover:bg-muted/40"
                  >
                    뉴스 {filteredNews.length - 10}개 더보기
                  </button>
                )}
                {filteredGroups.length === 0 && filteredNews.length === 0 && (
                  <p className="p-6 text-center text-sm text-muted-foreground">검색 결과가 없습니다.</p>
                )}
              </div>
            </>
          )}

          {/* Entities panel */}
          {leftMode === 'entities' && (
            <>
              <div className="flex flex-col gap-2 border-b border-border p-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={entityQuery}
                    onChange={(e) => setEntityQuery(e.target.value)}
                    placeholder="생산지·공급사·국가 검색"
                    className="w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 z-10 bg-muted/80 backdrop-blur">
                    <tr className="text-left text-[10px] text-muted-foreground">
                      <th className="px-3 py-2 font-medium">생산지 / 공급사</th>
                      <th className="px-3 py-2 font-medium">상태</th>
                      <th className="px-3 py-2 text-right font-medium">관련 뉴스</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntities.map((e) => {
                      const TypeIcon = TYPE_META[e.type].icon
                      const active = selectedEntityId === e.id
                      return (
                        <tr
                          key={e.id}
                          onClick={() => {
                            // 좌측 리스트 클릭 → 지도 하이라이트만 (패널은 지도 마커 클릭으로)
                            setSelectedEntityId(e.id)
                            setSelectedNewsId(null)
                          }}
                          className={cn(
                            'cursor-pointer border-b border-border transition-colors hover:bg-muted/50',
                            active && 'bg-accent',
                          )}
                        >
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-secondary text-secondary-foreground">
                                <TypeIcon className="size-3" />
                              </span>
                              <div className="flex flex-col">
                                <span className="text-xs font-medium text-foreground">{e.nameKo}</span>
                                <span className="text-[10px] text-muted-foreground">{e.country}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            {/* 상태 = 관련 뉴스 최고 심각도 (지도 마커 색과 동일 기준) */}
                            <SeverityBadge severity={e.maxSeverity} format="en" />
                          </td>
                          <td className="px-3 py-2 text-right">
                            <span className="text-xs font-semibold tabular-nums text-foreground">{e.newsCount}건</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {filteredEntities.length === 0 && (
                  <p className="p-6 text-center text-sm text-muted-foreground">검색 결과가 없습니다.</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── Right: Map ── */}
        <div className="relative isolate h-[420px] overflow-hidden rounded-xl border border-border lg:h-[600px]">
          <RiskMap
            entities={relevantEntities}
            allNews={relevantNews}
            selectedId={selectedEntityId}
            highlightedIds={highlightedEntityIds.length > 0 ? highlightedEntityIds : undefined}
            onSelect={(id) => {
              // 지도 마커 클릭 → 하이라이트 + 하단 상세 패널 오픈
              setSelectedEntityId(id)
              setPanelEntityId(id)
              setSelectedNewsId(null)
            }}
          />
          {/* Legend — 관련 뉴스 최고 심각도 기준 (지도 원 색 = 좌측 상태 색) */}
          <div className="pointer-events-none absolute bottom-3 left-3 z-[400] flex flex-col gap-1.5 rounded-lg border border-border bg-card/95 p-2.5 text-xs shadow-sm backdrop-blur">
            <span className="font-semibold text-foreground">AI 리스크 평가도</span>
            {SEVERITIES.map((s) => (
              <span key={s} className={cn('flex items-center gap-1.5 text-muted-foreground')}>
                <span className="size-2 rounded-full" style={{ background: SEVERITY_HEX[s] }} />
                {SEVERITY_META[s].ko}
              </span>
            ))}
          </div>
          {/* News highlight hint */}
          {highlightedEntityIds.length > 0 && (
            <div className="pointer-events-none absolute right-3 top-3 z-[400] flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary backdrop-blur">
              <span className="size-1.5 rounded-full bg-primary" />
              관련 생산지 {highlightedEntityIds.length}개 강조 중
            </div>
          )}
        </div>
      </div>

      {/* Entity detail slide-over — 지도 마커 클릭 시 open (panelEntityId 기준) */}
      <NewsPanel
        entityId={panelEntityId}
        entity={panelEntityId ? ENTITIES.find(e => e.id === panelEntityId) || null : null}
        allEntities={ENTITIES}
        onClose={() => setPanelEntityId(null)}
        onOpenNews={(news) => setOverlayNews(news)}
      />

      {/* News overlay */}
      <NewsOverlay
        news={overlayNews}
        onClose={() => {
          setOverlayNews(null)
          setSelectedNewsId(null)
        }}
      />
    </div>
  )
}

// ─── ExplorerNewsItem ──────────────────────────────────────────────────────────

function ExplorerNewsItem({
  news,
  selected,
  onSelect,
  onOpenOverlay,
}: {
  news: NewsItem
  selected: boolean
  onSelect: () => void
  onOpenOverlay: () => void
}) {
  const c = severityClasses(news.severity)
  return (
    <div
      className={cn(
        'border-b border-border transition-colors',
        selected && 'bg-primary/5',
      )}
    >
      {/* Row: click to select (map highlight) */}
      <div
        onClick={onSelect}
        className={cn(
          'flex w-full cursor-pointer items-start gap-2.5 px-3 py-2.5 hover:bg-muted/40',
          selected && 'bg-primary/5',
        )}
      >
        <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', c.dot)} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <CategoryBadge category={news.category} />
            <span className="text-[10px] text-muted-foreground">{formatDateTime(news.publishedAt)}</span>
            <SeverityBadge severity={news.severity} format="en" className="ml-auto shrink-0" />
          </div>
          <h4 className="text-pretty text-xs font-semibold leading-snug text-foreground">{news.title}</h4>
          {news.relatedEntityIds.length > 0 && (
            <span className="text-[10px] text-primary">
              관련 생산지 {news.relatedEntityIds.length}개
            </span>
          )}
          {/* Detail overlay button — 우측 하단 화살표 */}
          <button
            onClick={(e) => { e.stopPropagation(); onOpenOverlay() }}
            className="mt-1 ml-auto grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:text-primary"
            title="자세히 보기"
          >
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── ExplorerGroupItem ────────────────────────────────────────────────────────

function ExplorerGroupItem({
  group,
  entities,
  expanded,
  onExpand,
  onSelectNews,
  onOpenNewsOverlay,
}: {
  group: ResolvedGroup
  entities: SupplyEntity[]
  expanded: boolean
  onExpand: () => void
  onSelectNews: (newsId: string) => void
  onOpenNewsOverlay: (newsId: string) => void
}) {
  return (
    <div className="border-b border-border bg-muted/30 transition-colors">
      {/* Group header - Reporting style */}
      <div
        onClick={onExpand}
        className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 hover:bg-muted/50"
      >
        <button
          className="flex min-w-0 flex-1 flex-col gap-1.5 text-left"
        >
          <span className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground whitespace-nowrap">
              <Layers className="size-2.5" />
              그룹 {group.items.length}건
            </span>
            <CategoryBadge category={group.category} />
            <SeverityBadge severity={group.severity} format="en" />
          </span>
          <span className="text-xs font-semibold leading-snug text-foreground">{group.title}</span>
        </button>
        <ChevronDown className={cn('size-3.5 shrink-0 text-muted-foreground transition-transform', expanded && 'rotate-180')} />
      </div>

      {/* Expanded: group members */}
      {expanded && (
        <div className="border-t border-border bg-muted/20 px-3 py-2.5">
          <p className="mb-2 text-xs leading-relaxed text-muted-foreground">{group.rationale}</p>
          <div className="flex flex-col gap-1">
            {group.items.map((news) => (
              <div
                key={news.id}
                onClick={() => onSelectNews(news.id)}
                className="flex items-start gap-2 rounded border border-border bg-card px-2 py-1.5 cursor-pointer transition-colors hover:bg-muted/50"
              >
                <span className={cn('mt-1 size-1.5 shrink-0 rounded-full', severityClasses(news.severity).dot)} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground line-clamp-2">{news.title}</p>
                  <span className="text-[10px] text-muted-foreground">{formatDateTime(news.publishedAt)}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onOpenNewsOverlay(news.id) }}
                  className="grid size-5 shrink-0 place-items-center rounded text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  title="상세보기"
                >
                  <Eye className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

