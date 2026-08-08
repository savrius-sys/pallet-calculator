import { useState, useMemo } from 'react'
import { calculateLayerTime } from '../utils/layerCalculator'
import type { Language } from '../i18n'

export function useLayerCalculator(lang: Language) {
  const [rowMinutes, setRowMinutes] = useState<string>('')
  const [rowSeconds, setRowSeconds] = useState<string>('')
  const [rowsPerPallet, setRowsPerPallet] = useState<string>('')

  const result = useMemo(() => {
    return calculateLayerTime(
      {
        rowMinutes,
        rowSeconds,
        rowsPerPallet
      },
      lang
    )
  }, [rowMinutes, rowSeconds, rowsPerPallet, lang])

  return {
    rowMinutes,
    setRowMinutes,
    rowSeconds,
    setRowSeconds,
    rowsPerPallet,
    setRowsPerPallet,
    result
  }
}
