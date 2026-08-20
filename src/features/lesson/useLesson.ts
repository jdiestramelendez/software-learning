import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Question } from '@/content'
import { type Answer, isComplete, isCorrect } from './answer'

export type LessonPhase = 'concept' | 'answering' | 'checked' | 'finished'

const STARTING_HEARTS = 5

export interface LessonState {
  question: Question
  index: number
  total: number
  phase: LessonPhase
  answer: Answer | null
  wasCorrect: boolean
  canCheck: boolean
  hearts: number
  correctCount: number
  /** Ids of questions answered wrongly — surfaced on the summary screen. */
  missed: string[]
  setAnswer: (answer: Answer) => void
  begin: () => void
  check: () => void
  next: () => void
  restart: () => void
}

/**
 * Owns everything that makes a lesson a lesson: which question you are on,
 * whether you have checked yet, and how many hearts are left.
 *
 * Deliberately framework-free (no router, no storage, no fetch) so the rules
 * can be unit-tested and reused by any surface.
 */
export function useLesson(
  questions: Question[],
  /** Called once, from the event that ends the lesson — not from an effect. */
  onFinish?: (result: { correctCount: number; total: number }) => void,
): LessonState {
  // Held in a ref so a caller passing an inline arrow does not churn `next`.
  const onFinishRef = useRef(onFinish)
  useEffect(() => {
    onFinishRef.current = onFinish
  }, [onFinish])

  const [index, setIndex] = useState(0)
  const [answer, setAnswerState] = useState<Answer | null>(null)
  const [phase, setPhase] = useState<LessonPhase>('concept')
  const [hearts, setHearts] = useState(STARTING_HEARTS)
  const [correctCount, setCorrectCount] = useState(0)
  const [missed, setMissed] = useState<string[]>([])

  const question = questions[index] ?? questions[0]

  const wasCorrect = useMemo(
    () => (question ? isCorrect(question, answer) : false),
    [question, answer],
  )
  const canCheck = useMemo(
    () => (question ? isComplete(question, answer) : false),
    [question, answer],
  )

  const setAnswer = useCallback(
    (next: Answer) => {
      // Once checked, the answer freezes until you move on.
      if (phase !== 'answering') return
      setAnswerState(next)
    },
    [phase],
  )

  const begin = useCallback(() => setPhase('answering'), [])

  const check = useCallback(() => {
    if (phase !== 'answering' || !question || !isComplete(question, answer)) return
    if (isCorrect(question, answer)) {
      setCorrectCount((n) => n + 1)
    } else {
      setHearts((h) => Math.max(0, h - 1))
      setMissed((m) => [...m, question.id])
    }
    setPhase('checked')
  }, [phase, question, answer])

  const next = useCallback(() => {
    if (index + 1 >= questions.length) {
      setPhase('finished')
      onFinishRef.current?.({ correctCount, total: questions.length })
      return
    }
    setIndex((i) => i + 1)
    setAnswerState(null)
    setPhase('answering')
  }, [index, questions.length, correctCount])

  const restart = useCallback(() => {
    setIndex(0)
    setAnswerState(null)
    setPhase('concept')
    setHearts(STARTING_HEARTS)
    setCorrectCount(0)
    setMissed([])
  }, [])

  return {
    question,
    index,
    total: questions.length,
    phase,
    answer,
    wasCorrect,
    canCheck,
    hearts,
    correctCount,
    missed,
    setAnswer,
    begin,
    check,
    next,
    restart,
  }
}
