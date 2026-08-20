import { cn } from '../lib/cn'

export interface ProgressBarProps {
  /** Completed units. Clamped to [0, max]. */
  value: number
  max?: number
  className?: string
  color?: 'green' | 'yellow' | 'blue'
  /** Announced to screen readers, e.g. "Lesson progress". */
  label?: string
}

/**
 * Fills carry no text of their own, so they can stay at full brightness.
 * Progress reads as the brand; `meadow` stays reserved for correctness, so the
 * two never get confused with each other.
 */
/**
 * The `color` values are part of the public API and predate this palette, so
 * they stay put — only what they render as has changed. `green` is now the
 * brand fill. Fills carry no text of their own, so they run at full brightness.
 */
const FILL = {
  green: 'bg-iris',
  yellow: 'bg-sunbeam',
  blue: 'bg-sky',
} as const

/**
 * The lesson progress track. The inner white sliver is not decoration for its
 * own sake — it is the highlight that keeps the bar reading as a rounded tube.
 */
export function ProgressBar({
  value,
  max = 100,
  className,
  color = 'green',
  label = 'Progress',
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 1
  const pct = Math.min(100, Math.max(0, (value / safeMax) * 100))

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-4 w-full overflow-hidden rounded-full bg-linen', className)}
    >
      <div
        className={cn(
          'relative h-full rounded-full transition-[width] duration-300 ease-out',
          FILL[color],
        )}
        style={{ width: `${pct}%` }}
      >
        {pct > 8 && (
          <span className="absolute inset-x-2 top-1 h-1 rounded-full bg-paper/30" />
        )}
      </div>
    </div>
  )
}
