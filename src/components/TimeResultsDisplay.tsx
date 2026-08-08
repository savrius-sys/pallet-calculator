import { ResultCard } from './ResultCard'
import type { Translations } from '../i18n'
import type { TimeCalculatorResult } from '../types/calculator'

interface TimeResultsDisplayProps {
  t: Translations
  result: TimeCalculatorResult
}

export function TimeResultsDisplay({ t, result }: TimeResultsDisplayProps) {
  const {
    hasInputs,
    timeRemainingFormatted,
    palletsNeededText,
    finishTimeFormatted,
    summaryNoteText
  } = result

  return (
    <div className="results-section">
      <ResultCard
        label={t.timeRemainingCard}
        value={timeRemainingFormatted}
        id="timeRemaining"
        stack
      />

      <ResultCard
        label={t.palletsNeededCard}
        value={palletsNeededText}
        id="palletsNeeded"
        accent
        note={hasInputs ? summaryNoteText : undefined}
        stack
      />

      <ResultCard
        label={t.finishTimeCard}
        value={finishTimeFormatted}
        id="finishTime"
      />
    </div>
  )
}
