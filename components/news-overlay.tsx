'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { fetchNewsById, fetchEntities } from '@/lib/api-client'
import { formatTime } from '@/lib/format'
import { severityClasses, SEVERITY_META } from '@/lib/risk-config'
import { SeverityBadge, CategoryBadge } from '@/components/risk-badges'
import { cn } from '@/lib/utils'
import type { NewsItem, SupplyEntity } from '@/lib/types'
import {
  X,
  ExternalLink,
  ArrowRight,
  Building2,
  Plus,
  Loader2,
} from 'lucide-react'

/**
 * 뉴스 상세 오버레이 컴포넌트
 * Daily News와 Explorer에서 공통으로 사용
 */
export function NewsOverlay({
  news,
  onClose,
  onAddKeyword,
}: {
  news: NewsItem | null
  onClose: () => void
  onAddKeyword?: (kw: string) => void
}) {
  const [fullTextExpanded, setFullTextExpanded] = useState(false)
  const [fullNews, setFullNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [allEntities, setAllEntities] = useState<SupplyEntity[]>([])

  // 관련 거점 이름 표시용 엔티티 목록 로드 (1회)
  useEffect(() => {
    fetchEntities().then(setAllEntities).catch(console.error)
  }, [])

  // 뉴스가 열리면 detail이 없는 경우 개별 API 호출
  useEffect(() => {
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
                  {onAddKeyword && (
                    <span className="ml-2 font-normal normal-case text-primary">(+ 클릭하여 수집 키워드 Pool에 추가)</span>
                  )}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {displayNews.keywords.map((k) => {
                    const isRecommended = displayNews.recommendedKeywords?.includes(k)
                    return onAddKeyword ? (
                      <button
                        key={k}
                        onClick={() => onAddKeyword(k)}
                        className={cn(
                          'group inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-xs transition-colors',
                          isRecommended
                            ? 'border-amber-300 bg-amber-100/50 text-amber-900 hover:border-amber-400 hover:bg-amber-200/50'
                            : 'border-border bg-secondary text-secondary-foreground hover:border-primary hover:bg-primary/5 hover:text-primary'
                        )}
                      >
                        #{k}
                        <Plus className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    ) : (
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

              {displayNews.tags && displayNews.tags.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">유관 태그</span>
                  <div className="flex flex-wrap gap-1.5">
                    {/* 태그 추천 기능 비활성화 (추후 재활성화 시: recommendedTags 병합 + isRecommendedTag 앰버 하이라이팅 복원)
                    {Array.from(new Set([...(displayNews.tags ?? []), ...(displayNews.recommendedTags ?? [])])).map((tag) => {
                      const isRecommendedTag = displayNews.recommendedTags?.includes(tag)
                      ...앰버 하이라이팅...
                    })}
                    */}
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
              href={`/reporting?displayNews=${displayNews.id}`}
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
