import { Avatar, Badge, Card, ProgressBar } from '@/design-system'
import { course, learner } from '@/data/course'

const ACHIEVEMENTS = [
  { icon: '🔥', title: 'Wildfire', detail: 'Reach a 7 day streak', progress: 1 },
  { icon: '🧠', title: 'Scholar', detail: 'Learn 50 new concepts', progress: 0.62 },
  { icon: '⚡', title: 'Sharpshooter', detail: 'Finish 10 perfect lessons', progress: 0.3 },
]

export function ProfilePage() {
  const completed = course.units.filter((u) => u.status !== 'locked').length

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Avatar name={learner.name} size="lg" />
        <div>
          <h1 className="text-title">{learner.name}</h1>
          <p className="text-sm text-wolf">Joined August 2026</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Badge tone="green">{learner.league} league</Badge>
            <Badge tone="yellow">🔥 {learner.streak} day streak</Badge>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="mb-3 text-eyebrow uppercase text-wolf">Statistics</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: '🔥', value: learner.streak, label: 'Day streak' },
            { icon: '⚡', value: 2480, label: 'Total XP' },
            { icon: '💎', value: learner.gems, label: 'Gems' },
            { icon: '📚', value: completed, label: 'Units started' },
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
        <h2 className="mb-3 text-eyebrow uppercase text-wolf">Achievements</h2>
        <div className="space-y-3">
          {ACHIEVEMENTS.map((a) => (
            <Card key={a.title} className="flex items-center gap-4">
              <span aria-hidden className="text-3xl">
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
                  color={a.progress === 1 ? 'green' : 'yellow'}
                  value={a.progress * 100}
                  label={a.title}
                />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
