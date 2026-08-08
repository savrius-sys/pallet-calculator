import { PresetButtons } from './PresetButtons'
import type { Translations } from '../i18n'

interface CalculatorFormProps {
  t: Translations
  total: string
  setTotal: (val: string) => void
  perPallet: string
  setPerPallet: (val: string) => void
  rows: string
  setRows: (val: string) => void
}

export function CalculatorForm({
  t,
  total,
  setTotal,
  perPallet,
  setPerPallet,
  rows,
  setRows
}: CalculatorFormProps) {
  return (
    <div className="form-section">
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

      <PresetButtons t={t} onSelectPreset={setTotal} />
    </div>
  )
}
