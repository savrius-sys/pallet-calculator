import type { LayerCalculatorInputs, LayerCalculatorResult } from '../types/calculator'
import { translations, type Language } from '../i18n'

function formatSecToMS(totalSec: number, lang: Language): string {
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  const t = translations[lang]

  if (m > 0 && s > 0) {
    return `${m} ${t.minutesLabel} ${s} сек`
  }
  if (m > 0) {
    return `${m} ${t.minutesLabel}`
  }
  return `${s} сек`
}

export function calculateLayerTime(
  inputs: LayerCalculatorInputs,
  lang: Language
): LayerCalculatorResult {
  const t = translations[lang]

  const minsNum = parseFloat(inputs.rowMinutes) || 0
  const secsNum = parseFloat(inputs.rowSeconds) || 0
  const oneRowSec = minsNum * 60 + secsNum

  const rowsNum = parseFloat(inputs.rowsPerPallet)
  const hasInputs = oneRowSec > 0 && !isNaN(rowsNum) && rowsNum > 0

  if (!hasInputs) {
    return {
      hasInputs: false,
      timePerPalletText: '-',
      breakdownNoteText: ''
    }
  }

  const onePalletSec = oneRowSec * rowsNum
  const timePerPalletText = formatSecToMS(onePalletSec, lang)
  const oneRowStr = formatSecToMS(oneRowSec, lang)
  const breakdownNoteText = t.layerBreakdownNote(rowsNum, oneRowStr)

  return {
    hasInputs: true,
    timePerPalletText,
    breakdownNoteText
  }
}
