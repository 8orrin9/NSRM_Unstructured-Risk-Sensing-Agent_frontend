'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { fetchNewsById, fetchEntities, fetchTagSupplyChain } from '@/lib/api-client'
import { formatTime } from '@/lib/format'
import { severityClasses, SEVERITY_META } from '@/lib/risk-config'
import { SeverityBadge, CategoryBadge } from '@/components/risk-badges'
import { cn } from '@/lib/utils'
import type { NewsItem, SupplyEntity, TagSupplyChain, SupplyRef } from '@/lib/types'
import {
  X,
  ExternalLink,
  ArrowRight,
  Building2,
  Loader2,
  Factory,
  Package,
  Layers,
} from 'lucide-react'

/**
 * 뉴스 상세 오버레이 컴포넌트
 * Daily News와 Explorer에서 공통으로 사용
 */
export function NewsOverlay({
  news,
  onClose,
}: {
  news: NewsItem | null
  onClose: () => void
}) {
  const [fullTextExpanded, setFullTextExpanded] = useState(false)
  const [fullNews, setFullNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [allEntities, setAllEntities] = useState<SupplyEntity[]>([])

  // 태그 클릭 → 공급망 정보 (인라인 확장)
  const [openTagId, setOpenTagId] = useState<string | null>(null)
  const [tagChain, setTagChain] = useState<TagSupplyChain | null>(null)
  const [tagLoading, setTagLoading] = useState(false)

  // 관련 거점 이름 표시용 엔티티 목록 로드 (1회)
  useEffect(() => {
    fetchEntities().then(setAllEntities).catch(console.error)
  }, [])

  // 뉴스가 열리면 detail이 없는 경우 개별 API 호출
  useEffect(() => {
    // 다른 뉴스로 전환되면 태그 확장 상태 초기화
    setOpenTagId(null)
    setTagChain(null)
    if (news && !news.detail) {
      setLoading(true)
      fetchNewsById(news.id)
        .then(setFullNews)
        .catch(console.error)
        .finally(() => setLoading(false))
    } else {
      setFullNews(news)
    }
  }, [news])

  // 태그 클릭 토글 (같은 태그 재클릭 시 닫힘)
  const handleTagClick = (tagId: string) => {
    if (openTagId === tagId) {
      setOpenTagId(null)
      setTagChain(null)
      return
    }
    setOpenTagId(tagId)
    setTagChain(null)
    setTagLoading(true)
    fetchTagSupplyChain(tagId)
      .then(setTagChain)
      .catch(console.error)
      .finally(() => setTagLoading(false))
  }

  const displayNews = fullNews || news
  const c = displayNews ? severityClasses(displayNews.severity) : null
  const entities = displayNews
    ? displayNews.relatedEntityIds
        .map((id) => allEntities.find((e) => e.id === id))
        .filter(Boolean)
    : []

  // 원문 길이 제한
  const contentPreview = displayNews?.detail.slice(0, 300) || ''
  const hasMore = (displayNews?.detail.length || 0) > 300

  return (
    <>
      {/* Backdrop — 거점 상세 패널(z-[1300]) 위에 표시되도록 z-index 상향 */}
      <div
        className={cn(
          'fixed inset-0 z-[1400] bg-black/30 backdrop-blur-sm transition-opacity duration-300',
          displayNews ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />

      {/* Slide panel */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-[1410] flex w-full max-w-xl flex-col bg-card shadow-2xl transition-transform duration-300 ease-in-out',
          displayNews ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header */}
        <div className={cn('flex shrink-0 items-center justify-between gap-3 border-b border-border p-4', c?.bg)}>
          <div className="flex flex-wrap items-center gap-2">
            {displayNews && <CategoryBadge category={displayNews.category} />}
            <span className="text-xs text-muted-foreground">
              {displayNews?.source} · {displayNews ? formatTime(displayNews.publishedAt) : ''}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {displayNews && <SeverityBadge severity={displayNews.severity} format="en" />}
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
          {displayNews && (
            <>
              <h2 className="text-pretty text-base font-bold leading-snug text-foreground">{displayNews.title}</h2>

              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">요약 · Summary</span>
                <p className="text-sm leading-relaxed text-foreground">{displayNews.summary}</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">뉴스 원문 · Full Contents</span>
                  {hasMore && (
                    <button
                      onClick={() => setFullTextExpanded(!fullTextExpanded)}
                      className="text-xs text-primary hover:underline"
                    >
                      {fullTextExpanded ? '접기' : '자세히 보기'}
                    </button>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {fullTextExpanded ? displayNews.detail : contentPreview}
                  {!fullTextExpanded && hasMore && '...'}
                </p>
              </div>

              {entities.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">관련 공급망 거점</span>
                  <div className="flex flex-wrap gap-2">
                    {entities.map((e) => (
                      <Link
                        key={e!.id}
                        href={`/explorer?entity=${e!.id}`}
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <Building2 className="size-3" />
                        {e!.nameKo}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  키워드
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {displayNews.keywords.map((k) => {
                    const isRecommended = displayNews.recommendedKeywords?.includes(k)
                    return (
                      <span
                        key={k}
                        className={cn(
                          'inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-xs',
                          isRecommended
                            ? 'border-amber-300 bg-amber-100/50 text-amber-900'
                            : 'border-border bg-secondary text-secondary-foreground'
                        )}
                      >
                        #{k}
                      </span>
                    )
                  })}
                </div>
              </div>

              {displayNews.tagRefs && displayNews.tagRefs.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    유관 태그
                    <span className="ml-2 font-normal normal-case text-primary">(클릭하여 관련 공급망 정보 보기)</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {displayNews.tagRefs.map((t) =>
                      t.linkable ? (
                        <button
                          key={t.tagId}
                          onClick={() => handleTagClick(t.tagId)}
                          className={cn(
                            'inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-xs font-medium transition-colors',
                            openTagId === t.tagId
                              ? 'border-primary bg-primary/20 text-primary'
                              : 'border-primary/30 bg-primary/10 text-primary hover:bg-primary/20',
                          )}
                        >
                          {t.tagName}
                        </button>
                      ) : (
                        <span
                          key={t.tagId}
                          className="inline-flex items-center gap-1 rounded border border-border bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground"
                        >
                          {t.tagName}
                        </span>
                      ),
                    )}
                  </div>
                  {openTagId && (
                    <div className="mt-1 rounded-lg border border-border bg-muted/40 p-3">
                      {tagLoading ? (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Loader2 className="size-3.5 animate-spin" /> 공급망 정보 조회 중...
                        </div>
                      ) : tagChain &&
                        (tagChain.suppliers.length > 0 ||
                          tagChain.sites.length > 0 ||
                          tagChain.materials.length > 0 ||
                          tagChain.rawMaterials.length > 0) ? (
                        <div className="flex flex-col gap-3">
                          <SupplyChainGroup title="협력사" icon="factory" items={tagChain.suppliers} link onClose={onClose} />
                          <SupplyChainGroup title="거점" icon="building" items={tagChain.sites} link onClose={onClose} />
                          <SupplyChainGroup title="자재" icon="package" items={tagChain.materials} />
                          <SupplyChainGroup title="원재료(소재)" icon="layers" items={tagChain.rawMaterials} />
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">관련 공급망 정보가 없습니다.</span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                displayNews.tags && displayNews.tags.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">유관 태그</span>
                    <div className="flex flex-wrap gap-1.5">
                      {displayNews.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded border border-border bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* ══ AI RISK CORE INSIGHTS ══ */}
              <div className="flex flex-col gap-4 border-t border-border pt-5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1">
                    <span className="size-1.5 rounded-full bg-primary" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">AI Risk Core Insights</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    뉴스 자체의 리스크 여부, DS 반도체 공급망 DB와의 관련성, 시급성 기반으로 AI가 분석한 인사이트
                  </p>
                </div>

                {/* AI 리스크 평가 — 4단계 게이지 (박스 없이) */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">AI 리스크 평가</span>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn('group relative rounded-full border px-3 py-1 text-sm font-bold', c?.border, c?.bg)}
                      title={`정확한 점수: ${displayNews.impactScore}`}
                    >
                      <span className={cn('cursor-help', c?.text)}>{SEVERITY_META[displayNews.severity].en}</span>
                      <span className={cn('absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100', 'pointer-events-none')}>
                        {displayNews.impactScore} / 100
                      </span>
                    </div>
                    {/* 4단계 게이지 바 — severity 경계(20/60/85)와 정합 (LOW/MEDIUM/HIGH/CRITICAL = 1/2/3/4칸) */}
                    <div className="flex flex-1 gap-0.5">
                      {[0, 20, 60, 85].map((threshold) => {
                        const isActive = displayNews.impactScore > threshold
                        let bgClass = 'bg-muted'
                        if (isActive) {
                          if (displayNews.severity === 'critical') bgClass = 'bg-risk-critical'
                          else if (displayNews.severity === 'high') bgClass = 'bg-risk-high'
                          else if (displayNews.severity === 'medium') bgClass = 'bg-risk-medium'
                          else bgClass = 'bg-risk-low'
                        }
                        return (
                          <div
                            key={threshold}
                            className={cn('h-2 flex-1 rounded-sm transition-all', bgClass)}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* AI 판단 근거 */}
                {displayNews.riskJustification && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">AI 판단 근거</span>
                    <ul className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/40 px-4 py-3">
                      {displayNews.riskJustification.split(/\n+|(?<=[.!?。])\s+/).filter((s) => s.trim()).map((line, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground">
                          <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
                          <span>{line.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {displayNews && (
          <div className="flex shrink-0 items-center justify-between border-t border-border bg-card p-4">
            <a
              href={displayNews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              원문 보기 <ExternalLink className="size-3.5" />
            </a>
            <Link
              href={`/reporting?news=${displayNews.id}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              리포트 작성 <ArrowRight className="size-3.5" />
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

/**
 * 태그 공급망 정보 그룹 (협력사/거점/자재/원재료). 빈 배열이면 렌더 안 함.
 * link=true 이면 항목을 explorer 거점 상세로 이동하는 Link 로, 아니면 정적 배지로 표시.
 */
function SupplyChainGroup({
  title,
  icon,
  items,
  link = false,
  onClose,
}: {
  title: string
  icon: 'factory' | 'building' | 'package' | 'layers'
  items: SupplyRef[]
  link?: boolean
  onClose?: () => void
}) {
  if (!items || items.length === 0) return null

  const Icon = icon === 'factory' ? Factory : icon === 'building' ? Building2 : icon === 'package' ? Package : Layers

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{title}</span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it) =>
          link ? (
            <Link
              key={it.code}
              href={`/explorer?entity=${it.code}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="size-3" />
              {it.nameKo}
            </Link>
          ) : (
            <span
              key={it.code}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground"
            >
              <Icon className="size-3" />
              {it.nameKo}
            </span>
          ),
        )}
      </div>
    </div>
  )
}
