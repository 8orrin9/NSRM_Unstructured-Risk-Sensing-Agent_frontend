'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { KeyRound, Plus, Trash2, Sparkles } from 'lucide-react'
import type { OpKeyword, RecommendedKeyword } from '@/lib/types'
import {
  fetchKeywords,
  createKeyword,
  deleteKeywords,
  fetchKeywordRecommendations,
} from '@/lib/api-client'
import { AdminDataTable, ConfirmModal, type Column } from '@/components/admin-data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 추가 팝업 폼 (테이블 컬럼과 동형)
interface KeywordForm {
  keyword: string
  risk_category_code: string
  risk_category_name: string
  risk_factor: string
  keyword_group_name: string
  target_region: string
  description: string
}

const EMPTY_FORM: KeywordForm = {
  keyword: '',
  risk_category_code: '',
  risk_category_name: '',
  risk_factor: '',
  keyword_group_name: '',
  target_region: '',
  description: '',
}

const COLUMNS: Column<OpKeyword>[] = [
  { key: 'risk_category_code', label: 'risk_category_code', filterable: true, className: 'whitespace-nowrap' },
  { key: 'risk_category_name', label: 'risk_category_name', filterable: true },
  { key: 'risk_factor', label: 'risk_factor' },
  { key: 'keyword_group_name', label: 'keyword_group_name' },
  {
    key: 'keyword',
    label: 'keyword',
    className: 'max-w-md',
    render: (r) => <span className="break-words">{r.keyword}</span>,
  },
  { key: 'target_region', label: 'target_region', filterable: true, className: 'whitespace-nowrap' },
  { key: 'description', label: 'description', className: 'max-w-xs' },
]

export function KeywordsAdmin() {
  const [rows, setRows] = useState<OpKeyword[]>([])
  const [recs, setRecs] = useState<RecommendedKeyword[]>([])
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [recSelected, setRecSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  // 추가 팝업
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState<KeywordForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  // 삭제 확인
  const [confirmDelete, setConfirmDelete] = useState(false)

  async function reload() {
    const [kw, rk] = await Promise.all([fetchKeywords(), fetchKeywordRecommendations()])
    setRows(kw)
    setRecs(rk)
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        await reload()
      } catch (e) {
        console.error(e)
        toast.error('키워드를 불러오지 못했습니다. Backend API 연결을 확인하세요.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // 이미 등록된 키워드(원본이 JSON 배열이라 문자열 그대로 비교하기 어려워 recs는 서버가 이미 필터)
  const openForm = (prefill?: Partial<KeywordForm>) => {
    setForm({ ...EMPTY_FORM, ...prefill })
    setFormOpen(true)
  }

  async function handleCreate() {
    if (!form.keyword.trim()) {
      toast.error('keyword는 필수입니다.')
      return
    }
    try {
      setSaving(true)
      await createKeyword({
        keyword: form.keyword.trim(),
        risk_category_code: form.risk_category_code || null,
        risk_category_name: form.risk_category_name || null,
        risk_factor: form.risk_factor || null,
        keyword_group_name: form.keyword_group_name || null,
        target_region: form.target_region || null,
        description: form.description || null,
      })
      toast.success('키워드가 추가되었습니다.')
      setFormOpen(false)
      await reload()
    } catch (e) {
      console.error(e)
      toast.error('추가에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    try {
      await deleteKeywords([...selected])
      toast.success(`${selected.size}건을 비활성화했습니다.`)
      setSelected(new Set())
      setConfirmDelete(false)
      await reload()
    } catch (e) {
      console.error(e)
      toast.error('삭제에 실패했습니다.')
    }
  }

  // 추천에서 선택 → 첫 항목을 팝업에 fill-in (단건 편집)
  function addSelectedRecs() {
    const picked = recs.filter((r) => recSelected.has(r.keyword))
    if (picked.length === 0) return
    openForm({ keyword: picked.map((p) => p.keyword).join(', '), keyword_group_name: '', description: 'AI 추천 키워드' })
  }

  const filterOptions = useMemo(() => {
    const codes = new Set<string>()
    rows.forEach((r) => r.risk_category_code && codes.add(r.risk_category_code))
    return [...codes].sort()
  }, [rows])

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-primary">
              <KeyRound className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Admin</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              뉴스 수집용 키워드 관리
            </h1>
            <p className="text-sm text-muted-foreground">
              뉴스 수집에 사용되는 키워드를 조회·추가·비활성화합니다.
            </p>
          </div>
          <Button onClick={() => openForm()}>
            <Plus className="size-4" />
            키워드 추가
          </Button>
        </div>
      </section>

      {loading ? (
        <div className="p-8 text-sm text-muted-foreground">불러오는 중…</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* 좌: 표 */}
          <div className="flex flex-col gap-3">
            {selected.size > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="destructive" size="sm" onClick={() => setConfirmDelete(true)}>
                  <Trash2 className="size-4" />
                  선택 {selected.size}건 삭제
                </Button>
              </div>
            )}
            <AdminDataTable
              rows={rows}
              columns={COLUMNS}
              getRowId={(r) => r.id}
              getSearchText={(r) =>
                [r.risk_category_code, r.risk_category_name, r.risk_factor, r.keyword_group_name, r.keyword, r.target_region, r.description]
                  .filter(Boolean)
                  .join(' ')
              }
              selected={selected}
              onSelectedChange={setSelected}
            />
          </div>

          {/* 우: AI 추천 신규 키워드 */}
          <aside className="flex h-fit flex-col gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="size-4" />
              <h2 className="text-sm font-semibold text-foreground">AI 추천 신규 키워드</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Risk 뉴스에서 5회 이상 반복 출현했으나 아직 수집 키워드에 없는 키워드입니다.
            </p>
            {recs.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted-foreground">추천할 키워드가 없습니다.</p>
            ) : (
              <>
                <div className="flex flex-col gap-1.5">
                  {recs.map((r) => {
                    const on = recSelected.has(r.keyword)
                    return (
                      <button
                        key={r.keyword}
                        onClick={() =>
                          setRecSelected((prev) => {
                            const next = new Set(prev)
                            next.has(r.keyword) ? next.delete(r.keyword) : next.add(r.keyword)
                            return next
                          })
                        }
                        className={cn(
                          'flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors',
                          on ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
                        )}
                      >
                        <span className="truncate text-foreground">{r.keyword}</span>
                        <Badge variant="secondary" className="shrink-0">
                          {r.count}회
                        </Badge>
                      </button>
                    )
                  })}
                </div>
                <Button size="sm" disabled={recSelected.size === 0} onClick={addSelectedRecs}>
                  <Plus className="size-4" />
                  선택 {recSelected.size}건 추가
                </Button>
              </>
            )}
          </aside>
        </div>
      )}

      {/* 추가 팝업 */}
      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => !saving && setFormOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-border bg-card p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-foreground">키워드 추가</h3>
            <div className="mt-4 flex flex-col gap-3">
              <Field label="keyword *">
                <Input value={form.keyword} onChange={(e) => setForm((f) => ({ ...f, keyword: e.target.value }))} placeholder='예: ["ECCN", "수출통제"] 또는 단일 키워드' />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="risk_category_code">
                  <input
                    list="kw-cat-codes"
                    value={form.risk_category_code}
                    onChange={(e) => setForm((f) => ({ ...f, risk_category_code: e.target.value }))}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
                    placeholder="선택 또는 직접 입력"
                  />
                  <datalist id="kw-cat-codes">
                    {filterOptions.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>
                <Field label="target_region">
                  <input
                    list="kw-regions"
                    value={form.target_region}
                    onChange={(e) => setForm((f) => ({ ...f, target_region: e.target.value }))}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
                    placeholder="선택 또는 직접 입력"
                  />
                  <datalist id="kw-regions">
                    <option value="KR" />
                    <option value="GLOBAL" />
                  </datalist>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="risk_category_name">
                  <Input value={form.risk_category_name} onChange={(e) => setForm((f) => ({ ...f, risk_category_name: e.target.value }))} />
                </Field>
                <Field label="risk_factor">
                  <Input value={form.risk_factor} onChange={(e) => setForm((f) => ({ ...f, risk_factor: e.target.value }))} />
                </Field>
              </div>
              <Field label="keyword_group_name">
                <Input value={form.keyword_group_name} onChange={(e) => setForm((f) => ({ ...f, keyword_group_name: e.target.value }))} />
              </Field>
              <Field label="description">
                <Input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </Field>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setFormOpen(false)} disabled={saving}>
                취소
              </Button>
              <Button size="sm" onClick={handleCreate} disabled={saving}>
                {saving ? '저장 중…' : '저장'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 */}
      <ConfirmModal
        open={confirmDelete}
        title="키워드 비활성화"
        message={
          <>
            선택한 <b>{selected.size}건</b>의 키워드를 비활성화합니다. 비활성화된 키워드는 뉴스 수집에서 제외됩니다.
          </>
        }
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}
