import { useTranslations } from 'next-intl'
import { Card } from '@/components/Card/Card'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AboutTerminal.module.scss'

interface AboutTerminalProps {
  className?: string
}

// Карточка-«окно» с about.ts
export function AboutTerminal({ className }: AboutTerminalProps) {
  const t = useTranslations()
  const str = (value: string) => <span className={cls.string}>{`"${value}"`}</span>

  return (
    <Card className={classNames(cls.aboutTerminal, {}, [className])} bodyClassName={cls.body}>
      <div className={cls.bar}>
        <span className={classNames(cls.dot, {}, [cls.dotMagenta])} aria-hidden="true" />
        <span className={classNames(cls.dot, {}, [cls.dotAccent])} aria-hidden="true" />
        <span className={classNames(cls.dot, {}, [cls.dotNumber])} aria-hidden="true" />
        <span className={cls.path}>~/portfolio/about.ts</span>
      </div>
      <pre className={cls.code}>
        <span className={cls.comment}>{t('codeComment')}</span>
        <span className={cls.keyword}>const</span> developer = {'{\n'}
        {'  name: '}
        {str(t('name'))}
        {',\n  role: '}
        {str('Front-end')}
        {',\n  location: '}
        {str(`${t('city')}, BY`)}
        {',\n  experience: '}
        <span className={cls.number}>[N]</span>
        {',\n  stack: ['}
        {str('React')}, {str('TypeScript')}, {str('Redux')}
        {'],\n  focus: '}
        {str(t('focus'))}
        {',\n  openToWork: '}
        <span className={cls.number}>true</span>
        {',\n};\n'}
        <span className={cls.keyword}>export default</span> developer;
        <span className={cls.cursor} aria-hidden="true" />
      </pre>
    </Card>
  )
}
