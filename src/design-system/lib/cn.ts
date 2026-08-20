import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names, letting later Tailwind utilities win over earlier ones.
 * This is what makes `<Button className="w-full" />` able to override a
 * variant's width without an `!important` arms race.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
