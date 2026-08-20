import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

const badge = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-eyebrow uppercase',
  {
    variants: {
      tone: {
        green: 'bg-dew text-fern',
        blue: 'bg-mist text-harbor',
        red: 'bg-petal text-rust',
        yellow: 'bg-butter text-honey',
        purple: 'bg-lilac text-plum',
        coral: 'bg-blush text-clay',
        neutral: 'bg-sand text-slate',
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
