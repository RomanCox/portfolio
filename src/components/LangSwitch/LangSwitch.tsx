'use client'

import { useLocale, useTranslations } from 'next-intl'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import cls from './LangSwitch.module.scss'

interface LangSwitchProps {
  className?: string
}

export function LangSwitch({ className }: LangSwitchProps) {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <nav className={classNames(cls.langSwitch, {}, [className])} aria-label={t('menu.lang')}>
      {routing.locales.map((lang) => (
        <Link
          key={lang}
          href={pathname}
          locale={lang}
          hrefLang={lang}
          className={cls.link}
          aria-current={lang === locale ? 'true' : undefined}
        >
          {lang.toUpperCase()}
        </Link>
      ))}
    </nav>
  )
}
