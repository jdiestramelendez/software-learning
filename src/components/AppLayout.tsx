import { NavLink, Outlet } from 'react-router-dom'
import { Avatar, StatPill, cn } from '@/design-system'
import { totalUnits } from '@/content'
import { useProgress } from '@/features/progress/useProgress'

const LEARNER_NAME = 'Jose Diestra'

const NAV = [
  { to: '/', label: 'Learn', icon: '🏠', end: true },
  { to: '/profile', label: 'Profile', icon: '👤', end: false },
  { to: '/design-system', label: 'Design', icon: '🎨', end: false },
]

function navClasses({ isActive }: { isActive: boolean }) {
  return cn(
    'ds-press flex items-center gap-3 rounded-chunky border-2 px-4 py-3 text-eyebrow uppercase',
    isActive
      ? 'border-macaw bg-iguana text-whale'
      : 'border-transparent text-wolf hover:bg-polar',
  )
}

/** Left rail on desktop, bottom tab bar on mobile. */
export function AppLayout() {
  const { xp, streak, completed } = useProgress()

  return (
    <div className="min-h-dvh bg-snow">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b-2 border-swan bg-snow px-4 py-3 lg:hidden">
        <span className="text-lg text-feather-green">Bitwise</span>
        <div className="flex items-center gap-4">
          <StatPill icon="🔥" value={streak} label="Day streak" tone="fox" />
          <StatPill icon="⚡" value={xp} label="Total XP" tone="bee" />
          <StatPill
            icon="📚"
            value={`${completed.length}/${totalUnits}`}
            label="Units complete"
            tone="macaw"
          />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 pb-24 lg:pb-8">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-2 border-r-2 border-swan py-6 pr-6 lg:flex">
          <NavLink to="/" className="mb-4 px-4 text-2xl text-feather-green">
            Bitwise
          </NavLink>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navClasses}>
              <span aria-hidden className="text-xl">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}

          <div className="mt-auto flex items-center gap-3 rounded-chunky bg-polar p-3">
            <Avatar name={LEARNER_NAME} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm">{LEARNER_NAME}</p>
              <p className="truncate text-xs text-wolf">
                {xp} XP · {streak} day streak
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 py-6">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t-2 border-swan bg-snow lg:hidden">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-1 py-3 text-[11px] uppercase tracking-wide',
                isActive ? 'text-macaw' : 'text-hare',
              )
            }
          >
            <span aria-hidden className="text-xl">
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
