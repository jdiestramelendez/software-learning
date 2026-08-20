import { cva } from 'class-variance-authority'

/**
 * Button styling, kept in its own module so `Button.tsx` exports a component
 * and nothing else (React Fast Refresh requires that).
 *
 * Exported because non-button elements sometimes need to look like buttons —
 * a `<NavLink>` or an `<a download>`, for instance.
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
        primary:
          'bg-feather-green text-snow shadow-btn shadow-tree-frog hover:bg-feather-green/90',
        danger:
          'bg-cardinal text-snow shadow-btn shadow-fire-ant hover:bg-cardinal/90',
        info: 'bg-macaw text-snow shadow-btn shadow-whale hover:bg-macaw/90',
        super:
          'bg-beetle text-snow shadow-btn shadow-humpback hover:bg-beetle/90',
        /** Outlined, for the secondary action in a pair. */
        secondary:
          'border-2 border-swan border-b-[4px] bg-snow text-macaw hover:bg-iguana active:border-b-2',
        /** No chrome at all — for "skip", "maybe later", nav items. */
        ghost: 'bg-transparent text-wolf hover:bg-polar',
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
        class: 'disabled:bg-swan disabled:text-hare disabled:shadow-none',
      },
    ],
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)
