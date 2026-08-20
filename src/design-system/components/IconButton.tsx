import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: an icon alone is never self-describing to a screen reader. */
  label: string
  children: ReactNode
}

/** A square, borderless press target for toolbars and close buttons. */
export function IconButton({
  label,
  className,
  children,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'ds-press grid size-11 place-items-center rounded-chunky text-2xl text-hare',
        'hover:bg-polar hover:text-wolf',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
