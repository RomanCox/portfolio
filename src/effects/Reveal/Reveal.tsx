'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const ITEM: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

interface RevealProps {
  className?: string
  children: ReactNode
}

// Простое появление (fade + slide up) при прокрутке, один раз; дети — по очереди.
// Каждый прямой потомок оборачивается в RevealItem.
export function Reveal({ className, children }: RevealProps) {
  const still = useReducedMotion()

  // prefers-reduced-motion — сразу конечное состояние
  if (still) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={CONTAINER}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ className, children }: RevealProps) {
  return (
    <motion.div className={className} variants={ITEM}>
      {children}
    </motion.div>
  )
}
