import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Drops the border + shadow, keeping only the padding and radius. */
  flat?: boolean
}

/** The default container: 2px linen border, slab radius, hard bottom edge. */
export function Card({ className, flat, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-slab bg-paper p-5',
        !flat && 'border-2 border-linen shadow-card',
        className,
      )}
      {...props}
    />
  )
}
