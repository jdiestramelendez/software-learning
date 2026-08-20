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
        'rounded-slab p-5 text-snow',
        accent === 'green'
          ? 'bg-feather-green shadow-[0_4px_0_0_var(--color-tree-frog)]'
          : 'bg-macaw shadow-[0_4px_0_0_var(--color-whale)]',
        className,
      )}
    >
      <p className="text-eyebrow uppercase opacity-80">{eyebrow}</p>
      <h2 className="mt-1 text-title">{title}</h2>
      <p className="mt-1 text-sm font-bold opacity-90">{subtitle}</p>
    </div>
  )
}
