import { cn } from '../lib/cn'

export type SkillStatus = 'locked' | 'active' | 'complete' | 'legendary'

export interface SkillNodeProps {
  status: SkillStatus
  icon: string
  title: string
  /** 0–1. Drawn as a ring around the bubble while the skill is in progress. */
  progress?: number
  /** Accessible name used when the unit is locked, e.g. "Big-O — locked". */
  lockedLabel?: string
  onClick?: () => void
}

const FACE: Record<SkillStatus, string> = {
  locked: 'bg-linen text-pebble shadow-btn shadow-pebble/50',
  active: 'bg-iris text-paper shadow-btn shadow-plum',
  // Bright faces keep their brightness and take ink instead of white.
  complete: 'bg-sunbeam text-ink shadow-btn shadow-honey/70',
  legendary: 'bg-coral text-ink shadow-btn shadow-clay',
}

const RING: Record<SkillStatus, string> = {
  locked: 'stroke-linen',
  active: 'stroke-iris',
  complete: 'stroke-sunbeam',
  legendary: 'stroke-coral',
}

const R = 34
const CIRCUMFERENCE = 2 * Math.PI * R

/**
 * A single bubble on the learning path. The progress ring is an SVG circle
 * with a dash offset rather than a conic gradient, so it animates smoothly
 * and stays crisp at any zoom level.
 */
export function SkillNode({
  status,
  icon,
  title,
  progress = 0,
  lockedLabel,
  onClick,
}: SkillNodeProps) {
  const locked = status === 'locked'
  const clamped = Math.min(1, Math.max(0, progress))

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative grid size-[76px] place-items-center">
        {clamped > 0 && clamped < 1 && (
          <svg
            aria-hidden
            viewBox="0 0 76 76"
            className="absolute inset-0 -rotate-90"
          >
            <circle
              cx="38"
              cy="38"
              r={R}
              fill="none"
              strokeWidth="6"
              className="stroke-linen"
            />
            <circle
              cx="38"
              cy="38"
              r={R}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - clamped)}
              className={RING[status]}
            />
          </svg>
        )}

        <button
          type="button"
          onClick={onClick}
          disabled={locked}
          aria-label={locked ? (lockedLabel ?? `${title} — locked`) : title}
          className={cn(
            'ds-press grid size-16 place-items-center rounded-full text-3xl',
            'disabled:cursor-not-allowed',
            FACE[status],
          )}
        >
          <span aria-hidden>{locked ? '🔒' : icon}</span>
        </button>
      </div>

      <span
        className={cn(
          'max-w-32 text-center text-xs uppercase tracking-wide',
          locked ? 'text-pebble' : 'text-slate',
        )}
      >
        {title}
      </span>
    </div>
  )
}
