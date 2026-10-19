'use client'

import { useSyncExternalStore } from 'react'

export type ScrollDirection = 'down' | 'up'

// Смена направления — только после прокрутки в обратную сторону на столько пикселей
// (не дёргаться от инерции и мелких рывков тачпада)
const THRESHOLD_PX = 8

let direction: ScrollDirection = 'down'
let anchor = 0
const listeners = new Set<() => void>()

function onScroll() {
  const y = window.scrollY
  // anchor — крайняя точка в текущем направлении; разворот — когда ушли от неё назад дальше порога
  const reversed = direction === 'down' ? y < anchor - THRESHOLD_PX : y > anchor + THRESHOLD_PX
  if (!reversed) {
    anchor = direction === 'down' ? Math.max(anchor, y) : Math.min(anchor, y)
    return
  }
  direction = direction === 'down' ? 'up' : 'down'
  anchor = y
  listeners.forEach((listener) => listener())
}

// Один обработчик прокрутки на всех подписчиков
function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    anchor = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
  }
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener('scroll', onScroll)
  }
}

// Направление прокрутки страницы; до первой прокрутки и на сервере — 'down'
export function useScrollDirection(): ScrollDirection {
  return useSyncExternalStore(
    subscribe,
    () => direction,
    () => 'down',
  )
}
