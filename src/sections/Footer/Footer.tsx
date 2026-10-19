import { useTranslations } from 'next-intl'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Footer.module.scss'

// Год на момент сборки (страницы статические)
const YEAR = new Date().getFullYear()

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const t = useTranslations()

  return (
    <footer className={classNames(cls.footer, {}, [className])}>
      <div className={cls.wordmark} aria-hidden="true">
        ROMAN COX
      </div>
      <div className={cls.bottom}>
        <span>{`© ${YEAR} Roman Cox`}</span>
        <span>{t('footer')}</span>
        <span className={cls.end}>{'// end of transmission_'}</span>
      </div>
    </footer>
  )
}
