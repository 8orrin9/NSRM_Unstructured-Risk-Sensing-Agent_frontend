'use client'

import { useState, useEffect } from 'react'
import { fetchEntityNews } from '@/lib/api-client'
import { formatTime } from '@/lib/format'
import { severityClasses } from '@/lib/risk-config'
import { SeverityBadge, CategoryBadge } from '@/components/risk-badges'
import { cn } from '@/lib/utils'
import type { NewsItem, SupplyEntity } from '@/lib/types'
import {
  X,
  MapPin,
  Layers,
  Package,
} from 'lucide-react'

export function NewsPanel({
  entityId,
  entity,
  allEntities,
  onClose,
  onOpenNews,
}: {
  entityId: string | null
  entity: SupplyEntity | null
  allEntities: SupplyEntity[]
  onClose: () => void
  onOpenNews: (news: NewsItem) => void
}) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)

  const open = Boolean(entity)

  // API에서 거점 관련 뉴스 로드
  useEffect(() => {
    if (!entityId) {
      setNews([])
      return
    }

    async function loadNews() {
      try {
        setLoading(true)
        const data = await fetchEntityNews(entityId)
        setNews(data)
      } catch (error) {
        console.error('Failed to load entity news:', error)
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [entityId])

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[1200] bg-foreground/10 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          'fixed inset-x-0 bottom-0 z-[1300] mx-auto max-h-[75vh] w-full max-w-[1600px] overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl transition-transform duration-300 ease-out',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        {entity && (
          <div className="flex max-h-[75vh] flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-foreground">
                  {entity.nameKo}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {entity.name}
                  </span>
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" /> {entity.city}, {entity.country}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Layers className="size-3.5" /> {entity.type.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="닫기"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid flex-1 gap-0 overflow-hidden md:grid-cols-[280px_1fr]">
              <div className="border-b border-border p-5 md:border-b-0 md:border-r">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  공급 품목
                </span>
                <div className="mt-2 flex flex-col gap-1.5">
                  {entity.products.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-foreground"
                    >
                      <Package className="size-3.5 text-primary" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col overflow-y-auto p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">
                    관련 리스크 뉴스 ({loading ? '...' : news.length})
                  </span>
                </div>
                {loading ? (
                  <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                    뉴스를 불러오는 중...
                  </p>
                ) : news.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                    현재 이 거점에 연결된 활성 리스크가 없습니다.
                  </p>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {news.map((n) => (
                      <PanelNewsCard
                        key={n.id}
                        news={n}
                        onOpen={() => onOpenNews(n)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

// ─── PanelNewsCard — 클릭 시 우측 슬라이드 오버레이(NewsOverlay)로 상세 표시 ─────

function PanelNewsCard({
  news,
  onOpen,
}: {
  news: NewsItem
  onOpen: () => void
}) {
  const c = severityClasses(news.severity)

  return (
    <button
      onClick={onOpen}
      className="flex w-full items-start gap-2.5 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/50 hover:bg-muted/40"
    >
      <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', c.dot)} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <CategoryBadge category={news.category} />
          <span className="text-xs text-muted-foreground">
            {news.source} · {formatTime(news.publishedAt)}
          </span>
          <SeverityBadge severity={news.severity} format="en" className="ml-auto shrink-0" />
        </div>
        <h4 className="text-pretty text-sm font-semibold leading-snug text-foreground">{news.title}</h4>
        <p className="line-clamp-1 text-xs text-muted-foreground">{news.summary}</p>
      </div>
    </button>
  )
}
