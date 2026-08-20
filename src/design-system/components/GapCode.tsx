import { cn } from '../lib/cn'

export interface GapCodeProps {
  /** Code containing the literal `___` placeholder. */
  code: string
  /** What the learner has picked, or null while unanswered. */
  filled: string | null
  state?: 'idle' | 'correct' | 'wrong'
}

const FILL = {
  idle: 'border-iris bg-lilac text-plum',
  correct: 'border-meadow bg-dew text-fern',
  wrong: 'border-poppy bg-petal text-rust',
} as const

/** A code sample with the blank rendered as a slot that fills in as you answer. */
export function GapCode({ code, filled, state = 'idle' }: GapCodeProps) {
  const [before, ...rest] = code.split('___')
  const after = rest.join('___')

  return (
    <pre className="overflow-x-auto rounded-chunky border-2 border-linen bg-sand p-4 font-mono text-sm font-medium text-ink">
      <code>
        {before}
        <span
          className={cn(
            'mx-0.5 inline-block min-w-24 rounded-md border-2 px-2 py-0.5 text-center align-middle',
            filled ? FILL[state] : 'border-dashed border-pebble bg-paper text-pebble',
          )}
        >
          {filled ?? '?'}
        </span>
        {after}
      </code>
    </pre>
  )
}
