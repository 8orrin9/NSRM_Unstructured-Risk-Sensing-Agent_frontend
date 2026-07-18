import { Suspense } from 'react'
import { Reporting } from '@/components/reporting'

export default function ReportingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">불러오는 중…</div>}>
      <Reporting />
    </Suspense>
  )
}
