import { NavLink, Outlet } from 'react-router-dom'
import { Avatar, StatPill, cn } from '@/design-system'
import { learner } from '@/data/course'

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

/**
 * The persistent chrome: a left rail on desktop, a bottom tab bar on mobile.
 * Duolingo does exactly this swap at the `lg` breakpoint.
 */
export function AppLayout() {
  return (
    <div className="min-h-dvh bg-snow">
      {/* Mobile top bar with the live counters */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b-2 border-swan bg-snow px-4 py-3 lg:hidden">
        <span className="text-lg text-feather-green">Bitwise</span>
        <div className="flex items-center gap-4">
          <StatPill icon="🔥" value={learner.streak} label="Day streak" tone="fox" />
          <StatPill icon="💎" value={learner.gems} label="Gems" tone="macaw" />
          <StatPill icon="❤️" value={learner.hearts} label="Hearts" tone="cardinal" />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 pb-24 lg:pb-8">
        {/* Desktop left rail */}
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
            <Avatar name={learner.name} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm">{learner.name}</p>
              <p className="truncate text-xs text-wolf">{learner.league} league</p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 py-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom tabs */}
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
