'use client'

import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { SupplyEntity } from '@/lib/types'
import { SEVERITY_HEX } from '@/lib/risk-config'

function markerIcon(entity: SupplyEntity & { maxSeverity?: 'critical' | 'high' | 'medium' | 'low' }, selected: boolean, highlighted: boolean) {
  // 관련 뉴스의 최고 심각도로 색상 결정
  const sev = entity.maxSeverity || 'low'
  const color = SEVERITY_HEX[sev]
  const size = entity.type === 'site' ? 34 : 28
  const pulse = (sev === 'critical' || sev === 'high') ? 'risk-marker-pulse' : ''
  const extraStyle = selected
    ? 'box-shadow:0 0 0 5px rgba(26,47,138,0.5),0 0 12px rgba(26,47,138,0.3);transform:scale(1.15);'
    : highlighted
    ? 'box-shadow:0 0 0 4px rgba(255,180,0,0.9),0 0 14px rgba(255,180,0,0.5);transform:scale(1.2);opacity:1;'
    : !selected && !highlighted
    ? 'opacity:0.2;filter:grayscale(70%);'
    : ''
  const newsCount = entity.activeRiskIds?.length || 0
  // Show star for sites, or number for suppliers
  const displayText = entity.type === 'site' ? '★' : newsCount

  return L.divIcon({
    className: '',
    html: `<div class="risk-marker ${pulse}" style="width:${size}px;height:${size}px;background:${color};color:${color};font-size:11px;position:relative;${extraStyle}">
      <span style="color:#fff;">${displayText}</span>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function FlyTo({ entity }: { entity: SupplyEntity | null }) {
  const map = useMap()
  useEffect(() => {
    if (entity) {
      map.flyTo([entity.lat, entity.lng], 4, { duration: 0.8 })
    }
  }, [entity, map])
  return null
}

export default function RiskMap({
  entities,
  allNews,
  selectedId,
  highlightedIds,
  onSelect,
}: {
  entities: SupplyEntity[]
  allNews: import('@/lib/types').NewsItem[]
  selectedId: string | null
  highlightedIds?: string[]
  onSelect: (id: string) => void
}) {
  const selected = useMemo(
    () => entities.find((e) => e.id === selectedId) ?? null,
    [entities, selectedId],
  )

  // Calculate news count and max severity for each entity
  const entitiesWithCounts = useMemo(() => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }

    const result = entities.map(entity => {
      const relatedNews = allNews.filter(news => news.relatedEntityIds.includes(entity.id))
      const activeRiskIds = relatedNews.map(news => news.id)

      // 관련 뉴스 중 가장 높은 심각도 찾기
      let maxSeverity: 'critical' | 'high' | 'medium' | 'low' = 'low'
      relatedNews.forEach(news => {
        if (severityOrder[news.severity] < severityOrder[maxSeverity]) {
          maxSeverity = news.severity
        }
      })

      // Debug log for first 3 entities
      if (entities.indexOf(entity) < 3) {
        console.log(`[RiskMap] ${entity.id}: ${activeRiskIds.length} news, max severity: ${maxSeverity}`)
      }

      return {
        ...entity,
        activeRiskIds,
        maxSeverity,
      }
    })

    console.log(`[RiskMap] Total news: ${allNews.length}, Entities: ${entities.length}`)
    return result
  }, [entities, allNews])

  const hasHighlight = highlightedIds && highlightedIds.length > 0

  return (
    <MapContainer
      center={[30, 90]}
      zoom={2}
      minZoom={2}
      maxZoom={7}
      scrollWheelZoom
      worldCopyJump
      className="h-full w-full"
      style={{ background: 'oklch(0.94 0.01 250)' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <FlyTo entity={selected} />
      {entitiesWithCounts.map((e) => {
        const isSelected = e.id === selectedId
        const isHighlighted = hasHighlight ? (highlightedIds!.includes(e.id)) : true
        return (
          <Marker
            key={e.id}
            position={[e.lat, e.lng]}
            icon={markerIcon(e, isSelected, isHighlighted)}
            eventHandlers={{ click: () => onSelect(e.id) }}
          >
            <Tooltip direction="top" offset={[0, -14]}>
              <div style={{ fontSize: 12 }}>
                <strong>{e.nameKo}</strong>
                <br />
                {e.city}, {e.country}
              </div>
            </Tooltip>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
