/**
 * Content model: Track > Section > Unit > (Concept + Questions).
 *
 * Everything is bilingual through one type, `LocalizedText`. The structure —
 * ids, `answerIndex`, question kinds, how many choices there are — is stored
 * ONCE, so a translation physically cannot drift out of sync with the original.
 * Only the words differ per language.
 */

export const LANGUAGES = ['en', 'es'] as const
export type Lang = (typeof LANGUAGES)[number]

/**
 * A string that may or may not need translating.
 *
 * A plain string is language-neutral and shown as-is: code samples, `O(n²)`,
 * `git add`, `403`, `bcrypt`. An object carries one value per language.
 * This keeps the content files readable — only actual prose is doubled.
 */
export type LocalizedText = string | Record<Lang, string>

/** Resolve a localized value for the active language. */
export function t(text: LocalizedText, lang: Lang): string {
  return typeof text === 'string' ? text : text[lang]
}

/** Resolve a list of localized values. */
export function tAll(texts: LocalizedText[], lang: Lang): string[] {
  return texts.map((text) => t(text, lang))
}

/** A short teaching screen shown before a unit's questions. */
export interface Concept {
  /** One-line framing of the idea. */
  headline: LocalizedText
  /** Paragraphs of plain-language explanation. Kept short on purpose. */
  body: LocalizedText[]
  /** The three or four things worth memorising. */
  keyPoints: LocalizedText[]
  /** Optional code or config sample that makes the idea concrete. */
  example?: {
    caption: LocalizedText
    /** Localized only when the sample contains comments worth translating. */
    code: LocalizedText
  }
}

interface QuestionBase {
  id: string
  /** The instruction line. */
  prompt: LocalizedText
  /** Optional code sample rendered above the answer area. */
  code?: LocalizedText
  /** Shown after answering. Always explains *why* — never just "correct". */
  explanation: LocalizedText
}

/** Pick one of several options. */
export interface ChoiceQuestion extends QuestionBase {
  kind: 'choice'
  choices: LocalizedText[]
  answerIndex: number
}

/** Judge a claim. Cheap to read, good for myth-busting. */
export interface BooleanQuestion extends QuestionBase {
  kind: 'boolean'
  /** The claim being judged — rendered large, in place of choices. */
  statement: LocalizedText
  answer: boolean
}

/** Fill the `___` in a code sample from a set of candidate tokens. */
export interface GapQuestion extends QuestionBase {
  kind: 'gap'
  /** Must contain the literal `___` marking the blank. */
  code: LocalizedText
  choices: LocalizedText[]
  answerIndex: number
}

/** Put steps into the right order. */
export interface OrderQuestion extends QuestionBase {
  kind: 'order'
  /** Written in the CORRECT order — the UI shuffles them deterministically. */
  items: LocalizedText[]
}

export type Question =
  | ChoiceQuestion
  | BooleanQuestion
  | GapQuestion
  | OrderQuestion

export type QuestionKind = Question['kind']

export interface Unit {
  id: string
  title: LocalizedText
  icon: string
  /** One line shown under the title on the unit's intro screen. */
  summary: LocalizedText
  concept: Concept
  questions: Question[]
}

export interface Section {
  id: string
  title: LocalizedText
  /** The promise of the section, in one sentence. */
  subtitle: LocalizedText
  units: Unit[]
}

export interface Track {
  id: string
  title: LocalizedText
  subtitle: LocalizedText
  icon: string
  /** Design-system colour token driving the track's accent. */
  accent: 'green' | 'blue'
  sections: Section[]
}
