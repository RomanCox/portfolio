'use client'

import { useEffect, useRef } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './PulseBackground.module.scss'
import { startPulses } from './pulses'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

interface PulseBackgroundProps {
  className?: string
}

// Фиксированный слой под всем контентом: статичная сетка (CSS, работает и без JS)
// + canvas с импульсами. При prefers-reduced-motion — только сетка.
export function PulseBackground({ className }: PulseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia(REDUCED_MOTION_QUERY)
    let stop: (() => void) | null = null

    const sync = () => {
      stop?.()
      stop = reduceMotion.matches ? null : startPulses(canvas)
    }

    sync()
    reduceMotion.addEventListener('change', sync)

    return () => {
      reduceMotion.removeEventListener('change', sync)
      stop?.()
    }
  }, [])

  return (
    <div className={classNames(cls.pulseBackground, {}, [className])} aria-hidden="true">
      <canvas ref={canvasRef} className={cls.canvas} />
    </div>
  )
}
