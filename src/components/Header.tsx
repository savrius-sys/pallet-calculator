import { LanguageSwitcher } from './LanguageSwitcher'
import type { Language, Translations } from '../i18n'

interface HeaderProps {
  t: Translations
  lang: Language
  onChangeLang: (lang: Language) => void
}

export function Header({ t, lang, onChangeLang }: HeaderProps) {
  return (
    <div className="header-container">
      <div className="header-icon">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      </div>
      <div className="header-title-box">
        <h1>{t.title}</h1>
        <div className="subtitle">{t.subtitle}</div>
      </div>
      <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
    </div>
  )
}
