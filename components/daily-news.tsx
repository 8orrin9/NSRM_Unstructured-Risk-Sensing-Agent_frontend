'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchNews, fetchNewsGroups, fetchNewsStats, fetchEntities } from '@/lib/api-client'
import { buildFeed } from '@/lib/feed'
import { RISK_CATEGORIES, RISK_FACTORS, SEVERITY_META, CATEGORY_COLORS, severityClasses } from '@/lib/risk-config'
import { severityToKorean } from '@/lib/severity'
import type { FeedEntry, NewsItem, RiskCategory, RiskFactor, ResolvedGroup, Severity, NewsGroup, SupplyEntity } from '@/lib/types'
import { formatDate, formatTime } from '@/lib/format'
import { SeverityBadge, CategoryBadge } from '@/components/risk-badges'
import { NewsOverlay } from '@/components/news-overlay'
import { cn } from '@/lib/utils'
import {
  ChevronDown,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Building2,
  ArrowRight,
  Layers,
  Link2,
  X,
  Search,
  CalendarDays,
} from 'lucide-react'

const SEVERITIES: Severity[] = ['critical', 'high', 'medium', 'low']
const PAGE_SIZE = 5
const GROUP_INITIAL = 6 // Risk Groups 초기 노출 수
const GROUP_STEP = 3 // 더보기 클릭당 추가 노출 수

// ─── helpers ──────────────────────────────────────────────────────────────────

function newsForFactor(factor: RiskFactor, NEWS: NewsItem[]): NewsItem[] {
  const cats = RISK_FACTORS[factor].categories as RiskCategory[]
  return NEWS.filter((n) => cats.includes(n.category))
}

function isoDate(iso: string) {
  return iso.slice(0, 10)
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function DailyNews() {
  // API 데이터 상태
  const [NEWS, setNEWS] = useState<NewsItem[]>([])
  const [NEWS_GROUPS, setNEWS_GROUPS] = useState<NewsGroup[]>([])
  const [ENTITIES, setENTITIES] = useState<SupplyEntity[]>([])
  const [loading, setLoading] = useState(true)

  // API 데이터 로드
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [allNewsData, groupsData, entitiesData] = await Promise.all([
          fetchNews({ limit: 250 }), // 전체 활성 뉴스 (Risk Groups + Factor Monitor + Individual 공용)
          fetchNewsGroups(),
          fetchEntities(),
        ])
        setNEWS(allNewsData)
        setNEWS_GROUPS(groupsData)
        setENTITIES(entitiesData)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Slide overlay state
  const [overlayNews, setOverlayNews] = useState<NewsItem | null>(null)

  // Risk Factor section state — 행 단위 접기/펼치기 (기본 모두 펼침)
  const [collapsedFactorRows, setCollapsedFactorRows] = useState<Set<number>>(new Set<number>())
  // 반응형 그리드 컬럼 수 추적 (sm:2 / lg:3, 기본 3)
  const [factorCols, setFactorCols] = useState(3)
  useEffect(() => {
    const smQuery = window.matchMedia('(min-width: 640px)')
    const lgQuery = window.matchMedia('(min-width: 1024px)')
    const update = () => setFactorCols(lgQuery.matches ? 3 : smQuery.matches ? 2 : 1)
    update()
    smQuery.addEventListener('change', update)
    lgQuery.addEventListener('change', update)
    return () => {
      smQuery.removeEventListener('change', update)
      lgQuery.removeEventListener('change', update)
    }
  }, [])
  const [factorDateFrom, setFactorDateFrom] = useState('')
  const [factorDateTo, setFactorDateTo] = useState('')

  // Risk Group section state — 행 단위 접기/펼치기 (기본 모두 접힘)
  const [openRows, setOpenRows] = useState<Set<number>>(new Set<number>())
  // Risk Group 더보기 — 노출 개수 (기본 GROUP_INITIAL, 더보기 클릭 시 GROUP_STEP씩 증가)
  const [groupVisible, setGroupVisible] = useState(GROUP_INITIAL)
  // 반응형 그리드 컬럼 수 추적 (md:2 / lg:3, 기본 3)
  const [groupCols, setGroupCols] = useState(3)
  useEffect(() => {
    const mdQuery = window.matchMedia('(min-width: 768px)')
    const lgQuery = window.matchMedia('(min-width: 1024px)')
    const update = () => setGroupCols(lgQuery.matches ? 3 : mdQuery.matches ? 2 : 1)
    update()
    mdQuery.addEventListener('change', update)
    lgQuery.addEventListener('change', update)
    return () => {
      mdQuery.removeEventListener('change', update)
      lgQuery.removeEventListener('change', update)
    }
  }, [])

  // Individual News section state
  const [indivPage, setIndivPage] = useState(1)
  const [indivQuery, setIndivQuery] = useState('')
  const [indivDateFrom, setIndivDateFrom] = useState('')
  const [indivDateTo, setIndivDateTo] = useState('')
  const [sevFilter, setSevFilter] = useState<Severity | 'all'>('all')
  const [catFilter, setCatFilter] = useState<RiskCategory | 'all'>('all')

  function resetPage() {
    setIndivPage(1)
  }

  function toggleFactorRow(rowIndex: number) {
    setCollapsedFactorRows((prev) => {
      const next = new Set(prev)
      next.has(rowIndex) ? next.delete(rowIndex) : next.add(rowIndex)
      return next
    })
  }

  function toggleRow(rowIndex: number) {
    setOpenRows((prev) => {
      const next = new Set(prev)
      next.has(rowIndex) ? next.delete(rowIndex) : next.add(rowIndex)
      return next
    })
  }

  const today = NEWS.length > 0 && NEWS[0]?.publishedAt ? NEWS[0].publishedAt : new Date().toISOString()

  const sevCounts = useMemo(() => {
    const c: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 }
    NEWS.forEach((n) => (c[n.severity] += 1))
    return c
  }, [NEWS])

  const highlights = useMemo(
    () =>
      [...NEWS]
        .sort((a, b) => b.impactScore - a.impactScore)
        .slice(0, 3),
    [NEWS],
  )

  const feed = useMemo(() => {
    if (NEWS.length === 0 || NEWS_GROUPS.length === 0) return []
    return buildFeed(NEWS, NEWS_GROUPS)
  }, [NEWS, NEWS_GROUPS])

  function filteredFactorNews(factor: RiskFactor): NewsItem[] {
    // Risk Factor Monitor는 전체 뉴스를 사용 (국내 한정 해제)
    let items = newsForFactor(factor, NEWS)
    // 상단 심각도 필터를 Risk Factor Monitor에도 적용
    if (sevFilter !== 'all') items = items.filter((n) => n.severity === sevFilter)
    if (factorDateFrom) items = items.filter((n) => isoDate(n.publishedAt) >= factorDateFrom)
    if (factorDateTo) items = items.filter((n) => isoDate(n.publishedAt) <= factorDateTo)
    return items.sort((a, b) => b.impactScore - a.impactScore)
  }

  // 그룹 표시 결정(건수 필터·중복 병합)은 백엔드가 수행하고 DB(SERVING_GROUP_DISPLAY)에
  // 반영한다. 프론트는 서빙된 그룹을 그대로 렌더.
  const allGroups = useMemo(
    () => feed.filter((e): e is Extract<FeedEntry, { kind: 'group' }> => e.kind === 'group'),
    [feed],
  )

  const allIndividuals = useMemo(() => {
    // Individual News는 리스크로 판정된 뉴스(isRisk=true)만 노출.
    // (Risk Factor Monitor는 isRisk 무관하게 전량 노출 — filteredFactorNews 참고)
    let items = NEWS.filter((n) => n.isRisk)
    if (sevFilter !== 'all') items = items.filter((n) => n.severity === sevFilter)
    if (catFilter !== 'all') items = items.filter((n) => n.category === catFilter)
    if (indivQuery) {
      const q = indivQuery.toLowerCase()
      items = items.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.keywords.some((k) => k.toLowerCase().includes(q)),
      )
    }

    // 날짜 필터는 사용자가 명시적으로 지정할 때만 적용 (기본은 전체 노출)
    if (indivDateFrom) items = items.filter((n) => isoDate(n.publishedAt) >= indivDateFrom)
    if (indivDateTo) items = items.filter((n) => isoDate(n.publishedAt) <= indivDateTo)

    return items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }, [sevFilter, catFilter, indivQuery, indivDateFrom, indivDateTo, NEWS])

  return (
    <div className="flex flex-col gap-6">
      {/* ── Collection header ── */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Smart Daily News</span>
            </div>
            <h1 className="text-balance text-xl font-bold tracking-tight text-foreground md:text-2xl">
              스마트 데일리 뉴스
            </h1>
            <p className="text-sm text-muted-foreground">
              {formatDate(today)} · 지난 24시간 동안 수집·분석된 공급망 관련 뉴스
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
          <span className="text-xs text-muted-foreground">수집된 뉴스의 리스크 분석 결과 통계</span>
          <span className="text-xs text-muted-foreground">
            총 수집 <span className="font-bold tabular-nums text-foreground">{NEWS.length}</span>건
          </span>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border border-border sm:grid-cols-4">
          {SEVERITIES.map((s) => {
            const c = severityClasses(s)
            return (
              <button
                key={s}
                onClick={() => setSevFilter(sevFilter === s ? 'all' : s)}
                className={cn(
                  'flex items-center justify-between gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/60',
                  sevFilter === s && 'bg-muted',
                )}
              >
                <span className="flex items-center gap-2">
                  <span className={cn('size-2 rounded-full', c.dot)} />
                  <span className="text-xs font-medium text-muted-foreground">{SEVERITY_META[s].en}</span>
                </span>
                <span className={cn('text-lg font-bold tabular-nums', c.text)}>{sevCounts[s]}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Risk Factor Monitor — white card panel ── */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <section className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-xl font-bold tracking-tight text-foreground">Smart Daily News</h2>
              <span className="text-sm text-muted-foreground">대분류별 뉴스</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5" />
              <span>기간:</span>
              <input
                type="date"
                value={factorDateFrom}
                onChange={(e) => setFactorDateFrom(e.target.value)}
                className="rounded border border-border bg-card px-2 py-1 text-xs text-foreground outline-none focus:border-primary"
              />
              <span>~</span>
              <input
                type="date"
                value={factorDateTo}
                onChange={(e) => setFactorDateTo(e.target.value)}
                className="rounded border border-border bg-card px-2 py-1 text-xs text-foreground outline-none focus:border-primary"
              />
              {(factorDateFrom || factorDateTo) && (
                <button
                  onClick={() => { setFactorDateFrom(''); setFactorDateTo('') }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(RISK_FACTORS) as RiskFactor[]).map((factor, idx) => {
              const meta = RISK_FACTORS[factor]
              const items = filteredFactorNews(factor)
              const rowIndex = Math.floor(idx / factorCols)
              const open = !collapsedFactorRows.has(rowIndex)
              const topSeverity = items.reduce<Severity | null>((best, n) => {
                if (!best) return n.severity
                const order: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 }
                return order[n.severity] < order[best] ? n.severity : best
              }, null)
              return (
                <FactorCard
                  key={factor}
                  factor={factor}
                  meta={meta}
                  items={items}
                  topSeverity={topSeverity}
                  open={open}
                  onToggle={() => toggleFactorRow(rowIndex)}
                  onOpenOverlay={setOverlayNews}
                />
              )
            })}
          </div>
        </section>
      </div>

      {/* ══ Core Insights — light sky-blue container ══ */}
      <div className="rounded-2xl bg-insight-bg px-6 py-8 flex flex-col gap-8">

        {/* Section label */}
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-insight-border" />
          <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-white/70 px-3 py-1 shadow-sm">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">AI Risk Core Insights</span>
          </div>
          <span className="h-px flex-1 bg-insight-border" />
        </div>

        {/* ── Risk Groups ── */}
        {allGroups.length > 0 && (
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5 border-l-4 border-primary pl-4">
              <h2 className="text-xl font-bold tracking-tight text-primary">
                AI 핵심 인사이트 <span className="text-foreground">- 공급망 리스크</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                뉴스 간 관계성 분석 기반으로 도출된 리스크 그룹으로, 개별 뉴스만으로는 파악이 불가한 인사이트를 AI가 분석하여 제공합니다
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allGroups.slice(0, groupVisible).map((entry, idx) => {
                const rowIndex = Math.floor(idx / groupCols)
                return (
                  <GroupCard
                    key={entry.group.id}
                    group={entry.group}
                    index={idx}
                    entities={ENTITIES}
                    open={openRows.has(rowIndex)}
                    onToggle={() => toggleRow(rowIndex)}
                    onOpenOverlay={setOverlayNews}
                  />
                )
              })}
            </div>
            {allGroups.length > groupVisible && (
              <button
                onClick={() => setGroupVisible((v) => v + GROUP_STEP)}
                className="mx-auto flex items-center gap-1.5 rounded-full border border-insight-border bg-insight-bg px-4 py-1.5 text-xs font-medium text-insight-muted transition-colors hover:border-primary hover:text-primary"
              >
                더보기 ({allGroups.length - groupVisible}개 남음)
              </button>
            )}
          </section>
        )}

        {/* ── Risk Highlights ── */}
        {/* 임시 비활성화 */}
        {false && (
          <section className="flex flex-col gap-4">
            <div className="flex flex-wrap items-baseline gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-sm">
                  <TrendingUp className="size-4 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">리스크 하이라이트</h2>
              </div>
              <span className="text-sm text-muted-foreground">Top Risks</span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {highlights.map((n) => {
                const c = severityClasses(n.severity)
                return (
                  <article
                    key={n.id}
                    className={cn('group cursor-pointer flex flex-col gap-3 rounded-xl border bg-insight-card p-4 transition-all hover:brightness-110 hover:border-primary/50 hover:shadow-md', c.border + '/40')}
                    onClick={() => setOverlayNews(n)}
                  >
                    <div className="flex items-center justify-between">
                      <SeverityBadge severity={n.severity} />
                      <span className="text-xs text-insight-muted">{formatTime(n.publishedAt)}</span>
                    </div>
                    <h3 className="text-pretty text-sm font-semibold leading-snug text-insight-card-foreground">{n.title}</h3>
                    <p className="line-clamp-3 text-xs leading-relaxed text-insight-muted">{n.summary}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-insight-border pt-3">
                      <span className="text-xs font-medium text-insight-muted">{n.source}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-insight-muted">영향도</span>
                        <span className={cn('text-sm font-bold tabular-nums', c.text)}>{n.impactScore}</span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Individual News (PAGE_SIZE + load more) ── */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Individual News</h2>
            <span className="text-sm text-muted-foreground">{allIndividuals.length}건</span>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-insight-border bg-insight-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-md border border-insight-border bg-insight-bg px-2.5 py-1.5 focus-within:border-primary">
                <Search className="size-3.5 shrink-0 text-insight-muted" />
                <input
                  value={indivQuery}
                  onChange={(e) => { setIndivQuery(e.target.value); resetPage() }}
                  placeholder="키워드 검색…"
                  className="w-full bg-transparent text-xs outline-none text-insight-card-foreground placeholder:text-insight-muted"
                />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-insight-muted">
                <CalendarDays className="size-3.5" />
                <input
                  type="date"
                  value={indivDateFrom}
                  onChange={(e) => { setIndivDateFrom(e.target.value); resetPage() }}
                  className="rounded border border-insight-border bg-insight-bg px-2 py-1 text-xs text-insight-card-foreground outline-none focus:border-primary"
                />
                <span>~</span>
                <input
                  type="date"
                  value={indivDateTo}
                  onChange={(e) => { setIndivDateTo(e.target.value); resetPage() }}
                  className="rounded border border-insight-border bg-insight-bg px-2 py-1 text-xs text-insight-card-foreground outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => { setCatFilter('all'); resetPage() }}
                className={cn('rounded-full border px-3 py-1 text-xs font-medium transition-colors', catFilter === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'border-insight-border bg-insight-bg text-insight-muted hover:text-insight-card-foreground')}
              >
                전체
              </button>
              {(Object.keys(RISK_CATEGORIES) as RiskCategory[]).map((cat) => {
                const count = NEWS.filter((n) => n.category === cat).length
                if (!count) return null
                return (
                  <button
                    key={cat}
                    onClick={() => { setCatFilter(catFilter === cat ? 'all' : cat); resetPage() }}
                    className={cn('rounded-full border px-3 py-1 text-xs font-medium transition-colors', catFilter === cat ? 'border-primary bg-primary text-primary-foreground' : 'border-insight-border bg-insight-bg text-insight-muted hover:text-insight-card-foreground')}
                  >
                    {RISK_CATEGORIES[cat].ko}
                    <span className="ml-1 opacity-60">{count}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col gap-2.5">
              {allIndividuals.length === 0 && (
                <p className="rounded-lg border border-dashed border-insight-border p-6 text-center text-sm text-insight-muted">해당하는 뉴스가 없습니다.</p>
              )}
              {allIndividuals.slice(0, PAGE_SIZE * indivPage).map((n) => (
                <NewsCard
                  key={n.id}
                  news={n}
                  onOpen={() => setOverlayNews(n)}
                />
              ))}
            </div>

            {allIndividuals.length > PAGE_SIZE * indivPage && (
              <button
                onClick={() => setIndivPage((p) => p + 1)}
                className="mx-auto flex items-center gap-1.5 rounded-full border border-insight-border bg-insight-bg px-4 py-1.5 text-xs font-medium text-insight-muted transition-colors hover:border-primary hover:text-primary"
              >
                더보기 ({allIndividuals.length - PAGE_SIZE * indivPage}건 남음)
              </button>
            )}
          </div>
        </section>

      </div>{/* end Core Insights navy container */}

      {/* ── News Detail Slide Overlay ── */}
      <NewsOverlay
        news={overlayNews}
        onClose={() => setOverlayNews(null)}
      />
    </div>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────

// ─── FactorCard ────────────────────────────────────────────────────────────────

function FactorCard({
  factor,
  meta,
  items,
  topSeverity,
  open,
  onToggle,
  onOpenOverlay,
}: {
  factor: RiskFactor
  meta: { ko: string; en: string }
  items: NewsItem[]
  topSeverity: Severity | null
  open: boolean
  onToggle: () => void
  onOpenOverlay: (news: NewsItem) => void
}) {
  const [showAll, setShowAll] = useState(false)

  // 카테고리 색상 적용
  const primaryCategory = RISK_FACTORS[factor].categories[0] as RiskCategory
  const categoryColor = CATEGORY_COLORS[primaryCategory]

  // 최근 10개만 표시 (pub_date 기준 정렬은 이미 filteredFactorNews에서 처리됨)
  const displayItems = showAll ? items : items.slice(0, 10)
  const hasMore = items.length > 10

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md"
      style={{ borderTopWidth: 3, borderTopColor: `var(--${categoryColor.token})` }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-muted/50"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-[11px] font-medium text-muted-foreground">{meta.en}</span>
          <span className="text-sm font-bold text-foreground">{meta.ko}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-[11px] font-semibold text-muted-foreground">{items.length}건</span>
          <ChevronDown className={cn('size-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
        </div>
      </button>

      {open && (
        <div className="flex flex-col border-t border-border">
          <div className="flex flex-col gap-1 overflow-y-auto p-2" style={{ maxHeight: 240 }}>
            {items.length === 0 && (
              <p className="px-2 py-3 text-center text-xs text-muted-foreground">해당 기간 뉴스 없음</p>
            )}
            {displayItems.map((n) => {
              const nc = severityClasses(n.severity)
              return (
                <button
                  key={n.id}
                  onClick={() => onOpenOverlay(n)}
                  className="flex w-full items-start gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-muted/60"
                >
                  <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', nc.dot)} />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-[11px] text-muted-foreground">{formatTime(n.publishedAt)} · {n.source}</span>
                    <span className="line-clamp-2 text-xs font-medium leading-snug text-foreground">{n.title}</span>
                  </div>
                </button>
              )
            })}
          </div>
          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="border-t border-border px-3 py-2 text-xs text-primary hover:bg-muted/50 transition-colors"
            >
              {showAll ? '접기' : `더보기 (${items.length - 10}건 더)`}
            </button>
          )}
        </div>
      )}
    </article>
  )
}

// ─── GroupCard ────────────────────────────────────────────────────────────────

function GroupCard({
  group,
  index,
  entities: allEntities,
  open,
  onToggle,
  onOpenOverlay,
}: {
  group: ResolvedGroup
  index: number
  entities: SupplyEntity[]
  open: boolean
  onToggle: () => void
  onOpenOverlay: (news: NewsItem) => void
}) {
  const [showAllEntities, setShowAllEntities] = useState(false)
  const entities = group.relatedEntityIds
    .map((id) => allEntities.find((e) => e.id === id))
    .filter(Boolean)
  const visibleEntities = showAllEntities ? entities : entities.slice(0, 1)

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-insight-border bg-insight-card shadow-sm"
      style={{ borderTopWidth: 3, borderTopColor: `var(--${SEVERITY_META[group.severity].token})` }}
    >
      <button
        onClick={onToggle}
        className="flex w-full flex-col gap-2.5 p-4 text-left transition-colors hover:brightness-110"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
            인사이트 {index + 1}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
            <Layers className="size-3" />
            {group.items.length}건
          </span>
          <CategoryBadge category={group.category} />
          <ChevronDown className={cn('ml-auto size-4 shrink-0 text-insight-muted transition-transform', open && 'rotate-180')} />
        </div>
        <h3 className="text-pretty text-sm font-bold leading-snug text-insight-card-foreground">{group.title}</h3>
        <span className="text-xs text-insight-muted">
          뉴스 발행 시각 {formatTime(group.earliestAt)} → {formatTime(group.latestAt)}
        </span>
      </button>

      {open && (
        <>
          {/* Rationale / linked entities */}
          <div className="flex items-start gap-2 border-t border-insight-border bg-insight-bg/60 px-4 py-3">
            <Link2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">AI 그룹화 · 리스크 판단 근거</span>
              <p className="text-xs leading-relaxed text-insight-muted">{group.rationale}</p>
              {entities.length > 0 && (
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-insight-muted">연관 거점:</span>
                  {visibleEntities.map((e) => (
                    <Link
                      key={e!.id}
                      href={`/explorer?entity=${e!.id}`}
                      className="inline-flex items-center gap-1 rounded border border-insight-border bg-insight-card px-1.5 py-0.5 text-[11px] font-medium text-insight-card-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Building2 className="size-2.5" />
                      {e!.nameKo}
                    </Link>
                  ))}
                  {entities.length > 1 && (
                    <button
                      onClick={() => setShowAllEntities((v) => !v)}
                      className="inline-flex items-center rounded border border-insight-border bg-insight-bg px-1.5 py-0.5 text-[11px] font-medium text-primary transition-colors hover:border-primary"
                    >
                      {showAllEntities ? '접기' : `+${entities.length - 1} 더보기`}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Timeline — click news item to open overlay */}
          <div className="overflow-y-auto border-t border-insight-border p-3" style={{ maxHeight: 240 }}>
            <ol className="flex flex-col gap-1.5">
              {group.items.map((n, i) => (
                <li key={n.id} className="flex gap-3 pl-1">
                  <div className="flex flex-col items-center">
                    <span className={cn('z-10 mt-4 size-2.5 shrink-0 rounded-full ring-4 ring-insight-card', severityClasses(n.severity).dot)} />
                    {i < group.items.length - 1 && <span className="w-px flex-1 bg-insight-border" />}
                  </div>
                  <div className="min-w-0 flex-1 pb-2">
                    <button
                      onClick={() => onOpenOverlay(n)}
                      className="flex w-full flex-col gap-1 rounded-md border border-insight-border bg-insight-bg px-3 py-2.5 text-left transition-colors hover:border-primary/60 hover:brightness-110"
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-[11px] text-insight-muted">{formatTime(n.publishedAt)} · {n.source}</span>
                        <SeverityBadge severity={n.severity} format="en" />
                      </div>
                      <span className="text-pretty text-xs font-semibold leading-snug text-insight-card-foreground">{n.title}</span>
                      <span className="line-clamp-1 text-[11px] text-insight-muted">{n.summary}</span>
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </article>
  )
}

// ─── NewsCard (Individual News list item — click opens overlay) ───────────────

function NewsCard({ news, onOpen }: {
  news: NewsItem
  onOpen: () => void
}) {
  const c = severityClasses(news.severity)
  return (
    <button
      onClick={onOpen}
      className={cn(
        'flex w-full items-start gap-3 overflow-hidden rounded-xl border bg-insight-card p-4 text-left transition-all hover:brightness-110',
        c.border + '/40',
      )}
    >
      <span className={cn('mt-1.5 size-2.5 shrink-0 rounded-full', c.dot)} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <CategoryBadge category={news.category} />
          <span className="text-xs text-insight-muted">{news.source} · {formatTime(news.publishedAt)}</span>
          <SeverityBadge severity={news.severity} format="en" className="ml-auto shrink-0" />
        </div>
        <h3 className="text-pretty text-sm font-semibold leading-snug text-insight-card-foreground">{news.title}</h3>
        <p className="line-clamp-1 text-xs text-insight-muted">{news.summary}</p>
      </div>
      <ArrowRight className="mt-1 size-4 shrink-0 text-insight-muted" />
    </button>
  )
}

