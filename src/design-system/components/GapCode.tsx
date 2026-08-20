import { cn } from '../lib/cn'

export interface GapCodeProps {
  /** Code containing the literal `___` placeholder. */
  code: string
  /** What the learner has picked, or null while unanswered. */
  filled: string | null
  state?: 'idle' | 'correct' | 'wrong'
}

const FILL = {
  idle: 'border-macaw bg-iguana text-whale',
  correct: 'border-feather-green bg-sea-sponge text-tree-frog',
  wrong: 'border-cardinal bg-walking-fish text-fire-ant',
} as const

/** A code sample with the blank rendered as a slot that fills in as you answer. */
export function GapCode({ code, filled, state = 'idle' }: GapCodeProps) {
  const [before, ...rest] = code.split('___')
  const after = rest.join('___')

  return (
    <pre className="overflow-x-auto rounded-chunky border-2 border-swan bg-polar p-4 font-mono text-sm font-medium text-eel">
      <code>
        {before}
        <span
          className={cn(
            'mx-0.5 inline-block min-w-24 rounded-md border-2 px-2 py-0.5 text-center align-middle',
            filled ? FILL[state] : 'border-dashed border-hare bg-snow text-hare',
          )}
        >
          {filled ?? '?'}
        </span>
        {after}
      </code>
    </pre>
  )
}
