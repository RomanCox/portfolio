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
import { useScramble } from './useScramble'

const MENU_ID = 'mobile-menu'
// Подпись у логотипа: обычная ↔ при открытом меню (расшифровка из помех)
const WORDMARK = 'roman_cox'
const WORDMARK_MENU = '> menu.open()'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const t = useTranslations()
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const { text: wordmark, scrambleTo } = useScramble(WORDMARK)

  const toggleMenu = useCallback(
    (open: boolean) => {
      setMenuOpen(open)
      scrambleTo(open ? WORDMARK_MENU : WORDMARK)
    },
    [scrambleTo],
  )
  const closeMenu = useCallback(() => toggleMenu(false), [toggleMenu])

  return (
    <>
      {/* Шапка остаётся поверх открытого меню: её кнопка превращается в крестик */}
      <header ref={headerRef} className={classNames(cls.header, { [cls.headerMenuOpen]: menuOpen }, [className])}>
        <div className={cls.inner}>
          <Link href="/" className={cls.logo} aria-label="Roman Cox" onClick={menuOpen ? closeMenu : undefined}>
            <LogoMark />
            <span className={classNames(cls.wordmark, { [cls.wordmarkMenu]: menuOpen })} aria-hidden="true">
              {wordmark === WORDMARK ? (
                <>
                  roman<span className={cls.underscore}>_</span>cox
                </>
              ) : (
                wordmark
              )}
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
            className={classNames(cls.burger, { [cls.burgerOpen]: menuOpen })}
            aria-label={t(menuOpen ? 'menu.close' : 'menu.open')}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => toggleMenu(!menuOpen)}
          >
            <span className={cls.burgerLines} aria-hidden="true">
              <span className={cls.burgerLine} />
              <span className={cls.burgerLine} />
              <span className={cls.burgerLine} />
            </span>
          </button>
        </div>
      </header>

      {/* Вне <header>: backdrop-filter шапки ломает position: fixed у потомков */}
      <MobileMenu id={MENU_ID} open={menuOpen} onClose={closeMenu} headerRef={headerRef} returnFocusRef={burgerRef} />
    </>
  )
}
