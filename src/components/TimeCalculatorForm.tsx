import { TimeInput24 } from './TimeInput24'
import type { Translations } from '../i18n'

interface TimeCalculatorFormProps {
  t: Translations
  currentTime: string
  setCurrentTime: (val: string) => void
  targetTime: string
  setTargetTime: (val: string) => void
  durationHours: string
  setDurationHours: (val: string) => void
  durationMinutes: string
  setDurationMinutes: (val: string) => void
  systemTime: string
  onUseNow: () => void
}

export function TimeCalculatorForm({
  t,
  currentTime,
  setCurrentTime,
  targetTime,
  setTargetTime,
  durationHours,
  setDurationHours,
  durationMinutes,
  setDurationMinutes,
  systemTime,
  onUseNow
}: TimeCalculatorFormProps) {
  const isAutoCurrentTime = currentTime.trim() === ''

  return (
    <div className="form-section compact-form">
      <div className="input-group">
        <label htmlFor="durationHours">
          <span>{t.palletDurationLabel}</span>
        </label>
        <div className="duration-inputs-grid">
          <div className="duration-input-wrapper">
            <input
              type="number"
              id="durationHours"
              value={durationHours}
              onChange={(e) => setDurationHours(e.target.value)}
              min="0"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={t.hoursPlaceholder}
            />
            <span className="unit-tag">{t.hoursLabel}</span>
          </div>
          <div className="duration-input-wrapper">
            <input
              type="number"
              id="durationMinutes"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              min="0"
              max="59"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={t.minutesPlaceholder}
            />
            <span className="unit-tag">{t.minutesLabel}</span>
          </div>
        </div>
      </div>

      <div className="grid2">
        <div className="input-group">
          <label htmlFor="targetTime">{t.targetTimeLabel}</label>
          <TimeInput24
            id="targetTime"
            value={targetTime}
            onChange={setTargetTime}
            placeholder={t.targetTimePlaceholder}
          />
        </div>

        <div className="input-group">
          <label htmlFor="currentTime">
            <span>{t.currentTimeLabel}</span>
            <span className="label-hint">
              {isAutoCurrentTime ? `(${systemTime})` : ''}
            </span>
          </label>
          <div className="time-input-wrapper">
            <TimeInput24
              id="currentTime"
              value={currentTime}
              onChange={setCurrentTime}
              placeholder={systemTime}
            />
            <button
              type="button"
              className="now-btn"
              onClick={onUseNow}
              title={t.useCurrentTimeBtn}
            >
              {t.useCurrentTimeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
