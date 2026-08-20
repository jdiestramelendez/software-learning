import type { Question, Track, Unit } from './types'
import { thinking } from './foundations/01-thinking'
import { craft } from './foundations/02-craft'
import { team } from './foundations/03-team'
import { systems } from './foundations/04-systems'
import { production } from './foundations/05-production'
import { fundamentals } from './aws/01-fundamentals'
import { compute } from './aws/02-compute'
import { data } from './aws/03-data'
import { architecture } from './aws/04-architecture'

export const foundationsTrack: Track = {
  id: 'foundations',
  title: { en: 'Software Foundations', es: 'Fundamentos del software' },
  subtitle: {
    en: 'From reading code to running it in production.',
    es: 'De leer código a ponerlo en producción.',
  },
  icon: '⚙️',
  accent: 'green',
  sections: [thinking, craft, team, systems, production],
}

export const awsTrack: Track = {
  id: 'aws',
  title: { en: 'AWS & the Cloud', es: 'AWS y la nube' },
  subtitle: {
    en: 'How the cloud actually works, one service at a time.',
    es: 'Cómo funciona la nube de verdad, un servicio a la vez.',
  },
  icon: '☁️',
  accent: 'blue',
  sections: [fundamentals, compute, data, architecture],
}

export const tracks: Track[] = [foundationsTrack, awsTrack]

export function getTrack(id: string | undefined): Track | undefined {
  return tracks.find((track) => track.id === id)
}

/** Every unit of a track, flattened in learning order. */
export function unitsOf(track: Track): Unit[] {
  return track.sections.flatMap((section) => section.units)
}

/** Locate a unit and the track it belongs to, from a unit id alone. */
export function findUnit(
  trackId: string | undefined,
  unitId: string | undefined,
): { track: Track; unit: Unit } | undefined {
  const track = getTrack(trackId)
  if (!track) return undefined
  const unit = unitsOf(track).find((u) => u.id === unitId)
  return unit ? { track, unit } : undefined
}

export const totalUnits = tracks.reduce((n, t) => n + unitsOf(t).length, 0)
export const totalQuestions = tracks.reduce(
  (n, t) => n + unitsOf(t).reduce((m, u) => m + u.questions.length, 0),
  0,
)

/** XP awarded per correct answer — one place, used by the lesson and the profile. */
export const XP_PER_CORRECT = 10

export { LANGUAGES, t, tAll } from './types'
export type { Question, Track, Unit }
export type {
  Concept,
  Lang,
  LocalizedText,
  QuestionKind,
  Section,
} from './types'
