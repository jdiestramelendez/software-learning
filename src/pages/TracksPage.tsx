import { Link } from 'react-router-dom'
import { Badge, Button, Card, ProgressBar, cn } from '@/design-system'
import { totalQuestions, totalUnits, tracks, unitsOf } from '@/content'
import { useLanguage } from '@/features/i18n/useLanguage'
import { useProgress } from '@/features/progress/useProgress'
import { accentStyles } from '@/features/tracks/accent'
import { nextUnit, trackCompletion } from '@/features/progress/trackProgress'

/** The home screen: choose a track, or continue where you left off. */
export function TracksPage() {
  const { completed, xp } = useProgress()
  const { ui, text } = useLanguage()

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <p className="text-eyebrow uppercase text-slate">Bitwise</p>
        <h1 className="mt-1 text-hero text-iris">{ui('tracks.title')}</h1>
        <p className="mt-3 font-semibold text-slate">
          {ui('tracks.intro', {
            units: totalUnits,
            questions: totalQuestions,
            tracks: tracks.length,
          })}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track) => {
          const { done, total, ratio } = trackCompletion(track, completed)
          const next = nextUnit(track, completed)
          const started = done > 0
          const accent = accentStyles(track.accent)

          return (
            <Card
              key={track.id}
              className={cn(
                'flex flex-col',
                accent.border,
              )}
            >
              <div className="flex items-start gap-3">
                <span aria-hidden className="text-4xl leading-none">
                  {track.icon}
                </span>
                <div className="min-w-0">
                  <h2 className="text-xl leading-tight">{text(track.title)}</h2>
                  <p className="mt-1 text-sm text-slate">{text(track.subtitle)}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone={accent.badge}>
                  {ui('tracks.sections', { n: track.sections.length })}
                </Badge>
                <Badge>{ui('tracks.units', { n: unitsOf(track).length })}</Badge>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-baseline justify-between text-xs text-slate">
                  <span>{ui('tracks.progress')}</span>
                  <span>
                    {done} / {total}
                  </span>
                </div>
                <ProgressBar
                  value={ratio * 100}
                  color={accent.progress}
                  label={text(track.title)}
                />
              </div>

              <Link to={`/track/${track.id}`} className="mt-5 block">
                <Button
                  variant={accent.button}
                  full
                  className="pointer-events-none"
                >
                  {started ? ui('tracks.continue') : ui('tracks.start')}
                </Button>
              </Link>
              {next && (
                <p className="mt-2 truncate text-center text-xs text-slate">
                  {ui('tracks.next')}: {next.icon} {text(next.title)}
                </p>
              )}
            </Card>
          )
        })}
      </div>

      {xp > 0 && (
        <Card flat className="bg-butter text-center">
          <p className="text-eyebrow uppercase text-honey">{ui('tracks.earned')}</p>
          <p className="text-title text-honey">{xp} XP</p>
        </Card>
      )}
    </div>
  )
}
