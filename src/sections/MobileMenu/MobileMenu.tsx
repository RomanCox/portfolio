'use client'

import { useEffect, useRef, type MouseEvent, type RefObject } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/Button/Button'
import { ArrowUpRightIcon, DownloadIcon } from '@/components/icons/icons'
import { LangSwitch } from '@/components/LangSwitch/LangSwitch'
import { ThemeSwitch } from '@/components/ThemeSwitch/ThemeSwitch'
import { NAV_ITEMS, SOCIAL_LINKS } from '@/data/navigation'
import { Link } from '@/i18n/navigation'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getFocusable, inertOutside, trapTabKey } from '@/shared/lib/focusTrap/focusTrap'
import { lockScroll, unlockScroll } from '@/shared/lib/scrollLock/scrollLock'
import { scrollToAnchor } from '@/shared/lib/smoothScroll/smoothScroll'
import cls from './MobileMenu.module.scss'

// Меню существует только ниже десктопа; при расширении окна закрывается
const DESKTOP_QUERY = '(min-width: 1024px)'

interface MobileMenuProps {
  className?: string
  id: string
  open: boolean
  onClose: () => void
  // шапка остаётся поверх меню: её кнопка закрывает меню, фокус ходит по шапке и меню
  headerRef: RefObject<HTMLElement | null>
  returnFocusRef: RefObject<HTMLElement | null>
}

export function MobileMenu({ className, id, open, onClose, headerRef, returnFocusRef }: MobileMenuProps) {
  const t = useTranslations()
  const dialogRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const dialog = dialogRef.current
    const header = headerRef.current
    if (!open || !dialog || !header) return

    const returnFocusTo = returnFocusRef.current
    lockScroll()
    const restoreInert = inertOutside([header, dialog])
    getFocusable(dialog)[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      trapTabKey(event, [header, dialog])
    }

    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onDesktop = () => desktop.matches && onClose()

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onDesktop)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onDesktop)
      restoreInert()
      unlockScroll()
      // на десктопе бургер скрыт — фокус на него не вернуть
      if (returnFocusTo && returnFocusTo.getClientRects().length > 0) returnFocusTo.focus()
    }
  }, [open, onClose, headerRef, returnFocusRef])

  // Переход по разделу: снять блокировку до навигации, иначе якорь не прокрутится
  const onNavigate = () => {
    unlockScroll()
    onClose()
  }

  const onNavigateTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    onNavigate()
    scrollToAnchor(event, id)
  }

  const duration = reduceMotion ? 0 : 0.28
  const stagger = reduceMotion ? 0 : 0.04

  const dialogVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, ease: [0.16, 1, 0.3, 1], staggerChildren: stagger, delayChildren: stagger } },
    exit: { opacity: 0, transition: { duration: reduceMotion ? 0 : 0.18 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -16 },
    visible: { opacity: 1, x: 0, transition: { duration, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          id={id}
          // без aria-modal: он спрятал бы от скринридера кнопку закрытия в шапке;
          // модальность даёт inert на остальной странице
          role="dialog"
          aria-label={t('menu.title')}
          className={classNames(cls.mobileMenu, {}, [className])}
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={cls.glows} aria-hidden="true">
            <div className={cls.glowA} />
            <div className={cls.glowB} />
          </div>

          {/* место под шапку, которая лежит поверх меню */}
          <div className={cls.headerSpace} aria-hidden="true" />

          <nav className={cls.nav} aria-label={t('menu.title')}>
            {NAV_ITEMS.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link
                  href={{ pathname: '/', hash: item.id }}
                  className={cls.navLink}
                  onClick={(event) => onNavigateTo(event, item.id)}
                >
                  <span className={cls.navNum}>{item.num}</span>
                  <span className={cls.navLabel}>{t(`nav.${item.key}`)}</span>
                  <ArrowUpRightIcon size={18} className={cls.navArrow} />
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div className={cls.controls} variants={itemVariants}>
            <div className={cls.controlRow}>
              <span className={cls.controlLabel} aria-hidden="true">
                {`// ${t('menu.lang')}`}
              </span>
              <LangSwitch wide />
            </div>
            <div className={cls.controlRow}>
              <span className={cls.controlLabel} aria-hidden="true">
                {`// ${t('menu.theme')}`}
              </span>
              <ThemeSwitch labeled />
            </div>
          </motion.div>

          <motion.div className={cls.bottom} variants={itemVariants}>
            <Button href="/resume" size="l" fullWidth icon={<DownloadIcon size={18} />} onClick={onNavigate}>
              {t('nav.cv')}
            </Button>
            <div className={cls.social}>
              <a href={SOCIAL_LINKS.telegram.href} className={cls.socialLink} target="_blank" rel="noopener noreferrer">
                {SOCIAL_LINKS.telegram.label}
              </a>
              <a href={SOCIAL_LINKS.github.href} className={cls.socialLink} target="_blank" rel="noopener noreferrer">
                {SOCIAL_LINKS.github.label}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
