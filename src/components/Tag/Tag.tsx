import type { ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Tag.module.scss'

interface TagProps {
  className?: string
  // outlined — чип стека с обводкой (опыт), иначе — тег проекта
  outlined?: boolean
  children: ReactNode
}

export function Tag({ className, outlined = false, children }: TagProps) {
  return <span className={classNames(cls.tag, { [cls.outlined]: outlined }, [className])}>{children}</span>
}
