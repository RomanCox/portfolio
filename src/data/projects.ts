// Проекты на главной — из макета. Тексты описаний — в messages (projects.*).
// [В скобках] — заглушки владельца.

export const GITHUB_URL = 'https://github.com/RomanCox'

export type ProjectMock = 'todo' | 'social' | 'client'
export type ProjectBadge = 'featured' | 'wip' | 'work'

export interface Project {
  id: ProjectMock
  num: string
  title: string
  tags: readonly string[]
  badge: ProjectBadge
  // null — демо нет (проект в работе)
  live: string | null
  // кнопка «Демо» есть в макете, но ссылки пока нет — показать неактивной
  livePending?: boolean
  url: string
  code: string
  featured: boolean
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'todo',
    num: '/001',
    title: 'TodoList',
    tags: ['react', 'typescript', 'redux'],
    badge: 'featured',
    live: 'https://todolist-xi-seven.vercel.app',
    url: 'todolist-xi-seven.vercel.app',
    code: GITHUB_URL,
    featured: true,
  },
  {
    id: 'social',
    num: '/002',
    title: 'Social Network',
    tags: ['react', 'redux', 'router'],
    badge: 'wip',
    live: null,
    url: 'localhost:5173/profile',
    code: GITHUB_URL,
    featured: false,
  },
  {
    id: 'client',
    num: '/003',
    title: '[Client project]',
    tags: ['[stack]'],
    badge: 'work',
    // ссылки на клиентский проект пока нет
    live: null,
    livePending: true,
    url: '[client-domain]',
    code: GITHUB_URL,
    featured: false,
  },
]

// Счётчик на кнопке «Все проекты»
export const ALL_PROJECTS_COUNT = '[N]'
