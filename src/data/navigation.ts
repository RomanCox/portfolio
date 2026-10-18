// Пункты меню. Номер совпадает с номером секции; [05] — блок «Резюме», в меню его нет.
export const NAV_ITEMS = [
  { num: '01', id: 'about', key: 'about' },
  { num: '02', id: 'skills', key: 'skills' },
  { num: '03', id: 'exp', key: 'exp' },
  { num: '04', id: 'projects', key: 'projects' },
  { num: '06', id: 'contact', key: 'contact' },
] as const

export const SOCIAL_LINKS = {
  telegram: { href: 'https://t.me/romancox', label: 'tg @romancox' },
  github: { href: 'https://github.com/RomanCox', label: 'gh RomanCox' },
} as const
