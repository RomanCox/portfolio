'use client'

import { useRef, type ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { gsap, MOTION_OK, useGSAP } from '@/shared/lib/gsap/gsap'
import cls from './ScrollMarquee.module.scss'

// Сдвиг за всё время прохождения элемента через экран, в процентах дорожки
// (= translateX(-25%) в scss). Дорожка — несколько одинаковых копий, разрыва не видно.
const SHIFT_PERCENT = 25

interface ScrollMarqueeProps {
  className?: string
  direction?: 'left' | 'right'
  children: ReactNode
}

// Бегущая строка от прокрутки (вместо автодвижения — WCAG 2.2.2 не требует кнопки паузы)
export function ScrollMarquee({ className, direction = 'left', children }: ScrollMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return

    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const [from, to] = direction === 'left' ? [0, -SHIFT_PERCENT] : [-SHIFT_PERCENT, 0]
      gsap.fromTo(
        track,
        // x: 0 — сдвиг из CSS (.right) GSAP иначе прочитает как x и сложит с xPercent
        { x: 0, xPercent: from },
        {
          x: 0,
          xPercent: to,
          ease: 'none',
          scrollTrigger: { trigger: track, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })
  }, [direction])

  return (
    <div ref={trackRef} className={classNames(className, { [cls.right]: direction === 'right' })}>
      {children}
    </div>
  )
}
