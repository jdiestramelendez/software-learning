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
import { useLanguage } from '@/features/i18n/useLanguage'
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
  const { ui, text } = useLanguage()

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
        <p className="text-title">{ui('lesson.notFound')}</p>
        <Link to="/" className="mt-4 inline-block text-tide underline">
          {ui('lesson.backToTracks')}
        </Link>
      </div>
    )
  }

  const { track, unit } = found

  if (phase === 'concept') {
    return (
      <div className="flex min-h-dvh flex-col">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 py-5">
          <IconButton
            label={ui('lesson.back')}
            onClick={() => navigate(`/track/${track.id}`)}
          >
            ✕
          </IconButton>
          <p className="text-eyebrow uppercase text-slate">{text(track.title)}</p>
        </div>

        <div className="mx-auto w-full max-w-2xl flex-1 px-4">
          <ConceptCard
            icon={unit.icon}
            title={text(unit.title)}
            headline={text(unit.concept.headline)}
            body={unit.concept.body.map(text)}
            keyPoints={unit.concept.keyPoints.map(text)}
            keyPointsLabel={ui('lesson.keyPoints')}
            example={
              unit.concept.example && {
                caption: text(unit.concept.example.caption),
                code: text(unit.concept.example.code),
              }
            }
          />
        </div>

        <div className="mt-10 border-t-2 border-linen px-4 py-5">
          <div className="mx-auto flex max-w-2xl justify-end">
            <Button size="lg" onClick={begin} className="w-full sm:w-auto sm:min-w-56">
              {ui('lesson.start', { n: questions.length })}
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
        <h1 className="text-hero text-fern">
          {perfect ? ui('lesson.perfect') : ui('lesson.complete')}
        </h1>
        <p className="text-slate">{text(unit.title)}</p>

        <div className="flex w-full gap-3">
          <Card className="flex-1 border-sunbeam/60 bg-butter text-honey">
            <p className="text-eyebrow uppercase">{ui('lesson.xpEarned')}</p>
            <p className="text-title">{lesson.correctCount * XP_PER_CORRECT}</p>
          </Card>
          <Card className="flex-1 border-iris/40 bg-lilac text-plum">
            <p className="text-eyebrow uppercase">{ui('lesson.accuracy')}</p>
            <p className="text-title">
              {Math.round((lesson.correctCount / lesson.total) * 100)}%
            </p>
          </Card>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Button size="lg" full onClick={() => navigate(`/track/${track.id}`)}>
            {ui('lesson.continue')}
          </Button>
          <Button variant="secondary" size="lg" full onClick={lesson.restart}>
            {ui('lesson.again')}
          </Button>
        </div>
      </div>
    )
  }

  const picked = answer?.kind === 'index' ? answer.value : null

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 py-5">
        <IconButton
          label={ui('lesson.quit')}
          onClick={() => navigate(`/track/${track.id}`)}
        >
          ✕
        </IconButton>
        <ProgressBar
          value={lesson.index + (checked ? 1 : 0)}
          max={lesson.total}
          color={track.accent === 'green' ? 'green' : 'blue'}
          label={ui('lesson.progress')}
        />
        <span className="flex items-center gap-1 text-lg text-poppy">
          <span aria-hidden>❤️</span>
          {lesson.hearts}
          <span className="sr-only">{ui('stat.hearts')}</span>
        </span>
      </div>

      <div className="mx-auto w-full max-w-2xl flex-1 px-4 pt-6">
        <h1 className="text-title">{text(question.prompt)}</h1>

        {question.kind !== 'gap' && question.code && (
          <CodeBlock className="mt-5">{text(question.code)}</CodeBlock>
        )}

        <div
          className={`mt-6 ${checked && !lesson.wasCorrect ? 'animate-shake' : ''}`}
        >
          {(question.kind === 'choice' || question.kind === 'gap') && (
            <>
              {question.kind === 'gap' && (
                <GapCode
                  code={text(question.code)}
                  filled={picked === null ? null : text(question.choices[picked])}
                  state={checked ? (lesson.wasCorrect ? 'correct' : 'wrong') : 'idle'}
                />
              )}
              <div
                className={`grid gap-3 sm:grid-cols-2 ${question.kind === 'gap' ? 'mt-4' : ''}`}
              >
                {question.choices.map((choice, i) => (
                  <ChoiceCard
                    key={question.id + i}
                    shortcut={i + 1}
                    state={optionState(i, picked, question.answerIndex, checked)}
                    disabled={checked}
                    onClick={() => setAnswer({ kind: 'index', value: i })}
                  >
                    {text(choice)}
                  </ChoiceCard>
                ))}
              </div>
            </>
          )}

          {question.kind === 'boolean' && (
            <>
              <Card flat className="border-2 border-linen bg-sand text-center">
                <p className="text-lg leading-snug">{text(question.statement)}</p>
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
                      {value ? ui('lesson.true') : ui('lesson.false')}
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
              labels={question.items.map(text)}
              emptyHint={ui('lesson.orderHint')}
              onChange={(value) => setAnswer({ kind: 'order', value })}
            />
          )}
        </div>
      </div>

      {checked ? (
        <div className="mt-10">
          <FeedbackFooter
            status={lesson.wasCorrect ? 'correct' : 'wrong'}
            title={lesson.wasCorrect ? ui('lesson.correct') : ui('lesson.wrong')}
            detail={
              lesson.wasCorrect
                ? `+${XP_PER_CORRECT} XP · ${text(question.explanation)}`
                : text(question.explanation)
            }
            actionLabel={ui('lesson.continue')}
            onAction={next}
          />
        </div>
      ) : (
        <div className="mt-10 border-t-2 border-linen px-4 py-5">
          <div className="mx-auto flex max-w-2xl justify-end">
            <Button
              size="lg"
              disabled={!lesson.canCheck}
              onClick={check}
              className="w-full sm:w-48"
            >
              {ui('lesson.check')}
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
  labels,
  emptyHint,
  onChange,
}: {
  question: Extract<Question, { kind: 'order' }>
  /** Indices into `question.items`, in the order the learner placed them. */
  answer: number[]
  checked: boolean
  labels: string[]
  emptyHint: string
  onChange: (value: number[]) => void
}) {
  // Shuffle positions, not text, so the pool order never changes with language.
  const shuffled = useMemo(
    () => shuffleFor(question.id, question.items.length),
    [question.id, question.items.length],
  )
  const pool = shuffled.filter((index) => !answer.includes(index))
  const toItem = (index: number) => ({ index, label: labels[index] })

  return (
    <OrderList
      ordered={answer.map(toItem)}
      pool={pool.map(toItem)}
      disabled={checked}
      emptyHint={emptyHint}
      correctness={checked ? orderCorrectness(answer) : undefined}
      onPick={(index) => onChange([...answer, index])}
      onUnpick={(index) => onChange(answer.filter((x) => x !== index))}
    />
  )
}
