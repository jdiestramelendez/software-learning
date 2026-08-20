import { cn } from '../lib/cn'

export interface SectionHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
  accent?: 'green' | 'blue' | 'coral'
  className?: string
}

/** Coral is bright enough to take ink rather than white — see the palette. */
const ACCENT = {
  green: 'bg-iris text-paper shadow-btn shadow-plum',
  blue: 'bg-tide text-paper shadow-btn shadow-harbor',
  coral: 'bg-coral text-ink shadow-btn shadow-clay',
} as const

/** The banner that separates one section of the learning path from the next. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  accent = 'green',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'rounded-slab p-5',
        ACCENT[accent],
        className,
      )}
    >
      <p className="text-eyebrow uppercase opacity-80">{eyebrow}</p>
      <h2 className="mt-1 text-title">{title}</h2>
      <p className="mt-1 text-sm font-bold opacity-90">{subtitle}</p>
    </div>
  )
}
