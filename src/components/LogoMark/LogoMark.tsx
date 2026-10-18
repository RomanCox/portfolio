import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './LogoMark.module.scss'

interface LogoMarkProps {
  className?: string
}

// Плашка «RC» 44×44
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span className={classNames(cls.logoMark, {}, [className])} aria-hidden="true">
      RC
    </span>
  )
}
