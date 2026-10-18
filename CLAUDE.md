# CLAUDE.md — портфолио Roman Cox

Личный сайт-портфолио front-end разработчика: о себе, навыки, опыт, проекты, страница резюме с PDF. Киберпанк-стилистика, три темы, три языка.

## Источники правды

- `design/design-system.md` — ТЗ: токены, шрифты, сетка, компоненты, анимации. Читай перед любой задачей по вёрстке.
- `design/portfolio-handoff/tokens/tokens.css` — CSS-переменные трёх тем. Копируется в проект как есть.
- `design/portfolio-handoff/i18n/{ru,en,be}.json` — все тексты. Не переписывать формулировки.
- `design/portfolio-handoff/mockups/*.dc.html` — макеты (Desktop 1440, Tablet 834, Mobile 390). Открываются в браузере. Это **справочник значений, а не код для копирования**: inline-стили и чужой движок, логика анимаций упрощена.

Если ТЗ и макет расходятся — прав макет; сообщи о расхождении.
Если в ТЗ раздел 9 «Стек» расходится с этим файлом — прав этот файл.

## Стек (не менять без согласования)

- **pnpm** — единственный менеджер пакетов. Не использовать npm/yarn, не коммитить чужие lock-файлы.
- **Next.js (App Router, последняя стабильная) + React 19 + TypeScript (strict)**, `src/`-директория, алиас `@/*`.
- **next-intl** — маршруты `/[locale]` (`ru` по умолчанию, `en`, `be`), словари из `messages/*.json`.
- **SCSS + CSS Modules**: `*.module.scss` на компонент, глобально — `tokens.css` и `globals.scss`. Без Tailwind, без CSS-in-JS, без inline-стилей (кроме значений, вычисляемых в рантайме анимациями).
- **GSAP + ScrollTrigger** через `@gsap/react` (`useGSAP`) — всё, что привязано к прокрутке.
- **Motion** (`motion/react`, бывший Framer Motion) — появление элементов, декод заголовков, открытие меню, микро-взаимодействия.
- Шрифты — `next/font/google`: Unbounded (500/600/800), Onest (400/500), JetBrains Mono (400/500/700), `subsets: ['latin','cyrillic']`.
- **Playwright** (dev) — генерация PDF резюме и визуальные проверки.

### Граница GSAP / Motion

| Задача | Чем |
|---|---|
| Колода слайдов «Обо мне» (pin + горизонтальное движение + уход вглубь) | GSAP ScrollTrigger (`pin`, `scrub`) |
| Бегущие ряды навыков, ленты | CSS `@keyframes` (если нужно от скролла — GSAP) |
| Sticky-колонка «Опыт» | чистый CSS `position: sticky` |
| Декод заголовков, reveal блоков, меню, кольцо скролла | Motion |
| Живой фон (импульсы по сетке) | чистый canvas + `requestAnimationFrame`, без библиотек |

Одна библиотека на элемент. Не анимировать один и тот же узел и GSAP, и Motion.

## Структура

```
src/
  app/[locale]/layout.tsx      шрифты, ThemeScript, провайдер next-intl, PulseBackground
  app/[locale]/page.tsx        главная из секций
  app/[locale]/resume/page.tsx страница резюме (print-CSS)
  components/                  общие: Button, Chamfer, SectionHeader, Tag, LangSwitch, ThemeSwitch …
  sections/                    Header, MobileMenu, Hero, Tape, About, Skills, Experience, Projects, CvPromo, Contact, Footer
  effects/                     PulseBackground, DecodeHeading, ScrollRing
  data/                        projects.ts, experience.ts, skills.ts (контент вне разметки)
  shared/lib/classNames/       classNames.ts + classNames.test.ts
  styles/tokens.css, globals.scss, _mixins.scss (breakpoints, chamfer)
  i18n/                        routing.ts, request.ts
messages/ru.json en.json be.json
scripts/build-cv-pdf.ts        Playwright → public/cv/roman-cox-<locale>.pdf
design/                        материалы дизайна (не трогать, не импортировать в код)
```

## Правила

- Брейкпоинты: mobile `< 768`, tablet `768–1023`, desktop `≥ 1024` (миксины в `_mixins.scss`, mobile-first).
- Скошенные углы — через миксин `chamfer($size)`; обводка и тень — на обёртке (см. ТЗ, раздел «Скошенные углы»). У каждого интерактивного элемента видимый `:focus-visible`.
- Тема: атрибут `data-theme` на `<html>`, inline-скрипт в `<head>` до отрисовки, значение в `localStorage` (`rc-theme`); без выбора — системная. Никакого мигания темы при загрузке.
- `prefers-reduced-motion` — все анимации в конечное состояние, фон — статичная сетка.
- Предок sticky-элементов — без `overflow: hidden` (используй `overflow-x: clip`). Мобильное меню — вне `<header>` (у шапки `backdrop-filter`).
- Доступность: семантика, `aria-label` у иконочных кнопок, контраст ≥ 4.5:1, меню — `role="dialog"`, Esc, блокировка скролла, ловушка фокуса.
- **Контент**: всё в `[квадратных скобках]` — заглушки. Ничего не выдумывать (стаж, компании, ссылки, почту). Если данных нет — оставить заглушку.
- Новые зависимости — только с согласования. Логотипы технологий — официальные SVG, не перерисовывать.
- Не трогать `design/`.

## Классы: `classNames`

Все составные и условные классы — **только** через `classNames` из `src/shared/lib/classNames/classNames.ts`. Не склеивать классы шаблонными строками и `+`.

```ts
export type Mods = Record<string, boolean | string | undefined>

export function classNames(
  cls: string | undefined,
  mods: Mods = {},
  additional: Array<string | undefined> = []
): string {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      // ключ 'undefined' появляется, если класса нет в модуле (опечатка) — не пропускаем его в DOM
      .filter(([className, value]) => Boolean(value) && className !== 'undefined')
      .map(([className]) => className),
  ]
    .filter(Boolean)
    .join(' ')
}
```

Использование:

```tsx
import cls from './Button.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

<button className={classNames(cls.button, { [cls.active]: isActive, [cls.disabled]: disabled }, [className, cls[variant]])} />
```

- `cls` — базовый класс компонента; `mods` — условные классы (ключ — класс из модуля, значение — **boolean**; строки в значениях не использовать); `additional` — внешний `className` из пропсов и классы вариантов.
- Каждый компонент принимает `className?: string` и передаёт его в `additional`.
- Покрыть функцию юнит-тестом (пустые моды, `undefined`-класс, внешний `className`).
- В tsconfig включить `noUncheckedIndexedAccess`, чтобы `cls.someClass` имел тип `string | undefined`.

## Как работать

Работа по этапам. Не переходить к следующему, пока текущий не принят.

0. Скаффолд: Next + TS + ESLint, pnpm, зависимости, `tokens.css`, шрифты, `_mixins.scss`, next-intl с тремя локалями, ThemeScript. Пустая страница переключает тему и язык.
1. Header (desktop) + MobileMenu + переключатели.
2. Hero (desktop/tablet/mobile) + Tape + PulseBackground.
3. Статика остальных секций: About (без колоды), Skills, Experience, Projects, CvPromo, Contact, Footer.
4. Анимации: декод заголовков, кольцо, бегущие ряды, sticky «Опыт», колода «Обо мне» (GSAP).
5. Страница резюме + генерация PDF.
6. SEO: metadata, `hreflang`, OG-картинка, sitemap; Lighthouse.

После каждого этапа:
- `pnpm lint` и `pnpm build` без ошибок;
- скриншоты Playwright на 390×844, 834×1194, 1440×900 и сравнение с соответствующим макетом из `design/portfolio-handoff/mockups/`; перечислить расхождения;
- проверить отсутствие горизонтального скролла и наложений на 360, 768, 1024, 1280;
- краткий отчёт: что сделано, что отличается от макета и почему;
- коммит с понятным сообщением.

Если задача неоднозначна или ТЗ не покрывает случай — спроси, а не придумывай.
