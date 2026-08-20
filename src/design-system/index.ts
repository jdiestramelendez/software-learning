/**
 * Bitwise Design System — public surface.
 *
 * Import from `@/design-system`, never from a component file directly. That
 * keeps the swap-a-component-implementation door open.
 */
export { Avatar, type AvatarProps } from './components/Avatar'
export { Badge, type BadgeProps } from './components/Badge'
export { Button, type ButtonProps } from './components/Button'
export { buttonVariants } from './components/button-variants'
export { Card, type CardProps } from './components/Card'
export {
  ChoiceCard,
  type ChoiceCardProps,
  type ChoiceState,
} from './components/ChoiceCard'
export {
  FeedbackFooter,
  type FeedbackFooterProps,
} from './components/FeedbackFooter'
export { IconButton, type IconButtonProps } from './components/IconButton'
export { ProgressBar, type ProgressBarProps } from './components/ProgressBar'
export {
  SkillNode,
  type SkillNodeProps,
  type SkillStatus,
} from './components/SkillNode'
export { StatPill, type StatPillProps } from './components/StatPill'
export { cn } from './lib/cn'
