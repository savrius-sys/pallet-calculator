import { ResultCard } from './ResultCard'
import type { Translations } from '../i18n'
import type { LayerCalculatorResult } from '../types/calculator'

interface LayerResultsDisplayProps {
  t: Translations
  result: LayerCalculatorResult
}

export function LayerResultsDisplay({ t, result }: LayerResultsDisplayProps) {
  const {
    hasInputs,
    timePerPalletText,
    breakdownNoteText
  } = result

  return (
    <div className="results-section">
      <ResultCard
        label={t.timePerPalletCard}
        value={timePerPalletText}
        id="timePerPallet"
        accent
        note={hasInputs ? breakdownNoteText : undefined}
      />
    </div>
  )
}
