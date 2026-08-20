import { useContext } from 'react'
import { LanguageContext, type LanguageApi } from './LanguageContext'

export function useLanguage(): LanguageApi {
  const value = useContext(LanguageContext)
  if (!value) {
    throw new Error('useLanguage must be used inside a <LanguageProvider>')
  }
  return value
}
