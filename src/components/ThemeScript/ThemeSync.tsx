'use client'

import { useLayoutEffect } from 'react'
import { useLocale } from 'next-intl'
import { readStoredTheme } from '@/shared/lib/theme/theme'

// При клиентской смене локали React перерисовывает <html> из RSC и стирает data-theme,
// а inline-скрипт повторно не выполняется. Восстанавливаем тему до отрисовки.
export function ThemeSync() {
  const locale = useLocale()

  useLayoutEffect(() => {
    const theme = readStoredTheme()
    if (theme && document.documentElement.getAttribute('data-theme') !== theme) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [locale])

  return null
}
