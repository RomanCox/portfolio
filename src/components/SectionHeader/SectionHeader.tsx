import type { ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SectionHeader.module.scss'

interface SectionHeaderProps {
  className?: string
  titleClassName?: string
  num: string
  tag: string
  title: ReactNode
}

// Моно-метка «[01] // ОБО МНЕ» с линией до края + H2
export function SectionHeader({ className, titleClassName, num, tag, title }: SectionHeaderProps) {
  return (
    <div className={classNames(cls.sectionHeader, {}, [className])}>
      <p className={cls.label}>
        <span>{`[${num}] // ${tag}`}</span>
        <span className={cls.line} aria-hidden="true" />
      </p>
      <h2 className={classNames(cls.title, {}, [titleClassName])}>{title}</h2>
    </div>
  )
}
