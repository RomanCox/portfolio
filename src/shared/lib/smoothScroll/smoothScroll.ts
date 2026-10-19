import type { MouseEvent } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

// Плавная прокрутка к якорю на текущей странице вместо перескока.
// Не через глобальный scroll-behavior: smooth — он мешает ScrollTrigger восстанавливать позицию.
// Если раздела на странице нет (например, со страницы резюме) или клик с модификатором —
// ссылка работает как обычно.
export function scrollToAnchor(event: MouseEvent<HTMLAnchorElement>, id: string) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const target = document.getElementById(id)
  if (!target) return

  event.preventDefault()
  const smooth = !window.matchMedia(REDUCED_MOTION).matches
  target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
  history.pushState(null, '', `#${id}`)
}
