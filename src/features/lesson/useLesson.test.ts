import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Question } from '@/content'
import { useLesson } from './useLesson'

const questions: Question[] = [
  {
    kind: 'choice',
    id: 'q1',
    prompt: 'Pick B',
    choices: ['A', 'B'],
    answerIndex: 1,
    explanation: 'B is right.',
  },
  {
    kind: 'boolean',
    id: 'q2',
    prompt: 'True or false?',
    statement: 'The sky is green.',
    answer: false,
    explanation: 'It is not.',
  },
  {
    kind: 'order',
    id: 'q3',
    prompt: 'Order these',
    items: ['first', 'second', 'third'],
    explanation: 'That is the order.',
  },
]

/** Answer the current question correctly, whatever kind it is. */
function answerCorrectly(result: { current: ReturnType<typeof useLesson> }) {
  const q = result.current.question
  if (q.kind === 'choice' || q.kind === 'gap') {
    act(() => result.current.setAnswer({ kind: 'index', value: q.answerIndex }))
  } else if (q.kind === 'boolean') {
    act(() => result.current.setAnswer({ kind: 'boolean', value: q.answer }))
  } else {
    act(() => result.current.setAnswer({ kind: 'order', value: [...q.items] }))
  }
}

describe('useLesson', () => {
  it('opens on the concept card, not the first question', () => {
    const { result } = renderHook(() => useLesson(questions))

    expect(result.current.phase).toBe('concept')
    expect(result.current.hearts).toBe(5)
    expect(result.current.total).toBe(3)
  })

  it('will not check before an answer is complete', () => {
    const { result } = renderHook(() => useLesson(questions))
    act(() => result.current.begin())

    expect(result.current.canCheck).toBe(false)
    act(() => result.current.check())
    expect(result.current.phase).toBe('answering')
  })

  it('scores a correct choice without spending a heart', () => {
    const { result } = renderHook(() => useLesson(questions))
    act(() => result.current.begin())
    answerCorrectly(result)
    act(() => result.current.check())

    expect(result.current.wasCorrect).toBe(true)
    expect(result.current.correctCount).toBe(1)
    expect(result.current.hearts).toBe(5)
    expect(result.current.missed).toEqual([])
  })

  it('spends a heart and records the miss on a wrong answer', () => {
    const { result } = renderHook(() => useLesson(questions))
    act(() => result.current.begin())
    act(() => result.current.setAnswer({ kind: 'index', value: 0 }))
    act(() => result.current.check())

    expect(result.current.wasCorrect).toBe(false)
    expect(result.current.hearts).toBe(4)
    expect(result.current.missed).toEqual(['q1'])
  })

  it('freezes the answer once checked', () => {
    const { result } = renderHook(() => useLesson(questions))
    act(() => result.current.begin())
    act(() => result.current.setAnswer({ kind: 'index', value: 0 }))
    act(() => result.current.check())
    act(() => result.current.setAnswer({ kind: 'index', value: 1 }))

    expect(result.current.answer).toEqual({ kind: 'index', value: 0 })
  })

  it('grades a boolean question', () => {
    const { result } = renderHook(() => useLesson(questions))
    act(() => result.current.begin())
    answerCorrectly(result)
    act(() => result.current.check())
    act(() => result.current.next())

    expect(result.current.question.id).toBe('q2')
    act(() => result.current.setAnswer({ kind: 'boolean', value: true }))
    act(() => result.current.check())
    expect(result.current.wasCorrect).toBe(false)
  })

  it('grades an ordering question only when the sequence matches exactly', () => {
    const { result } = renderHook(() => useLesson([questions[2]]))
    act(() => result.current.begin())

    act(() => result.current.setAnswer({ kind: 'order', value: ['first', 'third'] }))
    expect(result.current.canCheck).toBe(false)

    act(() =>
      result.current.setAnswer({ kind: 'order', value: ['first', 'third', 'second'] }),
    )
    expect(result.current.canCheck).toBe(true)
    act(() => result.current.check())
    expect(result.current.wasCorrect).toBe(false)
  })

  it('advances, clears the answer, and finishes after the last question', () => {
    const { result } = renderHook(() => useLesson(questions))
    act(() => result.current.begin())

    for (let i = 0; i < questions.length; i++) {
      answerCorrectly(result)
      act(() => result.current.check())
      act(() => result.current.next())
    }

    expect(result.current.phase).toBe('finished')
    expect(result.current.correctCount).toBe(3)
  })

  it('restarts back to a clean board', () => {
    const { result } = renderHook(() => useLesson(questions))
    act(() => result.current.begin())
    act(() => result.current.setAnswer({ kind: 'index', value: 0 }))
    act(() => result.current.check())
    act(() => result.current.restart())

    expect(result.current.phase).toBe('concept')
    expect(result.current.hearts).toBe(5)
    expect(result.current.answer).toBeNull()
    expect(result.current.missed).toEqual([])
  })
})

describe('useLesson onFinish', () => {
  it('fires once, with the final score, when the last question is passed', () => {
    const calls: Array<{ correctCount: number; total: number }> = []
    const { result } = renderHook(() => useLesson(questions, (r) => calls.push(r)))

    act(() => result.current.begin())
    for (let i = 0; i < questions.length; i++) {
      answerCorrectly(result)
      act(() => result.current.check())
      expect(calls, 'must not fire until the last Continue').toHaveLength(0)
      act(() => result.current.next())
    }

    expect(calls).toEqual([{ correctCount: 3, total: 3 }])
  })

  it('does not fire while questions remain', () => {
    const calls: unknown[] = []
    const { result } = renderHook(() => useLesson(questions, (r) => calls.push(r)))

    act(() => result.current.begin())
    answerCorrectly(result)
    act(() => result.current.check())
    act(() => result.current.next())

    expect(calls).toEqual([])
  })
})
