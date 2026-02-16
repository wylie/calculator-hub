import { useEffect, useState } from 'react'

export default function useStickyState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const stored = window.localStorage.getItem(key)
      if (stored === null) {
        return initialValue
      }
      return JSON.parse(stored) as T
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage errors (quota, privacy mode, etc.)
    }
  }, [key, value])

  return [value, setValue] as const
}
