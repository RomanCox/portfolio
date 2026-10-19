'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/Card/Card'
import { classNames } from '@/shared/lib/classNames/classNames'
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '@/shared/lib/gsap/gsap'
import cls from './AboutDeck.module.scss'

export interface AboutSlide {
  n: string
  icon: string
  tag: string
  title: string
  text: string
  points: string[]
}

// Колода (ТЗ, «Колода слайдов „Обо мне“»): слайд шириной W = окно − 72, зазор G = 24,
// покой REST = G; старт — первый слайд выглядывает справа на 30%.
const GAP = 24
const SIDE = 72
const PEEK = 0.3
const MAX_DEPTH = 2
const DEPTH_SCALE = 0.07
const DEPTH_DIM = 0.3
const DEPTH_SHIFT = 11
// Колода только на tablet/desktop и без prefers-reduced-motion; иначе — карусель со свайпом
const DECK_QUERY = `(min-width: 768px) and ${MOTION_OK}`
// Пересчёт после изменения размеров окна
const RESIZE_DEBOUNCE_MS = 250

interface DeckGeometry {
  width: number
  step: number
  startX: number
  distance: number
}

function measure(view: HTMLElement, count: number): DeckGeometry {
  const width = view.clientWidth - SIDE
  const step = width + GAP
  const startX = view.clientWidth - PEEK * width
  return { width, step, startX, distance: Math.max(0, startX + (count - 1) * step - GAP) }
}

interface AboutDeckProps {
  className?: string
  slides: AboutSlide[]
  label: string
}

export function AboutDeck({ className, slides, label }: AboutDeckProps) {
  const viewRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<Array<HTMLElement | null>>([])
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)
  const [layoutKey, setLayoutKey] = useState(0)
  const count = String(slides.length).padStart(2, '0')

  // Перестроить колоду при заметном изменении окна (ширина или высота > 100px —
  // не реагировать на скрытие адресной строки)
  useEffect(() => {
    let size = { w: window.innerWidth, h: window.innerHeight }
    let timer = 0
    const onResize = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const next = { w: window.innerWidth, h: window.innerHeight }
        if (next.w !== size.w || Math.abs(next.h - size.h) > 100) {
          size = next
          setLayoutKey((key) => key + 1)
        }
      }, RESIZE_DEBOUNCE_MS)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useGSAP(
    () => {
      const view = viewRef.current
      const section = view?.closest('section')
      if (!view || !section) return

      const mm = gsap.matchMedia()
      mm.add(DECK_QUERY, () => {
        const items = slideRefs.current.filter((el): el is HTMLElement => el !== null)
        view.dataset.deck = 'on'
        section.dataset.deck = 'on'

        // Закреплённая секция должна помещаться в окно, иначе остаётся карусель
        if (section.offsetHeight > window.innerHeight) {
          delete view.dataset.deck
          delete section.dataset.deck
          return
        }

        // ряд мог быть прокручен в режиме карусели
        view.scrollLeft = 0
        let geometry = measure(view, items.length)

        const render = (scrolled: number) => {
          const { step, startX } = geometry
          let current = 0
          items.forEach((el, i) => {
            const reachAt = startX + i * step - GAP
            const x = Math.max(GAP, startX + i * step - scrolled)
            const depth = Math.min(MAX_DEPTH, Math.max(0, (scrolled - reachAt) / step))
            if (scrolled >= reachAt - step / 2) current = i
            gsap.set(el, {
              x: x - depth * DEPTH_SHIFT,
              scale: 1 - depth * DEPTH_SCALE,
              filter: `brightness(${1 - depth * DEPTH_DIM})`,
            })
          })
          setActive(current)
        }

        items.forEach((el, i) => gsap.set(el, { zIndex: i + 1 }))
        render(0)

        triggerRef.current = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${geometry.distance}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            geometry = measure(view, items.length)
            render(self.progress * geometry.distance)
          },
          onUpdate: (self) => render(self.progress * geometry.distance),
        })

        return () => {
          triggerRef.current = null
          gsap.set(items, { clearProps: 'transform,filter,zIndex' })
          delete view.dataset.deck
          delete section.dataset.deck
        }
      })
    },
    { dependencies: [layoutKey], revertOnUpdate: true },
  )

  // Карусель: активный слайд — по прокрутке
  const onCarouselScroll = () => {
    const view = viewRef.current
    if (!view || view.dataset.deck) return
    const first = slideRefs.current[0]
    const second = slideRefs.current[1]
    if (!first || !second) return
    setActive(Math.round(view.scrollLeft / (second.offsetLeft - first.offsetLeft)))
  }

  // Метка ведёт к слайду: в колоде — прокрутка страницы, в карусели — прокрутка ряда
  const goTo = (index: number) => {
    const view = viewRef.current
    const slide = slideRefs.current[index]
    if (!view || !slide) return
    const trigger = triggerRef.current
    if (trigger) {
      const { startX, step } = measure(view, slides.length)
      const scrolled = Math.min(trigger.end - trigger.start, Math.max(0, startX + index * step - GAP))
      window.scrollTo({ top: trigger.start + scrolled, behavior: 'smooth' })
    } else {
      const first = slideRefs.current[0]
      view.scrollTo({ left: slide.offsetLeft - (first?.offsetLeft ?? 0), behavior: 'smooth' })
    }
  }

  return (
    <div className={classNames(cls.aboutDeck, {}, [className])}>
      <div className={cls.tabs}>
        {slides.map((slide, i) => (
          <button
            key={slide.n}
            type="button"
            className={classNames(cls.tab, { [cls.tabActive]: i === active })}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => goTo(i)}
          >
            <span className={cls.tabLine} aria-hidden="true" />
            {`${slide.n} ${slide.tag}`}
          </button>
        ))}
      </div>

      {/* Ряд прокручивается с клавиатуры, поэтому фокусируемый регион */}
      <div
        ref={viewRef}
        className={cls.view}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={onCarouselScroll}
      >
        {slides.map((slide, i) => (
          <Card
            key={slide.n}
            ref={(el) => {
              slideRefs.current[i] = el
            }}
            as="article"
            accent={i === active}
            className={cls.slide}
            bodyClassName={cls.slideBody}
          >
            <div className={cls.slideHead}>
              <span className={cls.slideNum} aria-hidden="true">
                {slide.n}
              </span>
              <span className={cls.slideIcon} aria-hidden="true">
                {slide.icon}
              </span>
            </div>
            <div className={cls.slideContent}>
              <p className={cls.slideMeta}>{`${slide.n} / ${count} · ${slide.tag}`}</p>
              <h3 className={cls.slideTitle}>{slide.title}</h3>
              <p className={cls.slideText}>{slide.text}</p>
              <ul className={cls.points}>
                {slide.points.map((point) => (
                  <li key={point} className={cls.point}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
