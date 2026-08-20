import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

const badge = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-eyebrow uppercase',
  {
    variants: {
      tone: {
        green: 'bg-sea-sponge text-tree-frog',
        blue: 'bg-iguana text-whale',
        red: 'bg-walking-fish text-fire-ant',
        yellow: 'bg-canary text-camel',
        purple: 'bg-beetle/15 text-humpback',
        neutral: 'bg-polar text-wolf',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badge({ tone }), className)} {...props} />
}
