import { cn } from '../lib/cn'

export interface SectionHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
  accent?: 'green' | 'blue'
  className?: string
}

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
        'rounded-slab p-5 text-paper',
        accent === 'green'
          ? 'bg-iris shadow-btn shadow-plum'
          : 'bg-tide shadow-btn shadow-harbor',
        className,
      )}
    >
      <p className="text-eyebrow uppercase opacity-80">{eyebrow}</p>
      <h2 className="mt-1 text-title">{title}</h2>
      <p className="mt-1 text-sm font-bold opacity-90">{subtitle}</p>
    </div>
  )
}
