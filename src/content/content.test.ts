import { describe, expect, it } from 'vitest'
import { LANGUAGES, t, type LocalizedText } from './types'
import { tracks, unitsOf } from './index'

/**
 * Content integrity. With ~200 hand-written bilingual questions, these checks
 * catch the mistakes that typecheck fine but break the app: a duplicated id,
 * an answerIndex past the end of the choices, a gap question with no gap, or
 * a Spanish string someone forgot to fill in.
 */
describe('content', () => {
  const allUnits = tracks.flatMap(unitsOf)
  const allQuestions = allUnits.flatMap((u) => u.questions)

  /** Every localized string in the corpus, labelled for a readable failure. */
  function* everyText(): Generator<[label: string, value: LocalizedText]> {
    for (const track of tracks) {
      yield [`track ${track.id} title`, track.title]
      yield [`track ${track.id} subtitle`, track.subtitle]
      for (const section of track.sections) {
        yield [`section ${section.id} title`, section.title]
        yield [`section ${section.id} subtitle`, section.subtitle]
        for (const unit of section.units) {
          yield [`unit ${unit.id} title`, unit.title]
          yield [`unit ${unit.id} summary`, unit.summary]
          yield [`unit ${unit.id} headline`, unit.concept.headline]
          for (const [i, b] of unit.concept.body.entries())
            yield [`unit ${unit.id} body[${i}]`, b]
          for (const [i, p] of unit.concept.keyPoints.entries())
            yield [`unit ${unit.id} keyPoint[${i}]`, p]
          if (unit.concept.example) {
            yield [`unit ${unit.id} example caption`, unit.concept.example.caption]
            yield [`unit ${unit.id} example code`, unit.concept.example.code]
          }
          for (const q of unit.questions) {
            yield [`${q.id} prompt`, q.prompt]
            yield [`${q.id} explanation`, q.explanation]
            if (q.code) yield [`${q.id} code`, q.code]
            if (q.kind === 'boolean') yield [`${q.id} statement`, q.statement]
            if (q.kind === 'choice' || q.kind === 'gap')
              for (const [i, c] of q.choices.entries()) yield [`${q.id} choice[${i}]`, c]
            if (q.kind === 'order')
              for (const [i, item] of q.items.entries()) yield [`${q.id} item[${i}]`, item]
          }
        }
      }
    }
  }
  it('has both tracks with sections and units', () => {
    expect(tracks).toHaveLength(2)
    for (const track of tracks) {
      expect(track.sections.length).toBeGreaterThan(0)
      for (const section of track.sections) {
        expect(section.units.length).toBeGreaterThan(0)
      }
    }
  })

  it('uses unique unit ids within a track', () => {
    for (const track of tracks) {
      const ids = unitsOf(track).map((u) => u.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('uses globally unique question ids', () => {
    const ids = allQuestions.map((q) => q.id)
    const seen = new Set<string>()
    const duplicates = ids.filter((id) => (seen.has(id) ? true : (seen.add(id), false)))
    expect(duplicates).toEqual([])
  })

  it('resolves to a non-empty string in every language', () => {
    const missing: string[] = []
    for (const [label, value] of everyText()) {
      for (const lang of LANGUAGES) {
        if (t(value, lang).trim() === '') missing.push(`${label} (${lang})`)
      }
    }
    expect(missing).toEqual([])
  })

  it('gives every unit a concept card and at least three questions', () => {
    for (const unit of allUnits) {
      expect(unit.concept.body.length, unit.id).toBeGreaterThan(0)
      expect(unit.concept.keyPoints.length, unit.id).toBeGreaterThanOrEqual(3)
      expect(unit.questions.length, unit.id).toBeGreaterThanOrEqual(3)
    }
  })

  it('gives every question a real explanation in both languages', () => {
    for (const q of allQuestions) {
      for (const lang of LANGUAGES) {
        expect(t(q.explanation, lang).length, `${q.id} (${lang})`).toBeGreaterThan(40)
      }
    }
  })

  it('keeps every answerIndex inside its choices', () => {
    for (const q of allQuestions) {
      if (q.kind === 'choice' || q.kind === 'gap') {
        expect(q.choices.length, q.id).toBeGreaterThanOrEqual(2)
        expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0)
        expect(q.answerIndex, q.id).toBeLessThan(q.choices.length)
        // Duplicate options would make two answers equally "correct".
        for (const lang of LANGUAGES) {
          const rendered = q.choices.map((c) => t(c, lang))
          expect(new Set(rendered).size, `${q.id} (${lang})`).toBe(rendered.length)
        }
      }
    }
  })

  it('puts a gap marker in every gap question, in every language', () => {
    for (const q of allQuestions) {
      if (q.kind === 'gap') {
        for (const lang of LANGUAGES) {
          expect(t(q.code, lang), `${q.id} (${lang})`).toContain('___')
        }
      }
    }
  })

  it('gives order questions enough distinct items to be non-trivial', () => {
    for (const q of allQuestions) {
      if (q.kind === 'order') {
        expect(q.items.length, q.id).toBeGreaterThanOrEqual(3)
        for (const lang of LANGUAGES) {
          const rendered = q.items.map((i) => t(i, lang))
          expect(new Set(rendered).size, `${q.id} (${lang})`).toBe(rendered.length)
        }
      }
    }
  })

  it('uses every question kind somewhere', () => {
    const kinds = new Set(allQuestions.map((q) => q.kind))
    expect([...kinds].sort()).toEqual(['boolean', 'choice', 'gap', 'order'])
  })
})
