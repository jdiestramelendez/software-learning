import { cn } from '../lib/cn'

export interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE = {
  sm: 'size-9 text-sm',
  md: 'size-12 text-lg',
  lg: 'size-24 text-4xl',
} as const

/** Deterministic colour per name, so the same person is always the same hue. */
const TONES = [
  'bg-macaw',
  'bg-feather-green',
  'bg-beetle',
  'bg-fox',
  'bg-cardinal',
]

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')

  const hash = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)

  return (
    <span
      title={name}
      className={cn(
        'grid shrink-0 place-items-center rounded-full text-snow',
        SIZE[size],
        TONES[hash % TONES.length],
        className,
      )}
    >
      <span aria-hidden>{initials || '?'}</span>
      <span className="sr-only">{name}</span>
    </span>
  )
}
