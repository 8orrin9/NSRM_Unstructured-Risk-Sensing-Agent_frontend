'use client'

import { useMemo, useState } from 'react'
import { Search, Filter, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type FilterFn,
} from '@tanstack/react-table'
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
  /** 이 컬럼을 값 필터(헤더 드롭다운) 대상으로 노출 */
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

// 값 필터: 선택된 값 배열에 셀 값이 포함되는지 (엑셀 필터식)
const setFilter: FilterFn<unknown> = (row, columnId, filterValue: string[]) => {
  if (!filterValue || filterValue.length === 0) return true
  return filterValue.includes(String(row.getValue(columnId) ?? ''))
}

/**
 * 관리자 키워드/태그/공급망 공용 표 (TanStack Table 기반).
 * - 상단 전역 검색(전 컬럼 텍스트)
 * - 헤더 클릭 정렬(오름→내림→해제) + filterable 컬럼 헤더의 엑셀식 값 필터
 * - thead sticky(열 이름 고정) + 세로/가로 스크롤
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
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  // 열려 있는 헤더 필터 메뉴 위치 (fixed 배치로 overflow 컨테이너 클리핑 회피)
  const [filterMenu, setFilterMenu] = useState<{ colId: string; x: number; y: number } | null>(null)

  const columnMeta = useMemo(() => {
    const m: Record<string, Column<T>> = {}
    for (const c of columns) m[c.key] = c
    return m
  }, [columns])

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

  const tableColumns = useMemo<ColumnDef<T>[]>(() => {
    return columns.map((col) => ({
      id: col.key,
      accessorFn: (row: T) => (row as Record<string, unknown>)[col.key],
      cell: ({ row }) =>
        col.render ? col.render(row.original) : String((row.original as Record<string, unknown>)[col.key] ?? ''),
      enableColumnFilter: !!col.filterable,
      filterFn: setFilter as FilterFn<T>,
      sortingFn: (a, b, id) =>
        String(a.getValue(id) ?? '').localeCompare(String(b.getValue(id) ?? ''), undefined, { numeric: true }),
    }))
  }, [columns])

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, value: string) =>
      getSearchText(row.original).toLowerCase().includes(String(value).toLowerCase()),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const visibleRows = table.getRowModel().rows
  const allChecked = visibleRows.length > 0 && visibleRows.every((r) => selectedSet.has(getRowId(r.original)))

  function toggleRow(id: number) {
    const next = new Set(selectedSet)
    next.has(id) ? next.delete(id) : next.add(id)
    onSelectedChange?.(next)
  }

  function toggleAll() {
    const next = new Set(selectedSet)
    if (allChecked) visibleRows.forEach((r) => next.delete(getRowId(r.original)))
    else visibleRows.forEach((r) => next.add(getRowId(r.original)))
    onSelectedChange?.(next)
  }

  const colCount = columns.length + (selectable ? 1 : 0)

  const menuCol = filterMenu ? table.getColumn(filterMenu.colId) : null
  const menuSelected = (menuCol?.getFilterValue() as string[] | undefined) ?? []

  return (
    <div className="flex flex-col gap-3">
      {/* 전역 검색 */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-56 flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="검색 (전체 컬럼)"
            className="pl-8"
          />
        </div>
        <span className="ml-auto text-xs text-muted-foreground">
          {visibleRows.length} / {rows.length}건
        </span>
      </div>

      {/* 표 (헤더 고정 + 세로/가로 스크롤) */}
      <div className="max-h-[60vh] overflow-auto rounded-xl border border-border">
        <table className="min-w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-muted">
            <tr>
              {selectable && (
                <th className="w-10 px-3 py-2.5 text-left">
                  <Checkbox checked={allChecked} onCheckedChange={toggleAll} aria-label="전체 선택" />
                </th>
              )}
              {table.getHeaderGroups()[0].headers.map((header) => {
                const meta = columnMeta[header.column.id]
                const sorted = header.column.getIsSorted()
                const active = (header.column.getFilterValue() as string[] | undefined)?.length ?? 0
                return (
                  <th
                    key={header.id}
                    className={cn(
                      'whitespace-nowrap px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground',
                      meta?.className,
                    )}
                  >
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-1 transition-colors hover:text-foreground"
                      >
                        <span>{meta?.label ?? header.column.id}</span>
                        {sorted === 'asc' ? (
                          <ChevronUp className="size-3.5" />
                        ) : sorted === 'desc' ? (
                          <ChevronDown className="size-3.5" />
                        ) : (
                          <ChevronsUpDown className="size-3.5 opacity-40" />
                        )}
                      </button>
                      {header.column.getCanFilter() && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            const rect = e.currentTarget.getBoundingClientRect()
                            setFilterMenu((prev) =>
                              prev?.colId === header.column.id
                                ? null
                                : { colId: header.column.id, x: rect.left, y: rect.bottom + 4 },
                            )
                          }}
                          className={cn(
                            'rounded p-0.5 transition-colors hover:bg-foreground/10',
                            active > 0 ? 'text-primary' : 'text-muted-foreground/60',
                          )}
                          aria-label="필터"
                        >
                          <Filter className={cn('size-3.5', active > 0 && 'fill-primary/20')} />
                        </button>
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={colCount} className="px-3 py-8 text-center text-muted-foreground">
                  표시할 항목이 없습니다.
                </td>
              </tr>
            ) : (
              visibleRows.map((row) => {
                const id = getRowId(row.original)
                const checked = selectedSet.has(id)
                return (
                  <tr
                    key={id}
                    className={cn(
                      'border-t border-border transition-colors even:bg-muted/30 hover:bg-primary/5',
                      checked && 'bg-primary/10 even:bg-primary/10',
                    )}
                  >
                    {selectable && (
                      <td className="px-3 py-2 align-top">
                        <Checkbox checked={checked} onCheckedChange={() => toggleRow(id)} aria-label="행 선택" />
                      </td>
                    )}
                    {row.getVisibleCells().map((cell) => {
                      const meta = columnMeta[cell.column.id]
                      return (
                        <td key={cell.id} className={cn('px-3 py-2 align-top', meta?.className)}>
                          {meta?.render
                            ? meta.render(row.original)
                            : String((row.original as Record<string, unknown>)[cell.column.id] ?? '')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 헤더 값 필터 메뉴 (엑셀식) */}
      {filterMenu && menuCol && (
        <div className="fixed inset-0 z-40" onClick={() => setFilterMenu(null)}>
          <div
            style={{ left: filterMenu.x, top: filterMenu.y }}
            className="fixed z-50 max-h-72 w-56 overflow-auto rounded-xl border border-border bg-card p-2 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1.5 flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-foreground">
                {columnMeta[filterMenu.colId]?.label ?? filterMenu.colId}
              </span>
              <button
                type="button"
                onClick={() => menuCol.setFilterValue(undefined)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                초기화
              </button>
            </div>
            <div className="flex flex-col gap-0.5">
              {(filterOptions[filterMenu.colId] ?? []).map((opt) => {
                const on = menuSelected.includes(opt)
                return (
                  <label
                    key={opt}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-sm hover:bg-muted"
                  >
                    <Checkbox
                      checked={on}
                      onCheckedChange={() => {
                        const next = on ? menuSelected.filter((v) => v !== opt) : [...menuSelected, opt]
                        menuCol.setFilterValue(next.length > 0 ? next : undefined)
                      }}
                    />
                    <span className="truncate text-foreground">{opt}</span>
                  </label>
                )
              })}
              {(filterOptions[filterMenu.colId] ?? []).length === 0 && (
                <span className="px-1.5 py-1 text-xs text-muted-foreground">값이 없습니다.</span>
              )}
            </div>
          </div>
        </div>
      )}
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
