import { useTranslations } from 'next-intl'
import { Card } from '@/components/Card/Card'
import { CalendarIcon, ClockIcon, MapPinIcon } from '@/components/icons/icons'
import { OutlineNumber } from '@/components/OutlineNumber/OutlineNumber'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { Tag } from '@/components/Tag/Tag'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Experience.module.scss'

interface Job {
  company: string
  role: string
  loc: string
  period: string
  dur: string
  summary: string
  bullets: string[]
  stack: string[]
}

// Логотипов компаний нет — заглушка из макета
const LOGO_PLACEHOLDER = '[лого]'

interface ExperienceProps {
  className?: string
}

// Компания слева, карточка «что делал» справа. Sticky-колонка — этап 4.
export function Experience({ className }: ExperienceProps) {
  const t = useTranslations()
  const jobs = t.raw('jobs') as Job[]
  const total = String(jobs.length).padStart(2, '0')

  return (
    <section id="exp" className={classNames(cls.experience, {}, [className])}>
      <OutlineNumber className={cls.number}>03</OutlineNumber>
      <SectionHeader num="03" tag={t('expTag')} title={t('expTitle')} />

      <div className={cls.jobs}>
        {jobs.map((job, i) => (
          <article key={`${job.company}-${i}`} className={cls.job}>
            <div className={cls.company}>
              <div className={cls.companyTop}>
                <span className={cls.logo} aria-hidden="true">
                  {LOGO_PLACEHOLDER}
                </span>
                <span className={cls.counter}>{`${String(i + 1).padStart(2, '0')} / ${total}`}</span>
              </div>
              <h3 className={cls.companyName}>{job.company}</h3>
              <p className={cls.role}>{job.role}</p>
              <ul className={cls.meta}>
                <li className={cls.metaItem}>
                  <MapPinIcon size={15} className={cls.metaIcon} />
                  {job.loc}
                </li>
                <li className={cls.metaItem}>
                  <CalendarIcon size={15} className={cls.metaIcon} />
                  {job.period}
                </li>
                <li className={cls.metaItem}>
                  <ClockIcon size={15} className={cls.metaIcon} />
                  {job.dur}
                </li>
              </ul>
            </div>

            <Card className={cls.card} bodyClassName={cls.cardBody}>
              <div className={cls.block}>
                <p className={cls.blockLabel}>{t('expDid')}</p>
                <p className={cls.summary}>{job.summary}</p>
              </div>
              <ul className={cls.bullets}>
                {job.bullets.map((bullet) => (
                  <li key={bullet} className={cls.bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className={classNames(cls.block, {}, [cls.stack])}>
                <p className={cls.blockLabel}>{t('expStack')}</p>
                <ul className={cls.chips}>
                  {job.stack.map((item) => (
                    <li key={item}>
                      <Tag outlined>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </article>
        ))}
      </div>
    </section>
  )
}
