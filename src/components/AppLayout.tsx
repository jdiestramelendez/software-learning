import { NavLink, Outlet } from 'react-router-dom'
import { Avatar, LanguageSwitch, StatPill, cn } from '@/design-system'
import { totalUnits } from '@/content'
import { useLanguage } from '@/features/i18n/useLanguage'
import { useProgress } from '@/features/progress/useProgress'
import type { StringKey } from '@/features/i18n/strings'

const LEARNER_NAME = 'Jose Diestra'

const NAV: Array<{ to: string; key: StringKey; icon: string; end: boolean }> = [
  { to: '/', key: 'nav.learn', icon: '🏠', end: true },
  { to: '/profile', key: 'nav.profile', icon: '👤', end: false },
  { to: '/design-system', key: 'nav.design', icon: '🎨', end: false },
]

function navClasses({ isActive }: { isActive: boolean }) {
  return cn(
    'ds-press flex items-center gap-3 rounded-chunky border-2 px-4 py-3 text-eyebrow uppercase',
    isActive
      ? 'border-iris bg-lilac text-plum'
      : 'border-transparent text-slate hover:bg-sand',
  )
}

/** Left rail on desktop, bottom tab bar on mobile. */
export function AppLayout() {
  const { xp, streak, completed } = useProgress()
  const { lang, setLang, ui } = useLanguage()

  const languageSwitch = (
    <LanguageSwitch
      value={lang}
      onChange={setLang}
      label={ui('lang.label')}
      names={{ en: ui('lang.en'), es: ui('lang.es') }}
    />
  )

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b-2 border-linen bg-cream/85 px-4 py-3 backdrop-blur-sm lg:hidden">
        <span className="text-lg text-iris">Bitwise</span>
        <div className="flex items-center gap-3">
          <StatPill icon="🔥" value={streak} label={ui('stat.streak')} tone="fox" />
          <StatPill icon="⚡" value={xp} label={ui('stat.xp')} tone="bee" />
          {languageSwitch}
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 pb-24 lg:pb-8">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-2 border-r-2 border-linen py-6 pr-6 lg:flex">
          <div className="mb-4 flex items-center justify-between gap-2 px-4">
            <NavLink to="/" className="text-2xl text-iris">
              Bitwise
            </NavLink>
            {languageSwitch}
          </div>

          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navClasses}>
              <span aria-hidden className="text-xl">
                {item.icon}
              </span>
              {ui(item.key)}
            </NavLink>
          ))}

          <div className="mt-auto flex items-center gap-3 rounded-chunky bg-lilac p-3">
            <Avatar name={LEARNER_NAME} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm">{LEARNER_NAME}</p>
              <p className="truncate text-xs text-slate">
                {xp} XP · {completed.length}/{totalUnits}
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 py-6">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t-2 border-linen bg-cream/85 backdrop-blur-sm lg:hidden">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-1 py-3 text-[11px] uppercase tracking-wide',
                isActive ? 'text-iris' : 'text-pebble',
              )
            }
          >
            <span aria-hidden className="text-xl">
              {item.icon}
            </span>
            {ui(item.key)}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
