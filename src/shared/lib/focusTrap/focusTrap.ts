const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.getClientRects().length > 0
  )
}

// Зацикливает Tab / Shift+Tab внутри контейнеров (по порядку: например, шапка с кнопкой меню + меню)
export function trapTabKey(event: KeyboardEvent, containers: HTMLElement[]) {
  if (event.key !== 'Tab') return

  const items = containers.flatMap(getFocusable)
  const first = items[0]
  const last = items[items.length - 1]
  if (!first || !last) return

  const active = document.activeElement
  const inside = containers.some((container) => container.contains(active))
  if (event.shiftKey && (active === first || !inside)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && (active === last || !inside)) {
    event.preventDefault()
    first.focus()
  }
}

// Делает inert всё содержимое body, кроме веток с контейнерами. Возвращает функцию отмены.
export function inertOutside(containers: HTMLElement[]): () => void {
  const changed: HTMLElement[] = []

  for (const child of Array.from(document.body.children)) {
    const keep = containers.some((container) => child.contains(container))
    if (child instanceof HTMLElement && !keep && !child.hasAttribute('inert')) {
      child.setAttribute('inert', '')
      changed.push(child)
    }
  }

  return () => changed.forEach((el) => el.removeAttribute('inert'))
}
