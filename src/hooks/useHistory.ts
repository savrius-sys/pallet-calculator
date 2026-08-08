import { useState, useEffect, useCallback } from 'react'
import type { HistoryItem, TabType } from '../types/calculator'

const STORAGE_KEY = 'pallet_calc_history'

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
      // Avoid duplicate consecutive entry
      if (prev.length > 0 && prev[0].title === title && prev[0].summary === summary) {
        return prev
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
