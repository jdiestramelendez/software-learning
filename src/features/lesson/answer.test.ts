import { describe, expect, it } from 'vitest'
import type { Question } from '@/content'
import { isComplete, isCorrect, orderCorrectness, shuffleFor } from './answer'

const orderQuestion: Question = {
  kind: 'order',
  id: 'o1',
  prompt: 'Order these',
  items: ['one', 'two', 'three', 'four'],
  explanation: 'x'.repeat(50),
}

describe('shuffleFor', () => {
  it('is deterministic for a given question id', () => {
    expect(shuffleFor('o1', 4)).toEqual(shuffleFor('o1', 4))
  })

  it('never hands back the correct order', () => {
    const sorted = [0, 1, 2, 3]
    for (let i = 0; i < 200; i++) {
      expect(shuffleFor(`q-${i}`, 4)).not.toEqual(sorted)
    }
  })

  it('returns every position exactly once', () => {
    expect([...shuffleFor('x', 5)].sort()).toEqual([0, 1, 2, 3, 4])
  })

  it('is language-independent — it shuffles positions, not text', () => {
    // The pool order must not change when the learner switches language.
    expect(shuffleFor('aws-wa-5', 5)).toEqual(shuffleFor('aws-wa-5', 5))
  })
})

describe('grading', () => {
  const choice: Question = {
    kind: 'choice',
    id: 'c1',
    prompt: 'p',
    choices: ['a', 'b'],
    answerIndex: 1,
    explanation: 'x'.repeat(50),
  }

  it('treats an unanswered question as incomplete and wrong', () => {
    expect(isComplete(choice, null)).toBe(false)
    expect(isCorrect(choice, null)).toBe(false)
  })

  it('grades a choice by index', () => {
    expect(isCorrect(choice, { kind: 'index', value: 1 })).toBe(true)
    expect(isCorrect(choice, { kind: 'index', value: 0 })).toBe(false)
  })

  it('requires every item before an ordering can be checked', () => {
    expect(isComplete(orderQuestion, { kind: 'order', value: [0, 1] })).toBe(false)
    expect(isComplete(orderQuestion, { kind: 'order', value: [0, 1, 2, 3] })).toBe(true)
  })

  it('grades an ordering only on an exact sequence match', () => {
    expect(isCorrect(orderQuestion, { kind: 'order', value: [0, 1, 2, 3] })).toBe(true)
    expect(isCorrect(orderQuestion, { kind: 'order', value: [0, 2, 1, 3] })).toBe(false)
  })

  it('rejects an answer of the wrong shape', () => {
    expect(isCorrect(choice, { kind: 'boolean', value: true })).toBe(false)
  })

  it('reports per-position correctness for colouring', () => {
    expect(orderCorrectness([0, 2, 1])).toEqual([true, false, false])
  })
})
