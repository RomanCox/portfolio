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

// Кольцо «листай вниз»: буквы по окружности + кнопка со стрелкой.
// Вращение и покачивание стрелки — этап 4 (Motion).
export function ScrollRing({ className, href, label, text }: ScrollRingProps) {
  return (
    <a href={href} aria-label={label} className={classNames(cls.scrollRing, {}, [className])}>
      <svg className={cls.ring} viewBox="0 0 140 140" aria-hidden="true" focusable="false">
        <defs>
          <path id={RING_PATH_ID} d={`M70 ${70 - RADIUS}a${RADIUS} ${RADIUS} 0 1 1 0 ${2 * RADIUS}a${RADIUS} ${RADIUS} 0 1 1 0 ${-2 * RADIUS}`} />
        </defs>
        <text className={cls.text}>
          <textPath href={`#${RING_PATH_ID}`} textLength={CIRCUMFERENCE} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className={cls.core}>
        <span className={cls.button}>
          <ArrowDownIcon className={cls.arrow} />
        </span>
      </span>
    </a>
  )
}
