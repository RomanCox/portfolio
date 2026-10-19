import { CrosshairIcon } from '@/components/icons/icons'
import type { ProjectMock as ProjectMockKind } from '@/data/projects'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProjectMock.module.scss'

// Скриншота проекта нет — заглушка из макета
const SCREENSHOT_PLACEHOLDER = '[СКРИНШОТ ПРОЕКТА]'

// Нарисованные интерфейсы TodoList: колонки и отметки задач (ширины — в scss)
const TODO_COLUMNS = [
  [true, true, false, false],
  [false, true, false],
  [true, false, false, true],
]

interface ProjectMockProps {
  className?: string
  kind: ProjectMockKind
  url: string
  large?: boolean
}

// Мини-окно браузера с нарисованным интерфейсом проекта (декор)
export function ProjectMock({ className, kind, url, large = false }: ProjectMockProps) {
  return (
    <div className={classNames(cls.projectMock, { [cls.large]: large }, [className])} aria-hidden="true">
      <div className={cls.window}>
        <div className={cls.bar}>
          <span className={classNames(cls.dot, {}, [cls.dotMagenta])} />
          <span className={classNames(cls.dot, {}, [cls.dotAccent])} />
          <span className={classNames(cls.dot, {}, [cls.dotNumber])} />
          <span className={cls.url}>{url}</span>
        </div>
        <div className={cls.screen}>
          {kind === 'todo' && (
            <div className={cls.todo}>
              {TODO_COLUMNS.map((rows, col) => (
                <div key={col} className={cls.todoCol}>
                  <span className={cls.todoHead} />
                  {rows.map((done, row) => (
                    <span key={row} className={cls.todoRow}>
                      <span className={classNames(cls.todoBox, { [cls.todoDone]: done })} />
                      <span className={cls.todoLine} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}

          {kind === 'social' && (
            <div className={cls.social}>
              <div className={cls.socialNav}>
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className={cls.socialFeed}>
                <div className={cls.socialProfile}>
                  <span className={cls.socialAvatar} />
                  <span className={cls.socialLines}>
                    <span />
                    <span />
                  </span>
                </div>
                <div className={cls.socialPost}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}

          {kind === 'client' && (
            <div className={cls.client}>
              <CrosshairIcon size={28} />
              {SCREENSHOT_PLACEHOLDER}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
