import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  EMPTY_PROGRESS,
  clearProgress,
  loadProgress,
  nextStreak,
  saveProgress,
  today,
  type ProgressState,
} from './storage'

export interface ProgressApi extends ProgressState {
  isComplete: (unitId: string) => boolean
  completeUnit: (unitId: string, xpEarned: number) => void
  reset: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const ProgressContext = createContext<ProgressApi | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  // Lazy initialiser: read storage once, not on every render.
  const [state, setState] = useState<ProgressState>(() =>
    typeof window === 'undefined' ? EMPTY_PROGRESS : loadProgress(),
  )

  useEffect(() => {
    saveProgress(state)
  }, [state])

  const completeUnit = useCallback((unitId: string, xpEarned: number) => {
    setState((current) => {
      // Practising a unit again is free — XP and streak count once per unit.
      if (current.completed.includes(unitId)) return current

      const day = today()
      return {
        completed: [...current.completed, unitId],
        xp: current.xp + Math.max(0, xpEarned),
        streak: nextStreak(current, day),
        lastActiveDay: day,
      }
    })
  }, [])

  const reset = useCallback(() => {
    clearProgress()
    setState(EMPTY_PROGRESS)
  }, [])

  const value = useMemo<ProgressApi>(
    () => ({
      ...state,
      isComplete: (unitId: string) => state.completed.includes(unitId),
      completeUnit,
      reset,
    }),
    [state, completeUnit, reset],
  )

  return <ProgressContext value={value}>{children}</ProgressContext>
}
