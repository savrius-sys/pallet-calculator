export interface CalculationInputs {
  total: string
  perPallet: string
  rows: string
}

export interface CalculationResult {
  hasInputs: boolean
  hasRows: boolean
  fullPallets: number
  remainder: number
  withPartial: number
  perRow: number
  rowsToOpen: number
  fullPalletsText: string
  lastPalletText: string
  withPartialText: string
  perRowText: string
  rowsToOpenText: string
  breakdownNoteText: string
}

export interface PresetOption {
  label: string
  value: string
}
