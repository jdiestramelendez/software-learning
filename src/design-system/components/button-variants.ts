import { cva } from 'class-variance-authority'

/**
 * Button styling, kept in its own module so `Button.tsx` exports a component
 * and nothing else (React Fast Refresh requires that).
 *
 * Exported because non-button elements sometimes need to look like buttons —
 * a `<NavLink>` or an `<a download>`, for instance.
 *
 * On text colour: deep surfaces (iris, poppy, tide) carry white; the bright
 * ones (coral) carry ink. That is what lets coral stay genuinely bright
 * instead of being muddied down until white text passes contrast.
 */
export const buttonVariants = cva(
  [
    'ds-press inline-flex items-center justify-center gap-2 select-none',
    'rounded-chunky px-5 text-eyebrow uppercase',
    'border-b-0 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-iris text-paper shadow-btn shadow-plum hover:bg-plum',
        danger: 'bg-poppy text-paper shadow-btn shadow-rust hover:bg-rust',
        info: 'bg-tide text-paper shadow-btn shadow-harbor hover:bg-harbor',
        super: 'bg-coral text-ink shadow-btn shadow-clay hover:bg-coral/85',
        /** Outlined, for the secondary action in a pair. */
        secondary:
          'border-2 border-linen border-b-[4px] bg-paper text-iris shadow-soft hover:border-iris/40 hover:bg-lilac active:border-b-2',
        /** No chrome at all — for "skip", "maybe later", nav items. */
        ghost: 'bg-transparent text-slate hover:bg-lilac hover:text-plum',
      },
      size: {
        sm: 'h-10 px-4 text-xs',
        md: 'h-12',
        lg: 'h-14 px-8 text-base',
      },
      full: { true: 'w-full' },
    },
    compoundVariants: [
      // Filled buttons lose all colour when disabled; outlined ones just fade.
      {
        variant: ['primary', 'danger', 'info', 'super'],
        class: 'disabled:bg-sand disabled:text-pebble disabled:shadow-none',
      },
    ],
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)
