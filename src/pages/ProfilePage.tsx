import { Avatar, Badge, Button, Card, ProgressBar } from '@/design-system'
import { totalQuestions, totalUnits, tracks } from '@/content'
import { useProgress } from '@/features/progress/useProgress'
import { trackCompletion } from '@/features/progress/trackProgress'

const LEARNER_NAME = 'Jose Diestra'

export function ProfilePage() {
  const { completed, xp, streak, reset } = useProgress()

  const achievements = [
    {
      icon: '🌱',
      title: 'First steps',
      detail: 'Complete your first unit',
      progress: Math.min(1, completed.length),
    },
    {
      icon: '🔥',
      title: 'Wildfire',
      detail: 'Reach a 7 day streak',
      progress: Math.min(1, streak / 7),
    },
    {
      icon: '🧠',
      title: 'Scholar',
      detail: `Complete all ${totalUnits} units`,
      progress: completed.length / totalUnits,
    },
    {
      icon: '⚡',
      title: 'Power learner',
      detail: 'Earn 1,000 XP',
      progress: Math.min(1, xp / 1000),
    },
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Avatar name={LEARNER_NAME} size="lg" />
        <div>
          <h1 className="text-title">{LEARNER_NAME}</h1>
          <p className="text-sm text-wolf">Learning software, one unit at a time</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Badge tone="yellow">🔥 {streak} day streak</Badge>
            <Badge tone="green">⚡ {xp} XP</Badge>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="mb-3 text-eyebrow uppercase text-wolf">Statistics</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: '🔥', value: streak, label: 'Day streak' },
            { icon: '⚡', value: xp, label: 'Total XP' },
            { icon: '📚', value: `${completed.length}/${totalUnits}`, label: 'Units done' },
            { icon: '❓', value: totalQuestions, label: 'Questions available' },
          ].map((stat) => (
            <Card key={stat.label} className="flex items-center gap-3 p-4">
              <span aria-hidden className="text-2xl">
                {stat.icon}
              </span>
              <div className="min-w-0">
                <p className="text-lg leading-tight">{stat.value}</p>
                <p className="truncate text-xs text-wolf">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-eyebrow uppercase text-wolf">Tracks</h2>
        <div className="space-y-3">
          {tracks.map((track) => {
            const { done, total, ratio } = trackCompletion(track, completed)
            return (
              <Card key={track.id} className="flex items-center gap-4">
                <span aria-hidden className="text-3xl">
                  {track.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate">{track.title}</p>
                    <span className="shrink-0 text-xs text-wolf">
                      {done} / {total}
                    </span>
                  </div>
                  <ProgressBar
                    className="mt-2 h-3"
                    color={track.accent === 'green' ? 'green' : 'blue'}
                    value={ratio * 100}
                    label={track.title}
                  />
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-eyebrow uppercase text-wolf">Achievements</h2>
        <div className="space-y-3">
          {achievements.map((a) => (
            <Card key={a.title} className="flex items-center gap-4">
              <span
                aria-hidden
                className={`text-3xl ${a.progress >= 1 ? '' : 'opacity-30 grayscale'}`}
              >
                {a.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate">{a.title}</p>
                  <span className="shrink-0 text-xs text-wolf">
                    {Math.round(a.progress * 100)}%
                  </span>
                </div>
                <p className="truncate text-sm text-wolf">{a.detail}</p>
                <ProgressBar
                  className="mt-2 h-3"
                  color={a.progress >= 1 ? 'green' : 'yellow'}
                  value={a.progress * 100}
                  label={a.title}
                />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Card flat className="bg-polar">
        <h2 className="text-eyebrow uppercase text-wolf">Progress data</h2>
        <p className="mt-2 text-sm text-wolf">
          Your progress is stored in this browser only — no account, no server.
          Clearing it cannot be undone.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-4"
          onClick={() => {
            if (confirm('Reset all progress? This cannot be undone.')) reset()
          }}
        >
          Reset progress
        </Button>
      </Card>
    </div>
  )
}
