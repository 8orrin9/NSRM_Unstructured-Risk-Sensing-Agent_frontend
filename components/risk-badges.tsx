import { cn } from '@/lib/utils'
import type { RiskCategory, Severity } from '@/lib/types'
import { RISK_CATEGORIES, SEVERITY_META, severityClasses } from '@/lib/risk-config'

export function SeverityBadge({
  severity,
  className,
  format = 'both',
}: {
  severity: Severity
  className?: string
  format?: 'both' | 'en' | 'ko'
}) {
  const c = severityClasses(severity)
  const meta = SEVERITY_META[severity]
  const label = format === 'en' ? meta.en : format === 'ko' ? meta.ko : `${meta.ko} · ${meta.en}`
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold',
        c.bg,
        c.text,
        c.border,
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', c.dot)} />
      {label}
    </span>
  )
}

export function CategoryBadge({
  category,
  className,
}: {
  category: RiskCategory
  className?: string
}) {
  const meta = RISK_CATEGORIES[category]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground',
        className,
      )}
    >
      {meta.ko}
    </span>
  )
}
