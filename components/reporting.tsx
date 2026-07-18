'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { toast } from 'sonner'
import { fetchNews, fetchNewsGroups, generateReport } from '@/lib/api-client'
import { buildFeed, isRiskNews } from '@/lib/feed'
import { getEntity } from '@/lib/entities'
import { formatTime } from '@/lib/format'
import { severityClasses } from '@/lib/risk-config'
import { severityToKorean } from '@/lib/severity'
import type { FeedEntry, NewsItem, NewsGroup, ResolvedGroup } from '@/lib/types'
import { SeverityBadge, CategoryBadge } from '@/components/risk-badges'
import { NewsOverlay } from '@/components/news-overlay'
import { cn } from '@/lib/utils'
import {
  FileText,
  Sparkles,
  Send,
  Eye,
  Pencil,
  Loader2,
  Check,
  Copy,
  ListChecks,
  Users,
  Layers,
  Search,
  Minus,
  ChevronDown,
  Building2,
  ExternalLink,
  ArrowRight,
} from 'lucide-react'

const TONES = ['간결한 보고체', '상세 분석형', '경영진 브리핑', '실무 대응 중심']

export function Reporting() {
  const params = useSearchParams()
  // API 데이터 상태
  const [NEWS, setNEWS] = useState<NewsItem[]>([])
  const [NEWS_GROUPS, setNEWS_GROUPS] = useState<NewsGroup[]>([])
  const [loading, setLoading] = useState(true)

  // API 데이터 로드
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [newsData, groupsData] = await Promise.all([
          fetchNews({ limit: 100 }),
          fetchNewsGroups(),
        ])
        setNEWS(newsData)
        setNEWS_GROUPS(groupsData)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [previewNewsId, setPreviewNewsId] = useState<string | null>(null)
  const [sender, setSender] = useState('공급망 리스크 관리팀 (SCRM)')
  const [recipient, setRecipient] = useState('구매·SCM 담당 임원')
  const [tone, setTone] = useState(TONES[0])
  const [instruction, setInstruction] = useState('')
  const [draft, setDraft] = useState('')
  const [generating, setGenerating] = useState(false)
  const [view, setView] = useState<'edit' | 'preview'>('preview')
  const [sent, setSent] = useState(false)
  const [query, setQuery] = useState('')
  const [dateFilter, setDateFilter] = useState<'today' | '7days' | '30days' | 'all'>('7days')
  const [showMoreRisk, setShowMoreRisk] = useState(false)
  const [showMoreNormal, setShowMoreNormal] = useState(false)

  useEffect(() => {
    const n = params.get('news')
    if (n && NEWS.length > 0 && NEWS.some((x) => x.id === n)) {
      setSelectedIds((prev) => (prev.includes(n) ? prev : [...prev, n]))
      setPreviewNewsId(n)
    }
  }, [params, NEWS])

  const feed = useMemo(() => {
    if (NEWS.length === 0 || NEWS_GROUPS.length === 0) return []
    return buildFeed(NEWS, NEWS_GROUPS)
  }, [NEWS, NEWS_GROUPS])

  const filteredFeed = useMemo(() => {
    let result = feed

    // 날짜 필터링
    if (dateFilter !== 'all') {
      const now = new Date()
      const cutoff = new Date()
      if (dateFilter === 'today') {
        cutoff.setHours(0, 0, 0, 0)
      } else if (dateFilter === '7days') {
        cutoff.setDate(now.getDate() - 7)
      } else if (dateFilter === '30days') {
        cutoff.setDate(now.getDate() - 30)
      }
      result = result.filter((e) => new Date(e.latestAt) >= cutoff)
    }

    // 검색 필터링
    const q = query.trim().toLowerCase()
    if (q) {
      const matchNews = (n: NewsItem) =>
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.keywords.some((k) => k.toLowerCase().includes(q))
      result = result.filter((e) =>
        e.kind === 'single' ? matchNews(e.news) : e.group.items.some(matchNews),
      )
    }

    return result
  }, [feed, query, dateFilter])

  // 그룹을 상단으로 정렬 (Array.sort는 안정 정렬이므로 그룹/개별 각 그룹 내부의 latestAt 순서는 유지)
  const groupFirst = (a: FeedEntry, b: FeedEntry) =>
    (a.kind === 'group' ? 0 : 1) - (b.kind === 'group' ? 0 : 1)
  const riskEntries = useMemo(
    () =>
      filteredFeed
        .filter((e) => (e.kind === 'group' ? e.group.isRisk : isRiskNews(e.news)))
        .sort(groupFirst),
    [filteredFeed],
  )
  const normalEntries = useMemo(
    () =>
      filteredFeed
        .filter((e) => (e.kind === 'group' ? !e.group.isRisk : !isRiskNews(e.news)))
        .sort(groupFirst),
    [filteredFeed],
  )

  const displayedRiskEntries = showMoreRisk ? riskEntries : riskEntries.slice(0, 7)
  const displayedNormalEntries = showMoreNormal ? normalEntries : normalEntries.slice(0, 7)

  function toggle(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function toggleGroup(group: ResolvedGroup) {
    const ids = group.items.map((n) => n.id)
    const allSelected = ids.every((id) => selectedIds.includes(id))
    setSelectedIds((prev) =>
      allSelected ? prev.filter((id) => !ids.includes(id)) : Array.from(new Set([...prev, ...ids])),
    )
  }

  function stripFence(text: string) {
    return text
      .replace(/^\s*```(?:markdown|md)?\s*\n?/i, '')
      .replace(/\n?```\s*$/i, '')
  }

  async function generate() {
    if (selectedIds.length === 0) {
      toast.error('먼저 리포트에 포함할 뉴스를 선택하세요.')
      return
    }
    setGenerating(true)
    setDraft('')
    setView('preview')
    setSent(false)
    try {
      const res = await generateReport({
        newsIds: selectedIds,
        sender,
        recipient,
        tone,
        instruction,
      })
      if (!res.ok || !res.body) throw new Error(await res.text() || '생성 실패')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setDraft(stripFence(acc))
      }
      toast.success('AI 리포트 초안이 생성되었습니다.')
    } catch (err) {
      toast.error('리포트 생성에 실패했습니다. Backend API 연결을 확인하세요.')
    } finally {
      setGenerating(false)
    }
  }

  function send() {
    if (!draft.trim()) { toast.error('전송할 리포트 내용이 없습니다.'); return }
    setSent(true)
    toast.success(`리포트가 '${recipient}'에게 전송되었습니다.`)
  }

  function copyDraft() {
    navigator.clipboard.writeText(draft)
    toast.success('리포트가 클립보드에 복사되었습니다.')
  }

  // overlay state for news detail
  const [overlayNewsId, setOverlayNewsId] = useState<string | null>(null)
  const overlayNews = overlayNewsId ? NEWS.find((n) => n.id === overlayNewsId) ?? null : null

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-primary">
          <FileText className="size-4" />
          <span className="text-xs font-semibold uppercase tracking-wide">Reporting</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">리스크 리포트 작성 · 발행</h1>
        <p className="text-sm text-muted-foreground">뉴스를 선택하고 AI 초안을 생성한 뒤, 편집하여 담당자에게 전송하세요.</p>
      </div>

      {/* 2-column layout: left=news selection, right=editor */}
      <div className="grid gap-4 lg:grid-cols-[340px_1fr]" style={{ minHeight: 720 }}>

        {/* ── Left: News selection ── */}
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-3">
            <div className="flex items-center gap-2">
              <ListChecks className="size-4 text-primary" />
              <span className="text-sm font-bold text-foreground">뉴스 선택</span>
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {selectedIds.length}건 선택
            </span>
          </div>

          <div className="border-b border-border p-2.5">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
              <Search className="size-3.5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="주제·키워드로 검색…"
                className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="border-b border-border px-2.5 pb-2.5">
            <div className="flex flex-wrap gap-1.5">
              {[
                { value: 'today' as const, label: '오늘' },
                { value: '7days' as const, label: '최근 7일' },
                { value: '30days' as const, label: '최근 30일' },
                { value: 'all' as const, label: '전체' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setDateFilter(option.value)
                    setShowMoreRisk(false)
                    setShowMoreNormal(false)
                  }}
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                    dateFilter === option.value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted',
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-2.5">
            <SelectionGroup
              label="Risk 뉴스"
              tone="risk"
              entries={displayedRiskEntries}
              selectedIds={selectedIds}
              previewNewsId={previewNewsId}
              onToggle={toggle}
              onToggleGroup={toggleGroup}
              onPreview={(id) => { setPreviewNewsId(id); setOverlayNewsId(id) }}
              defaultOpen={true}
            />
            {riskEntries.length > 7 && !showMoreRisk && (
              <button
                onClick={() => setShowMoreRisk(true)}
                className="mx-2 inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                <ChevronDown className="size-3.5" />
                더보기 ({riskEntries.length - 7}건)
              </button>
            )}

            <SelectionGroup
              label="일반 뉴스"
              tone="normal"
              entries={displayedNormalEntries}
              selectedIds={selectedIds}
              previewNewsId={previewNewsId}
              onToggle={toggle}
              onToggleGroup={toggleGroup}
              onPreview={(id) => { setPreviewNewsId(id); setOverlayNewsId(id) }}
              defaultOpen={false}
            />
            {normalEntries.length > 7 && !showMoreNormal && (
              <button
                onClick={() => setShowMoreNormal(true)}
                className="mx-2 inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                <ChevronDown className="size-3.5" />
                더보기 ({normalEntries.length - 7}건)
              </button>
            )}

            {riskEntries.length === 0 && normalEntries.length === 0 && (
              <p className="px-2 py-6 text-center text-xs text-muted-foreground">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>

        {/* ── Right: Sender/Recipient + Editor (full height) ── */}
        <div className="flex flex-col gap-4">
          {/* ── Sender/Recipient + Editor ── */}
          <div className="flex min-h-0 flex-1 flex-col gap-0 overflow-hidden rounded-xl border border-border bg-card">
            {/* Inner 2-col: left=sender/recipient, right=editor */}
            <div className="flex min-h-0 flex-1 divide-x divide-border overflow-hidden">

              {/* Left sub-column: sender / recipient / tone / generate */}
              <div className="flex w-80 shrink-0 flex-col gap-4 overflow-y-auto p-4">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">발신 · 수신</span>
                </div>
                <Field label="발신 (From)" value={sender} onChange={setSender} />
                <Field label="수신 (To)" value={recipient} onChange={setRecipient} />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">작성 톤</label>
                  <div className="flex flex-wrap gap-1.5">
                    {TONES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={cn(
                          'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                          tone === t
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-card text-muted-foreground hover:bg-muted',
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">추가 지시사항 (선택)</label>
                  <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    placeholder="예: 대체 소싱 방안을 강조해 주세요."
                    rows={3}
                    className="resize-none rounded-md border border-border bg-background p-2.5 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={generate}
                  disabled={generating}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
                >
                  {generating ? (
                    <><Loader2 className="size-4 animate-spin" /> 생성 중…</>
                  ) : (
                    <><Sparkles className="size-4" /> AI 초안 생성</>
                  )}
                </button>
              </div>

              {/* Right sub-column: editor + preview + send */}
              <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                {/* Toolbar */}
                <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border p-3">
                  <div className="inline-flex rounded-md border border-border p-0.5">
                    <button
                      onClick={() => setView('edit')}
                      className={cn('inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-colors', view === 'edit' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
                    >
                      <Pencil className="size-3.5" /> 편집
                    </button>
                    <button
                      onClick={() => setView('preview')}
                      className={cn('inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-colors', view === 'preview' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
                    >
                      <Eye className="size-3.5" /> 미리보기
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyDraft}
                      disabled={!draft}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
                    >
                      <Copy className="size-3.5" /> 복사
                    </button>
                    <button
                      onClick={send}
                      disabled={!draft || generating}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50',
                        sent ? 'bg-risk-low-bg text-risk-low' : 'bg-primary text-primary-foreground hover:bg-primary/90',
                      )}
                    >
                      {sent ? <><Check className="size-3.5" /> 전송됨</> : <><Send className="size-3.5" /> 리포트 전송</>}
                    </button>
                  </div>
                </div>

                {/* Content area */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                  {!draft && !generating && (
                    <div className="flex h-full min-h-[260px] items-center justify-center p-8 text-center">
                      <div className="flex max-w-sm flex-col items-center gap-3 text-muted-foreground">
                        <span className="grid size-12 place-items-center rounded-full bg-muted">
                          <Sparkles className="size-6 text-primary" />
                        </span>
                        <p className="text-sm">
                          뉴스를 선택하고 <span className="font-semibold text-foreground">AI 초안 생성</span>을 누르면<br />
                          이곳에 리포트가 생성됩니다.
                        </p>
                      </div>
                    </div>
                  )}
                  {(draft || generating) && view === 'preview' && (
                    <div className="prose-report max-w-none p-6 text-sm text-foreground">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{draft}</ReactMarkdown>
                      {generating && <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />}
                    </div>
                  )}
                  {(draft || generating) && view === 'edit' && (
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      className="h-full min-h-[260px] w-full resize-none bg-background p-6 font-mono text-sm leading-relaxed outline-none"
                      placeholder="리포트 내용을 편집하세요…"
                    />
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── News Detail Slide Overlay ── */}
      <NewsOverlay
        news={overlayNews}
        onClose={() => setOverlayNewsId(null)}
      />
    </div>
  )
}

// ─── NewsDetailPanel ─────────────────────��─────────────────────────────────────

function NewsDetailPanel({ news }: { news: NewsItem }) {
  const c = severityClasses(news.severity)
  const entities = news.relatedEntityIds.map(getEntity).filter(Boolean)

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge category={news.category} />
        <SeverityBadge severity={news.severity} />
      </div>
      <h3 className="text-pretty text-sm font-bold leading-snug text-foreground">{news.title}</h3>

      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">요약</span>
        <p className="text-sm leading-relaxed text-foreground">{news.summary}</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">상세 분석</span>
        <p className="text-sm leading-relaxed text-muted-foreground">{news.detail}</p>
      </div>

      {entities.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">관련 공급망 거점</span>
          <div className="flex flex-wrap gap-1.5">
            {entities.map((e) => (
              <span
                key={e!.id}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground"
              >
                <Building2 className="size-3" />
                {e!.nameKo}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">키워드</span>
        <div className="flex flex-wrap gap-1.5">
          {news.keywords.map((k) => (
            <span key={k} className="rounded bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground">
              #{k}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">영향도</span>
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
            <div className={cn('h-full rounded-full', c.dot)} style={{ width: `${news.impactScore}%` }} />
          </div>
          <span className={cn('text-xs font-bold', c.text)}>{news.impactScore}</span>
        </div>
        <a href={news.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          원문 <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  )
}

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  )
}

// ─── SelectionGroup ───────────────────────────────────────────────────────────

function SelectionGroup({
  label, tone, entries, selectedIds, previewNewsId, onToggle, onToggleGroup, onPreview, defaultOpen,
}: {
  label: string
  tone: 'risk' | 'normal'
  entries: FeedEntry[]
  selectedIds: string[]
  previewNewsId: string | null
  onToggle: (id: string) => void
  onToggleGroup: (group: ResolvedGroup) => void
  onPreview: (id: string) => void
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  if (entries.length === 0) return null
  const count = entries.reduce((sum, e) => sum + (e.kind === 'group' ? e.group.items.length : 1), 0)

  return (
    <div className="flex flex-col gap-1.5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-1 text-left"
      >
        <span className={cn('size-1.5 rounded-full', tone === 'risk' ? 'bg-risk-critical' : 'bg-muted-foreground')} />
        <span className={cn('text-[11px] font-bold uppercase tracking-wide', tone === 'risk' ? 'text-risk-critical' : 'text-muted-foreground')}>
          {label}
        </span>
        <span className="text-[11px] text-muted-foreground">{count}건</span>
        <span className="h-px flex-1 bg-border" />
        <ChevronDown className={cn('size-3.5 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>

      {open && entries.map((e) =>
        e.kind === 'group' ? (
          <GroupSelectCard
            key={e.group.id}
            group={e.group}
            selectedIds={selectedIds}
            previewNewsId={previewNewsId}
            onToggle={onToggle}
            onToggleGroup={onToggleGroup}
            onPreview={onPreview}
          />
        ) : (
          <NewsSelectItem
            key={e.news.id}
            news={e.news}
            checked={selectedIds.includes(e.news.id)}
            previewing={previewNewsId === e.news.id}
            onToggle={() => onToggle(e.news.id)}
            onPreview={() => onPreview(e.news.id)}
          />
        ),
      )}
    </div>
  )
}

// ─── GroupSelectCard ──────────────────────────────────────────────────────────

function GroupSelectCard({
  group, selectedIds, previewNewsId, onToggle, onToggleGroup, onPreview,
}: {
  group: ResolvedGroup
  selectedIds: string[]
  previewNewsId: string | null
  onToggle: (id: string) => void
  onToggleGroup: (group: ResolvedGroup) => void
  onPreview: (id: string) => void
}) {
  // Groups start collapsed per request
  const [expanded, setExpanded] = useState(false)
  const ids = group.items.map((n) => n.id)
  const selectedCount = ids.filter((id) => selectedIds.includes(id)).length
  const all = selectedCount === ids.length
  const some = selectedCount > 0 && !all

  return (
    <div className="overflow-hidden rounded-lg border border-primary/30 bg-primary/[0.03]">
      <div className="flex items-center gap-2 border-b border-border/60 p-2.5">
        {/* Select-all checkbox */}
        <button
          onClick={() => onToggleGroup(group)}
          className={cn('grid size-4 shrink-0 place-items-center rounded border', all || some ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}
        >
          {all && <Check className="size-3" />}
          {some && <Minus className="size-3" />}
        </button>
        {/* Title row */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex min-w-0 flex-1 flex-col gap-1.5 text-left"
        >
          <span className="flex flex-nowrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground whitespace-nowrap">
              <Layers className="size-2.5" />
              그룹 {group.items.length}건
            </span>
            <CategoryBadge category={group.category} className="whitespace-nowrap" />
            <SeverityBadge severity={group.severity} format="en" className="ml-auto shrink-0" />
          </span>
          <span className="text-xs font-semibold leading-snug text-foreground">{group.title}</span>
        </button>
        <ChevronDown className={cn('size-3.5 shrink-0 text-muted-foreground transition-transform', expanded && 'rotate-180')} />
      </div>
      {expanded && (
        <div className="flex flex-col gap-1 p-1.5">
          {group.items.map((n) => (
            <NewsSelectItem
              key={n.id}
              news={n}
              checked={selectedIds.includes(n.id)}
              previewing={previewNewsId === n.id}
              onToggle={() => onToggle(n.id)}
              onPreview={() => onPreview(n.id)}
              nested
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── NewsSelectItem ───────────────────────────────────────────────────────────

function NewsSelectItem({
  news, checked, previewing, onToggle, onPreview, nested,
}: {
  news: NewsItem
  checked: boolean
  previewing: boolean
  onToggle: () => void
  onPreview: () => void
  nested?: boolean
}) {
  const c = severityClasses(news.severity)
  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded-lg border p-2 transition-colors',
        checked ? 'border-primary bg-primary/5' : 'border-border bg-card',
        previewing && 'ring-1 ring-primary/50',
        nested && 'border-transparent bg-transparent',
      )}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={cn('mt-0.5 grid size-4 shrink-0 place-items-center rounded border', checked ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}
      >
        {checked && <Check className="size-3" />}
      </button>
      {/* Title (click to preview) */}
      <button onClick={onPreview} className="flex min-w-0 flex-1 flex-col gap-1 text-left">
        <span className="flex items-center gap-1.5">
          <span className={cn('size-1.5 rounded-full', c.dot)} />
          {!nested && <CategoryBadge category={news.category} />}
          <span className="ml-auto text-[10px] text-muted-foreground">{formatTime(news.publishedAt)}</span>
        </span>
        <span className={cn('text-xs font-medium leading-snug', previewing ? 'text-primary' : 'text-foreground')}>
          {news.title}
        </span>
      </button>
    </div>
  )
}

