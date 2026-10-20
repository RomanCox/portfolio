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

// prefers-reduced-motion — сразу конечное состояние
const CONTAINER_STILL: Variants = { hidden: {}, visible: {} }
const ITEM_STILL: Variants = { hidden: ITEM.hidden, visible: { opacity: 1, y: 0, transition: { duration: 0 } } }

interface RevealProps {
  className?: string
  children: ReactNode
}

// Простое появление (fade + slide up) при прокрутке, один раз; дети — по очереди.
// Каждый прямой потомок оборачивается в RevealItem.
// Разметка одинакова при любых настройках: сервер не знает о reduced motion, и другая ветка
// дала бы рассинхрон гидратации (элементы остались бы с opacity: 0).
export function Reveal({ className, children }: RevealProps) {
  const still = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={still ? CONTAINER_STILL : CONTAINER}
      initial="hidden"
      {...(still ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true, amount: 0.3 } })}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ className, children }: RevealProps) {
  const still = useReducedMotion()

  return (
    <motion.div className={className} variants={still ? ITEM_STILL : ITEM}>
      {children}
    </motion.div>
  )
}
