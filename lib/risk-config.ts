import type { RiskCategory, RiskCategoryMeta, RiskFactor, RiskFactorMeta, Severity } from './types'

export const RISK_CATEGORIES: Record<RiskCategory, RiskCategoryMeta> = {
  geopolitical: { id: 'geopolitical', ko: '지정학 & 규제', en: 'Geopolitical & Regulatory' },
  supply: { id: 'supply', ko: '공급집중 & 단일소싱', en: 'Supply Concentration' },
  material: { id: 'material', ko: '원자재 & 희소물질', en: 'Raw Material' },
  tech: { id: 'tech', ko: '기술 & 지식재산', en: 'Technology & IP' },
  logistics: { id: 'logistics', ko: '물류 & 인프라', en: 'Logistics & Infrastructure' },
  cyber: { id: 'cyber', ko: '사이버 & 데이터', en: 'Cyber & Data' },
  esg: { id: 'esg', ko: 'ESG & Compliance', en: 'ESG & Compliance' },
  financial: { id: 'financial', ko: '재무 & 신용', en: 'Financial & Credit' },
  disaster: { id: 'disaster', ko: '자연재해 & 기후', en: 'Natural Disaster & Climate' },
}

export const SEVERITY_META: Record<
  Severity,
  { ko: string; en: string; order: number; token: string }
> = {
  critical: { ko: '심각', en: 'Critical', order: 0, token: 'risk-critical' },
  high: { ko: '높음', en: 'High', order: 1, token: 'risk-high' },
  medium: { ko: '보통', en: 'Medium', order: 2, token: 'risk-medium' },
  low: { ko: '낮음', en: 'Low', order: 3, token: 'risk-low' },
}

export function severityClasses(sev: Severity) {
  switch (sev) {
    case 'critical':
      return {
        text: 'text-risk-critical',
        bg: 'bg-risk-critical-bg',
        dot: 'bg-risk-critical',
        border: 'border-risk-critical/40',
      }
    case 'high':
      return {
        text: 'text-risk-high',
        bg: 'bg-risk-high-bg',
        dot: 'bg-risk-high',
        border: 'border-risk-high/40',
      }
    case 'medium':
      return {
        text: 'text-risk-medium',
        bg: 'bg-risk-medium-bg',
        dot: 'bg-risk-medium',
        border: 'border-risk-medium/40',
      }
    case 'low':
      return {
        text: 'text-risk-low',
        bg: 'bg-risk-low-bg',
        dot: 'bg-risk-low',
        border: 'border-risk-low/40',
      }
  }
}

export const RISK_FACTORS: Record<RiskFactor, RiskFactorMeta> = {
  geopolitical_regulatory: {
    id: 'geopolitical_regulatory',
    ko: '지정학 & 규제',
    en: 'Geopolitical & Regulatory',
    categories: ['geopolitical'],
  },
  supply_singlesource: {
    id: 'supply_singlesource',
    ko: '공급 집중 & 단일소싱',
    en: 'Supply Concentration & Single Sourcing',
    categories: ['supply'],
  },
  rawmaterial_critical: {
    id: 'rawmaterial_critical',
    ko: '원자재 & 희소물질',
    en: 'Raw Material & Critical Minerals',
    categories: ['material'],
  },
  tech_ip: {
    id: 'tech_ip',
    ko: '기술 & 지식재산',
    en: 'Technology & IP',
    categories: ['tech'],
  },
  logistics_infra: {
    id: 'logistics_infra',
    ko: '물류 & 인프라',
    en: 'Logistics & Infrastructure',
    categories: ['logistics'],
  },
  cyber_data: {
    id: 'cyber_data',
    ko: '사이버 & 데이터',
    en: 'Cyber & Data',
    categories: ['cyber'],
  },
  esg_compliance: {
    id: 'esg_compliance',
    ko: 'ESG & Compliance',
    en: 'ESG & Compliance',
    categories: ['esg'],
  },
  financial_credit: {
    id: 'financial_credit',
    ko: '재무 & 신용',
    en: 'Financial & Credit',
    categories: ['financial'],
  },
  disaster_climate: {
    id: 'disaster_climate',
    ko: '자연재해 & 기후',
    en: 'Natural Disaster & Climate',
    categories: ['disaster'],
  },
}

export const SEVERITY_HEX: Record<Severity, string> = {
  critical: '#c0392b',
  high: '#e07b1a',
  medium: '#d4a017',
  low: '#2e9e5b',
}

export const CATEGORY_COLORS: Record<RiskCategory, {
  border: string
  bg: string
  text: string
  token: string
}> = {
  geopolitical: {
    border: 'border-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    token: 'blue-500'
  },
  supply: {
    border: 'border-purple-500',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    token: 'purple-500'
  },
  material: {
    border: 'border-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    token: 'amber-500'
  },
  tech: {
    border: 'border-cyan-500',
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    token: 'cyan-500'
  },
  logistics: {
    border: 'border-orange-500',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    token: 'orange-500'
  },
  cyber: {
    border: 'border-red-500',
    bg: 'bg-red-50',
    text: 'text-red-700',
    token: 'red-500'
  },
  esg: {
    border: 'border-green-500',
    bg: 'bg-green-50',
    text: 'text-green-700',
    token: 'green-500'
  },
  financial: {
    border: 'border-indigo-500',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    token: 'indigo-500'
  },
  disaster: {
    border: 'border-rose-500',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    token: 'rose-500'
  },
}
