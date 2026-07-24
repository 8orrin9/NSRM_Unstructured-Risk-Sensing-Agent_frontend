import type { Severity } from './types'

export function severityToKorean(severity: Severity): string {
  const map: Record<Severity, string> = {
    high: '높음',
    medium: '보통',
    low: '낮음',
  }
  return map[severity]
}
