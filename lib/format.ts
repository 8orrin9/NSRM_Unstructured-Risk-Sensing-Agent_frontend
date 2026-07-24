export function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatDateTime(iso: string) {
  // "MM.DD HH:mm" (예: "06.25 06:00"). 날짜만 있는 값도 방어적으로 처리.
  const d = new Date(iso)
  const datePart = d.toLocaleDateString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
  }).replace(/\.\s?/g, '.').replace(/\.$/, '')
  const timePart = d.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return `${datePart} ${timePart}`
}

export function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

export function timeBucket(iso: string): { key: string; ko: string; en: string } {
  const h = new Date(iso).getHours()
  if (h < 6) return { key: 'dawn', ko: '새벽 (00–06시)', en: 'Overnight' }
  if (h < 9) return { key: 'morning', ko: '오전 (06–09시)', en: 'Early Morning' }
  if (h < 12) return { key: 'forenoon', ko: '오전 (09–12시)', en: 'Forenoon' }
  if (h < 18) return { key: 'afternoon', ko: '오후 (12–18시)', en: 'Afternoon' }
  return { key: 'evening', ko: '저녁 (18–24시)', en: 'Evening' }
}
