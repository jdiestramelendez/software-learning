import type { Question } from '@/content'

/** What the learner has entered, in a shape that fits any question kind. */
export type Answer =
  | { kind: 'index'; value: number }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'order'; value: string[] }

/** Deterministic string hash — same input, same number, every run. */
function hash(text: string): number {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/**
 * Shuffle seeded by the question id, so the pool order is stable across
 * re-renders and identical in tests — but never the correct order by accident.
 */
export function shuffleFor(id: string, items: string[]): string[] {
  const out = [...items]
  let seed = hash(id)
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) >>> 0
    const j = seed % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  // A shuffle that returns the original order would give the answer away.
  if (out.length > 1 && out.every((item, i) => item === items[i])) {
    ;[out[0], out[1]] = [out[1], out[0]]
  }
  return out
}

/** Has the learner entered enough to press Check? */
export function isComplete(question: Question, answer: Answer | null): boolean {
  if (!answer) return false
  if (question.kind === 'order') {
    return answer.kind === 'order' && answer.value.length === question.items.length
  }
  return true
}

/** Grade an answer. Unanswered counts as wrong. */
export function isCorrect(question: Question, answer: Answer | null): boolean {
  if (!answer) return false
  switch (question.kind) {
    case 'choice':
    case 'gap':
      return answer.kind === 'index' && answer.value === question.answerIndex
    case 'boolean':
      return answer.kind === 'boolean' && answer.value === question.answer
    case 'order':
      return (
        answer.kind === 'order' &&
        answer.value.length === question.items.length &&
        answer.value.every((item, i) => item === question.items[i])
      )
  }
}

/** Per-position correctness, used to colour an ordering after checking. */
export function orderCorrectness(correctOrder: string[], given: string[]): boolean[] {
  return given.map((item, i) => item === correctOrder[i])
}
