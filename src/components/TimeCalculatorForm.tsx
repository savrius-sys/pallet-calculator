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
    <div className="form-section">
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

      <div className="input-group">
        <label htmlFor="targetTime">{t.targetTimeLabel}</label>
        <input
          type="time"
          id="targetTime"
          value={targetTime}
          onChange={(e) => setTargetTime(e.target.value)}
          placeholder={t.targetTimePlaceholder}
        />
      </div>

      <div className="input-group">
        <label htmlFor="currentTime">
          <span>{t.currentTimeLabel}</span>
          <span className="label-hint">
            {isAutoCurrentTime ? `${t.currentTimeAuto} (${systemTime})` : ''}
          </span>
        </label>
        <div className="time-input-wrapper">
          <input
            type="time"
            id="currentTime"
            value={currentTime}
            onChange={(e) => setCurrentTime(e.target.value)}
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
  )
}
