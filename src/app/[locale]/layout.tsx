import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JetBrains_Mono, Onest, Unbounded } from 'next/font/google'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { ThemeScript } from '@/components/ThemeScript/ThemeScript'
import { ThemeSync } from '@/components/ThemeScript/ThemeSync'
import { classNames } from '@/shared/lib/classNames/classNames'
import { routing } from '@/i18n/routing'
import '@/styles/tokens.css'
import '@/styles/globals.scss'

const unbounded = Unbounded({
  variable: '--font-unbounded',
  weight: ['500', '600', '800'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

const onest = Onest({
  variable: '--font-onest',
  weight: ['400', '500'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Roman Cox',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={classNames(unbounded.variable, {}, [onest.variable, jetbrainsMono.variable])}
      // data-theme ставит ThemeScript до гидрации
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <NextIntlClientProvider>
          <ThemeSync />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
