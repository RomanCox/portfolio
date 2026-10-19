import { useTranslations } from 'next-intl'
import { Card } from '@/components/Card/Card'
import { ArrowRightIcon, ArrowUpRightIcon, CodeIcon } from '@/components/icons/icons'
import { OutlineNumber } from '@/components/OutlineNumber/OutlineNumber'
import { SectionHeader } from '@/components/SectionHeader/SectionHeader'
import { Tag } from '@/components/Tag/Tag'
import { ALL_PROJECTS_COUNT, PROJECTS, type ProjectBadge } from '@/data/projects'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ProjectMock } from './ProjectMock'
import cls from './Projects.module.scss'

const BADGE_CLASSES: Record<ProjectBadge, string> = {
  featured: cls.badgeFeatured,
  wip: cls.badgeWip,
  work: cls.badgeWork,
}

// Страницы «Все проекты» пока нет (не нарисована) — ссылка-заглушка, как в макете
const ALL_PROJECTS_HREF = '#all-projects'

interface ProjectsProps {
  className?: string
}

// Первый проект — во всю ширину, остальные по два в ряд
export function Projects({ className }: ProjectsProps) {
  const t = useTranslations()

  return (
    <section id="projects" className={classNames(cls.projects, {}, [className])}>
      <OutlineNumber className={cls.number}>04</OutlineNumber>
      <SectionHeader num="04" tag={t('projTag')} title={t('projTitle')} />

      <div className={cls.grid}>
        {PROJECTS.map((project) => (
          <Card
            key={project.id}
            as="article"
            className={classNames(cls.card, { [cls.featured]: project.featured })}
            bodyClassName={cls.cardBody}
          >
            <ProjectMock className={cls.mock} kind={project.id} url={project.url} large={project.featured} />

            <div className={cls.info}>
              <div className={cls.infoTop}>
                <span className={cls.num}>{project.num}</span>
                <span className={classNames(cls.badge, {}, [BADGE_CLASSES[project.badge]])}>{t(`badges.${project.badge}`)}</span>
              </div>
              <h3 className={cls.title}>{project.title}</h3>
              <p className={cls.desc}>{t(`projects.${project.id}`)}</p>
              <ul className={cls.tags}>
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{`#${tag}`}</Tag>
                  </li>
                ))}
              </ul>
              <div className={cls.actions}>
                {project.live && (
                  <a className={cls.live} href={project.live} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRightIcon size={16} />
                    {t('live')}
                  </a>
                )}
                {project.livePending && (
                  <span className={classNames(cls.live, {}, [cls.pending])} aria-disabled="true">
                    <ArrowUpRightIcon size={16} />
                    {t('live')}
                  </span>
                )}
                <a className={cls.code} href={project.code} target="_blank" rel="noopener noreferrer">
                  <CodeIcon size={16} />
                  {t('code')}
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className={cls.allWrap}>
        <a className={cls.all} href={ALL_PROJECTS_HREF}>
          {t('allProjects')}
          <span className={cls.allCount}>{ALL_PROJECTS_COUNT}</span>
          <ArrowRightIcon size={22} />
        </a>
      </div>
    </section>
  )
}
