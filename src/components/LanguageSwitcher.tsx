import type { Language } from '../i18n'

interface LanguageSwitcherProps {
  lang: Language
  onChangeLang: (lang: Language) => void
}

export function LanguageSwitcher({ lang, onChangeLang }: LanguageSwitcherProps) {
  return (
    <div className="lang-switcher">
      <button
        type="button"
        className={`lang-btn ${lang === 'uk' ? 'active' : ''}`}
        onClick={() => onChangeLang('uk')}
        title="Українська"
      >
        UA
      </button>
      <button
        type="button"
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => onChangeLang('en')}
        title="English"
      >
        EN
      </button>
    </div>
  )
}
