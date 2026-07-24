'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Layers, Eye, EyeOff, ChevronDown } from 'lucide-react'
import type { AdminGroup, NewsItem } from '@/lib/types'
import { fetchAdminGroups, saveAdminGroupDisplay, fetchNews } from '@/lib/api-client'
import { NewsOverlay } from '@/components/news-overlay'
import { SeverityBadge } from '@/components/risk-badges'
import { formatDateTime } from '@/lib/format'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function InsightsAdmin() {
  const [groups, setGroups] = useState<AdminGroup[]>([])
  const [newsById, setNewsById] = useState<Map<string, NewsItem>>(new Map())
  const [shown, setShown] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [overlayNews, setOverlayNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [groupData, newsData] = await Promise.all([
          fetchAdminGroups(),
          fetchNews({ limit: 250 }),
        ])
        setGroups(groupData)
        setShown(new Set(groupData.filter((g) => g.currentlyShown).map((g) => g.id)))
        setNewsById(new Map(newsData.map((n) => [n.id, n])))
      } catch (error) {
        console.error(error)
        toast.error('그룹 목록을 불러오지 못했습니다. Backend API 연결을 확인하세요.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  function toggle(id: string) {
    setShown((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // 초기 노출 상태에서 변경되었는지 (저장 버튼 활성화 판단)
  const dirty = useMemo(() => {
    const initial = new Set(groups.filter((g) => g.currentlyShown).map((g) => g.id))
    if (initial.size !== shown.size) return true
    for (const id of shown) if (!initial.has(id)) return true
    return false
  }, [groups, shown])

  async function handleSave() {
    try {
      setSaving(true)
      await saveAdminGroupDisplay([...shown])
      // 저장된 상태를 기준으로 groups의 currentlyShown 갱신 (dirty 초기화)
      setGroups((prev) => prev.map((g) => ({ ...g, currentlyShown: shown.has(g.id) })))
      toast.success('노출 설정이 저장되었습니다. Daily News를 새로고침하면 반영됩니다.')
    } catch (error) {
      console.error(error)
      toast.error('저장에 실패했습니다. Backend API 연결을 확인하세요.')
    } finally {
      setSaving(false)
    }
  }

  const shownCount = shown.size

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-primary">
              <Layers className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Admin</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              AI 핵심 인사이트 관리
            </h1>
            <p className="text-sm text-muted-foreground">
              검증된 뉴스 그룹 중 Daily News의 AI 핵심 인사이트에 노출할 그룹을 선택합니다.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              노출 <span className="font-semibold text-foreground">{shownCount}</span> / {groups.length}개
            </span>
            <Button onClick={handleSave} disabled={!dirty || saving}>
              {saving ? '저장 중…' : '저장'}
            </Button>
          </div>
        </div>
      </section>

      {/* Group list */}
      {loading ? (
        <div className="p-8 text-sm text-muted-foreground">불러오는 중…</div>
      ) : groups.length === 0 ? (
        <div className="p-8 text-sm text-muted-foreground">표시할 검증 그룹이 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {groups.map((g) => {
            const isOn = shown.has(g.id)
            const isOpen = expanded.has(g.id)
            const members = g.newsIds.map((id) => newsById.get(id)).filter(Boolean) as NewsItem[]
            return (
              <Card key={g.id} size="sm">
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleExpand(g.id)}
                      className="flex min-w-0 flex-1 items-center gap-2 text-left"
                      aria-expanded={isOpen}
                    >
                      <ChevronDown
                        className={cn(
                          'size-4 shrink-0 text-muted-foreground transition-transform',
                          isOpen && 'rotate-180',
                        )}
                      />
                      {isOn ? (
                        <Eye className="size-3.5 shrink-0 text-primary" />
                      ) : (
                        <EyeOff className="size-3.5 shrink-0 text-muted-foreground" />
                      )}
                      <div className="flex min-w-0 flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-medium text-foreground">{g.title}</span>
                          <Badge variant="secondary" className="shrink-0">
                            {g.memberCount}건
                          </Badge>
                        </div>
                        {g.theme && (
                          <p className="truncate text-xs text-muted-foreground">{g.theme}</p>
                        )}
                      </div>
                    </button>
                    <Switch checked={isOn} onCheckedChange={() => toggle(g.id)} />
                  </div>

                  {isOpen && (
                    <div className="flex flex-col gap-1.5 border-t border-border pt-3 pl-6">
                      {members.length === 0 ? (
                        <p className="text-xs text-muted-foreground">하위 뉴스를 불러오지 못했습니다.</p>
                      ) : (
                        members.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => setOverlayNews(n)}
                            className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted"
                          >
                            <SeverityBadge severity={n.severity} />
                            <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                              {n.title}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {n.source} · {formatDateTime(n.publishedAt)}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* 뉴스 상세 오버레이 (Daily News와 동일) */}
      <NewsOverlay news={overlayNews} onClose={() => setOverlayNews(null)} />
    </div>
  )
}
