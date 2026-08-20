export interface ProgressState {
  /** Unit ids the learner has completed, across every track. */
  completed: string[]
  xp: number
  /** ISO date (YYYY-MM-DD) of the last completed unit, for the streak. */
  lastActiveDay: string | null
  streak: number
}

export const EMPTY_PROGRESS: ProgressState = {
  completed: [],
  xp: 0,
  lastActiveDay: null,
  streak: 0,
}

const KEY = 'bitwise.progress.v1'

/**
 * localStorage can throw — Safari private mode, disabled storage, a quota that
 * is already full. Progress is a nice-to-have, so every access degrades to
 * in-memory rather than taking the app down.
 */
export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY_PROGRESS
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed.filter(isString) : [],
      xp: typeof parsed.xp === 'number' && parsed.xp >= 0 ? parsed.xp : 0,
      lastActiveDay: isString(parsed.lastActiveDay) ? parsed.lastActiveDay : null,
      streak: typeof parsed.streak === 'number' && parsed.streak >= 0 ? parsed.streak : 0,
    }
  } catch {
    return EMPTY_PROGRESS
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Storage unavailable or full — the session still works, it just won't persist.
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // Nothing to do; the in-memory reset in the provider still applies.
  }
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/** Local calendar day as YYYY-MM-DD. */
export function today(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/**
 * A streak continues if the last active day was yesterday, resets if there was
 * a gap, and stays put for a second unit completed on the same day.
 */
export function nextStreak(state: ProgressState, day: string): number {
  if (state.lastActiveDay === day) return state.streak
  const yesterday = new Date(`${day}T12:00:00`)
  yesterday.setDate(yesterday.getDate() - 1)
  const wasYesterday = state.lastActiveDay === today(yesterday)
  return wasYesterday ? state.streak + 1 : 1
}
