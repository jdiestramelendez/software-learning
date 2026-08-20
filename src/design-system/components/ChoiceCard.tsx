import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

export type ChoiceState = 'idle' | 'selected' | 'correct' | 'wrong'

export interface ChoiceCardProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  state?: ChoiceState
  /** The keyboard shortcut hint shown in the leading square (1–9). */
  shortcut?: number
  children: ReactNode
}

const SURFACE: Record<ChoiceState, string> = {
  idle: 'border-swan text-eel hover:bg-polar',
  selected: 'border-macaw bg-iguana text-whale',
  correct: 'border-feather-green bg-sea-sponge text-tree-frog',
  wrong: 'border-cardinal bg-walking-fish text-fire-ant',
}

const CHIP: Record<ChoiceState, string> = {
  idle: 'border-swan text-hare',
  selected: 'border-macaw text-macaw',
  correct: 'border-feather-green text-feather-green',
  wrong: 'border-cardinal text-cardinal',
}

/**
 * A selectable answer. Selection is communicated three ways at once — border
 * colour, background wash, and `aria-pressed` — so it survives both colour
 * blindness and a screen reader.
 */
export function ChoiceCard({
  state = 'idle',
  shortcut,
  className,
  children,
  type = 'button',
  ...props
}: ChoiceCardProps) {
  return (
    <button
      type={type}
      aria-pressed={state === 'selected'}
      className={cn(
        'ds-press flex w-full items-center gap-4 rounded-chunky border-2 border-b-[4px] bg-snow p-4 text-left text-base',
        'active:border-b-2',
        SURFACE[state],
        className,
      )}
      {...props}
    >
      {shortcut !== undefined && (
        <span
          aria-hidden
          className={cn(
            'grid size-7 shrink-0 place-items-center rounded-lg border-2 text-xs',
            CHIP[state],
          )}
        >
          {shortcut}
        </span>
      )}
      <span className="min-w-0 flex-1">{children}</span>
    </button>
  )
}
