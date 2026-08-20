import type { SkillStatus } from '@/design-system'
import { unitsOf, type Track, type Unit } from '@/content'

export interface UnitProgress {
  unit: Unit
  status: SkillStatus
  /** 0-1 ring value: 1 when complete, a hint of progress on the active unit. */
  progress: number
}

/**
 * Derive each unit's lock state from the set of completed ids.
 *
 * The rule: units unlock in order. The first incomplete unit is `active`;
 * everything after it stays locked until you get there. This is what makes
 * the path feel like a path rather than a menu.
 */
export function unitStatuses(track: Track, completed: string[]): UnitProgress[] {
  const done = new Set(completed)
  let reachedLock = false

  return unitsOf(track).map((unit) => {
    if (done.has(unit.id)) {
      return { unit, status: 'complete' as SkillStatus, progress: 1 }
    }
    if (reachedLock) {
      return { unit, status: 'locked' as SkillStatus, progress: 0 }
    }
    reachedLock = true
    return { unit, status: 'active' as SkillStatus, progress: 0.15 }
  })
}

export function trackCompletion(track: Track, completed: string[]) {
  const units = unitsOf(track)
  const done = units.filter((u) => completed.includes(u.id)).length
  return { done, total: units.length, ratio: units.length ? done / units.length : 0 }
}

/** The unit the learner should open next — for the "Continue" button. */
export function nextUnit(track: Track, completed: string[]): Unit | undefined {
  return unitsOf(track).find((unit) => !completed.includes(unit.id))
}
