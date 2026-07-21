import { Suspense } from 'react'
import { SupplyChainAdmin } from '@/components/supply-chain-admin'

export default function SupplyChainAdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">불러오는 중…</div>}>
      <SupplyChainAdmin />
    </Suspense>
  )
}
