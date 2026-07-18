import type { NewsItem, NewsGroup } from './types'

// Collected news for the daily brief (PoC data) — 2026-07-08
export const NEWS: NewsItem[] = [
  {
    id: 'n01',
    title: '대만해협 군사 훈련 확대…신주 과학단지 물류 지연 우려',
    source: 'Reuters',
    publishedAt: '2026-07-08T08:12:00+09:00',
    category: 'geopolitical',
    severity: 'critical',
    summary:
      '중국군의 대규모 해상 훈련으로 대만 신주 지역 항만·공항 운영이 부분 통제되며 반도체 부품 반출입 지연 가능성이 제기됨.',
    detail:
      '중국 인민해방군이 7월 8일부터 대만해협 인근에서 대규모 실사격 훈련을 예고했다. 대만 정부는 가오슝·타이베이 인근 일부 항로와 영공을 임시 통제한다고 발표했다. TSMC 신주 본사와 인근 협력사(Entegris 등)의 자재 반출입에 최대 3~5일의 지연이 예상되며, CoWoS 첨단 패키징 라인의 출하 스케줄에 영향이 우려된다. 우리 파운드리 위탁물량의 62%가 대만에 집중되어 있어 단기 공급 차질 리스크가 높다.',
    keywords: ['대만해협', '군사훈련', '항만통제', 'TSMC', 'CoWoS'],
    relatedEntityIds: ['tsmc', 'entegris'],
    region: 'Taiwan',
    url: 'https://example.com/news/taiwan-strait',
    impactScore: 92,
  },
  {
    id: 'n02',
    title: '네덜란드, EUV 장비 대중 수출통제 추가 확대 검토',
    source: 'Bloomberg',
    publishedAt: '2026-07-08T07:40:00+09:00',
    category: 'geopolitical',
    severity: 'high',
    summary:
      '네덜란드 정부가 미국과 조율해 EUV·심자외선(DUV) 장비의 수출 허가 범위를 추가 축소하는 방안을 논의 중.',
    detail:
      'ASML 장비의 수출 허가 절차가 강화되면 유지보수 부품 및 신규 장비 리드타임이 늘어날 수 있다. 당사는 EUV 장비를 100% ASML에 의존하고 있어, 규제 변화가 증설 로드맵과 직접 연결된다. 특히 서비스 엔지니어 파견 및 스페어 파트 공급 지연 시 가동률 하락 가능성이 있다.',
    keywords: ['ASML', 'EUV', '수출통제', '리드타임'],
    relatedEntityIds: ['asml'],
    region: 'Netherlands',
    url: 'https://example.com/news/asml-export',
    impactScore: 74,
  },
  {
    id: 'n03',
    title: '일본 후쿠시마현 규모 5.8 지진…신에츠 시라카와 공장 가동 점검',
    source: 'NHK',
    publishedAt: '2026-07-08T06:55:00+09:00',
    category: 'disaster',
    severity: 'critical',
    summary:
      '후쿠시마현 인근에서 규모 5.8 지진이 발생해 신에츠화학 시라카와 웨이퍼 공장이 안전 점검을 위해 일시 가동을 중단.',
    detail:
      '7월 8일 새벽 후쿠시마현 앞바다에서 규모 5.8 지진이 발생했다. 신에츠화학은 시라카와 300mm 웨이퍼 라인과 EUV 포토레지스트 라인의 안전 점검을 위해 일시 가동 중단에 들어갔다. 초기 육안 점검상 설비 피해는 제한적이나, 클린룸 파티클 재검증에 24~72시간이 소요될 수 있다. 당사 웨이퍼 수급의 34%를 신에츠에 의존하고 있어 재고 버퍼(약 2주) 소진 전 복구 여부가 관건이다.',
    keywords: ['지진', '후쿠시마', '신에츠', '웨이퍼', '가동중단'],
    relatedEntityIds: ['shinetsu'],
    region: 'Japan',
    url: 'https://example.com/news/fukushima-quake',
    impactScore: 88,
  },
  {
    id: 'n05',
    title: '우크라이나 오데사 인근 공습…네온가스 정제시설 가동 차질',
    source: 'AP',
    publishedAt: '2026-07-08T05:20:00+09:00',
    category: 'geopolitical',
    severity: 'high',
    summary:
      '오데사 인근 산업시설 공습으로 반도체용 네온가스 정제 물량이 감소, 스팟 가격 급등 조짐.',
    detail:
      '반도체 노광 공정(엑시머 레이저)에 필수적인 네온가스의 주요 정제 거점이 있는 우크라이나 오데사 인근이 공습을 받았다. 세계 반도체용 네온 공급의 상당 부분이 우크라이나에 집중되어 있어, 스팟 가격이 전주 대비 30% 이상 급등할 것으로 전망된다. 당사는 네온 수급의 24%를 우크라이나 소스에 의존하고 있으며, 대체 소스(중국·미국) 확보 및 리사이클링 확대가 필요하다.',
    keywords: ['네온가스', '우크라이나', '오데사', '가격급등'],
    relatedEntityIds: ['neon-ua', 'samsung-giheung'],
    region: 'Ukraine',
    url: 'https://example.com/news/neon-supply',
    impactScore: 71,
  },
  {
    id: 'n07',
    title: '미국, 첨단 반도체 장비 대중 규제에 동맹국 동참 압박',
    source: 'WSJ',
    publishedAt: '2026-07-08T04:10:00+09:00',
    category: 'geopolitical',
    severity: 'medium',
    summary:
      '미 상무부가 Applied Materials 등 자국 장비사의 대중 판매 제한을 강화하고 동맹국에 동참을 요청.',
    detail:
      '미국의 대중 장비 규제 강화 기조가 지속되면서, Applied Materials·TSMC 등 글로벌 밸류체인 전반에 정책 불확실성이 확대되고 있다. 직접적 단기 영향은 제한적이나, 장비 조달·기술 지원의 지정학적 변수로 모니터링이 필요하다.',
    keywords: ['미국', '수출규제', 'AMAT', '동맹국'],
    relatedEntityIds: ['amat', 'tsmc'],
    region: 'United States',
    url: 'https://example.com/news/us-export-controls',
    impactScore: 58,
  },
  {
    id: 'n09',
    title: '국내 반도체 협력사 노조, 임금협상 결렬…부분 파업 예고',
    source: '연합뉴스',
    publishedAt: '2026-07-08T09:30:00+09:00',
    category: 'esg',
    severity: 'medium',
    summary:
      '기흥 캠퍼스 인근 1차 협력사 노조가 임금협상 결렬로 다음 주 부분 파업을 예고, 일부 소재 납품 지연 가능성.',
    detail:
      '기흥 캠퍼스 인근 소재·부품 1차 협력사 노조가 임금·복지 협상 결렬을 선언하고 다음 주 부분 파업을 예고했다. 파업이 현실화될 경우 일부 소모성 자재 및 부품 납품이 지연될 수 있으나, 협력사 다변화로 라인 정지 가능성은 낮은 것으로 평가된다.',
    keywords: ['노조', '파업', '협력사', '기흥'],
    relatedEntityIds: ['samsung-giheung'],
    region: 'South Korea',
    url: 'https://example.com/news/labor-strike',
    impactScore: 46,
  },
  {
    id: 'n11',
    title: '日 포토레지스트 3사, EUV용 소재 증설 발표…중장기 공급 안정',
    source: 'Nikkei',
    publishedAt: '2026-07-08T10:05:00+09:00',
    category: 'material',
    severity: 'low',
    summary:
      '신에츠·JSR·TOK 등 일본 포토레지스트 업체가 EUV용 레지스트 생산능력 증설 계획을 발표.',
    detail:
      '일본 주요 포토레지스트 3사가 2027년까지 EUV용 레지스트 생산능력을 30% 이상 확대하겠다고 발표했다. 중장기적으로 첨단 노광 소재의 공급 안정성이 개선될 전망이며, 당사의 EUV 레지스트 이원화 전략에도 긍정적이다. 단기 리스크 요인은 아니나 소싱 전략 수립 시 참고할 긍정 신호다.',
    keywords: ['포토레지스트', 'EUV', '증설', 'JSR', '신에츠'],
    relatedEntityIds: ['shinetsu', 'jsr'],
    region: 'Japan',
    url: 'https://example.com/news/photoresist-expansion',
    impactScore: 22,
  },
  {
    id: 'n12',
    title: '싱가포르 해협 물동량 급증…아시아-유럽 컨테이너 운임 상승',
    source: 'Splash247',
    publishedAt: '2026-07-08T03:15:00+09:00',
    category: 'logistics',
    severity: 'medium',
    summary:
      '홍해 우회 장기화로 아시아-유럽 노선 운임이 상승, 유럽발 소재(머크) 리드타임 증가 우려.',
    detail:
      '홍해 항로 우회가 장기화되면서 아시아-유럽 컨테이너 운임이 전월 대비 15% 상승했다. 독일 머크 등 유럽발 특수 화학소재의 해상 운송 리드타임이 ���어날 수 있어, 긴급 물량은 항공 전환 검토가 필요하다.',
    keywords: ['물류', '운임', '홍해', '리드타임', '머크'],
    relatedEntityIds: ['merck'],
    region: 'Global',
    url: 'https://example.com/news/shipping-rates',
    impactScore: 44,
  },
  {
    id: 'n13',
    title: '엔테그리스, 대만 가오슝 CMP 슬러리 신규 라인 인증 완료',
    source: 'DigiTimes',
    publishedAt: '2026-07-08T02:40:00+09:00',
    category: 'material',
    severity: 'low',
    summary:
      '엔테그리스가 가오슝 CMP 슬러리 신규 라인의 고객 인증을 완료, 공급 여력 확대.',
    detail:
      '엔테그리스가 가오슝 CMP 슬러리 신규 라인의 품질 인증을 완료하고 양산에 돌입했다. 첨단 공정용 슬러리 공급 여력이 확대되어 수급 안정성이 개선될 전망이다.',
    keywords: ['엔테그리스', 'CMP', '슬러리', '가오슝'],
    relatedEntityIds: ['entegris'],
    region: 'Taiwan',
    url: 'https://example.com/news/entegris-line',
    impactScore: 18,
  },
  {
    id: 'n14',
    title: '글로벌 장비사 대상 랜섬웨어 캠페인 확산…공급망 보안 경보',
    source: 'BleepingComputer',
    publishedAt: '2026-07-08T01:05:00+09:00',
    category: 'cyber',
    severity: 'high',
    summary:
      '반도체 장비·소재 협력사를 표적으로 한 랜섬웨어 공격이 확산되며 데이터·납기 리스크 경보.',
    detail:
      '최근 반도체 장비·소재 협력사를 노린 랜섬웨어 캠페인이 확산되고 있다. 감염 시 생산관리시스템(MES) 마비로 납기 지연이 발생할 수 있어, 주요 1차 협력사에 대한 보안 점검과 이중화 백업 상태 확인이 요구된다.',
    keywords: ['랜섬웨어', '사이버보안', 'MES', '공급망보안'],
    relatedEntityIds: ['tel', 'amat', 'hoya'],
    region: 'Global',
    url: 'https://example.com/news/ransomware',
    impactScore: 63,
  },
  {
    id: 'n15',
    title: '대만 신주·가오슝 항만 부분 통제 개시…선적 대기 급증',
    source: 'Reuters',
    publishedAt: '2026-07-08T08:48:00+09:00',
    category: 'logistics',
    severity: 'high',
    summary:
      '대만 당국이 군사 훈련에 따라 신주·가오슝 일부 항만 운영을 통제하면서 반도체 화물 선적 대기가 급증.',
    detail:
      '대만해협 훈련이 본격화되며 대만 당국이 신주·가오슝 항만의 일부 선석 운영을 통제하기 시작했다. 반도체 완제품·부자재 컨테이너의 선적 대기가 평시 대비 2배 이상으로 늘었고, 항공 화물 전환 수요가 급증하고 있다. 앞서 예고된 물류 지연이 현실화되는 단계로, 신주 과학단지 협력사들의 자재 반입 차질이 확대될 전망이다.',
    keywords: ['가오슝', '신주', '항만통제', '선적지연', '항공전환'],
    relatedEntityIds: ['tsmc', 'entegris'],
    region: 'Taiwan',
    url: 'https://example.com/news/taiwan-port-control',
    impactScore: 85,
  },
  {
    id: 'n16',
    title: 'TSMC, CoWoS 출하 스케줄 조정 검토 착수',
    source: 'DigiTimes',
    publishedAt: '2026-07-08T09:22:00+09:00',
    category: 'geopolitical',
    severity: 'high',
    summary:
      'TSMC가 대만해협 긴장에 따른 물류 차질에 대비해 CoWoS 첨단 패키징 출하 스케줄 조정을 검토.',
    detail:
      'TSMC가 대만해협 긴장 고조와 항만 통제에 대응해 CoWoS 첨단 패키징 물량의 출하 스케줄 조정을 내부 검토하기 시작했다. 고객사에는 최대 3~5일의 출하 지연 가능성이 사전 공지된 것으로 알려졌다. 당사 파운드리 위탁물량의 상당 부분이 영향권에 있어, 대체 패키징 캐파 확보와 재고 우선순위 재조정이 필요하다.',
    keywords: ['TSMC', 'CoWoS', '출하지연', '패키징', '파운드리'],
    relatedEntityIds: ['tsmc'],
    region: 'Taiwan',
    url: 'https://example.com/news/tsmc-cowos',
    impactScore: 80,
  },
]

// Risk 관점 연관 뉴스 자동 그룹 (백엔드 그룹화 로직 결과를 모사)
export const NEWS_GROUPS: NewsGroup[] = [
  {
    id: 'g1',
    title: '대만해협 군사 훈련 확대에 따른 공급망 영향',
    // 시간순: 훈련 예고 → 항만 통제 → 출하 스케줄 조정
    newsIds: ['n01', 'n15', 'n16'],
    rationale:
      '동일 사건(대만해협 군사 훈련)이 물류 통제 → 파운드리 출하 영향으로 확산되는 전개 과정을 하나의 리스크로 묶었습니다. 대만 집중 위탁물량이 커 그룹 전체를 심각 리스크로 판단합니다.',
    status: 'active',
  },
  {
    id: 'g2',
    title: '대중 반도체 장비 수출통제 강화 동향',
    newsIds: ['n07', 'n02'],
    rationale:
      '미국·네덜란드가 공조하는 동일 정책 축(대중 첨단 장비 수출통제)에 대한 뉴스로, EUV/DUV 장비 조달 리드타임과 증설 로드맵에 연계되는 규제 리스크입니다.',
    status: 'active',
  },
  {
    id: 'g3',
    title: '일본 소재 공급 안정성 (지진 리스크 vs 증설)',
    newsIds: ['n03', 'n11'],
    rationale:
      '일본 소재 공급이라는 동일 축에서 단기 리스크(후쿠시마 지진에 따른 신에츠 가동 중단)와 중장기 완화 신호(포토레지스트 증설)를 함께 모니터링하기 위해 묶었습니다.',
    status: 'active',
  },
]

export function getGroup(id: string) {
  return NEWS_GROUPS.find((g) => g.id === id)
}

export function getGroupForNews(newsId: string) {
  return NEWS_GROUPS.find((g) => g.newsIds.includes(newsId))
}

export function getNews(id: string) {
  return NEWS.find((n) => n.id === id)
}
