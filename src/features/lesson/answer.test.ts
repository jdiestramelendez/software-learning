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
    expect(shuffleFor('o1', orderQuestion.kind === 'order' ? orderQuestion.items : [])).toEqual(
      shuffleFor('o1', ['one', 'two', 'three', 'four']),
    )
  })

  it('never hands back the correct order', () => {
    const items = ['a', 'b', 'c', 'd']
    // Every id must produce a pool that is not already the answer.
    for (let i = 0; i < 200; i++) {
      expect(shuffleFor(`q-${i}`, items)).not.toEqual(items)
    }
  })

  it('keeps exactly the same items', () => {
    const items = ['a', 'b', 'c', 'd']
    expect([...shuffleFor('x', items)].sort()).toEqual([...items].sort())
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
    expect(isComplete(orderQuestion, { kind: 'order', value: ['one', 'two'] })).toBe(false)
    expect(
      isComplete(orderQuestion, { kind: 'order', value: ['one', 'two', 'three', 'four'] }),
    ).toBe(true)
  })

  it('grades an ordering only on an exact sequence match', () => {
    expect(
      isCorrect(orderQuestion, { kind: 'order', value: ['one', 'two', 'three', 'four'] }),
    ).toBe(true)
    expect(
      isCorrect(orderQuestion, { kind: 'order', value: ['one', 'three', 'two', 'four'] }),
    ).toBe(false)
  })

  it('rejects an answer of the wrong shape', () => {
    expect(isCorrect(choice, { kind: 'boolean', value: true })).toBe(false)
  })

  it('reports per-position correctness for colouring', () => {
    expect(orderCorrectness(['a', 'b', 'c'], ['a', 'c', 'b'])).toEqual([true, false, false])
  })
})
