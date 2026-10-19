import {
  type SimpleIcon,
  siCss,
  siCssmodules,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siReact,
  siReactrouter,
  siRedux,
  siSass,
  siStyledcomponents,
  siTypescript,
  siVercel,
  siVite,
} from 'simple-icons'

// Ряды навыков — из макета. [В скобках] — заглушки владельца.
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

// Официальные логотипы (simple-icons). Без логотипа — монограмма:
// у Canvas API его нет, заглушки [в скобках] остаются заглушками.
export const SKILL_ICONS: Partial<Record<string, SimpleIcon>> = {
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Redux: siRedux,
  'React Router': siReactrouter,
  HTML5: siHtml5,
  CSS3: siCss,
  SASS: siSass,
  'CSS Modules': siCssmodules,
  'styled-components': siStyledcomponents,
  Vite: siVite,
  Git: siGit,
  GitHub: siGithub,
  Vercel: siVercel,
}
