'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const EMPTY_SELECTION: Set<number> = new Set()

export interface Column<T> {
  key: string
  label: string
  /** 셀 표시 값 (기본: row[key]) */
  render?: (row: T) => React.ReactNode
  /** 이 컬럼을 값 필터(드롭다운) 대상으로 노출 */
  filterable?: boolean
  className?: string
}

interface AdminDataTableProps<T> {
  rows: T[]
  columns: Column<T>[]
  /** 각 행의 고유 id (선택/삭제용) */
  getRowId: (row: T) => number
  /** 검색 대상 텍스트 (전 컬럼 결합) */
  getSearchText: (row: T) => string
  /** 행 다중선택(체크박스) 사용 여부. 기본 true. false면 조회 전용(체크박스 열 숨김) */
  selectable?: boolean
  selected?: Set<number>
  onSelectedChange?: (next: Set<number>) => void
}

/**
 * 관리자 키워드/태그 공용 표.
 * - 상단 검색(전 컬럼 텍스트) + filterable 컬럼별 값 드롭다운
 * - thead sticky (열 이름 고정) + 세로 스크롤
 * - 행별 체크박스 다중선택 (selectable=false면 조회 전용)
 */
export function AdminDataTable<T>({
  rows,
  columns,
  getRowId,
  getSearchText,
  selectable = true,
  selected,
  onSelectedChange,
}: AdminDataTableProps<T>) {
  const selectedSet = selected ?? EMPTY_SELECTION
  const [search, setSearch] = useState('')
  const [colFilters, setColFilters] = useState<Record<string, string>>({})

  // filterable 컬럼별 고유값 목록
  const filterOptions = useMemo(() => {
    const opts: Record<string, string[]> = {}
    for (const col of columns) {
      if (!col.filterable) continue
      const set = new Set<string>()
      for (const row of rows) {
        const v = (row as Record<string, unknown>)[col.key]
        if (v !== null && v !== undefined && String(v).trim() !== '') set.add(String(v))
      }
      opts[col.key] = [...set].sort()
    }
    return opts
  }, [rows, columns])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return rows.filter((row) => {
      if (q && !getSearchText(row).toLowerCase().includes(q)) return false
      for (const [key, val] of Object.entries(colFilters)) {
        if (!val) continue
        if (String((row as Record<string, unknown>)[key] ?? '') !== val) return false
      }
      return true
    })
  }, [rows, search, colFilters, getSearchText])

  const allChecked = filtered.length > 0 && filtered.every((r) => selectedSet.has(getRowId(r)))

  function toggleRow(id: number) {
    const next = new Set(selectedSet)
    next.has(id) ? next.delete(id) : next.add(id)
    onSelectedChange?.(next)
  }

  function toggleAll() {
    const next = new Set(selectedSet)
    if (allChecked) filtered.forEach((r) => next.delete(getRowId(r)))
    else filtered.forEach((r) => next.add(getRowId(r)))
    onSelectedChange?.(next)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 검색 + 컬럼 필터 */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-56">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색 (전체 컬럼)"
            className="pl-8"
          />
        </div>
        {columns
          .filter((c) => c.filterable)
          .map((c) => (
            <select
              key={c.key}
              value={colFilters[c.key] ?? ''}
              onChange={(e) =>
                setColFilters((prev) => ({ ...prev, [c.key]: e.target.value }))
              }
              className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm text-foreground outline-none focus-visible:border-ring"
            >
              <option value="">{c.label} 전체</option>
              {(filterOptions[c.key] ?? []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ))}
        <span className="ml-auto text-xs text-muted-foreground">
          {filtered.length} / {rows.length}건
        </span>
      </div>

      {/* 표 (헤더 고정 + 세로 스크롤) */}
      <div className="max-h-[60vh] overflow-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-muted">
            <tr>
              {selectable && (
                <th className="w-10 px-3 py-2 text-left">
                  <Checkbox checked={allChecked} onCheckedChange={toggleAll} aria-label="전체 선택" />
                </th>
              )}
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    'whitespace-nowrap px-3 py-2 text-left text-xs font-semibold text-muted-foreground',
                    c.className,
                  )}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-3 py-8 text-center text-muted-foreground">
                  표시할 항목이 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((row) => {
                const id = getRowId(row)
                const checked = selectedSet.has(id)
                return (
                  <tr
                    key={id}
                    className={cn('border-t border-border transition-colors hover:bg-muted/50', checked && 'bg-primary/5')}
                  >
                    {selectable && (
                      <td className="px-3 py-2 align-top">
                        <Checkbox checked={checked} onCheckedChange={() => toggleRow(id)} aria-label="행 선택" />
                      </td>
                    )}
                    {columns.map((c) => (
                      <td key={c.key} className={cn('px-3 py-2 align-top', c.className)}>
                        {c.render
                          ? c.render(row)
                          : String((row as Record<string, unknown>)[c.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/** 삭제 확인 등에 쓰는 경량 모달 (Dialog 컴포넌트 부재 → 자체 backdrop) */
export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = '삭제',
  destructive = true,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  message: React.ReactNode
  confirmLabel?: string
  destructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onCancel}>
      <div
        className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <div className="mt-2 text-sm text-muted-foreground">{message}</div>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            취소
          </Button>
          <Button variant={destructive ? 'destructive' : 'default'} size="sm" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
