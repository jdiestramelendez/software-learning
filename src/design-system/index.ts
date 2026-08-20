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
export { CodeBlock, type CodeBlockProps } from './components/CodeBlock'
export { ConceptCard, type ConceptCardProps } from './components/ConceptCard'
export {
  ChoiceCard,
  type ChoiceCardProps,
  type ChoiceState,
} from './components/ChoiceCard'
export {
  FeedbackFooter,
  type FeedbackFooterProps,
} from './components/FeedbackFooter'
export { GapCode, type GapCodeProps } from './components/GapCode'
export { IconButton, type IconButtonProps } from './components/IconButton'
export { OrderList, type OrderListProps } from './components/OrderList'
export { ProgressBar, type ProgressBarProps } from './components/ProgressBar'
export {
  SectionHeader,
  type SectionHeaderProps,
} from './components/SectionHeader'
export {
  SkillNode,
  type SkillNodeProps,
  type SkillStatus,
} from './components/SkillNode'
export { StatPill, type StatPillProps } from './components/StatPill'
export { cn } from './lib/cn'
