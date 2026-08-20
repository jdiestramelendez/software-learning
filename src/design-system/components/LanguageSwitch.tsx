import type { Lang } from '@/content'
import { cn } from '../lib/cn'

export interface LanguageSwitchProps {
  value: Lang
  onChange: (lang: Lang) => void
  /** Accessible name for the whole control, e.g. "Language". */
  label: string
  /** Visible label per language, keyed by code. */
  names: Record<Lang, string>
  className?: string
}

const FLAG: Record<Lang, string> = { en: '🇬🇧', es: '🇪🇸' }
const SHORT: Record<Lang, string> = { en: 'EN', es: 'ES' }
const ORDER: Lang[] = ['en', 'es']

/**
 * A two-position segmented toggle. Both options stay visible, so the other
 * language is one tap away rather than hidden behind a dropdown — and the
 * pressed segment carries the state in `aria-pressed`, not just in colour.
 */
export function LanguageSwitch({
  value,
  onChange,
  label,
  names,
  className,
}: LanguageSwitchProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'flex items-center gap-0.5 rounded-full border-2 border-linen bg-sand p-0.5',
        className,
      )}
    >
      {ORDER.map((code) => {
        const active = code === value
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            title={names[code]}
            onClick={() => onChange(code)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs uppercase transition-colors',
              active
                ? 'bg-paper text-plum shadow-btn-sm shadow-linen'
                : 'text-pebble hover:text-plum',
            )}
          >
            <span aria-hidden>{FLAG[code]}</span>
            <span aria-hidden>{SHORT[code]}</span>
            <span className="sr-only">{names[code]}</span>
          </button>
        )
      })}
    </div>
  )
}
