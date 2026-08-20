import { cn } from '../lib/cn'

export interface StatPillProps {
  icon: string
  value: string | number
  /** Screen-reader name for the counter, e.g. "Day streak". */
  label: string
  tone?: 'fox' | 'macaw' | 'cardinal' | 'bee'
  className?: string
}

const TONE = {
  fox: 'text-fox',
  macaw: 'text-macaw',
  cardinal: 'text-cardinal',
  bee: 'text-bee',
} as const

/** The streak / gems / hearts counters that live in the top bar. */
export function StatPill({
  icon,
  value,
  label,
  tone = 'fox',
  className,
}: StatPillProps) {
  return (
    <span
      className={cn('flex items-center gap-1.5 text-lg', TONE[tone], className)}
    >
      <span aria-hidden className="text-xl leading-none">
        {icon}
      </span>
      <span>{value}</span>
      <span className="sr-only">{label}</span>
    </span>
  )
}
