import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Button } from './Button'

export interface FeedbackFooterProps {
  status: 'correct' | 'wrong'
  title: string
  /** Optional explanation shown under the title — this is where learning happens. */
  detail?: ReactNode
  actionLabel: string
  onAction: () => void
}

/**
 * The sheet that slides up from the bottom after an answer is checked.
 * Green means keep going; red means read the explanation.
 */
export function FeedbackFooter({
  status,
  title,
  detail,
  actionLabel,
  onAction,
}: FeedbackFooterProps) {
  const correct = status === 'correct'

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'animate-rise border-t-2 px-4 py-5',
        correct ? 'border-meadow/40 bg-dew' : 'border-poppy/30 bg-petal',
      )}
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className={cn(
            'flex items-start gap-3',
            correct ? 'text-fern' : 'text-rust',
          )}
        >
          <span aria-hidden className="text-3xl leading-none">
            {correct ? '🎉' : '💥'}
          </span>
          <div className="min-w-0">
            <p className="text-xl font-extrabold">{title}</p>
            {detail && (
              <div className="mt-1 text-sm font-bold opacity-90">{detail}</div>
            )}
          </div>
        </div>

        <Button
          variant={correct ? 'primary' : 'danger'}
          size="lg"
          onClick={onAction}
          className="shrink-0 sm:min-w-44"
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  )
}
