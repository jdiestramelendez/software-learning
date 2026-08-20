import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface CodeBlockProps {
  children: ReactNode
  className?: string
  tone?: 'default' | 'inverted'
}

/** Monospace sample. Scrolls horizontally rather than breaking the layout. */
export function CodeBlock({ children, className, tone = 'default' }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        'overflow-x-auto rounded-chunky border-2 p-4 font-mono text-sm font-medium',
        tone === 'inverted'
          ? 'border-ink/20 bg-ink text-sand'
          : 'border-linen bg-sand text-ink',
        className,
      )}
    >
      <code>{children}</code>
    </pre>
  )
}
