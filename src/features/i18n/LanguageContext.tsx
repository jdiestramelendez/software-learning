import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { LANGUAGES, t, type Lang, type LocalizedText } from '@/content'
import { translate, type StringKey } from './strings'

const KEY = 'bitwise.lang.v1'

export interface LanguageApi {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Look up a UI string, with optional `{name}` substitution. */
  ui: (key: StringKey, vars?: Record<string, string | number>) => string
  /** Resolve a piece of localized course content. */
  text: (value: LocalizedText) => string
}

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageApi | null>(null)

function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value)
}

/** Stored choice first, then the browser's preference, then English. */
function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(KEY)
    if (isLang(stored)) return stored
  } catch {
    // Storage unavailable — fall through to the browser preference.
  }
  const preferred = navigator.languages ?? [navigator.language]
  for (const tag of preferred) {
    const base = tag.split('-')[0]
    if (isLang(base)) return base
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window === 'undefined' ? 'en' : initialLang(),
  )

  // Keep <html lang> honest — screen readers and translation tools read it.
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      // Preference just won't persist; the session still works.
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])

  const value = useMemo<LanguageApi>(
    () => ({
      lang,
      setLang,
      ui: (key, vars) => translate(lang, key, vars),
      text: (value: LocalizedText) => t(value, lang),
    }),
    [lang, setLang],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}
