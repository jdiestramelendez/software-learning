import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Drops the border + shadow, keeping only the padding and radius. */
  flat?: boolean
}

/** The default container: 2px swan border, slab radius, hard bottom edge. */
export function Card({ className, flat, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-slab bg-snow p-5',
        !flat && 'border-2 border-swan shadow-card',
        className,
      )}
      {...props}
    />
  )
}
