import type { ReactNode, Ref } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export type CardChamfer = 's' | 'm' | 'l' | 'xl'

interface CardProps {
  className?: string
  bodyClassName?: string
  as?: 'div' | 'article' | 'li'
  chamfer?: CardChamfer
  // градиентная рамка 2px (активный слайд, панель резюме)
  accent?: boolean
  ref?: Ref<HTMLElement>
  children: ReactNode
}

// Карточка со скошенными углами (ТЗ, «Скошенные углы»):
// обёртка — тень/свечение, рамка — фон с padding, тело — фон карточки.
// Тело обрезано по срезу, поэтому содержимое с фоном не выходит за углы.
export function Card({ className, bodyClassName, as: Tag = 'div', chamfer = 'l', accent = false, ref, children }: CardProps) {
  return (
    // ref общего типа: Tag — один из блочных тегов
    <Tag ref={ref as Ref<HTMLDivElement & HTMLLIElement>} className={classNames(cls.card, { [cls.accent]: accent }, [className, cls[chamfer]])}>
      <div className={cls.frame}>
        <div className={classNames(cls.body, {}, [bodyClassName])}>{children}</div>
      </div>
    </Tag>
  )
}
