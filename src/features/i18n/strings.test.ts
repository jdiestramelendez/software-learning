import { describe, expect, it } from 'vitest'
import { LANGUAGES, t } from '@/content'
import { translate, uiStrings, type StringKey } from './strings'

describe('ui strings', () => {
  const keys = Object.keys(uiStrings.en) as StringKey[]

  it('translates every key into every language', () => {
    const missing: string[] = []
    for (const lang of LANGUAGES) {
      for (const key of keys) {
        if (!uiStrings[lang][key]?.trim()) missing.push(`${key} (${lang})`)
      }
    }
    expect(missing).toEqual([])
  })

  it('keeps the same placeholders in every translation', () => {
    // A translation that drops {n} silently renders a sentence with a hole in it.
    const placeholders = (text: string) => (text.match(/\{(\w+)\}/g) ?? []).sort()
    const mismatched: string[] = []

    for (const key of keys) {
      const expected = placeholders(uiStrings.en[key])
      for (const lang of LANGUAGES) {
        const actual = placeholders(uiStrings[lang][key])
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          mismatched.push(`${key} (${lang}): ${actual.join()} vs ${expected.join()}`)
        }
      }
    }
    expect(mismatched).toEqual([])
  })

  it('substitutes variables', () => {
    expect(translate('en', 'learn.section', { n: 3 })).toBe('Section 3')
    expect(translate('es', 'learn.section', { n: 3 })).toBe('Sección 3')
  })

  it('leaves an unknown placeholder untouched rather than printing "undefined"', () => {
    expect(translate('en', 'learn.section', {})).toBe('Section {n}')
  })
})

describe('localized content resolution', () => {
  it('passes a plain string through unchanged in both languages', () => {
    for (const lang of LANGUAGES) expect(t('git add', lang)).toBe('git add')
  })

  it('picks the right side of a localized object', () => {
    const value = { en: 'Day streak', es: 'Días seguidos' }
    expect(t(value, 'en')).toBe('Day streak')
    expect(t(value, 'es')).toBe('Días seguidos')
  })
})
