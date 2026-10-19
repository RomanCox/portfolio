'use client'

import { useCallback, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/Button/Button'
import { DownloadIcon } from '@/components/icons/icons'
import { LangSwitch } from '@/components/LangSwitch/LangSwitch'
import { LogoMark } from '@/components/LogoMark/LogoMark'
import { ThemeSwitch } from '@/components/ThemeSwitch/ThemeSwitch'
import { NAV_ITEMS } from '@/data/navigation'
import { Link } from '@/i18n/navigation'
import { MobileMenu } from '@/sections/MobileMenu/MobileMenu'
import { classNames } from '@/shared/lib/classNames/classNames'
import { scrollToAnchor } from '@/shared/lib/smoothScroll/smoothScroll'
import cls from './Header.module.scss'

const MENU_ID = 'mobile-menu'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const t = useTranslations()
  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header className={classNames(cls.header, {}, [className])}>
        <div className={cls.inner}>
          <Link href="/" className={cls.logo} aria-label="Roman Cox">
            <LogoMark />
            <span className={cls.wordmark} aria-hidden="true">
              roman<span className={cls.underscore}>_</span>cox
            </span>
          </Link>

          <nav className={cls.nav} aria-label={t('menu.title')}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={{ pathname: '/', hash: item.id }}
                className={cls.navLink}
                onClick={(event) => scrollToAnchor(event, item.id)}
              >
                <span className={cls.navNum}>{item.num}</span>
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <LangSwitch className={cls.desktopOnly} />
          <ThemeSwitch className={cls.desktopOnly} />
          <Button href="/resume" icon={<DownloadIcon size={16} />} className={cls.desktopOnly}>
            {t('nav.cv')}
          </Button>

          <button
            ref={burgerRef}
            type="button"
            className={cls.burger}
            aria-label={t('menu.open')}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMenuOpen(true)}
          >
            <span className={cls.burgerLine} />
            <span className={cls.burgerLine} />
            <span className={cls.burgerLine} />
          </button>
        </div>
      </header>

      {/* Вне <header>: backdrop-filter шапки ломает position: fixed у потомков */}
      <MobileMenu id={MENU_ID} open={menuOpen} onClose={closeMenu} returnFocusRef={burgerRef} />
    </>
  )
}
