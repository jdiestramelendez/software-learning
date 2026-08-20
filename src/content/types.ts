/**
 * Content model: Track > Section > Unit > (Concept + Questions).
 *
 * All content is static and typed. The compiler is the first line of review:
 * a question missing its explanation, or an `answerIndex` pointing past the
 * end of `choices`, should never make it into the app. (The runtime checks
 * live in `content.test.ts`.)
 */

/** A short teaching screen shown before a unit's questions. */
export interface Concept {
  /** One-line framing of the idea, e.g. "An index is a shortcut, not more RAM". */
  headline: string
  /** Paragraphs of plain-language explanation. Kept short on purpose. */
  body: string[]
  /** The three or four things worth memorising. */
  keyPoints: string[]
  /** Optional code or config sample that makes the idea concrete. */
  example?: {
    caption: string
    code: string
  }
}

interface QuestionBase {
  id: string
  /** The instruction line. */
  prompt: string
  /** Optional code sample rendered above the answer area. */
  code?: string
  /** Shown after answering. Always explains *why* — never just "correct". */
  explanation: string
}

/** Pick one of several options. */
export interface ChoiceQuestion extends QuestionBase {
  kind: 'choice'
  choices: string[]
  answerIndex: number
}

/** Judge a claim. Cheap to read, good for myth-busting. */
export interface BooleanQuestion extends QuestionBase {
  kind: 'boolean'
  /** The claim being judged — rendered large, in place of choices. */
  statement: string
  answer: boolean
}

/** Fill the `___` in a code sample from a set of candidate tokens. */
export interface GapQuestion extends QuestionBase {
  kind: 'gap'
  /** Must contain the literal `___` marking the blank. */
  code: string
  choices: string[]
  answerIndex: number
}

/** Put steps into the right order. */
export interface OrderQuestion extends QuestionBase {
  kind: 'order'
  /** Written in the CORRECT order — the UI shuffles them deterministically. */
  items: string[]
}

export type Question =
  | ChoiceQuestion
  | BooleanQuestion
  | GapQuestion
  | OrderQuestion

export type QuestionKind = Question['kind']

export interface Unit {
  id: string
  title: string
  icon: string
  /** One line shown under the title on the unit's intro screen. */
  summary: string
  concept: Concept
  questions: Question[]
}

export interface Section {
  id: string
  title: string
  /** The promise of the section, in one sentence. */
  subtitle: string
  units: Unit[]
}

export interface Track {
  id: string
  title: string
  subtitle: string
  icon: string
  /** Design-system colour token driving the track's accent. */
  accent: 'green' | 'blue'
  sections: Section[]
}
