import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, ProgressBar, SkillNode, StatPill } from '@/design-system'
import { course, learner } from '@/data/course'

/** The winding path of skill bubbles — the home screen of the app. */
export function LearnPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="min-w-0 flex-1">
        <Card className="mb-8 border-feather-green bg-feather-green text-snow shadow-[0_4px_0_0_var(--color-tree-frog)]">
          <p className="text-eyebrow uppercase opacity-80">{course.subtitle}</p>
          <h1 className="mt-1 text-title">{course.title}</h1>
          <p className="mt-2 text-sm font-bold opacity-90">
            Short lessons, one idea at a time. Miss one and we explain why.
          </p>
        </Card>

        <ol className="flex flex-col items-center gap-8">
          {course.units.map((unit, i) => (
            <li
              key={unit.id}
              // Zig-zag the path the way the real thing does.
              style={{ transform: `translateX(${[0, 56, 16, -48, -8][i % 5]}px)` }}
            >
              <SkillNode
                status={unit.status}
                icon={unit.icon}
                title={unit.title}
                progress={unit.progress}
                onClick={() => navigate(`/lesson/${unit.id}`)}
              />
            </li>
          ))}
        </ol>
      </div>

      <aside className="w-full shrink-0 space-y-4 lg:w-72">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-eyebrow uppercase text-wolf">Daily goal</h2>
            <Badge tone="yellow">{learner.xpToday} / {learner.dailyGoal} XP</Badge>
          </div>
          <ProgressBar
            className="mt-3"
            color="yellow"
            value={learner.xpToday}
            max={learner.dailyGoal}
            label="Daily XP goal"
          />
          <p className="mt-3 text-sm text-wolf">
            {learner.dailyGoal - learner.xpToday} XP to keep your streak alive.
          </p>
        </Card>

        <Card>
          <h2 className="text-eyebrow uppercase text-wolf">Today</h2>
          <div className="mt-3 flex items-center justify-between">
            <StatPill icon="🔥" value={learner.streak} label="Day streak" tone="fox" />
            <StatPill icon="💎" value={learner.gems} label="Gems" tone="macaw" />
            <StatPill icon="❤️" value={learner.hearts} label="Hearts" tone="cardinal" />
          </div>
        </Card>

        <Card className="border-beetle/40 bg-beetle/10">
          <h2 className="text-eyebrow uppercase text-humpback">Try Bitwise Max</h2>
          <p className="mt-2 text-sm text-wolf">
            Unlimited hearts and mistake reviews on every lesson.
          </p>
          <Button variant="super" full className="mt-4">
            Start free trial
          </Button>
        </Card>
      </aside>
    </div>
  )
}
