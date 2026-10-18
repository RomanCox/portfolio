'use client'

import { useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'
import { classNames } from '@/shared/lib/classNames/classNames'
import { THEMES, THEME_STORAGE_KEY, isTheme, type Theme } from '@/shared/lib/theme/theme'
import cls from './ThemeSwitch.module.scss'

const lightQuery = '(prefers-color-scheme: light)'

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  const media = window.matchMedia(lightQuery)
  media.addEventListener('change', onChange)

  return () => {
    observer.disconnect()
    media.removeEventListener('change', onChange)
  }
}

// Действующая тема: выбранная пользователем или системная (light / neon)
function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute('data-theme')
  if (isTheme(attr)) return attr

  return window.matchMedia(lightQuery).matches ? 'light' : 'neon'
}

function getServerSnapshot(): Theme | null {
  return null
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // приватный режим / запрет хранилища — тема просто не запомнится
  }
}

interface ThemeSwitchProps {
  className?: string
  // с подписями — в мобильном меню; без — ромбы 44×44 в шапке
  labeled?: boolean
}

export function ThemeSwitch({ className, labeled = false }: ThemeSwitchProps) {
  const t = useTranslations()
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <div
      className={classNames(cls.themeSwitch, { [cls.labeled]: labeled }, [className])}
      role="group"
      aria-label={t('menu.theme')}
    >
      {THEMES.map((theme) => {
        const label = t(`themeNames.${theme}`)

        return (
          <button
            key={theme}
            type="button"
            className={classNames(cls.button, { [cls.active]: current === theme })}
            aria-pressed={current === theme}
            aria-label={labeled ? undefined : label}
            title={labeled ? undefined : label}
            onClick={() => setTheme(theme)}
          >
            <span className={classNames(cls.swatch, {}, [cls[theme]])} aria-hidden="true" />
            {labeled && <span className={cls.label}>{label}</span>}
          </button>
        )
      })}
    </div>
  )
}
