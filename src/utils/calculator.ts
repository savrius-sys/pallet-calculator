import type { CalculationInputs, CalculationResult } from '../types/calculator'
import { translations, type Language } from '../i18n'

export function fmt(n: number, lang: Language): string {
  if (isNaN(n) || !isFinite(n)) return '-'
  const locale = lang === 'uk' ? 'uk-UA' : 'en-US'
  return new Intl.NumberFormat(locale).format(Math.round(n))
}

export function calculatePallets(
  inputs: CalculationInputs,
  lang: Language
): CalculationResult {
  const { total, perPallet, rows } = inputs
  const t = translations[lang]

  const totalNum = parseFloat(total)
  const perPalletNum = parseFloat(perPallet)
  const rowsNum = parseFloat(rows)

  const hasInputs =
    total.trim() !== '' &&
    perPallet.trim() !== '' &&
    !isNaN(totalNum) &&
    !isNaN(perPalletNum) &&
    perPalletNum > 0

  let fullPallets = 0
  let remainder = 0
  let withPartial = 0
  let perRow = 0
  let rowsToOpen = 0

  let fullPalletsText = '-'
  let lastPalletText = '-'
  let withPartialText = '-'
  let perRowText = '-'
  let rowsToOpenText = '-'
  let breakdownNoteText = ''

  if (hasInputs) {
    fullPallets = Math.floor(totalNum / perPalletNum)
    remainder = totalNum - fullPallets * perPalletNum
    withPartial = remainder > 0 ? fullPallets + 1 : fullPallets

    fullPalletsText = fmt(fullPallets, lang)
    withPartialText = fmt(withPartial, lang)
    lastPalletText =
      remainder > 0
        ? `${fmt(remainder, lang)} ${t.bottlesSuffix}`
        : t.lastPalletExact

    if (remainder > 0) {
      breakdownNoteText = t.totalBreakdownPartial(
        fmt(fullPallets, lang),
        fmt(remainder, lang),
        t.bottlesSuffix
      )
    } else {
      breakdownNoteText = t.totalBreakdownExact(fmt(fullPallets, lang))
    }
  }

  const hasRows =
    hasInputs && rows.trim() !== '' && !isNaN(rowsNum) && rowsNum > 0

  if (hasRows) {
    perRow = perPalletNum / rowsNum
    rowsToOpen = remainder > 0 ? Math.ceil(remainder / perRow) : 0
    perRowText = fmt(perRow, lang)
    rowsToOpenText =
      remainder > 0
        ? `${fmt(rowsToOpen, lang)} ${t.rowsToOpenOf} ${fmt(rowsNum, lang)}`
        : '0'
  }

  return {
    hasInputs,
    hasRows,
    fullPallets,
    remainder,
    withPartial,
    perRow,
    rowsToOpen,
    fullPalletsText,
    lastPalletText,
    withPartialText,
    perRowText,
    rowsToOpenText,
    breakdownNoteText
  }
}
