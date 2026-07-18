import { Suspense } from 'react'
import { RiskExplorer } from '@/components/risk-explorer'

export default function ExplorerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">불러오는 중…</div>}>
      <RiskExplorer />
    </Suspense>
  )
}
