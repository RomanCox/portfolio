import { useTranslations } from 'next-intl'
import { ArrowUpRightIcon } from '@/components/icons/icons'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { DecodeText } from '@/effects/DecodeText/DecodeText'
import { CONTACTS } from '@/data/navigation'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Contact.module.scss'

interface ContactProps {
  className?: string
}

// Двухстрочный заголовок + строки каналов во всю ширину
export function Contact({ className }: ContactProps) {
  const t = useTranslations()

  return (
    <section id="contact" className={classNames(cls.contact, {}, [className])}>
      <SectionHeader
        className={cls.header}
        titleClassName={cls.title}
        num="06"
        tag={t('contactTag')}
        title={
          <>
            <span className={cls.line1}>
              <DecodeText text={t('contactLine1')} />
            </span>
            <span className={cls.line2}>
              <DecodeText text={t('contactLine2')} textClassName={cls.gradient} />
            </span>
          </>
        }
      />
      <p className={cls.text}>{t('contactText')}</p>

      <ul className={cls.list}>
        {CONTACTS.map((contact) => {
          const content = (
            <>
              <span className={cls.label}>{contact.label}</span>
              <span className={cls.value}>{contact.value}</span>
              <ArrowUpRightIcon size={34} strokeWidth={1.6} className={cls.arrow} />
            </>
          )

          return (
            <li key={contact.label}>
              {contact.href ? (
                <a className={cls.row} href={contact.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                // почты пока нет — строка без ссылки
                <div className={classNames(cls.row, {}, [cls.pending])}>{content}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
