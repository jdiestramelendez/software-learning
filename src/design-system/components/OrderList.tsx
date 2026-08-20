import { cn } from '../lib/cn'

export interface OrderListProps {
  /** Items in the order the learner has built so far. */
  ordered: string[]
  /** Items still waiting in the pool. */
  pool: string[]
  onPick: (item: string) => void
  onUnpick: (item: string) => void
  disabled?: boolean
  /** After checking: which positions are right. */
  correctness?: boolean[]
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
}: OrderListProps) {
  return (
    <div className="space-y-4">
      <ol className="space-y-2">
        {ordered.map((item, i) => {
          const state =
            correctness === undefined
              ? 'neutral'
              : correctness[i]
                ? 'correct'
                : 'wrong'
          return (
            <li key={item}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onUnpick(item)}
                className={cn(
                  'ds-press flex w-full items-center gap-3 rounded-chunky border-2 border-b-[4px] p-3 text-left text-sm active:border-b-2',
                  state === 'neutral' && 'border-macaw bg-iguana text-whale',
                  state === 'correct' && 'border-feather-green bg-sea-sponge text-tree-frog',
                  state === 'wrong' && 'border-cardinal bg-walking-fish text-fire-ant',
                )}
              >
                <span
                  aria-hidden
                  className="grid size-6 shrink-0 place-items-center rounded-md bg-snow/70 text-xs"
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">{item}</span>
              </button>
            </li>
          )
        })}

        {ordered.length === 0 && (
          <li className="rounded-chunky border-2 border-dashed border-swan p-4 text-center text-sm text-hare">
            Tap the steps below in the right order
          </li>
        )}
      </ol>

      {pool.length > 0 && (
        <ul className="flex flex-wrap gap-2 border-t-2 border-swan pt-4">
          {pool.map((item) => (
            <li key={item}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onPick(item)}
                className="ds-press rounded-chunky border-2 border-swan border-b-[4px] bg-snow p-3 text-left text-sm text-eel hover:bg-polar active:border-b-2"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
