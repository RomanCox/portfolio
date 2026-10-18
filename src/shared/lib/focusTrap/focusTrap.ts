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

// Зацикливает Tab / Shift+Tab внутри контейнера
export function trapTabKey(event: KeyboardEvent, container: HTMLElement) {
  if (event.key !== 'Tab') return

  const items = getFocusable(container)
  const first = items[0]
  const last = items[items.length - 1]
  if (!first || !last) return

  const active = document.activeElement
  if (event.shiftKey && (active === first || !container.contains(active))) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && (active === last || !container.contains(active))) {
    event.preventDefault()
    first.focus()
  }
}

// Делает inert всё содержимое body, кроме ветки с контейнером. Возвращает функцию отмены.
export function inertOutside(container: HTMLElement): () => void {
  const changed: HTMLElement[] = []

  for (const child of Array.from(document.body.children)) {
    if (child instanceof HTMLElement && !child.contains(container) && !child.hasAttribute('inert')) {
      child.setAttribute('inert', '')
      changed.push(child)
    }
  }

  return () => changed.forEach((el) => el.removeAttribute('inert'))
}
