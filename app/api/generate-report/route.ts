import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { NEWS } from '@/lib/news'
import { getEntity } from '@/lib/entities'
import { RISK_CATEGORIES, SEVERITY_META } from '@/lib/risk-config'

export const maxDuration = 30

interface Body {
  newsIds: string[]
  recipient?: string
  sender?: string
  tone?: string
  instruction?: string
}

export async function POST(req: Request) {
  const { newsIds, recipient, sender, tone, instruction }: Body = await req.json()

  const selected = NEWS.filter((n) => newsIds.includes(n.id))
  if (selected.length === 0) {
    return new Response('선택된 뉴스가 없습니다.', { status: 400 })
  }

  // 프로젝트에 여러 OPENAI_API_KEY 변수가 있을 수 있으므로 유효한(sk-로 시작) 키를 선택
  const candidateKeys = [
    process.env.OPENAI_API_KEY,
    process.env.OPENAI_API_KEY_2,
    process.env.OPENAI_API_KEY_3,
  ].filter(Boolean) as string[]

  if (candidateKeys.length === 0) {
    return new Response(
      'OPENAI_API_KEY 환경 변수가 설정되지 않았습니다. 프로젝트 설정에서 키를 추가해 주세요.',
      { status: 400 },
    )
  }

  const apiKey = candidateKeys.find((k) => k.startsWith('sk-'))
  if (!apiKey) {
    return new Response(
      "등록된 OpenAI 키가 올바르지 않습니다. OpenAI 시크릿 키는 'sk-' 로 시작해야 합니다. 프로젝트 설정(Vars)에서 유효한 키를 입력해 주세요.",
      { status: 400 },
    )
  }

  const openai = createOpenAI({ apiKey })

  const context = selected
    .map((n, i) => {
      const entities = n.relatedEntityIds
        .map((id) => getEntity(id)?.nameKo)
        .filter(Boolean)
        .join(', ')
      return `[뉴스 ${i + 1}]
- 제목: ${n.title}
- 카테고리: ${RISK_CATEGORIES[n.category].ko}
- 심각도: ${SEVERITY_META[n.severity].ko} (영향도 ${n.impactScore}/100)
- 출처: ${n.source}
- 관련 공급망 거점: ${entities || '없음'}
- 요약: ${n.summary}
- 상세: ${n.detail}`
    })
    .join('\n\n')

  const system = `당신은 글로벌 반도체 제조사의 공급망 리스크 관리(SCRM) 애널리스트입니다.
수집된 리스크 뉴스를 바탕으로 경영진에게 보고할 간결하고 실행 가능한 리포트 초안을 작성합니다.
- 반드시 한국어로 작성합니다.
- 출력은 Markdown 형식입니다.
- 다음 구조를 따릅니다:
  # 공급망 리스크 리포트
  ## 1. 핵심 요약 (Executive Summary) — 3~4문장
  ## 2. 주요 리스크 상세 — 뉴스별 소제목과 영향 분석
  ## 3. 공급망 영향 평가 — 관련 거점/의존도 관점
  ## 4. 권고 조치 (Recommended Actions)
- 번호 목록(1., 2., 3. ...)의 각 항목은 한 줄짜리 핵심 제목으로 쓰고,
  구체적인 실행 내용·근거·기한 등은 반드시 그 번호 항목 아래에 들여쓴 불렛포인트(- )로 2~4개씩 작성합니다.
  예시:
  1. **단기 대응 (0~2주)**
     - 대체 공급사 A/B에 긴급 견적 요청
     - 안전재고 4주분 확보 검토
- 과장 없이 사실 기반으로, 불확실성은 명시합니다.`

  const prompt = `아래는 오늘 수집된 공급망 리스크 뉴스입니다.
${sender ? `\n발신: ${sender}` : ''}${recipient ? `\n수신: ${recipient}` : ''}${tone ? `\n작성 톤: ${tone}` : ''}${instruction ? `\n추가 지시사항: ${instruction}` : ''}

${context}

위 내용을 종합하여 리포트 초안을 Markdown으로 작성하세요.`

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system,
    prompt,
    temperature: 0.4,
    onError: ({ error }) => {
      console.log('[v0] generate-report stream error:', error)
    },
  })

  return result.toTextStreamResponse()
}
