import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'
import { LangSwitch } from '@/components/LangSwitch/LangSwitch'
import { ThemeSwitch } from '@/components/ThemeSwitch/ThemeSwitch'
import type { Locale } from '@/i18n/routing'
import cls from './page.module.scss'

// Временная страница этапа 0: проверка тем, языков и шрифтов
export default function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = use(params)
  setRequestLocale(locale as Locale)

  const t = useTranslations()

  return (
    <main className={cls.page}>
      <p className={cls.label}>{'> whoami'}</p>
      <h1 className={cls.title}>{t('name')}</h1>
      <p className={cls.lead}>{t('lead')}</p>
      <div className={cls.controls}>
        <LangSwitch />
        <ThemeSwitch />
      </div>
    </main>
  )
}
