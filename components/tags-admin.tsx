'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Tag, Plus, Trash2, Sparkles, Info } from 'lucide-react'
import type { OpTag, RecommendedTag } from '@/lib/types'
import {
  fetchTags,
  createTag,
  deleteTags,
  fetchTagRecommendations,
} from '@/lib/api-client'
import { AdminDataTable, ConfirmModal, type Column } from '@/components/admin-data-table'
import { KeywordChips, parseKeywordsFull } from '@/components/keyword-chips'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// EVENT 외 태그는 공급망 DB 기반 자동생성 → 사용자 편집 불가
const TAG_TYPES = ['EVENT', 'SUPPLIER', 'MATERIAL', 'RAW_MATERIAL', 'SITE'] as const
const NON_EVENT_HINT =
  'EVENT 유형을 제외한 모든 태그는 공급망 DB 기반으로 자동 생성되며, 사용자가 임의로 편집할 수 없습니다. DBA에게 문의하세요.'

interface TagForm {
  name: string
  tag_type: string
  target_region: string
  risk_factor: string
  domain: string
  keywords_full: string
  description: string
}

const EMPTY_FORM: TagForm = {
  name: '',
  tag_type: 'EVENT',
  target_region: '',
  risk_factor: '',
  domain: '',
  keywords_full: '',
  description: '',
}

const COLUMNS: Column<OpTag>[] = [
  { key: 'tag_id', label: '태그 ID', className: 'whitespace-nowrap' },
  { key: 'tag_type', label: '태그 유형', filterable: true, className: 'whitespace-nowrap' },
  { key: 'name', label: '태그' },
  { key: 'domain', label: '카테고리', filterable: true },
  { key: 'risk_factor', label: '유발 리스크' },
  {
    key: 'keywords_full',
    label: '탐지 키워드',
    className: 'max-w-md',
    render: (r) => <KeywordChips items={parseKeywordsFull(r.keywords_full)} />,
  },
  { key: 'description', label: 'description', className: 'max-w-xs' },
  { key: 'target_region', label: '언어', filterable: true, className: 'whitespace-nowrap' },
]

export function TagsAdmin() {
  const [rows, setRows] = useState<OpTag[]>([])
  const [recs, setRecs] = useState<RecommendedTag[]>([])
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [recSelected, setRecSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState<TagForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const [confirmDelete, setConfirmDelete] = useState(false)

  async function reload() {
    const [tg, rt] = await Promise.all([fetchTags(), fetchTagRecommendations()])
    setRows(tg)
    setRecs(rt)
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        await reload()
      } catch (e) {
        console.error(e)
        toast.error('태그를 불러오지 못했습니다. Backend API 연결을 확인하세요.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const openForm = (prefill?: Partial<TagForm>) => {
    setForm({ ...EMPTY_FORM, ...prefill })
    setFormOpen(true)
  }

  async function handleCreate() {
    if (!form.name.trim()) {
      toast.error('name은 필수입니다.')
      return
    }
    try {
      setSaving(true)
      await createTag({
        name: form.name.trim(),
        tag_type: 'EVENT', // 서버에서도 강제되지만 명시
        target_region: form.target_region || null,
        risk_factor: form.risk_factor || null,
        domain: form.domain || null,
        keywords_full: form.keywords_full || null,
        description: form.description || null,
      })
      toast.success('태그가 추가되었습니다.')
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
      await deleteTags([...selected])
      toast.success(`${selected.size}건을 비활성화했습니다.`)
      setSelected(new Set())
      setConfirmDelete(false)
      await reload()
    } catch (e) {
      console.error(e)
      toast.error('삭제에 실패했습니다.')
    }
  }

  function addSelectedRecs() {
    const picked = recs.filter((r) => recSelected.has(r.name))
    if (picked.length === 0) return
    const first = picked[0]
    openForm({
      name: picked.map((p) => p.name).join(', '),
      tag_type: 'EVENT',
      risk_factor: first.risk_factor ?? '',
      description: first.description ?? 'AI 추천 EVENT 태그',
      keywords_full: first.keywords_full ?? '',
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-primary">
              <Tag className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Admin</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">태그 관리</h1>
            <p className="text-sm text-muted-foreground">
              DB 검색·리스크 분석에 활용되는 태그를 조회·추가·비활성화합니다.
            </p>
          </div>
          <Button onClick={() => openForm()}>
            <Plus className="size-4" />
            태그 추가
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
                [r.tag_id, r.target_region, r.tag_type, r.name, r.domain, r.risk_factor, r.keywords_full, r.description]
                  .filter(Boolean)
                  .join(' ')
              }
              selected={selected}
              onSelectedChange={setSelected}
            />
          </div>

          {/* 우: AI 추천 신규 태그 */}
          <aside className="flex h-fit flex-col gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="size-4" />
              <h2 className="text-sm font-semibold text-foreground">AI 추천 신규 태그</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              AI가 검토 결과, 매핑되는 태그가 없는 이벤트 유형의 뉴스 키워드입니다.
            </p>
            {recs.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted-foreground">추천할 태그가 없습니다.</p>
            ) : (
              <>
                <div className="flex flex-col gap-1.5">
                  {recs.map((r) => {
                    const on = recSelected.has(r.name)
                    return (
                      <button
                        key={r.name}
                        onClick={() =>
                          setRecSelected((prev) => {
                            const next = new Set(prev)
                            next.has(r.name) ? next.delete(r.name) : next.add(r.name)
                            return next
                          })
                        }
                        className={cn(
                          'flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors',
                          on ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
                        )}
                      >
                        <span className="truncate text-foreground">{r.name}</span>
                        <Badge variant="secondary" className="shrink-0">
                          EVENT
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
            <h3 className="text-base font-semibold text-foreground">태그 추가</h3>
            <div className="mt-4 flex flex-col gap-3">
              <Field label="태그 *">
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="태그 이름" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="태그 유형">
                  <select
                    value={form.tag_type}
                    onChange={(e) => setForm((f) => ({ ...f, tag_type: e.target.value }))}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring"
                  >
                    {TAG_TYPES.map((t) => (
                      <option key={t} value={t} disabled={t !== 'EVENT'} title={t !== 'EVENT' ? NON_EVENT_HINT : undefined}>
                        {t}
                        {t !== 'EVENT' ? ' (편집 불가)' : ''}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="언어">
                  <input
                    list="tag-regions"
                    value={form.target_region}
                    onChange={(e) => setForm((f) => ({ ...f, target_region: e.target.value }))}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
                    placeholder="선택 또는 직접 입력"
                  />
                  <datalist id="tag-regions">
                    <option value="KR" />
                    <option value="GLOBAL" />
                  </datalist>
                </Field>
              </div>
              <div className="flex items-start gap-1.5 rounded-lg bg-muted/60 px-2.5 py-2 text-xs text-muted-foreground" title={NON_EVENT_HINT}>
                <Info className="mt-0.5 size-3.5 shrink-0" />
                <span>{NON_EVENT_HINT}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="유발 리스크">
                  <Input value={form.risk_factor} onChange={(e) => setForm((f) => ({ ...f, risk_factor: e.target.value }))} />
                </Field>
                <Field label="카테고리">
                  <Input value={form.domain} onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))} />
                </Field>
              </div>
              <Field label="탐지 키워드">
                <Input value={form.keywords_full} onChange={(e) => setForm((f) => ({ ...f, keywords_full: e.target.value }))} placeholder="키워드1 | 키워드2" />
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

      {/* 삭제 확인 (태그는 문구 강화) */}
      <ConfirmModal
        open={confirmDelete}
        title="태그 비활성화"
        message={
          <>
            선택한 <b>{selected.size}건</b>의 태그를 비활성화합니다.
            <br />
            <span className="text-destructive">
              태그는 AI의 리스크 분석 성능에 직접적인 영향을 미칩니다. 신중히 확인하세요.
            </span>
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
