import type { TimeCalculatorInputs, TimeCalculatorResult } from '../types/calculator'
import { translations, type Language } from '../i18n'

export function getCurrentTimeString(): string {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function parseTimeToMinutes(timeStr: string): number | null {
  if (!timeStr || !timeStr.includes(':')) return null
  const [hStr, mStr] = timeStr.split(':')
  const h = parseInt(hStr, 10)
  const m = parseInt(mStr, 10)
  if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) return null
  return h * 60 + m
}

function formatMinutesToHM(totalMins: number, lang: Language): string {
  const h = Math.floor(totalMins / 60)
  const m = totalMins % 60
  const t = translations[lang]

  if (h > 0 && m > 0) {
    return `${h} ${t.hoursLabel} ${m} ${t.minutesLabel}`
  }
  if (h > 0) {
    return `${h} ${t.hoursLabel}`
  }
  return `${m} ${t.minutesLabel}`
}

function formatMinutesToTimeString(totalMins: number): string {
  const normalized = ((totalMins % 1440) + 1440) % 1440
  const h = String(Math.floor(normalized / 60)).padStart(2, '0')
  const m = String(normalized % 60).padStart(2, '0')
  return `${h}:${m}`
}

export function calculateTimePallets(
  inputs: TimeCalculatorInputs,
  lang: Language
): TimeCalculatorResult {
  const t = translations[lang]

  const effectiveCurrentTime = inputs.currentTime.trim() !== ''
    ? inputs.currentTime
    : getCurrentTimeString()

  const startMins = parseTimeToMinutes(effectiveCurrentTime)
  const endMins = parseTimeToMinutes(inputs.targetTime)

  const hoursNum = parseFloat(inputs.durationHours) || 0
  const minsNum = parseFloat(inputs.durationMinutes) || 0
  const durationMins = hoursNum * 60 + minsNum

  const hasInputs =
    inputs.targetTime.trim() !== '' &&
    durationMins > 0 &&
    startMins !== null &&
    endMins !== null

  if (!hasInputs || startMins === null || endMins === null || durationMins <= 0) {
    return {
      hasInputs: false,
      isValid: false,
      timeRemainingFormatted: '-',
      palletsNeeded: 0,
      fullPallets: 0,
      hasPartial: false,
      partialPercentage: 0,
      finishTimeFormatted: '-',
      summaryNoteText: '',
      palletsNeededText: '-'
    }
  }

  let timeRemainingMins = endMins - startMins
  if (timeRemainingMins <= 0) {
    timeRemainingMins += 1440 // Overnight shift (e.g. 22:00 to 06:00)
  }

  const palletsNeeded = Math.ceil(timeRemainingMins / durationMins)
  const fullPallets = Math.floor(timeRemainingMins / durationMins)
  const remainderMins = timeRemainingMins - fullPallets * durationMins
  const hasPartial = remainderMins > 0

  const totalCoverageMins = palletsNeeded * durationMins
  const finishMins = startMins + totalCoverageMins
  const finishTimeFormatted = formatMinutesToTimeString(finishMins)
  const timeRemainingFormatted = formatMinutesToHM(timeRemainingMins, lang)

  const summaryNoteText = hasPartial
    ? t.timeBreakdownNote(fullPallets, remainderMins)
    : t.timeExactNote(fullPallets)

  return {
    hasInputs: true,
    isValid: true,
    timeRemainingFormatted,
    palletsNeeded,
    fullPallets,
    hasPartial,
    partialPercentage: Math.round((remainderMins / durationMins) * 100),
    finishTimeFormatted,
    summaryNoteText,
    palletsNeededText: String(palletsNeeded)
  }
}
