import { ResultCard } from './ResultCard'
import type { Translations } from '../i18n'
import type { CalculationResult } from '../types/calculator'

interface ResultsDisplayProps {
  t: Translations
  result: CalculationResult
}

export function ResultsDisplay({ t, result }: ResultsDisplayProps) {
  const {
    hasInputs,
    hasRows,
    fullPalletsText,
    lastPalletText,
    withPartialText,
    perRowText,
    rowsToOpenText,
    breakdownNoteText
  } = result

  return (
    <div className="results-section">
      <ResultCard
        label={t.fullPallets}
        value={fullPalletsText}
        id="fullPallets"
        stack
      />

      <ResultCard
        label={t.lastPallet}
        value={lastPalletText}
        id="lastPallet"
        accent
        stack
      />

      {hasRows && (
        <div className="grid2" id="rowsBlock">
          <ResultCard
            label={t.perRow}
            value={perRowText}
            id="perRow"
          />
          <ResultCard
            label={t.rowsToOpen}
            value={rowsToOpenText}
            id="rowsToOpen"
            accent
          />
        </div>
      )}

      <ResultCard
        label={t.withPartial}
        value={withPartialText}
        id="withPartial"
        note={hasInputs ? breakdownNoteText : undefined}
      />
    </div>
  )
}
