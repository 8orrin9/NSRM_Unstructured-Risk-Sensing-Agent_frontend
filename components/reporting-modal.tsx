'use client'

import { Suspense, useEffect } from 'react'
import { X, FileText, Loader2 } from 'lucide-react'
import { Reporting } from '@/components/reporting'
import { cn } from '@/lib/utils'
import type { ResolvedGroup } from '@/lib/types'

/**
 * 그룹 카드의 Reporting 버튼 → 레포팅 화면을 모달 팝업으로 띄우는 경량 래퍼.
 * news-overlay 백드롭 패턴(z-[1400]) 위 중앙 대형 패널(z-[1410]).
 */
export function ReportingModal({
  group,
  onClose,
}: {
  group: ResolvedGroup | null
  onClose: () => void
}) {
  // Escape로 닫기
  useEffect(() => {
    if (!group) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [group, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[1400] bg-black/30 backdrop-blur-sm transition-opacity duration-300',
          group ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />

      {/* Centered panel */}
      <div
        className={cn(
          'fixed inset-0 z-[1410] flex items-center justify-center p-4 transition-opacity duration-300 md:p-8',
          group ? 'pointer-events-none opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div
          className={cn(
            'flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-transform duration-300',
            group ? 'pointer-events-auto scale-100' : 'scale-95',
          )}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-5 py-3.5">
            <div className="flex min-w-0 items-center gap-2">
              <FileText className="size-4 shrink-0 text-primary" />
              <span className="text-sm font-bold text-foreground">리스크 리포트 작성</span>
              {group && (
                <span className="truncate text-xs text-muted-foreground">· {group.title}</span>
              )}
            </div>
            <button
              onClick={onClose}
              className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="닫기"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Body */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-5">
            {group && (
              <Suspense
                fallback={
                  <div className="flex h-64 items-center justify-center text-muted-foreground">
                    <Loader2 className="size-5 animate-spin" />
                  </div>
                }
              >
                <Reporting embedded initialGroupId={group.id} />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
