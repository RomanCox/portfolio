import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'
import type { Locale } from '@/i18n/routing'
import { Hero } from '@/sections/Hero/Hero'
import { Tape } from '@/sections/Tape/Tape'
import cls from './page.module.scss'

// Временные секции-якоря для меню; заменяются настоящими на этапе 3
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
    <main>
      <Hero />
      <Tape />
      <div className={cls.placeholders}>
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className={cls.section}>
            <h2 className={cls.sectionTitle}>{t(section.title)}</h2>
          </section>
        ))}
      </div>
    </main>
  )
}
