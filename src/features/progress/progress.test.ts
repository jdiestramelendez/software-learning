import { describe, expect, it } from 'vitest'
import { foundationsTrack, unitsOf } from '@/content'
import { nextStreak, today, type ProgressState } from './storage'
import { nextUnit, trackCompletion, unitStatuses } from './trackProgress'

describe('unit unlocking', () => {
  it('unlocks only the first unit for a new learner', () => {
    const statuses = unitStatuses(foundationsTrack, [])

    expect(statuses[0].status).toBe('active')
    expect(statuses.slice(1).every((s) => s.status === 'locked')).toBe(true)
  })

  it('moves the active unit forward as units are completed', () => {
    const units = unitsOf(foundationsTrack)
    const statuses = unitStatuses(foundationsTrack, [units[0].id, units[1].id])

    expect(statuses[0].status).toBe('complete')
    expect(statuses[1].status).toBe('complete')
    expect(statuses[2].status).toBe('active')
    expect(statuses[3].status).toBe('locked')
  })

  it('reports completion and the next unit to open', () => {
    const units = unitsOf(foundationsTrack)
    const completed = [units[0].id]

    expect(trackCompletion(foundationsTrack, completed).done).toBe(1)
    expect(nextUnit(foundationsTrack, completed)?.id).toBe(units[1].id)
  })
})

describe('streak', () => {
  const base: ProgressState = { completed: [], xp: 0, lastActiveDay: null, streak: 0 }

  it('starts at 1 on the first day', () => {
    expect(nextStreak(base, '2026-08-20')).toBe(1)
  })

  it('does not double-count two units on the same day', () => {
    const state = { ...base, lastActiveDay: '2026-08-20', streak: 3 }
    expect(nextStreak(state, '2026-08-20')).toBe(3)
  })

  it('increments when the previous day was yesterday', () => {
    const state = { ...base, lastActiveDay: '2026-08-19', streak: 3 }
    expect(nextStreak(state, '2026-08-20')).toBe(4)
  })

  it('resets after a missed day', () => {
    const state = { ...base, lastActiveDay: '2026-08-17', streak: 9 }
    expect(nextStreak(state, '2026-08-20')).toBe(1)
  })

  it('formats today as YYYY-MM-DD in local time', () => {
    expect(today(new Date(2026, 7, 5))).toBe('2026-08-05')
  })
})
