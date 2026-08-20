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
  idle: 'border-linen text-ink hover:bg-sand',
  selected: 'border-iris bg-lilac text-plum',
  correct: 'border-meadow bg-dew text-fern',
  wrong: 'border-poppy bg-petal text-rust',
}

/** The chip sits on the wash, so it takes each state's DEEP tone, not its face. */
const CHIP: Record<ChoiceState, string> = {
  idle: 'border-linen text-pebble',
  selected: 'border-iris text-plum',
  correct: 'border-meadow text-fern',
  wrong: 'border-poppy text-rust',
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
        'ds-press flex w-full items-center gap-4 rounded-chunky border-2 border-b-[4px] bg-paper p-4 text-left text-base',
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
