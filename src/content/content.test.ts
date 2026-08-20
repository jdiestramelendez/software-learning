import { describe, expect, it } from 'vitest'
import { tracks, unitsOf } from './index'

/**
 * Content integrity. With ~200 hand-written questions, these checks catch the
 * mistakes that typecheck fine but break the app: a duplicated id, an
 * answerIndex past the end of the choices, a gap question with no gap.
 */
describe('content', () => {
  const allUnits = tracks.flatMap(unitsOf)
  const allQuestions = allUnits.flatMap((u) => u.questions)

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

  it('gives every unit a concept card and at least three questions', () => {
    for (const unit of allUnits) {
      expect(unit.concept.headline, unit.id).toBeTruthy()
      expect(unit.concept.body.length, unit.id).toBeGreaterThan(0)
      expect(unit.concept.keyPoints.length, unit.id).toBeGreaterThanOrEqual(3)
      expect(unit.questions.length, unit.id).toBeGreaterThanOrEqual(3)
    }
  })

  it('gives every question a real explanation', () => {
    for (const q of allQuestions) {
      expect(q.explanation.length, q.id).toBeGreaterThan(40)
    }
  })

  it('keeps every answerIndex inside its choices', () => {
    for (const q of allQuestions) {
      if (q.kind === 'choice' || q.kind === 'gap') {
        expect(q.choices.length, q.id).toBeGreaterThanOrEqual(2)
        expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0)
        expect(q.answerIndex, q.id).toBeLessThan(q.choices.length)
        expect(new Set(q.choices).size, q.id).toBe(q.choices.length)
      }
    }
  })

  it('puts a gap marker in every gap question', () => {
    for (const q of allQuestions) {
      if (q.kind === 'gap') expect(q.code, q.id).toContain('___')
    }
  })

  it('gives order questions enough items to be non-trivial', () => {
    for (const q of allQuestions) {
      if (q.kind === 'order') {
        expect(q.items.length, q.id).toBeGreaterThanOrEqual(3)
        expect(new Set(q.items).size, q.id).toBe(q.items.length)
      }
    }
  })

  it('uses every question kind somewhere', () => {
    const kinds = new Set(allQuestions.map((q) => q.kind))
    expect([...kinds].sort()).toEqual(['boolean', 'choice', 'gap', 'order'])
  })
})
