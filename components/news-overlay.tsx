'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { fetchNewsById, fetchEntities, fetchTagSupplyChain } from '@/lib/api-client'
import { formatDateTime } from '@/lib/format'
import { severityClasses } from '@/lib/risk-config'
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

  // 원문 존재 여부 (기본 접힘, 펼칠 때만 노출)
  const hasDetail = (displayNews?.detail.length || 0) > 0

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
            {displayNews && (
              <SeverityBadge
                severity={displayNews.severity}
                format="en"
                className="px-3 py-1 text-sm font-bold shadow-sm ring-2 ring-inset ring-current/20"
              />
            )}
            {displayNews && <CategoryBadge category={displayNews.category} />}
            <span className="text-xs text-muted-foreground">
              {displayNews?.source} · {displayNews ? formatDateTime(displayNews.publishedAt) : ''}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
          {displayNews && (
            <>
              <h2 className="text-pretty text-base font-bold leading-snug text-foreground">{displayNews.title}</h2>

              {/* 1. 요약 — 불렛 리스트로 렌더 */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">요약 · Summary</span>
                <SummaryBullets summary={displayNews.summary} />
              </div>

              {/* 2. 원문 Full Contents — 기본 접힘, 우측 "원문 보기" 링크 */}
              {hasDetail && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setFullTextExpanded(!fullTextExpanded)}
                      className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground"
                    >
                      뉴스 원문 · Full Contents
                      <span className="text-primary">{fullTextExpanded ? '접기' : '펼치기'}</span>
                    </button>
                    <a
                      href={displayNews.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      원문 보기 <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                  {fullTextExpanded && (
                    <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                      {displayNews.detail}
                    </p>
                  )}
                </div>
              )}

              {/* 3. AI Risk Core Insight — 판단 근거를 섹션명 없이 바로 표기 */}
              {displayNews.riskJustification && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">AI Risk Core Insight</span>
                  <p className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed text-foreground">
                    {displayNews.riskJustification}
                  </p>
                </div>
              )}

              {/* 4. 유관 태그 */}
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
                            'inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-medium transition-colors',
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
                          className="inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
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
                          <SupplyChainGroup title="자재" icon="package" items={tagChain.materials} showCode />
                          <SupplyChainGroup title="생산지" icon="building" items={tagChain.sites} link onClose={onClose} />
                          <SupplyChainGroup title="원재료(소재)" icon="layers" items={tagChain.rawMaterials} showCode />
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
                          className="inline-flex items-center gap-1 rounded border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* 5. 관련 생산지 */}
              {entities.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">관련 공급망 생산지</span>
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

              {/* 6. 키워드 */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  키워드
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {displayNews.keywords.map((k) => (
                    <span
                      key={k}
                      className="inline-flex items-center gap-1 rounded border border-border bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground"
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {displayNews && (
          <div className="flex shrink-0 items-center justify-end border-t border-border bg-card p-4">
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
 * 요약(summary)을 불렛 리스트로 렌더.
 * "- ", "• ", "* " 로 시작하는 줄을 항목으로 파싱해 마커를 스타일로 대체한다.
 * 불렛이 하나도 없으면 일반 문단으로 폴백(whitespace-pre-line).
 */
function SummaryBullets({ summary }: { summary: string }) {
  const lines = (summary || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const bullets = lines
    .filter((l) => /^[-•*]\s*/.test(l))
    .map((l) => l.replace(/^[-•*]\s*/, ''))

  if (bullets.length === 0) {
    return <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{summary}</p>
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {bullets.map((b, i) => (
        <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground">
          <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-foreground" />
          <span className="flex-1">{b}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * 태그 공급망 정보 그룹 (협력사/생산지/자재/원재료). 빈 배열이면 렌더 안 함.
 * link=true 이면 항목을 explorer 거점 상세로 이동하는 Link 로, 아니면 정적 배지로 표시.
 * showCode=true 이면 명칭 대신 코드(material_code/raw_material_code)로 표기(자재/원재료).
 */
function SupplyChainGroup({
  title,
  icon,
  items,
  link = false,
  showCode = false,
  onClose,
}: {
  title: string
  icon: 'factory' | 'building' | 'package' | 'layers'
  items: SupplyRef[]
  link?: boolean
  showCode?: boolean
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
              {showCode ? it.code : it.nameKo}
            </Link>
          ) : (
            <span
              key={it.code}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground"
            >
              <Icon className="size-3" />
              {showCode ? it.code : it.nameKo}
            </span>
          ),
        )}
      </div>
    </div>
  )
}
