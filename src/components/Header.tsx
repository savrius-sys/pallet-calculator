import { LanguageSwitcher } from './LanguageSwitcher'
import type { Language, Translations } from '../i18n'

interface HeaderProps {
  t: Translations
  lang: Language
  onChangeLang: (lang: Language) => void
  historyCount: number
  onOpenHistory: () => void
}

export function Header({
  t,
  lang,
  onChangeLang,
  historyCount,
  onOpenHistory
}: HeaderProps) {
  return (
    <div className="header-container compact-top-bar">
      <div className="header-actions">
        <button
          type="button"
          className="history-btn"
          onClick={onOpenHistory}
          title={t.historyTitle}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {historyCount > 0 && <span className="history-badge">{historyCount}</span>}
        </button>
        <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
      </div>
    </div>
  )
}
