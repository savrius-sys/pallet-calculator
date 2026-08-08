import { useState, useEffect, useMemo, useCallback } from 'react'
import type { PalletRecord } from '../types/calculator'

const STORAGE_KEY = 'pallet_registry_db'

export function usePalletRegistry() {
  const [records, setRecords] = useState<PalletRecord[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
    } catch {
      // Ignore quota errors
    }
  }, [records])

  const addRecord = useCallback((data: Omit<PalletRecord, 'id' | 'date'>) => {
    const now = new Date()
    const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    const newRecord: PalletRecord = {
      ...data,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      date: dateStr
    }

    setRecords((prev) => [newRecord, ...prev])
  }, [])

  const updateRecord = useCallback((id: string, data: Partial<Omit<PalletRecord, 'id'>>) => {
    setRecords((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
  }, [])

  const deleteRecord = useCallback((id: string) => {
    setRecords((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const filteredRecords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return records

    return records.filter((r) =>
      r.productName.toLowerCase().includes(q) ||
      r.note.toLowerCase().includes(q)
    )
  }, [records, searchQuery])

  return {
    records,
    setRecords,
    filteredRecords,
    searchQuery,
    setSearchQuery,
    addRecord,
    updateRecord,
    deleteRecord
  }
}
