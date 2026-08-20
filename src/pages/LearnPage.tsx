import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  Badge,
  Card,
  ProgressBar,
  SectionHeader,
  SkillNode,
  StatPill,
} from '@/design-system'
import { getTrack } from '@/content'
import { useLanguage } from '@/features/i18n/useLanguage'
import { useProgress } from '@/features/progress/useProgress'
import { trackCompletion, unitStatuses } from '@/features/progress/trackProgress'

/** Horizontal offsets that give the path its zig-zag, cycling per section. */
const ZIGZAG = [0, 56, 16, -48, -8]

export function LearnPage() {
  const { trackId } = useParams()
  const navigate = useNavigate()
  const { completed, streak, xp } = useProgress()
  const { ui, text } = useLanguage()

  const track = getTrack(trackId)
  if (!track) return <Navigate to="/" replace />

  const statuses = unitStatuses(track, completed)
  const byUnitId = new Map(statuses.map((s) => [s.unit.id, s]))
  const { done, total, ratio } = trackCompletion(track, completed)

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="min-w-0 flex-1 space-y-10">
        <div>
          <Link to="/" className="text-sm text-tide underline">
            ← {ui('learn.allTracks')}
          </Link>
          <h1 className="mt-2 text-title">
            <span aria-hidden className="mr-2">
              {track.icon}
            </span>
            {text(track.title)}
          </h1>
          <p className="mt-1 text-sm text-slate">{text(track.subtitle)}</p>
        </div>

        {track.sections.map((section, sectionIndex) => (
          <section key={section.id} className="space-y-6">
            <SectionHeader
              eyebrow={ui('learn.section', { n: sectionIndex + 1 })}
              title={text(section.title)}
              subtitle={text(section.subtitle)}
              accent={track.accent}
            />

            <ol className="flex flex-col items-center gap-8">
              {section.units.map((unit, i) => {
                const state = byUnitId.get(unit.id)
                if (!state) return null
                return (
                  <li
                    key={unit.id}
                    style={{ transform: `translateX(${ZIGZAG[i % ZIGZAG.length]}px)` }}
                  >
                    <SkillNode
                      status={state.status}
                      icon={unit.icon}
                      title={text(unit.title)}
                      lockedLabel={ui('learn.locked', { title: text(unit.title) })}
                      progress={state.progress}
                      onClick={() => navigate(`/track/${track.id}/unit/${unit.id}`)}
                    />
                  </li>
                )
              })}
            </ol>
          </section>
        ))}
      </div>

      <aside className="w-full shrink-0 space-y-4 lg:sticky lg:top-6 lg:w-72 lg:self-start">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-eyebrow uppercase text-slate">{ui('learn.trackProgress')}</h2>
            <Badge tone={track.accent === 'green' ? 'purple' : 'blue'}>
              {done} / {total}
            </Badge>
          </div>
          <ProgressBar
            className="mt-3"
            color={track.accent === 'green' ? 'green' : 'blue'}
            value={ratio * 100}
            label={text(track.title)}
          />
          <p className="mt-3 text-sm text-slate">
            {total - done === 0
              ? ui('learn.done')
              : ui('learn.remaining', { n: total - done })}
          </p>
        </Card>

        <Card>
          <h2 className="text-eyebrow uppercase text-slate">{ui('learn.you')}</h2>
          <div className="mt-3 flex items-center justify-between">
            <StatPill icon="🔥" value={streak} label={ui('stat.streak')} tone="fox" />
            <StatPill icon="⚡" value={xp} label={ui('stat.xp')} tone="bee" />
          </div>
        </Card>

        <Card flat className="bg-lilac">
          <p className="text-sm text-slate">{ui('learn.unlockNote')}</p>
        </Card>
      </aside>
    </div>
  )
}
