import { useTranslations } from 'next-intl'
import { Card } from '@/components/Card/Card'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './About.module.scss'
import { AboutTerminal } from './AboutTerminal'

interface Slide {
  n: string
  icon: string
  tag: string
  title: string
  text: string
  points: string[]
}

interface AboutProps {
  className?: string
}

// «Обо мне»: терминал + слайды. Статичная версия: на ≥ 768 — положение покоя колоды
// (первый слайд на месте, второй выглядывает справа), на mobile — слайды списком.
// Колода от прокрутки — этап 4 (GSAP).
export function About({ className }: AboutProps) {
  const t = useTranslations()
  const slides = t.raw('slides') as Slide[]
  const count = String(slides.length).padStart(2, '0')

  return (
    <section id="about" className={classNames(cls.about, {}, [className])}>
      <SectionHeader num="01" tag={t('aboutTag')} title={t('aboutTitle')} />

      <div className={cls.layout}>
        <AboutTerminal className={cls.terminal} />

        <div className={cls.deck}>
          <ol className={cls.tabs} aria-hidden="true">
            {slides.map((slide, i) => (
              <li key={slide.n} className={classNames(cls.tab, { [cls.tabActive]: i === 0 })}>
                <span className={cls.tabLine} />
                {`${slide.n} ${slide.tag}`}
              </li>
            ))}
          </ol>

          <div className={cls.view}>
            {slides.map((slide, i) => (
              <Card key={slide.n} as="article" accent={i === 0} className={cls.slide} bodyClassName={cls.slideBody}>
                <div className={cls.slideHead}>
                  <span className={cls.slideNum} aria-hidden="true">
                    {slide.n}
                  </span>
                  <span className={cls.slideIcon} aria-hidden="true">
                    {slide.icon}
                  </span>
                </div>
                <div className={cls.slideContent}>
                  <p className={cls.slideMeta}>{`${slide.n} / ${count} · ${slide.tag}`}</p>
                  <h3 className={cls.slideTitle}>{slide.title}</h3>
                  <p className={cls.slideText}>{slide.text}</p>
                  <ul className={cls.points}>
                    {slide.points.map((point) => (
                      <li key={point} className={cls.point}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
