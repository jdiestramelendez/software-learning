import { Avatar, Badge, Button, Card, ProgressBar } from '@/design-system'
import { totalQuestions, totalUnits, tracks } from '@/content'
import { useLanguage } from '@/features/i18n/useLanguage'
import { useProgress } from '@/features/progress/useProgress'
import { trackCompletion } from '@/features/progress/trackProgress'

const LEARNER_NAME = 'Jose Diestra'

export function ProfilePage() {
  const { completed, xp, streak, reset } = useProgress()
  const { ui, text } = useLanguage()

  const achievements = [
    {
      icon: '🌱',
      title: ui('achievement.first'),
      detail: ui('achievement.firstDetail'),
      progress: Math.min(1, completed.length),
    },
    {
      icon: '🔥',
      title: ui('achievement.streak'),
      detail: ui('achievement.streakDetail'),
      progress: Math.min(1, streak / 7),
    },
    {
      icon: '🧠',
      title: ui('achievement.scholar'),
      detail: ui('achievement.scholarDetail', { n: totalUnits }),
      progress: completed.length / totalUnits,
    },
    {
      icon: '⚡',
      title: ui('achievement.power'),
      detail: ui('achievement.powerDetail'),
      progress: Math.min(1, xp / 1000),
    },
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Avatar name={LEARNER_NAME} size="lg" />
        <div>
          <h1 className="text-title">{LEARNER_NAME}</h1>
          <p className="text-sm text-slate">{ui('profile.tagline')}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Badge tone="yellow">🔥 {streak} day streak</Badge>
            <Badge tone="green">⚡ {xp} XP</Badge>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="mb-3 text-eyebrow uppercase text-slate">{ui('profile.statistics')}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: '🔥', value: streak, label: ui('stat.streak') },
            { icon: '⚡', value: xp, label: ui('stat.xp') },
            {
              icon: '📚',
              value: `${completed.length}/${totalUnits}`,
              label: ui('stat.unitsDone'),
            },
            { icon: '❓', value: totalQuestions, label: ui('stat.questions') },
          ].map((stat) => (
            <Card key={stat.label} className="flex items-center gap-3 p-4">
              <span aria-hidden className="text-2xl">
                {stat.icon}
              </span>
              <div className="min-w-0">
                <p className="text-lg leading-tight">{stat.value}</p>
                <p className="truncate text-xs text-slate">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-eyebrow uppercase text-slate">{ui('profile.tracks')}</h2>
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
                    <p className="truncate">{text(track.title)}</p>
                    <span className="shrink-0 text-xs text-slate">
                      {done} / {total}
                    </span>
                  </div>
                  <ProgressBar
                    className="mt-2 h-3"
                    color={track.accent === 'green' ? 'green' : 'blue'}
                    value={ratio * 100}
                    label={text(track.title)}
                  />
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-eyebrow uppercase text-slate">{ui('profile.achievements')}</h2>
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
                  <span className="shrink-0 text-xs text-slate">
                    {Math.round(a.progress * 100)}%
                  </span>
                </div>
                <p className="truncate text-sm text-slate">{a.detail}</p>
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

      <Card flat className="bg-sand">
        <h2 className="text-eyebrow uppercase text-slate">{ui('profile.dataTitle')}</h2>
        <p className="mt-2 text-sm text-slate">{ui('profile.dataNote')}</p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-4"
          onClick={() => {
            if (confirm(ui('profile.resetConfirm'))) reset()
          }}
        >
          {ui('profile.reset')}
        </Button>
      </Card>
    </div>
  )
}
