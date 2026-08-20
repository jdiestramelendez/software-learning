import type { VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'
import { buttonVariants } from './button-variants'

/**
 * The anchor component of the whole system.
 *
 * Anatomy: uppercase bold label, chunky radius, and a hard 4px bottom shadow
 * that disappears as the button translates down on :active — that press is
 * what makes the UI feel like a physical toy rather than a form.
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Rendered before the label — an emoji or icon element. */
  icon?: ReactNode
}

export function Button({
  className,
  variant,
  size,
  full,
  icon,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, full }), className)}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
