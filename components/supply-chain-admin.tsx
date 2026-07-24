'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Database, Boxes, Package, MapPin, Factory } from 'lucide-react'
import type { RawMaterialRow, MaterialRow, SiteRow, SupplierRow } from '@/lib/types'
import {
  fetchRawMaterials,
  fetchMaterials,
  fetchSites,
  fetchSuppliers,
} from '@/lib/api-client'
import { AdminDataTable, type Column } from '@/components/admin-data-table'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// 탭 정의 (?tab= 쿼리 값과 일치)
const TABS = ['raw-materials', 'materials', 'sites', 'suppliers'] as const
type TabKey = (typeof TABS)[number]

const RAW_MATERIAL_COLUMNS: Column<RawMaterialRow>[] = [
  { key: 'no', label: 'no', className: 'whitespace-nowrap' },
  { key: 'raw_material_code', label: '원자재 코드', className: 'whitespace-nowrap' },
  { key: 'name_kor', label: '원자재 명칭 (KR)' },
  { key: 'name_eng', label: '원자재 명칭 (EN)' },
  { key: 'raw_material_type', label: '원자재 유형', filterable: true },
]

const MATERIAL_COLUMNS: Column<MaterialRow>[] = [
  { key: 'no', label: 'no', className: 'whitespace-nowrap' },
  { key: 'material_code', label: '자재 코드', className: 'whitespace-nowrap' },
  { key: 'name_kor', label: '자재 명칭 (KR)' },
  { key: 'name_eng', label: '자재 명칭 (EN)' },
  { key: 'material_type', label: '자재 유형', filterable: true },
]

const SITE_COLUMNS: Column<SiteRow>[] = [
  { key: 'no', label: 'no', className: 'whitespace-nowrap' },
  { key: 'site_code', label: '생산지 코드', className: 'whitespace-nowrap' },
  { key: 'supplier_code', label: '협력사 코드', className: 'whitespace-nowrap' },
  { key: 'name', label: '생산지 명칭' },
  { key: 'country', label: '국가', filterable: true, className: 'whitespace-nowrap' },
  { key: 'latitude', label: '위도', className: 'whitespace-nowrap' },
  { key: 'longitude', label: '경도', className: 'whitespace-nowrap' },
]

const SUPPLIER_COLUMNS: Column<SupplierRow>[] = [
  { key: 'no', label: 'no', className: 'whitespace-nowrap' },
  { key: 'supplier_code', label: '협력사 코드', className: 'whitespace-nowrap' },
  { key: 'name_kor', label: '협력사 명칭 (KR)' },
  { key: 'name_eng', label: '협력사 명칭 (EN)' },
  { key: 'country', label: '국가', filterable: true, className: 'whitespace-nowrap' },
  { key: 'latitude', label: '위도', className: 'whitespace-nowrap' },
  { key: 'longitude', label: '경도', className: 'whitespace-nowrap' },
]

const TAB_META: { key: TabKey; label: string; icon: typeof Boxes; table: string }[] = [
  { key: 'raw-materials', label: '원자재', icon: Boxes, table: 'RAW_MATERIAL_MASTER' },
  { key: 'materials', label: '자재', icon: Package, table: 'MATERIAL_MASTER' },
  { key: 'sites', label: '생산지', icon: MapPin, table: 'SITE_MASTER' },
  { key: 'suppliers', label: '협력사', icon: Factory, table: 'SUPPLIER_MASTER' },
]

export function SupplyChainAdmin() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab')
  const [tab, setTab] = useState<TabKey>(
    TABS.includes(initialTab as TabKey) ? (initialTab as TabKey) : 'raw-materials',
  )

  const [rawMaterials, setRawMaterials] = useState<RawMaterialRow[]>([])
  const [materials, setMaterials] = useState<MaterialRow[]>([])
  const [sites, setSites] = useState<SiteRow[]>([])
  const [suppliers, setSuppliers] = useState<SupplierRow[]>([])
  const [loading, setLoading] = useState(true)

  // ?tab= 변경(드롭다운으로 재진입) 시 활성 탭 동기화
  useEffect(() => {
    const t = searchParams.get('tab')
    if (t && TABS.includes(t as TabKey)) setTab(t as TabKey)
  }, [searchParams])

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const [rm, mt, st, sp] = await Promise.all([
          fetchRawMaterials(),
          fetchMaterials(),
          fetchSites(),
          fetchSuppliers(),
        ])
        setRawMaterials(rm)
        setMaterials(mt)
        setSites(st)
        setSuppliers(sp)
      } catch (e) {
        console.error(e)
        toast.error('공급망 데이터를 불러오지 못했습니다. Backend API 연결을 확인하세요.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-1.5 border-b border-border bg-gradient-to-r from-primary/5 to-transparent p-5 md:p-6">
          <div className="flex items-center gap-2 text-primary">
            <Database className="size-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Admin</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">공급망 Database</h1>
          <p className="text-sm text-muted-foreground">
            공급망 원천 마스터 데이터(원자재·자재·생산지·협력사)를 조회합니다. 조회 전용입니다.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="p-8 text-sm text-muted-foreground">불러오는 중…</div>
      ) : (
        <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
          <TabsList>
            {TAB_META.map((t) => {
              const Icon = t.icon
              return (
                <TabsTrigger key={t.key} value={t.key}>
                  <Icon className="size-4" />
                  {t.label}
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value="raw-materials">
            <AdminDataTable
              rows={rawMaterials}
              columns={RAW_MATERIAL_COLUMNS}
              getRowId={(r) => r.no}
              getSearchText={(r) => [r.raw_material_code, r.name_kor, r.name_eng, r.raw_material_type].filter(Boolean).join(' ')}
              selectable={false}
            />
          </TabsContent>

          <TabsContent value="materials">
            <AdminDataTable
              rows={materials}
              columns={MATERIAL_COLUMNS}
              getRowId={(r) => r.no}
              getSearchText={(r) => [r.material_code, r.name_kor, r.name_eng, r.material_type].filter(Boolean).join(' ')}
              selectable={false}
            />
          </TabsContent>

          <TabsContent value="sites">
            <AdminDataTable
              rows={sites}
              columns={SITE_COLUMNS}
              getRowId={(r) => r.no}
              getSearchText={(r) => [r.site_code, r.supplier_code, r.name, r.country, r.region].filter(Boolean).join(' ')}
              selectable={false}
            />
          </TabsContent>

          <TabsContent value="suppliers">
            <AdminDataTable
              rows={suppliers}
              columns={SUPPLIER_COLUMNS}
              getRowId={(r) => r.no}
              getSearchText={(r) => [r.supplier_code, r.name_kor, r.name_eng, r.country, r.region].filter(Boolean).join(' ')}
              selectable={false}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
