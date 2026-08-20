import { Link } from 'react-router-dom'
import { Badge, Button, Card, ProgressBar, cn } from '@/design-system'
import { totalQuestions, totalUnits, tracks, unitsOf } from '@/content'
import { useProgress } from '@/features/progress/useProgress'
import { nextUnit, trackCompletion } from '@/features/progress/trackProgress'

/** The home screen: choose a track, or continue where you left off. */
export function TracksPage() {
  const { completed, xp } = useProgress()

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <p className="text-eyebrow uppercase text-wolf">Bitwise</p>
        <h1 className="mt-1 text-hero text-feather-green">Learn to build software</h1>
        <p className="mt-3 font-semibold text-wolf">
          {totalUnits} units and {totalQuestions} questions across two tracks. Short
          lessons, one idea at a time — and every wrong answer gets an explanation.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {tracks.map((track) => {
          const { done, total, ratio } = trackCompletion(track, completed)
          const next = nextUnit(track, completed)
          const started = done > 0
          const green = track.accent === 'green'

          return (
            <Card
              key={track.id}
              className={cn(
                'flex flex-col',
                green ? 'border-feather-green/40' : 'border-macaw/40',
              )}
            >
              <div className="flex items-start gap-3">
                <span aria-hidden className="text-4xl leading-none">
                  {track.icon}
                </span>
                <div className="min-w-0">
                  <h2 className="text-xl leading-tight">{track.title}</h2>
                  <p className="mt-1 text-sm text-wolf">{track.subtitle}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone={green ? 'green' : 'blue'}>
                  {track.sections.length} sections
                </Badge>
                <Badge>{unitsOf(track).length} units</Badge>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-baseline justify-between text-xs text-wolf">
                  <span>Progress</span>
                  <span>
                    {done} / {total}
                  </span>
                </div>
                <ProgressBar
                  value={ratio * 100}
                  color={green ? 'green' : 'blue'}
                  label={`${track.title} progress`}
                />
              </div>

              <Link to={`/track/${track.id}`} className="mt-5 block">
                <Button
                  variant={green ? 'primary' : 'info'}
                  full
                  className="pointer-events-none"
                >
                  {started ? 'Continue' : 'Start track'}
                </Button>
              </Link>
              {next && (
                <p className="mt-2 truncate text-center text-xs text-wolf">
                  Next: {next.icon} {next.title}
                </p>
              )}
            </Card>
          )
        })}
      </div>

      {xp > 0 && (
        <Card flat className="bg-canary text-center">
          <p className="text-eyebrow uppercase text-camel">Total earned</p>
          <p className="text-title text-camel">{xp} XP</p>
        </Card>
      )}
    </div>
  )
}
