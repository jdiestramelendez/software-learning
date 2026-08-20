import type { TrackAccent } from '@/content'

/**
 * One place that maps a track's accent onto design-system props.
 *
 * Before this existed the pages each did `accent === 'green' ? … : …`, which
 * quietly meant "green or not green" — adding a third track would have made
 * every one of those ternaries wrong. A lookup makes a new accent a one-line
 * change here instead of a hunt through the pages.
 */
interface AccentStyles {
  badge: 'purple' | 'blue' | 'coral'
  progress: 'green' | 'blue' | 'coral'
  button: 'primary' | 'info' | 'super'
  border: string
}

const ACCENTS: Record<TrackAccent, AccentStyles> = {
  green: { badge: 'purple', progress: 'green', button: 'primary', border: 'border-iris/35' },
  blue: { badge: 'blue', progress: 'blue', button: 'info', border: 'border-tide/35' },
  coral: { badge: 'coral', progress: 'coral', button: 'super', border: 'border-coral/45' },
}

export function accentStyles(accent: TrackAccent): AccentStyles {
  return ACCENTS[accent]
}
