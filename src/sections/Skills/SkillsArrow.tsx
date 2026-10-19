'use client'

import { motion, useReducedMotion } from 'motion/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useScrollDirection } from '@/shared/lib/scrollDirection/scrollDirection'
import cls from './Skills.module.scss'

interface SkillsArrowProps {
  className?: string
  direction: 'left' | 'right'
}

const FLIP_TRANSITION = { duration: 0.5, ease: [0.16, 1, 0.3, 1] } as const

// Стрелки направления ряда. Ряд движется от прокрутки, поэтому при прокрутке вверх
// он едет в обратную сторону — стрелки переворачиваются «вглубь» страницы (rotateY).
// При prefers-reduced-motion ряды стоят — стрелки не переворачиваются.
export function SkillsArrow({ className, direction }: SkillsArrowProps) {
  const scroll = useScrollDirection()
  const still = useReducedMotion()
  const flipped = !still && scroll === 'up'

  return (
    <span className={classNames(cls.rowArrow, {}, [className])} aria-hidden="true">
      <motion.span className={cls.rowArrowGlyphs} animate={{ rotateY: flipped ? 180 : 0 }} transition={FLIP_TRANSITION}>
        {direction === 'left' ? '← ← ←' : '→ → →'}
      </motion.span>
    </span>
  )
}
