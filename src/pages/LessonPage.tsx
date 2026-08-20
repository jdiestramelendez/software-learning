import { useCallback, useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  ChoiceCard,
  CodeBlock,
  ConceptCard,
  FeedbackFooter,
  GapCode,
  IconButton,
  OrderList,
  ProgressBar,
  type ChoiceState,
} from '@/design-system'
import { XP_PER_CORRECT, findUnit, type Question } from '@/content'
import { orderCorrectness, shuffleFor } from '@/features/lesson/answer'
import { useLesson } from '@/features/lesson/useLesson'
import { useProgress } from '@/features/progress/useProgress'

/** How a single option should render, given the phase. */
function optionState(
  index: number,
  picked: number | null,
  answerIndex: number,
  checked: boolean,
): ChoiceState {
  if (!checked) return picked === index ? 'selected' : 'idle'
  if (index === answerIndex) return 'correct'
  if (index === picked) return 'wrong'
  return 'idle'
}

export function LessonPage() {
  const { trackId, unitId } = useParams()
  const navigate = useNavigate()
  const found = findUnit(trackId, unitId)
  const { completeUnit } = useProgress()

  const questions = useMemo<Question[]>(() => found?.unit.questions ?? [], [found])

  // Recording happens in the event that finishes the lesson, so there is no
  // effect racing the render. Repeat practice is free: completeUnit only
  // awards XP the first time a unit is finished.
  const onFinish = useCallback(
    ({ correctCount }: { correctCount: number }) => {
      if (found) completeUnit(found.unit.id, correctCount * XP_PER_CORRECT)
    },
    [found, completeUnit],
  )

  const lesson = useLesson(questions, onFinish)
  const { phase, answer, question, setAnswer, check, next, begin } = lesson
  const checked = phase === 'checked'

  // Number keys pick an option, Enter checks or advances.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault()
        if (phase === 'concept') begin()
        else if (checked) next()
        else if (lesson.canCheck) check()
        return
      }
      if (phase !== 'answering') return

      const n = Number(event.key)
      if (!Number.isInteger(n) || n < 1) return

      if (question.kind === 'choice' || question.kind === 'gap') {
        if (n <= question.choices.length) setAnswer({ kind: 'index', value: n - 1 })
      } else if (question.kind === 'boolean' && n <= 2) {
        setAnswer({ kind: 'boolean', value: n === 1 })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [phase, checked, begin, next, check, setAnswer, question, lesson.canCheck])

  if (!found) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-title">Lesson not found</p>
        <Link to="/" className="mt-4 inline-block text-macaw underline">
          Back to the tracks
        </Link>
      </div>
    )
  }

  const { track, unit } = found

  if (phase === 'concept') {
    return (
      <div className="flex min-h-dvh flex-col">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 py-5">
          <IconButton label="Back to the path" onClick={() => navigate(`/track/${track.id}`)}>
            ✕
          </IconButton>
          <p className="text-eyebrow uppercase text-wolf">{track.title}</p>
        </div>

        <div className="mx-auto w-full max-w-2xl flex-1 px-4">
          <ConceptCard
            icon={unit.icon}
            title={unit.title}
            headline={unit.concept.headline}
            body={unit.concept.body}
            keyPoints={unit.concept.keyPoints}
            example={unit.concept.example}
          />
        </div>

        <div className="mt-10 border-t-2 border-swan px-4 py-5">
          <div className="mx-auto flex max-w-2xl justify-end">
            <Button size="lg" onClick={begin} className="w-full sm:w-auto sm:min-w-56">
              Start · {questions.length} questions
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'finished') {
    const perfect = lesson.correctCount === lesson.total
    return (
      <div className="mx-auto flex min-h-dvh max-w-md animate-pop-in flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <span aria-hidden className="text-7xl">
          {perfect ? '🏆' : '✅'}
        </span>
        <h1 className="text-hero text-feather-green">
          {perfect ? 'Flawless!' : 'Unit complete!'}
        </h1>
        <p className="text-wolf">{unit.title}</p>

        <div className="flex w-full gap-3">
          <Card className="flex-1 border-bee bg-canary text-camel">
            <p className="text-eyebrow uppercase">XP earned</p>
            <p className="text-title">{lesson.correctCount * XP_PER_CORRECT}</p>
          </Card>
          <Card className="flex-1 border-macaw bg-iguana text-whale">
            <p className="text-eyebrow uppercase">Accuracy</p>
            <p className="text-title">
              {Math.round((lesson.correctCount / lesson.total) * 100)}%
            </p>
          </Card>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Button size="lg" full onClick={() => navigate(`/track/${track.id}`)}>
            Continue
          </Button>
          <Button variant="secondary" size="lg" full onClick={lesson.restart}>
            Practice again
          </Button>
        </div>
      </div>
    )
  }

  const picked = answer?.kind === 'index' ? answer.value : null

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 py-5">
        <IconButton label="Quit lesson" onClick={() => navigate(`/track/${track.id}`)}>
          ✕
        </IconButton>
        <ProgressBar
          value={lesson.index + (checked ? 1 : 0)}
          max={lesson.total}
          color={track.accent === 'green' ? 'green' : 'blue'}
          label="Lesson progress"
        />
        <span className="flex items-center gap-1 text-lg text-cardinal">
          <span aria-hidden>❤️</span>
          {lesson.hearts}
          <span className="sr-only">hearts remaining</span>
        </span>
      </div>

      <div className="mx-auto w-full max-w-2xl flex-1 px-4 pt-6">
        <h1 className="text-title">{question.prompt}</h1>

        {question.kind !== 'gap' && question.code && (
          <CodeBlock className="mt-5">{question.code}</CodeBlock>
        )}

        <div
          className={`mt-6 ${checked && !lesson.wasCorrect ? 'animate-shake' : ''}`}
        >
          {(question.kind === 'choice' || question.kind === 'gap') && (
            <>
              {question.kind === 'gap' && (
                <GapCode
                  code={question.code}
                  filled={picked === null ? null : question.choices[picked]}
                  state={checked ? (lesson.wasCorrect ? 'correct' : 'wrong') : 'idle'}
                />
              )}
              <div
                className={`grid gap-3 sm:grid-cols-2 ${question.kind === 'gap' ? 'mt-4' : ''}`}
              >
                {question.choices.map((choice, i) => (
                  <ChoiceCard
                    key={choice}
                    shortcut={i + 1}
                    state={optionState(i, picked, question.answerIndex, checked)}
                    disabled={checked}
                    onClick={() => setAnswer({ kind: 'index', value: i })}
                  >
                    {choice}
                  </ChoiceCard>
                ))}
              </div>
            </>
          )}

          {question.kind === 'boolean' && (
            <>
              <Card flat className="border-2 border-swan bg-polar text-center">
                <p className="text-lg leading-snug">{question.statement}</p>
              </Card>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[true, false].map((value, i) => {
                  const chosen = answer?.kind === 'boolean' ? answer.value : null
                  const state: ChoiceState = !checked
                    ? chosen === value
                      ? 'selected'
                      : 'idle'
                    : value === question.answer
                      ? 'correct'
                      : chosen === value
                        ? 'wrong'
                        : 'idle'
                  return (
                    <ChoiceCard
                      key={String(value)}
                      shortcut={i + 1}
                      state={state}
                      disabled={checked}
                      onClick={() => setAnswer({ kind: 'boolean', value })}
                    >
                      {value ? 'True' : 'False'}
                    </ChoiceCard>
                  )
                })}
              </div>
            </>
          )}

          {question.kind === 'order' && (
            <OrderQuestionBody
              question={question}
              answer={answer?.kind === 'order' ? answer.value : []}
              checked={checked}
              onChange={(value) => setAnswer({ kind: 'order', value })}
            />
          )}
        </div>
      </div>

      {checked ? (
        <div className="mt-10">
          <FeedbackFooter
            status={lesson.wasCorrect ? 'correct' : 'wrong'}
            title={lesson.wasCorrect ? 'Nice one!' : 'Not quite'}
            detail={
              lesson.wasCorrect
                ? `+${XP_PER_CORRECT} XP · ${question.explanation}`
                : question.explanation
            }
            actionLabel="Continue"
            onAction={next}
          />
        </div>
      ) : (
        <div className="mt-10 border-t-2 border-swan px-4 py-5">
          <div className="mx-auto flex max-w-2xl justify-end">
            <Button
              size="lg"
              disabled={!lesson.canCheck}
              onClick={check}
              className="w-full sm:w-48"
            >
              Check
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function OrderQuestionBody({
  question,
  answer,
  checked,
  onChange,
}: {
  question: Extract<Question, { kind: 'order' }>
  answer: string[]
  checked: boolean
  onChange: (value: string[]) => void
}) {
  const shuffled = useMemo(
    () => shuffleFor(question.id, question.items),
    [question.id, question.items],
  )
  const pool = shuffled.filter((item) => !answer.includes(item))

  return (
    <OrderList
      ordered={answer}
      pool={pool}
      disabled={checked}
      correctness={checked ? orderCorrectness(question.items, answer) : undefined}
      onPick={(item) => onChange([...answer, item])}
      onUnpick={(item) => onChange(answer.filter((x) => x !== item))}
    />
  )
}
