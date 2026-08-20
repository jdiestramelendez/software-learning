import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  ChoiceCard,
  FeedbackFooter,
  IconButton,
  ProgressBar,
  type ChoiceState,
} from '@/design-system'
import { course } from '@/data/course'
import { useLesson } from '@/features/lesson/useLesson'

/** Decide how a single choice should render, given the lesson's phase. */
function choiceState(
  index: number,
  selected: number | null,
  answerIndex: number,
  checked: boolean,
): ChoiceState {
  if (!checked) return selected === index ? 'selected' : 'idle'
  if (index === answerIndex) return 'correct'
  if (index === selected) return 'wrong'
  return 'idle'
}

export function LessonPage() {
  const { unitId } = useParams()
  const navigate = useNavigate()
  const unit = course.units.find((u) => u.id === unitId)
  const lesson = useLesson(unit?.questions ?? [])

  const { phase, selected, check, next, select, question } = lesson
  const checked = phase === 'checked'

  // Number keys pick an answer, Enter checks or advances — the way power users
  // actually play. Registered once, guarded on the current phase.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault()
        if (checked) next()
        else if (selected !== null) check()
        return
      }
      const n = Number(event.key)
      if (Number.isInteger(n) && n >= 1 && n <= (question?.choices.length ?? 0)) {
        select(n - 1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [checked, selected, check, next, select, question])

  if (!unit) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-title">Lesson not found</p>
        <Link to="/" className="mt-4 inline-block text-macaw underline">
          Back to the path
        </Link>
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
          {perfect ? 'Flawless!' : 'Lesson complete!'}
        </h1>
        <div className="flex w-full gap-3">
          <Card className="flex-1 border-bee bg-canary text-camel">
            <p className="text-eyebrow uppercase">Total XP</p>
            <p className="text-title">{lesson.correctCount * 10}</p>
          </Card>
          <Card className="flex-1 border-macaw bg-iguana text-whale">
            <p className="text-eyebrow uppercase">Accuracy</p>
            <p className="text-title">
              {Math.round((lesson.correctCount / lesson.total) * 100)}%
            </p>
          </Card>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Button size="lg" full onClick={() => navigate('/')}>
            Continue
          </Button>
          <Button variant="secondary" size="lg" full onClick={lesson.restart}>
            Practice again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 py-5">
        <IconButton label="Quit lesson" onClick={() => navigate('/')}>
          ✕
        </IconButton>
        <ProgressBar
          value={lesson.index + (checked ? 1 : 0)}
          max={lesson.total}
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

        {question.code && (
          <pre className="mt-5 overflow-x-auto rounded-chunky border-2 border-swan bg-polar p-4 font-mono text-sm font-medium text-eel">
            <code>{question.code}</code>
          </pre>
        )}

        <div
          className={`mt-6 grid gap-3 sm:grid-cols-2 ${
            checked && !lesson.wasCorrect ? 'animate-shake' : ''
          }`}
        >
          {question.choices.map((choice, i) => (
            <ChoiceCard
              key={choice}
              shortcut={i + 1}
              state={choiceState(i, selected, question.answerIndex, checked)}
              disabled={checked}
              onClick={() => select(i)}
            >
              {choice}
            </ChoiceCard>
          ))}
        </div>
      </div>

      {checked ? (
        <div className="mt-10">
          <FeedbackFooter
            status={lesson.wasCorrect ? 'correct' : 'wrong'}
            title={lesson.wasCorrect ? 'Nice one!' : 'Not quite'}
            detail={
              lesson.wasCorrect ? '+10 XP' : question.explanation
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
              disabled={selected === null}
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
