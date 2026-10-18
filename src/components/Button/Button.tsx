import type { ComponentProps, ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export type ButtonVariant = 'primary' | 'secondary'
// s — 44px, m — 52px, l — 56px
export type ButtonSize = 's' | 'm' | 'l'

interface ButtonBaseProps {
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  icon?: ReactNode
  children: ReactNode
}

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonBaseProps> & { href: ComponentProps<typeof Link>['href'] }

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentProps<'button'>, keyof ButtonBaseProps> & { href?: undefined }

export type ButtonProps = ButtonAsLink | ButtonAsButton

export function Button(props: ButtonProps) {
  const { className, variant = 'primary', size = 's', fullWidth = false, icon, children, ...rest } = props

  const classes = classNames(cls.button, { [cls.fullWidth]: fullWidth }, [className, cls[variant], cls[size]])
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  )

  if (rest.href !== undefined) {
    return (
      <Link className={classes} {...(rest as Omit<ButtonAsLink, keyof ButtonBaseProps>)}>
        {content}
      </Link>
    )
  }

  const { type = 'button', ...buttonRest } = rest as Omit<ButtonAsButton, keyof ButtonBaseProps>

  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  )
}
