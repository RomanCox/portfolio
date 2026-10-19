import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './OutlineNumber.module.scss'

interface OutlineNumberProps {
  className?: string
  children: string
}

// Огромный контурный номер за заголовком секции (декор); позицию задаёт секция
export function OutlineNumber({ className, children }: OutlineNumberProps) {
  return (
    <span className={classNames(cls.outlineNumber, {}, [className])} aria-hidden="true">
      {children}
    </span>
  )
}
