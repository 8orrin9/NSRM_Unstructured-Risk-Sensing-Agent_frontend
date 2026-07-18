'use client'

import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import type { SupplyEntity } from '@/lib/types'
import { SEVERITY_HEX } from '@/lib/risk-config'

function markerIcon(entity: SupplyEntity & { maxSeverity?: 'critical' | 'high' | 'medium' | 'low' }, selected: boolean, highlighted: boolean) {
  // 관련 뉴스의 최고 심각도로 색상 결정
  const sev = entity.maxSeverity || 'low'
  const color = SEVERITY_HEX[sev]
  const size = entity.type === 'site' ? 16 : 13
  const pulse = (sev === 'critical' || sev === 'high') ? 'risk-marker-pulse' : ''
  const extraStyle = selected
    ? 'box-shadow:0 0 0 5px rgba(26,47,138,0.5),0 0 12px rgba(26,47,138,0.3);transform:scale(1.15);'
    : highlighted
    ? 'box-shadow:0 0 0 4px rgba(255,180,0,0.9),0 0 14px rgba(255,180,0,0.5);transform:scale(1.2);opacity:1;'
    : !selected && !highlighted
    ? 'opacity:0.2;filter:grayscale(70%);'
    : ''

  return L.divIcon({
    className: '',
    html: `<div class="risk-marker ${pulse}" style="width:${size}px;height:${size}px;background:${color};color:${color};position:relative;${extraStyle}"></div>`,
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

// 줌 레벨 추적 — 일정 이상 줌 인 되면 거점/공급사명 상시 표시
function ZoomWatcher({ onZoom }: { onZoom: (z: number) => void }) {
  const map = useMapEvents({
    zoomend: () => onZoom(map.getZoom()),
  })
  return null
}

// 이 줌 레벨 이상이면 이름 라벨을 상시 표시, 그 이하면 마우스 오버 시에만
const LABEL_ZOOM_THRESHOLD = 4

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
  const [zoom, setZoom] = useState(2)
  const showLabels = zoom >= LABEL_ZOOM_THRESHOLD

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
      <ZoomWatcher onZoom={setZoom} />
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
            {/* 줌 인 시 상시 표시(permanent), 그 외에는 마우스 오버 시 표시 */}
            <Tooltip
              key={showLabels ? 'perm' : 'hover'}
              permanent={showLabels}
              direction="right"
              offset={[6, 0]}
              className="risk-marker-label"
            >
              <span style={{ fontSize: 11, fontWeight: 600 }}>{e.nameKo}</span>
            </Tooltip>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
