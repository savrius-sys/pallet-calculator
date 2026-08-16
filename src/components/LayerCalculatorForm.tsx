import { useState } from 'react'
import { Stopwatch } from './Stopwatch'
import type { Translations } from '../i18n'

interface LayerCalculatorFormProps {
  t: Translations
  rowMinutes: string
  setRowMinutes: (val: string) => void
  rowSeconds: string
  setRowSeconds: (val: string) => void
  rowsPerPallet: string
  setRowsPerPallet: (val: string) => void
  onStopwatchUsed?: () => void
}

export function LayerCalculatorForm({
  t,
  rowMinutes,
  setRowMinutes,
  rowSeconds,
  setRowSeconds,
  rowsPerPallet,
  setRowsPerPallet,
  onStopwatchUsed
}: LayerCalculatorFormProps) {
  const [showStopwatch, setShowStopwatch] = useState<boolean>(false)

  const handleApplyTime = (mins: number, secs: number) => {
    setRowMinutes(String(mins))
    setRowSeconds(String(secs))
    if (onStopwatchUsed) onStopwatchUsed()
  }

  return (
    <div className="form-section compact-form">
      <div className="grid2">
        <div className="input-group">
          <label htmlFor="rowSeconds">
            <span>{t.rowTimeLabel}</span>
            <button
              type="button"
              className={`stopwatch-toggle-btn ${showStopwatch ? 'active' : ''}`}
              onClick={() => setShowStopwatch((prev) => !prev)}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '2px' }}
              >
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 6 12 12 15 15" />
              </svg>
              <span>⏱</span>
            </button>
          </label>

          <div className="duration-inputs-grid">
            <div className="duration-input-wrapper">
              <input
                type="number"
                id="rowMinutes"
                value={rowMinutes}
                onChange={(e) => setRowMinutes(e.target.value)}
                min="0"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="0"
              />
              <span className="unit-tag">{t.hoursLabel ? 'хв' : 'm'}</span>
            </div>
            <div className="duration-input-wrapper">
              <input
                type="number"
                id="rowSeconds"
                value={rowSeconds}
                onChange={(e) => setRowSeconds(e.target.value)}
                min="0"
                max="59"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="45"
              />
              <span className="unit-tag">сек</span>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="rowsPerPallet">{t.rowsPerPalletLabel}</label>
          <input
            type="number"
            id="rowsPerPallet"
            value={rowsPerPallet}
            onChange={(e) => setRowsPerPallet(e.target.value)}
            min="1"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="напр. 8"
          />
        </div>
      </div>

      {showStopwatch && (
        <Stopwatch t={t} onApplyTime={handleApplyTime} />
      )}
    </div>
  )
}
