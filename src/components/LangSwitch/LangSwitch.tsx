'use client'

import { useLocale, useTranslations } from 'next-intl'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import cls from './LangSwitch.module.scss'

interface LangSwitchProps {
  className?: string
  // в мобильном меню кнопки шире: 52px вместо 44px
  wide?: boolean
}

// Языки — отдельные URL (/ru, /en, /be), поэтому ссылки, а не кнопки
export function LangSwitch({ className, wide = false }: LangSwitchProps) {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className={classNames(cls.langSwitch, { [cls.wide]: wide }, [className])} role="group" aria-label={t('menu.lang')}>
      {routing.locales.map((lang) => (
        <Link
          key={lang}
          href={pathname}
          locale={lang}
          hrefLang={lang}
          lang={lang}
          className={classNames(cls.link, { [cls.active]: lang === locale })}
          aria-current={lang === locale ? 'page' : undefined}
        >
          {lang.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
