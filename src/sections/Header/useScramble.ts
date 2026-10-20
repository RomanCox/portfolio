'use client'

import { animate, type AnimationPlaybackControls } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

// Расшифровка подписи у логотипа (ТЗ, «Открытие / закрытие меню»): 14 шагов по 30 мс.
// Длина строки перетекает к целевой за первые 60% шагов, символы слева направо фиксируются,
// остальные — случайные глифы.
const GLYPHS = '▓▒░#%&@01<>/;_'
const STEPS = 14
const STEP_MS = 30
const LENGTH_SHARE = 0.6
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function frame(from: string, target: string, step: number) {
  const progress = Math.min(1, step / (STEPS * LENGTH_SHARE))
  const length = Math.round(from.length + (target.length - from.length) * progress)
  const reveal = Math.floor((target.length * step) / STEPS)
  let out = ''
  for (let i = 0; i < length; i++) {
    const char = target[i]
    if (i < reveal && char !== undefined) out += char
    else if (char === ' ') out += ' '
    else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
  }
  return out
}

// Текст, который можно «перешифровать» в другой. Повторный запуск идёт от текущего кадра.
export function useScramble(initial: string) {
  const [text, setText] = useState(initial)
  const textRef = useRef(initial)
  const controlsRef = useRef<AnimationPlaybackControls | null>(null)

  const show = useCallback((value: string) => {
    textRef.current = value
    setText(value)
  }, [])

  const scrambleTo = useCallback(
    (target: string) => {
      controlsRef.current?.stop()
      const from = textRef.current
      if (window.matchMedia(REDUCED_MOTION).matches) {
        show(target)
        return
      }

      let shown = 0
      controlsRef.current = animate(0, STEPS, {
        duration: (STEPS * STEP_MS) / 1000,
        ease: 'linear',
        onUpdate: (value) => {
          // кадр меняется раз в шаг, а не каждый кадр отрисовки
          const step = Math.min(STEPS - 1, Math.floor(value) + 1)
          if (step === shown) return
          shown = step
          show(frame(from, target, step))
        },
        onComplete: () => show(target),
      })
    },
    [show],
  )

  useEffect(() => () => controlsRef.current?.stop(), [])

  return { text, scrambleTo }
}
