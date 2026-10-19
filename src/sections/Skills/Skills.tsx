import { useTranslations } from 'next-intl'
import { Card } from '@/components/Card/Card'
import { OutlineNumber } from '@/components/OutlineNumber/OutlineNumber'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { monogram, SKILL_ROWS } from '@/data/skills'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Skills.module.scss'

// Цвет монограммы чередуется по ряду и позиции, как в макете
const MONO_COLORS = [cls.mono1, cls.mono2, cls.mono3]

interface SkillsProps {
  className?: string
}

// Три ряда плиток. Дорожка — список + его копия (aria-hidden) под бегущую строку этапа 4.
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
              <span className={cls.rowArrow} aria-hidden="true">
                {row.direction === 'left' ? '← ← ←' : '→ → →'}
              </span>
            </div>
            <div className={cls.viewport}>
              <div className={cls.track}>
                {[false, true].map((copy) => (
                  <ul key={String(copy)} className={cls.list} aria-hidden={copy || undefined}>
                    {row.items.map((name, i) => (
                      <Card key={i} as="li" chamfer="m" className={cls.tile} bodyClassName={cls.tileBody}>
                        <span className={classNames(cls.monogram, {}, [MONO_COLORS[(rowIndex + i) % 3]])} aria-hidden="true">
                          {monogram(name)}
                        </span>
                        <span className={cls.name}>{name}</span>
                      </Card>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
