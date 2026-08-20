import { useCallback, useMemo, useState } from 'react'
import type { Question } from '@/data/course'

export type LessonPhase = 'answering' | 'checked' | 'finished'

export interface LessonState {
  question: Question
  index: number
  total: number
  phase: LessonPhase
  selected: number | null
  wasCorrect: boolean
  hearts: number
  correctCount: number
  select: (index: number) => void
  check: () => void
  next: () => void
  restart: () => void
}

const STARTING_HEARTS = 5

/**
 * Owns everything that makes a lesson a lesson: which question you are on,
 * whether you have checked your answer yet, and how many hearts are left.
 *
 * Deliberately framework-free (no router, no fetch) so the quiz rules can be
 * unit-tested and reused by any surface.
 */
export function useLesson(questions: Question[]): LessonState {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [phase, setPhase] = useState<LessonPhase>('answering')
  const [hearts, setHearts] = useState(STARTING_HEARTS)
  const [correctCount, setCorrectCount] = useState(0)

  const question = questions[index]
  const wasCorrect = useMemo(
    () => selected !== null && selected === question?.answerIndex,
    [selected, question],
  )

  const select = useCallback(
    (choice: number) => {
      // Once an answer is checked the choices freeze until you move on.
      if (phase !== 'answering') return
      setSelected(choice)
    },
    [phase],
  )

  const check = useCallback(() => {
    if (phase !== 'answering' || selected === null || !question) return
    const correct = selected === question.answerIndex
    if (correct) setCorrectCount((n) => n + 1)
    else setHearts((h) => Math.max(0, h - 1))
    setPhase('checked')
  }, [phase, selected, question])

  const next = useCallback(() => {
    if (index + 1 >= questions.length) {
      setPhase('finished')
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setPhase('answering')
  }, [index, questions.length])

  const restart = useCallback(() => {
    setIndex(0)
    setSelected(null)
    setPhase('answering')
    setHearts(STARTING_HEARTS)
    setCorrectCount(0)
  }, [])

  return {
    question: question ?? questions[0],
    index,
    total: questions.length,
    phase,
    selected,
    wasCorrect,
    hearts,
    correctCount,
    select,
    check,
    next,
    restart,
  }
}
