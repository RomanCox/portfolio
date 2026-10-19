'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './DecodeText.module.scss'

// Раскадровка (по артборду «Заголовки», медленнее): сначала только помехи,
// через FIRST_SETTLE_MS фиксируется 1-й символ, дальше по STEP_MS на символ слева направо,
// в конце короткий глитч-сдвиг. «Навыки.» — ~0,9 с; длинные строки укладываются в MAX_TOTAL_MS
// (буквы фиксируются чаще).
const GLYPHS = '▓▒░#%&@01<>/;'
const FIRST_SETTLE_MS = 300
const STEP_MS = 80
const GLITCH_MS = 150
const MAX_TOTAL_MS = 1200
// как часто символ помехи меняет глиф (не зависит от скорости фиксации)
const NOISE_MS = 120
// запуск, когда в зоне видимости эта доля текста
const TRIGGER_AMOUNT = 0.4
const NOISE_COLORS = [cls.noise1, cls.noise2, cls.noise3]

const noopSubscribe = () => () => {}

// Детерминированный «случайный» глиф: один и тот же для символа и шага
function noiseGlyph(index: number, step: number) {
  const hash = Math.abs(Math.sin(index * 12.9898 + step * 78.233) * 43758.5453)
  return GLYPHS[Math.floor(hash) % GLYPHS.length]
}

interface DecodeTextProps {
  className?: string
  // класс видимого текста (градиент через background-clip: text): вешать на родителя нельзя —
  // градиент проявит и прозрачный итоговый текст под помехами
  textClassName?: string
  text: string
}

// Текст «проявляется из помех» при появлении в зоне видимости (один раз).
// Итоговый текст всё время в потоке (прозрачный, читается скринридером), помехи — поверх.
export function DecodeText({ className, textClassName, text }: DecodeTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: TRIGGER_AMOUNT })
  // false на сервере и при гидрации: до неё — обычный текст (без JS заголовок виден)
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false)
  // null — анимация ещё не началась
  const [elapsed, setElapsed] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)

  const chars = Array.from(text)
  const gaps = Math.max(1, chars.length - 1)
  const stepMs = Math.min(STEP_MS, (MAX_TOTAL_MS - FIRST_SETTLE_MS - GLITCH_MS) / gaps)
  const settleEnd = FIRST_SETTLE_MS + (chars.length - 1) * stepMs
  const total = settleEnd + GLITCH_MS

  useEffect(() => {
    if (reduceMotion || !inView) return
    const controls = animate(0, total, {
      duration: total / 1000,
      ease: 'linear',
      onUpdate: setElapsed,
      onComplete: () => setFinished(true),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, total])

  const phase = !hydrated ? 'static' : reduceMotion || finished ? 'done' : elapsed === null ? 'waiting' : 'running'

  if (phase === 'static' || phase === 'done') {
    return (
      <span ref={ref} className={classNames(cls.decodeText, {}, [className])}>
        {textClassName ? <span className={textClassName}>{text}</span> : text}
      </span>
    )
  }

  const time = elapsed ?? 0
  const glitching = time >= settleEnd

  return (
    <span ref={ref} className={classNames(cls.decodeText, {}, [className])}>
      <span className={cls.hidden}>{text}</span>
      <span className={classNames(cls.overlay, {}, [cls.noise, textClassName])} aria-hidden="true">
        {glitching
          ? text
          : chars.map((char, i) => {
              const settleAt = FIRST_SETTLE_MS + i * stepMs
              if (char === ' ' || time >= settleAt) return char
              // глиф меняется раз в NOISE_MS; сдвиг по индексу — символы меняются не все разом
              const step = Math.floor((time + i * (NOISE_MS / 3)) / NOISE_MS)
              return (
                <span key={i} className={NOISE_COLORS[(i + step) % NOISE_COLORS.length]}>
                  {noiseGlyph(i, step)}
                </span>
              )
            })}
      </span>
      {glitching && (
        <>
          <span className={classNames(cls.overlay, {}, [cls.glitchA])} aria-hidden="true">
            {text}
          </span>
          <span className={classNames(cls.overlay, {}, [cls.glitchB])} aria-hidden="true">
            {text}
          </span>
        </>
      )}
    </span>
  )
}
