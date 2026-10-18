import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'
import type { Locale } from '@/i18n/routing'
import cls from './page.module.scss'

// Временная страница этапа 1: пустые секции-якоря для проверки меню, sticky-шапки
// и блокировки прокрутки. Заменяется секциями на этапах 2–3.
const SECTIONS = [
  { id: 'about', title: 'aboutTitle' },
  { id: 'skills', title: 'skillsTitle' },
  { id: 'exp', title: 'expTitle' },
  { id: 'projects', title: 'projTitle' },
  { id: 'contact', title: 'contactLine1' },
] as const

export default function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = use(params)
  setRequestLocale(locale as Locale)

  const t = useTranslations()

  return (
    <main className={cls.page}>
      <section className={cls.intro}>
        <p className={cls.label}>{'> whoami'}</p>
        <h1 className={cls.title}>{t('name')}</h1>
        <p className={cls.lead}>{t('lead')}</p>
      </section>
      {SECTIONS.map((section) => (
        <section key={section.id} id={section.id} className={cls.section}>
          <h2 className={cls.sectionTitle}>{t(section.title)}</h2>
        </section>
      ))}
    </main>
  )
}
