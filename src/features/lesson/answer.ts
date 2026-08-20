import type { Question } from '@/content'

/**
 * What the learner has entered, in a shape that fits any question kind.
 *
 * Ordering answers are stored as INDICES into `question.items`, not as the
 * item text. That keeps grading independent of the display language — you can
 * switch language mid-question and your answer survives.
 */
export type Answer =
  | { kind: 'index'; value: number }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'order'; value: number[] }

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
 * Shuffled positions 0..count-1, seeded by the question id so the pool order
 * is stable across re-renders and identical in tests — but never the correct
 * order, which would give the answer away.
 */
export function shuffleFor(id: string, count: number): number[] {
  const out = Array.from({ length: count }, (_, i) => i)
  let seed = hash(id)
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) >>> 0
    const j = seed % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  if (out.length > 1 && out.every((value, i) => value === i)) {
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
        answer.value.every((itemIndex, position) => itemIndex === position)
      )
  }
}

/**
 * Per-position correctness, used to colour an ordering after checking.
 * Position `i` is right when it holds item `i`.
 */
export function orderCorrectness(given: number[]): boolean[] {
  return given.map((itemIndex, position) => itemIndex === position)
}
