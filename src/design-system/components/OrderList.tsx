import { cn } from '../lib/cn'

export interface OrderItem {
  /** Index into the question's canonical item list. */
  index: number
  label: string
}

export interface OrderListProps {
  /** Items in the order the learner has built so far. */
  ordered: OrderItem[]
  /** Items still waiting in the pool. */
  pool: OrderItem[]
  onPick: (index: number) => void
  onUnpick: (index: number) => void
  disabled?: boolean
  /** After checking: which positions are right. */
  correctness?: boolean[]
  /** Shown while nothing has been placed yet. */
  emptyHint: string
}

/**
 * Ordering without drag-and-drop: tap to add, tap to remove.
 *
 * Deliberate choice — dragging is fiddly on touch, impossible on a keyboard,
 * and invisible to a screen reader. Tapping is all three for free.
 */
export function OrderList({
  ordered,
  pool,
  onPick,
  onUnpick,
  disabled,
  correctness,
  emptyHint,
}: OrderListProps) {
  return (
    <div className="space-y-4">
      <ol className="space-y-2">
        {ordered.map((item, i) => {
          const state =
            correctness === undefined ? 'neutral' : correctness[i] ? 'correct' : 'wrong'
          return (
            <li key={item.index}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onUnpick(item.index)}
                className={cn(
                  'ds-press flex w-full items-center gap-3 rounded-chunky border-2 border-b-[4px] p-3 text-left text-sm active:border-b-2',
                  state === 'neutral' && 'border-iris bg-lilac text-plum',
                  state === 'correct' && 'border-meadow bg-dew text-fern',
                  state === 'wrong' && 'border-poppy bg-petal text-rust',
                )}
              >
                <span
                  aria-hidden
                  className="grid size-6 shrink-0 place-items-center rounded-md bg-paper/70 text-xs"
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">{item.label}</span>
              </button>
            </li>
          )
        })}

        {ordered.length === 0 && (
          <li className="rounded-chunky border-2 border-dashed border-linen p-4 text-center text-sm text-pebble">
            {emptyHint}
          </li>
        )}
      </ol>

      {pool.length > 0 && (
        <ul className="flex flex-wrap gap-2 border-t-2 border-linen pt-4">
          {pool.map((item) => (
            <li key={item.index}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onPick(item.index)}
                className="ds-press rounded-chunky border-2 border-linen border-b-[4px] bg-paper p-3 text-left text-sm text-ink hover:bg-sand active:border-b-2"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
