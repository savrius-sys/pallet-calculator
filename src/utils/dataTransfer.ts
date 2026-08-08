import type { PalletRecord, HistoryItem } from '../types/calculator'

export function exportAppData(records: PalletRecord[], history: HistoryItem[]) {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    records,
    history
  }

  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const dateStr = new Date().toISOString().slice(0, 10)
  const a = document.createElement('a')
  a.href = url
  a.download = `pallet-calculator-backup-${dateStr}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function importAppData(
  file: File,
  onSuccess: (records: PalletRecord[], history: HistoryItem[]) => void,
  onError: (errorMsg: string) => void
) {
  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const content = e.target?.result as string
      const parsed = JSON.parse(content)

      const records = Array.isArray(parsed.records) ? parsed.records : []
      const history = Array.isArray(parsed.history) ? parsed.history : []

      onSuccess(records, history)
    } catch {
      onError('Не вдалося зчитати файл backup. Перевірте формат JSON.')
    }
  }

  reader.onerror = () => {
    onError('Помилка читання файлу.')
  }

  reader.readAsText(file)
}
