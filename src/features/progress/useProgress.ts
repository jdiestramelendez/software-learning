import { useContext } from 'react'
import { ProgressContext, type ProgressApi } from './ProgressContext'

export function useProgress(): ProgressApi {
  const value = useContext(ProgressContext)
  if (!value) {
    throw new Error('useProgress must be used inside a <ProgressProvider>')
  }
  return value
}
