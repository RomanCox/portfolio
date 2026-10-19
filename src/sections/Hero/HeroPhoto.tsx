import { UserIcon } from '@/components/icons/icons'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './HeroPhoto.module.scss'

// Фото ещё нет — заглушка из макета (надпись одинаковая во всех языках)
const PLACEHOLDER = {
  full: '[ФОТО / АВАТАР]',
  compact: '[ФОТО]',
}

interface HeroPhotoProps {
  className?: string
  compact?: boolean
}

// Фото в градиентной рамке: тень — filter на обёртке, рамка и подложка — вложенные срезы
export function HeroPhoto({ className, compact = false }: HeroPhotoProps) {
  return (
    <div className={classNames(cls.heroPhoto, { [cls.compact]: compact }, [className])} aria-hidden="true">
      <div className={cls.frame}>
        <div className={cls.surface}>
          <UserIcon className={cls.icon} strokeWidth={compact ? 1.1 : 1} />
          <span>{compact ? PLACEHOLDER.compact : PLACEHOLDER.full}</span>
        </div>
      </div>
    </div>
  )
}
