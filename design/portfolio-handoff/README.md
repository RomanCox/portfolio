# Roman Cox — пакет для разработки портфолио

```
portfolio-handoff/
├── README.md            ← этот файл: как стартовать
├── design-system.md     ← ТЗ: токены, шрифты, сетка, компоненты, анимации (главный документ)
├── tokens/
│   ├── tokens.css       ← CSS-переменные трёх тем + статичные токены + .chamfer-*
│   └── themes.json      ← те же цвета в JSON (исходные ключи макета)
├── i18n/
│   ├── ru.json  en.json  be.json   ← все тексты макета, ключи совпадают
└── mockups/
    ├── Desktop.dc.html, Tablet-1/2, Mobile-1/2, Mobile-Menu, Resume, Headline, Themes
    ├── canvas.json      ← раскладка холста
    └── support.js       ← движок холста, нужен только чтобы открыть макеты локально
```

## Как смотреть макеты локально

Откройте любой `mockups/*.dc.html` в Chrome (двойной клик). Шрифты грузятся с Google Fonts — нужен интернет. Темы и языки переключаются, бургер открывается, анимации «Обо мне» и «Опыт» работают при прокрутке.

Макеты — **справочник значений**, а не код для копирования: inline-стили, движок холста, упрощённая логика анимаций.

## Старт проекта

```bash
npx create-next-app@latest portfolio --ts --eslint --app --src-dir --no-tailwind --import-alias "@/*"
cd portfolio
npm i next-intl motion sass
npm i -D playwright
```

Дальше:

1. `src/styles/tokens.css` ← скопировать `tokens/tokens.css`, импортировать в `src/app/[locale]/layout.tsx`.
2. `messages/ru.json`, `en.json`, `be.json` ← из `i18n/`. Настроить next-intl: маршруты `/[locale]`, `locales: ['ru','en','be']`, `defaultLocale: 'ru'`.
3. Шрифты через `next/font/google`: `Unbounded` (500/600/800), `Onest` (400/500), `JetBrains_Mono` (400/500/700), `subsets: ['latin','cyrillic']`, связать с `--font-display/body/mono`.
4. Тема: inline-скрипт в `<head>`, который до отрисовки ставит `data-theme` из `localStorage` (иначе мигание). Переключатель пишет в `localStorage` и в атрибут.
5. Секции — отдельные компоненты: `Header`, `MobileMenu`, `Hero`, `Tape`, `About` (терминал + колода), `Skills`, `Experience`, `Projects`, `CvPromo`, `Contact`, `Footer`. Данные проектов/опыта — в отдельных файлах, не в разметке.
6. PDF резюме: страница `/[locale]/resume` с print-CSS; скрипт `prebuild` открывает её Playwright'ом и сохраняет `public/cv/roman-cox-<locale>.pdf`.
7. `npm run dev` → http://localhost:3000. Ширины проверять в DevTools: 360, 390, 768, 834, 1024, 1280, 1440 и iPad landscape 1194×834.

Порядок работы: токены и шрифты → шапка и меню → hero → остальные секции статикой → темы и языки → анимации последними (раскладку под них закладывать сразу: обёртки для sticky, место под колоду).

## Если делает агент

Дайте ему этот архив целиком и первым сообщением:

> Сверстай портфолио по `design-system.md`. Значения бери из `tokens/tokens.css` и `i18n/*.json`, вид — из `mockups/*.dc.html` (открой в браузере и смотри исходник). Код из макетов не копируй: там inline-стили и движок холста. Заглушки `[…]` оставь заглушками. Стек — раздел 9 `design-system.md`. Начни с токенов, шрифтов, шапки и hero; после каждого блока сверяй со скриншотом макета на 390 / 834 / 1440.
