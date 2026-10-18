const LOCK_CLASS = 'scroll-locked'

// Блокирует прокрутку страницы; ширину полосы прокрутки компенсирует отступом,
// чтобы контент не прыгал. Повторные вызовы безопасны.
export function lockScroll() {
  const root = document.documentElement
  if (root.classList.contains(LOCK_CLASS)) return

  const scrollbar = window.innerWidth - root.clientWidth
  root.style.setProperty('--scrollbar-comp', `${scrollbar}px`)
  root.classList.add(LOCK_CLASS)
}

export function unlockScroll() {
  const root = document.documentElement
  root.classList.remove(LOCK_CLASS)
  root.style.removeProperty('--scrollbar-comp')
}
