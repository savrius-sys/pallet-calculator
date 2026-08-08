import { useState } from 'react'
import { PresetButtons } from './PresetButtons'
import { RegistryPickerModal } from './RegistryPickerModal'
import type { Translations } from '../i18n'
import type { PalletRecord } from '../types/calculator'

interface CalculatorFormProps {
  t: Translations
  total: string
  setTotal: (val: string) => void
  perPallet: string
  setPerPallet: (val: string) => void
  rows: string
  setRows: (val: string) => void
  registryRecords: PalletRecord[]
}

export function CalculatorForm({
  t,
  total,
  setTotal,
  perPallet,
  setPerPallet,
  rows,
  setRows,
  registryRecords
}: CalculatorFormProps) {
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false)

  const handleSelectRecord = (record: PalletRecord) => {
    if (record.quantity) setPerPallet(record.quantity)
    if (record.rows) setRows(record.rows)
  }

  return (
    <div className="form-section compact-form">
      {/* Big Thumb-Friendly Button to Pick from Registry */}
      <button
        type="button"
        className="big-registry-select-btn"
        onClick={() => setIsPickerOpen(true)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
        <span>{t.selectFromRegistryBtn}</span>
      </button>

      <div className="grid2">
        <div className="input-group">
          <label htmlFor="total">{t.totalLabel}</label>
          <input
            type="number"
            id="total"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            min="0"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder={t.totalPlaceholder}
          />
        </div>

        <div className="input-group">
          <label htmlFor="perPallet">{t.perPalletLabel}</label>
          <input
            type="number"
            id="perPallet"
            value={perPallet}
            onChange={(e) => setPerPallet(e.target.value)}
            min="1"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder={t.perPalletPlaceholder}
          />
        </div>
      </div>

      <div className="grid2-row">
        <div className="input-group">
          <label htmlFor="rows">
            <span>{t.rowsLabel}</span>
            <span className="label-hint">{t.optionalHint}</span>
          </label>
          <input
            type="number"
            id="rows"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            min="1"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder={t.rowsPlaceholder}
          />
        </div>

        <div className="input-group presets-inline">
          <label>Швидкий вибір</label>
          <PresetButtons t={t} onSelectPreset={setTotal} />
        </div>
      </div>

      <RegistryPickerModal
        t={t}
        isOpen={isPickerOpen}
        records={registryRecords}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleSelectRecord}
      />
    </div>
  )
}
