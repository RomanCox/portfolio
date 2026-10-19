import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Scanlines.module.scss'

interface ScanlinesProps {
  className?: string
}

// Скан-линии поверх страницы; в light и citrus --color-scanline прозрачный
export function Scanlines({ className }: ScanlinesProps) {
  return <div className={classNames(cls.scanlines, {}, [className])} aria-hidden="true" />
}
