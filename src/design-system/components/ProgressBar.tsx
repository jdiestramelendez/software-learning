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

const FILL = {
  green: 'bg-feather-green',
  yellow: 'bg-bee',
  blue: 'bg-macaw',
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
      className={cn('h-4 w-full overflow-hidden rounded-full bg-swan', className)}
    >
      <div
        className={cn(
          'relative h-full rounded-full transition-[width] duration-300 ease-out',
          FILL[color],
        )}
        style={{ width: `${pct}%` }}
      >
        {pct > 8 && (
          <span className="absolute inset-x-2 top-1 h-1 rounded-full bg-snow/30" />
        )}
      </div>
    </div>
  )
}
