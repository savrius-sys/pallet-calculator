export type TabType = 'quantity' | 'time' | 'layer' | 'crud' | 'stats'

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

export interface TimeCalculatorInputs {
  currentTime: string // HH:MM
  targetTime: string  // HH:MM
  durationHours: string
  durationMinutes: string
}

export interface TimeCalculatorResult {
  hasInputs: boolean
  isValid: boolean
  timeRemainingFormatted: string
  palletsNeeded: number
  fullPallets: number
  hasPartial: boolean
  partialPercentage: number
  finishTimeFormatted: string
  summaryNoteText: string
  palletsNeededText: string
}

export interface LayerCalculatorInputs {
  rowMinutes: string
  rowSeconds: string
  rowsPerPallet: string
}

export interface LayerCalculatorResult {
  hasInputs: boolean
  timePerPalletText: string
  breakdownNoteText: string
}

export interface PalletRecord {
  id: string
  productName: string
  rows: string
  quantity: string
  palletTime: string
  note: string
  date: string
}

export interface HistoryItem {
  id: string
  timestamp: string
  tab: TabType
  title: string
  summary: string
  inputs: {
    total?: string
    perPallet?: string
    rows?: string
    currentTime?: string
    targetTime?: string
    durationHours?: string
    durationMinutes?: string
    rowMinutes?: string
    rowSeconds?: string
    rowsPerPallet?: string
  }
}

export interface PresetOption {
  label: string
  value: string
}
