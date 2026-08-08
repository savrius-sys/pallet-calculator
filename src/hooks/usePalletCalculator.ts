import { useState, useMemo } from 'react'
import { calculatePallets } from '../utils/calculator'
import type { Language } from '../i18n'

export function usePalletCalculator(lang: Language) {
  const [total, setTotal] = useState<string>('')
  const [perPallet, setPerPallet] = useState<string>('')
  const [rows, setRows] = useState<string>('')

  const result = useMemo(() => {
    return calculatePallets({ total, perPallet, rows }, lang)
  }, [total, perPallet, rows, lang])

  return {
    total,
    setTotal,
    perPallet,
    setPerPallet,
    rows,
    setRows,
    result
  }
}
