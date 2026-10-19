import { useTranslations } from 'next-intl'
import { Card } from '@/components/Card/Card'
import { OutlineNumber } from '@/components/OutlineNumber/OutlineNumber'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { monogram, SKILL_ICONS, SKILL_ROWS } from '@/data/skills'
import { ScrollMarquee } from '@/effects/ScrollMarquee/ScrollMarquee'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Skills.module.scss'
import { SkillsArrow } from './SkillsArrow'

// Цвет монограммы чередуется по ряду и позиции, как в макете
const MONO_COLORS = [cls.mono1, cls.mono2, cls.mono3]

interface SkillsProps {
  className?: string
}

// Копии списка в дорожке: первая — для скринридеров, остальные aria-hidden
const COPIES = [false, true, true]

// Три ряда плиток, движутся от прокрутки, направления чередуются
export function Skills({ className }: SkillsProps) {
  const t = useTranslations()

  return (
    <section id="skills" className={classNames(cls.skills, {}, [className])}>
      <OutlineNumber className={cls.number}>02</OutlineNumber>
      <SectionHeader className={cls.header} num="02" tag={t('skillsTag')} title={t('skillsTitle')} />

      <div className={cls.rows}>
        {SKILL_ROWS.map((row, rowIndex) => (
          <div key={row.key} className={cls.row}>
            <div className={cls.rowHead}>
              <h3 className={cls.rowTitle}>{t(`rows.${row.key}`)}</h3>
              <SkillsArrow direction={row.direction} />
            </div>
            <div className={cls.viewport}>
              <ScrollMarquee className={cls.track} direction={row.direction}>
                {COPIES.map((copy, copyIndex) => (
                  <ul key={copyIndex} className={cls.list} aria-hidden={copy || undefined}>
                    {row.items.map((name, i) => {
                      const icon = SKILL_ICONS[name]
                      return (
                        <Card key={i} as="li" chamfer="m" className={cls.tile} bodyClassName={cls.tileBody}>
                          <span className={classNames(cls.monogram, {}, [MONO_COLORS[(rowIndex + i) % 3]])} aria-hidden="true">
                            {icon ? (
                              <svg className={cls.logo} viewBox="0 0 24 24" focusable="false">
                                <path d={icon.path} />
                              </svg>
                            ) : (
                              monogram(name)
                            )}
                          </span>
                          <span className={cls.name}>{name}</span>
                        </Card>
                      )
                    })}
                  </ul>
                ))}
              </ScrollMarquee>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
