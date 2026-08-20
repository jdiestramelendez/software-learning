import type { Lang } from '@/content'

/**
 * UI strings. English is the source of truth: `es` is typed against it, so
 * forgetting a translation is a compile error rather than a blank label.
 *
 * Course content is NOT here — it lives next to each question in
 * `src/content/`, so a reviewer sees both languages side by side.
 */
const en = {
  'nav.learn': 'Learn',
  'nav.profile': 'Profile',
  'nav.design': 'Design',

  'stat.streak': 'Day streak',
  'stat.xp': 'Total XP',
  'stat.units': 'Units complete',
  'stat.hearts': 'Hearts remaining',
  'stat.questions': 'Questions available',
  'stat.unitsDone': 'Units done',

  'lang.label': 'Language',
  'lang.en': 'English',
  'lang.es': 'Español',

  'tracks.title': 'Learn to build software',
  'tracks.intro': '{units} units and {questions} questions across {tracks} tracks. Short lessons, one idea at a time — and every wrong answer gets an explanation.',
  'tracks.sections': '{n} sections',
  'tracks.units': '{n} units',
  'tracks.progress': 'Progress',
  'tracks.start': 'Start track',
  'tracks.continue': 'Continue',
  'tracks.next': 'Next',
  'tracks.earned': 'Total earned',

  'learn.allTracks': 'All tracks',
  'learn.section': 'Section {n}',
  'learn.trackProgress': 'Track progress',
  'learn.you': 'You',
  'learn.remaining': '{n} units to go.',
  'learn.done': 'Track complete. Nicely done.',
  'learn.unlockNote': 'Units unlock in order. Finish one to open the next — your progress is saved in this browser.',
  'learn.locked': '{title} — locked',

  'lesson.start': 'Start · {n} questions',
  'lesson.check': 'Check',
  'lesson.continue': 'Continue',
  'lesson.correct': 'Nice one!',
  'lesson.wrong': 'Not quite',
  'lesson.progress': 'Lesson progress',
  'lesson.quit': 'Quit lesson',
  'lesson.back': 'Back to the path',
  'lesson.complete': 'Unit complete!',
  'lesson.perfect': 'Flawless!',
  'lesson.xpEarned': 'XP earned',
  'lesson.accuracy': 'Accuracy',
  'lesson.again': 'Practice again',
  'lesson.notFound': 'Lesson not found',
  'lesson.backToTracks': 'Back to the tracks',
  'lesson.true': 'True',
  'lesson.false': 'False',
  'lesson.orderHint': 'Tap the steps below in the right order',
  'lesson.keyPoints': 'Worth remembering',

  'profile.tagline': 'Learning software, one unit at a time',
  'profile.statistics': 'Statistics',
  'profile.tracks': 'Tracks',
  'profile.achievements': 'Achievements',
  'profile.dataTitle': 'Progress data',
  'profile.dataNote': 'Your progress is stored in this browser only — no account, no server. Clearing it cannot be undone.',
  'profile.reset': 'Reset progress',
  'profile.resetConfirm': 'Reset all progress? This cannot be undone.',

  'achievement.first': 'First steps',
  'achievement.firstDetail': 'Complete your first unit',
  'achievement.streak': 'Wildfire',
  'achievement.streakDetail': 'Reach a 7 day streak',
  'achievement.scholar': 'Scholar',
  'achievement.scholarDetail': 'Complete all {n} units',
  'achievement.power': 'Power learner',
  'achievement.powerDetail': 'Earn 1,000 XP',
} as const

export type StringKey = keyof typeof en

const es: Record<StringKey, string> = {
  'nav.learn': 'Aprender',
  'nav.profile': 'Perfil',
  'nav.design': 'Diseño',

  'stat.streak': 'Días seguidos',
  'stat.xp': 'XP total',
  'stat.units': 'Unidades completadas',
  'stat.hearts': 'Vidas restantes',
  'stat.questions': 'Preguntas disponibles',
  'stat.unitsDone': 'Unidades hechas',

  'lang.label': 'Idioma',
  'lang.en': 'English',
  'lang.es': 'Español',

  'tracks.title': 'Aprende a construir software',
  'tracks.intro': '{units} unidades y {questions} preguntas en {tracks} rutas. Lecciones cortas, una idea a la vez — y cada respuesta incorrecta viene con su explicación.',
  'tracks.sections': '{n} secciones',
  'tracks.units': '{n} unidades',
  'tracks.progress': 'Progreso',
  'tracks.start': 'Empezar ruta',
  'tracks.continue': 'Continuar',
  'tracks.next': 'Siguiente',
  'tracks.earned': 'Total acumulado',

  'learn.allTracks': 'Todas las rutas',
  'learn.section': 'Sección {n}',
  'learn.trackProgress': 'Progreso de la ruta',
  'learn.you': 'Tú',
  'learn.remaining': 'Te quedan {n} unidades.',
  'learn.done': 'Ruta completada. Muy bien.',
  'learn.unlockNote': 'Las unidades se desbloquean en orden. Termina una para abrir la siguiente — tu progreso se guarda en este navegador.',
  'learn.locked': '{title} — bloqueada',

  'lesson.start': 'Empezar · {n} preguntas',
  'lesson.check': 'Comprobar',
  'lesson.continue': 'Continuar',
  'lesson.correct': '¡Muy bien!',
  'lesson.wrong': 'Casi',
  'lesson.progress': 'Progreso de la lección',
  'lesson.quit': 'Salir de la lección',
  'lesson.back': 'Volver al camino',
  'lesson.complete': '¡Unidad completada!',
  'lesson.perfect': '¡Impecable!',
  'lesson.xpEarned': 'XP ganado',
  'lesson.accuracy': 'Acierto',
  'lesson.again': 'Practicar otra vez',
  'lesson.notFound': 'Lección no encontrada',
  'lesson.backToTracks': 'Volver a las rutas',
  'lesson.true': 'Verdadero',
  'lesson.false': 'Falso',
  'lesson.orderHint': 'Toca los pasos de abajo en el orden correcto',
  'lesson.keyPoints': 'Para recordar',

  'profile.tagline': 'Aprendiendo software, una unidad a la vez',
  'profile.statistics': 'Estadísticas',
  'profile.tracks': 'Rutas',
  'profile.achievements': 'Logros',
  'profile.dataTitle': 'Datos de progreso',
  'profile.dataNote': 'Tu progreso se guarda solo en este navegador — sin cuenta y sin servidor. Borrarlo no se puede deshacer.',
  'profile.reset': 'Borrar progreso',
  'profile.resetConfirm': '¿Borrar todo el progreso? Esto no se puede deshacer.',

  'achievement.first': 'Primeros pasos',
  'achievement.firstDetail': 'Completa tu primera unidad',
  'achievement.streak': 'Imparable',
  'achievement.streakDetail': 'Llega a 7 días seguidos',
  'achievement.scholar': 'Erudito',
  'achievement.scholarDetail': 'Completa las {n} unidades',
  'achievement.power': 'Máquina',
  'achievement.powerDetail': 'Gana 1.000 XP',
}

export const uiStrings: Record<Lang, Record<StringKey, string>> = { en, es }

/** Look up a UI string and substitute `{name}` placeholders. */
export function translate(
  lang: Lang,
  key: StringKey,
  vars?: Record<string, string | number>,
): string {
  const template = uiStrings[lang][key]
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  )
}
