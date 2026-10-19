'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowDownIcon } from '@/components/icons/icons'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ScrollRing.module.scss'

// Окружность для подписи: радиус по базовой линии букв из макета (кольцо 140px)
const RING_PATH_ID = 'scroll-ring-path'
const RADIUS = 57
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface ScrollRingProps {
  className?: string
  href: string
  label: string
  text: string
}

// Вращение 16s, покачивание стрелки 1.6s (ТЗ, раздел «Анимации»)
const SPIN = { rotate: 360 }
const SPIN_TRANSITION = { duration: 16, ease: 'linear', repeat: Infinity } as const
const BOB = { y: [-3, 5, -3] }
const BOB_TRANSITION = { duration: 1.6, ease: 'easeInOut', repeat: Infinity } as const

// Кольцо «листай вниз»: буквы по окружности + кнопка со стрелкой.
// При prefers-reduced-motion — неподвижное.
export function ScrollRing({ className, href, label, text }: ScrollRingProps) {
  const still = useReducedMotion()

  return (
    <a href={href} aria-label={label} className={classNames(cls.scrollRing, {}, [className])}>
      <motion.svg
        className={cls.ring}
        viewBox="0 0 140 140"
        aria-hidden="true"
        focusable="false"
        animate={still ? undefined : SPIN}
        transition={SPIN_TRANSITION}
      >
        <defs>
          <path id={RING_PATH_ID} d={`M70 ${70 - RADIUS}a${RADIUS} ${RADIUS} 0 1 1 0 ${2 * RADIUS}a${RADIUS} ${RADIUS} 0 1 1 0 ${-2 * RADIUS}`} />
        </defs>
        <text className={cls.text}>
          <textPath href={`#${RING_PATH_ID}`} textLength={CIRCUMFERENCE} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <span className={cls.core}>
        <span className={cls.button}>
          <motion.span className={cls.arrowWrap} animate={still ? undefined : BOB} transition={BOB_TRANSITION}>
            <ArrowDownIcon className={cls.arrow} />
          </motion.span>
        </span>
      </span>
    </a>
  )
}
