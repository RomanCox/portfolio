import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'
import type { Locale } from '@/i18n/routing'
import { About } from '@/sections/About/About'
import { Contact } from '@/sections/Contact/Contact'
import { CvPromo } from '@/sections/CvPromo/CvPromo'
import { Experience } from '@/sections/Experience/Experience'
import { Footer } from '@/sections/Footer/Footer'
import { Hero } from '@/sections/Hero/Hero'
import { Projects } from '@/sections/Projects/Projects'
import { Skills } from '@/sections/Skills/Skills'
import { Tape } from '@/sections/Tape/Tape'
import cls from './page.module.scss'

export default function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = use(params)
  setRequestLocale(locale as Locale)

  return (
    <>
      <main className={cls.main}>
        <Hero />
        <Tape />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <CvPromo />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
