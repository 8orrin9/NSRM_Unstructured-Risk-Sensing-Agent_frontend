import { cn } from '@/lib/utils'

/** 키워드를 개별 chip으로 표기 (뉴스 상세 오버레이의 키워드 스타일과 동형) */
export function KeywordChips({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return <span className="text-muted-foreground">—</span>
  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {items.map((k, i) => (
        <span
          key={`${k}-${i}`}
          className="inline-flex items-center rounded border border-border bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground"
        >
          {k}
        </span>
      ))}
    </div>
  )
}

/**
 * OP_KEYWORD.keyword 필드 → 키워드 배열.
 * 저장 형식이 JSON 배열 문자열(`["a","b"]`)이 기본이나, 단일/콤마 문자열도 허용.
 */
export function parseKeywordField(raw: string | null | undefined): string[] {
  if (!raw) return []
  const trimmed = raw.trim()
  try {
    const parsed = JSON.parse(trimmed)
    if (Array.isArray(parsed)) {
      return parsed.map((k) => String(k).trim()).filter(Boolean)
    }
    return [String(parsed).trim()].filter(Boolean)
  } catch {
    return trimmed
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)
  }
}

/** OP_TAG.keywords_full 필드(파이프 구분 `a | b`) → 키워드 배열. */
export function parseKeywordsFull(raw: string | null | undefined): string[] {
  if (!raw) return []
  return raw
    .split('|')
    .map((k) => k.trim())
    .filter(Boolean)
}
