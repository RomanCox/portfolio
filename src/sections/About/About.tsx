import { useTranslations } from 'next-intl'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './About.module.scss'
import { AboutDeck, type AboutSlide } from './AboutDeck'
import { AboutTerminal } from './AboutTerminal'

interface AboutProps {
  className?: string
}

// «Обо мне»: терминал + 4 слайда. ≥ 768 — колода от прокрутки (GSAP pin + scrub),
// mobile и prefers-reduced-motion — карусель со свайпом.
export function About({ className }: AboutProps) {
  const t = useTranslations()
  const slides = t.raw('slides') as AboutSlide[]

  return (
    <section id="about" className={classNames(cls.about, {}, [className])}>
      <SectionHeader num="01" tag={t('aboutTag')} title={t('aboutTitle')} />

      <div className={cls.layout}>
        <AboutTerminal className={cls.terminal} />
        <AboutDeck className={cls.deck} slides={slides} label={t('aboutTitle')} />
      </div>
    </section>
  )
}
