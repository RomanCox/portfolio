import { useTranslations } from 'next-intl'
import { Card } from '@/components/Card/Card'
import { ArrowRightIcon, DownloadIcon } from '@/components/icons/icons'
import { OutlineNumber } from '@/components/OutlineNumber/OutlineNumber'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { Link } from '@/i18n/navigation'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './CvPromo.module.scss'

// PDF генерируются на сборке (этап 5) в public/cv/roman-cox-<locale>.pdf
const PDF_LINKS = [
  { locale: 'ru', label: 'PDF · RU', href: '/cv/roman-cox-ru.pdf' },
  { locale: 'en', label: 'PDF · EN', href: '/cv/roman-cox-en.pdf' },
] as const

interface CvPromoProps {
  className?: string
}

// Блок «Резюме» на главной: панель с градиентной рамкой и стопкой листов-превью
export function CvPromo({ className }: CvPromoProps) {
  const t = useTranslations()

  return (
    <section id="cv" className={classNames(cls.cvPromo, {}, [className])}>
      <OutlineNumber className={cls.number}>05</OutlineNumber>
      <SectionHeader num="05" tag={t('cvTag')} title={t('cvHeading')} />

      <Card chamfer="xl" accent className={cls.panel} bodyClassName={cls.panelBody}>
        <div className={cls.text}>
          <h3 className={cls.title}>{t('cvTitle')}</h3>
          <p className={cls.lead}>{t('cvText')}</p>
          <div className={cls.actions}>
            <Link href="/resume" className={cls.open}>
              {t('cvOpen')}
              <ArrowRightIcon size={18} />
            </Link>
            {PDF_LINKS.map((pdf) => (
              <a key={pdf.locale} href={pdf.href} className={cls.pdf} hrefLang={pdf.locale} download>
                <DownloadIcon size={16} />
                {pdf.label}
              </a>
            ))}
          </div>
        </div>

        <div className={cls.sheets} aria-hidden="true">
          <span className={cls.sheetBack} />
          <span className={cls.sheet}>
            <span className={cls.sheetStripe} />
            <span className={cls.sheetLines}>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className={cls.sheetBadge}>PDF</span>
          </span>
        </div>
      </Card>
    </section>
  )
}
