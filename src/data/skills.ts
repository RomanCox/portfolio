// Ряды навыков — из макета. [В скобках] — заглушки владельца.
// В макете вместо логотипов монограммы; официальные SVG подставить позже.
export const SKILL_ROWS = [
  {
    key: 'core',
    direction: 'left',
    items: ['React', 'TypeScript', 'JavaScript', 'Redux', 'React Router', 'HTML5', '[+ ещё]', '[+ ещё]'],
  },
  {
    key: 'style',
    direction: 'right',
    items: ['CSS3', 'SASS', 'CSS Modules', 'styled-components', '[Tailwind?]', '[Анимации]', '[+ ещё]', '[+ ещё]'],
  },
  {
    key: 'tools',
    direction: 'left',
    items: ['Vite', 'Git', 'GitHub', 'Vercel', 'Canvas API', '[Figma?]', '[npm]', '[+ ещё]'],
  },
] as const

export type SkillRowKey = (typeof SKILL_ROWS)[number]['key']

// Две первые буквы без знаков: «React Router» → «Re», «[+ ещё]» → «+е»
export function monogram(name: string): string {
  return name.replace(/[^A-Za-zА-Яа-яЁё+]/g, '').slice(0, 2) || '··'
}
