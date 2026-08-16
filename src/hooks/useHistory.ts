import { useState, useEffect, useCallback } from 'react'
import type { HistoryItem, TabType } from '../types/calculator'

const STORAGE_KEY = 'pallet_calc_history'

function isSameInputs(
  a: HistoryItem['inputs'] | undefined,
  b: HistoryItem['inputs'] | undefined
): boolean {
  if (!a || !b) return false
  const keysA = Object.keys(a) as (keyof HistoryItem['inputs'])[]
  const keysB = Object.keys(b) as (keyof HistoryItem['inputs'])[]
  if (keysA.length !== keysB.length) return false
  return keysA.every((key) => a[key] === b[key])
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch {
      // Ignore storage quota errors
    }
  }, [history])

  const addHistoryEntry = useCallback((
    tab: TabType,
    title: string,
    summary: string,
    inputs: HistoryItem['inputs']
  ) => {
    if (!title || !summary) return

    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const mins = String(now.getMinutes()).padStart(2, '0')
    const timestamp = `${hours}:${mins}`

    setHistory((prev) => {
      const lastTabEntry = prev.find((item) => item.tab === tab)
      if (lastTabEntry && isSameInputs(lastTabEntry.inputs, inputs)) {
        if (lastTabEntry.title === title && lastTabEntry.summary === summary) {
          return prev
        }
        return prev.map((item) =>
          item.id === lastTabEntry.id
            ? { ...item, timestamp, title, summary }
            : item
        )
      }

      const newItem: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp,
        tab,
        title,
        summary,
        inputs
      }

      return [newItem, ...prev]
    })
  }, [])

  const deleteHistoryItem = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return {
    history,
    setHistory,
    addHistoryEntry,
    deleteHistoryItem,
    clearHistory
  }
}
