import { useTranslations } from 'next-intl'
import { ScrollRing } from '@/effects/ScrollRing/ScrollRing'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Hero.module.scss'
import { HeroPhoto } from './HeroPhoto'

interface Stat {
  v: string
  l: string
}

interface HeroProps {
  className?: string
}

// Hero: mobile — фото с чипами сверху, текст, цифры и кольцо у низа экрана;
// tablet/desktop — текст слева, фото с подписями и плашками справа.
export function Hero({ className }: HeroProps) {
  const t = useTranslations()
  const stats = t.raw('stats') as Stat[]
  const name = t('name')

  const cityCode = (
    <>
      <span className={cls.codeLine}>
        <span className={cls.codeKeyword}>const</span> city = <span className={cls.codeString}>{`"${t('city')}"`}</span>;
      </span>
      <span className={cls.codeLine}>
        <span className={cls.codeKeyword}>const</span> tz = <span className={cls.codeNumber}>&quot;UTC+3&quot;</span>;
      </span>
    </>
  )

  return (
    <section id="top" className={classNames(cls.hero, {}, [className])}>
      <div className={cls.glowA} aria-hidden="true" />
      <div className={cls.glowB} aria-hidden="true" />
      <div className={cls.floor} aria-hidden="true" />

      <div className={cls.inner}>
        <div className={cls.mobileTop}>
          <div className={cls.mobileAvatar}>
            <span className={cls.dashRing} aria-hidden="true" />
            <HeroPhoto compact className={cls.photo} />
            <span className={classNames(cls.tag, {}, [cls.idTag])} aria-hidden="true">
              ID // RC-0001
            </span>
          </div>
          <div className={cls.mobileChips}>
            <p className={classNames(cls.status, {}, [cls.statusCompact])}>
              <span className={cls.statusDot} aria-hidden="true" />
              {t('statusShort')}
            </p>
            <p className={classNames(cls.code, {}, [cls.codeCompact])}>{cityCode}</p>
          </div>
        </div>

        <div className={cls.content}>
          <p className={classNames(cls.status, {}, [cls.statusFull])}>
            <span className={cls.statusDot} aria-hidden="true" />
            {t('status')}
          </p>

          <p className={cls.prompt} aria-hidden="true">
            {'> whoami'}
            <span className={cls.promptFlag}> --verbose</span>
          </p>

          <h1 className={cls.title}>
            <span className={cls.hi}>{t('hi')}</span>
            <span className={cls.name}>
              <span className={cls.glitchA} aria-hidden="true">
                {name}
              </span>
              <span className={cls.glitchB} aria-hidden="true">
                {name}
              </span>
              <span className={cls.nameText}>{name}</span>
            </span>
          </h1>

          <p className={cls.role}>
            <span className={cls.roleLine} aria-hidden="true" />
            {t('role')}
            <span className={cls.cursor} aria-hidden="true" />
          </p>

          <p className={cls.lead}>{t('lead')}</p>

          <div className={cls.cta}>
            <ScrollRing href="#about" label={t('scrollAria')} text={t('cueRing')} className={cls.ring} />
            <dl className={cls.stats}>
              {stats.map((stat) => (
                <div key={stat.l} className={cls.stat}>
                  <dt className={cls.statLabel}>{stat.l}</dt>
                  <dd className={cls.statValue}>{stat.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className={cls.visual}>
          <div className={cls.visualBox}>
            <span className={cls.dashRing} aria-hidden="true" />
            <span className={cls.outerRing} aria-hidden="true" />
            <span className={cls.axis} aria-hidden="true" />
            <HeroPhoto className={cls.photo} />
            <span className={classNames(cls.tag, {}, [cls.idTag])} aria-hidden="true">
              ID // RC-0001
            </span>
            <span className={classNames(cls.tag, {}, [cls.sysTag])} aria-hidden="true">
              SYS.ONLINE ▮
            </span>
            <span className={classNames(cls.sticker, {}, [cls.stickerReact])} aria-hidden="true">
              React
            </span>
            <span className={classNames(cls.sticker, {}, [cls.stickerTs])} aria-hidden="true">
              TypeScript
            </span>
            <p className={classNames(cls.code, {}, [cls.codeFloat])}>{cityCode}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
