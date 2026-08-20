import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Question } from '@/data/course'
import { useLesson } from './useLesson'

const questions: Question[] = [
  {
    id: 'a',
    prompt: 'Pick B',
    choices: ['A', 'B'],
    answerIndex: 1,
    explanation: 'B is right.',
  },
  {
    id: 'b',
    prompt: 'Pick A',
    choices: ['A', 'B'],
    answerIndex: 0,
    explanation: 'A is right.',
  },
]

describe('useLesson', () => {
  it('starts on the first question with a full board', () => {
    const { result } = renderHook(() => useLesson(questions))

    expect(result.current.index).toBe(0)
    expect(result.current.total).toBe(2)
    expect(result.current.phase).toBe('answering')
    expect(result.current.hearts).toBe(5)
    expect(result.current.selected).toBeNull()
  })

  it('scores a correct answer without spending a heart', () => {
    const { result } = renderHook(() => useLesson(questions))

    act(() => result.current.select(1))
    act(() => result.current.check())

    expect(result.current.phase).toBe('checked')
    expect(result.current.wasCorrect).toBe(true)
    expect(result.current.correctCount).toBe(1)
    expect(result.current.hearts).toBe(5)
  })

  it('spends a heart on a wrong answer', () => {
    const { result } = renderHook(() => useLesson(questions))

    act(() => result.current.select(0))
    act(() => result.current.check())

    expect(result.current.wasCorrect).toBe(false)
    expect(result.current.correctCount).toBe(0)
    expect(result.current.hearts).toBe(4)
  })

  it('freezes the selection once an answer is checked', () => {
    const { result } = renderHook(() => useLesson(questions))

    act(() => result.current.select(0))
    act(() => result.current.check())
    act(() => result.current.select(1))

    expect(result.current.selected).toBe(0)
  })

  it('advances to the next question and clears the selection', () => {
    const { result } = renderHook(() => useLesson(questions))

    act(() => result.current.select(1))
    act(() => result.current.check())
    act(() => result.current.next())

    expect(result.current.index).toBe(1)
    expect(result.current.selected).toBeNull()
    expect(result.current.phase).toBe('answering')
  })

  it('finishes after the last question', () => {
    const { result } = renderHook(() => useLesson(questions))

    act(() => result.current.select(1))
    act(() => result.current.check())
    act(() => result.current.next())
    act(() => result.current.select(0))
    act(() => result.current.check())
    act(() => result.current.next())

    expect(result.current.phase).toBe('finished')
    expect(result.current.correctCount).toBe(2)
  })

  it('restarts back to a clean board', () => {
    const { result } = renderHook(() => useLesson(questions))

    act(() => result.current.select(0))
    act(() => result.current.check())
    act(() => result.current.restart())

    expect(result.current.hearts).toBe(5)
    expect(result.current.index).toBe(0)
    expect(result.current.selected).toBeNull()
    expect(result.current.phase).toBe('answering')
  })
})
