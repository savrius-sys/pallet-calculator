import { useState, useEffect } from 'react'
import { detectLanguage, translations, type Language } from './i18n'

function fmt(n: number, lang: Language): string {
  if (isNaN(n) || !isFinite(n)) return '-'
  const locale = lang === 'uk' ? 'uk-UA' : 'en-US'
  return new Intl.NumberFormat(locale).format(Math.round(n))
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => detectLanguage())
  const [total, setTotal] = useState<string>('')
  const [perPallet, setPerPallet] = useState<string>('')
  const [rows, setRows] = useState<string>('')

  // PWA Install state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false)

  const [isStandalone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).standalone === true
    )
  })

  const [isIos] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = translations[lang].title
  }, [lang])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstall = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [])

  const changeLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('app_lang', newLang)
  }

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null)
      }
    }
  }

  const t = translations[lang]

  const totalNum = parseFloat(total)
  const perPalletNum = parseFloat(perPallet)
  const rowsNum = parseFloat(rows)

  const hasInputs =
    total.trim() !== '' &&
    perPallet.trim() !== '' &&
    !isNaN(totalNum) &&
    !isNaN(perPalletNum) &&
    perPalletNum > 0

  let fullPalletsText = '-'
  let lastPalletText = '-'
  let withPartialText = '-'
  let perRowText = '-'
  let rowsToOpenText = '-'
  let breakdownNoteText = ''

  let remainder = 0

  if (hasInputs) {
    const fullPallets = Math.floor(totalNum / perPalletNum)
    remainder = totalNum - fullPallets * perPalletNum
    const withPartial = remainder > 0 ? fullPallets + 1 : fullPallets

    fullPalletsText = fmt(fullPallets, lang)
    withPartialText = fmt(withPartial, lang)
    lastPalletText =
      remainder > 0
        ? `${fmt(remainder, lang)} ${t.bottlesSuffix}`
        : t.lastPalletExact

    if (remainder > 0) {
      breakdownNoteText = t.totalBreakdownPartial(
        fmt(fullPallets, lang),
        fmt(remainder, lang),
        t.bottlesSuffix
      )
    } else {
      breakdownNoteText = t.totalBreakdownExact(fmt(fullPallets, lang))
    }
  }

  const hasRows =
    hasInputs && rows.trim() !== '' && !isNaN(rowsNum) && rowsNum > 0

  if (hasRows) {
    const perRow = perPalletNum / rowsNum
    const rowsToOpen = remainder > 0 ? Math.ceil(remainder / perRow) : 0
    perRowText = fmt(perRow, lang)
    rowsToOpenText =
      remainder > 0
        ? `${fmt(rowsToOpen, lang)} ${t.rowsToOpenOf} ${fmt(rowsNum, lang)}`
        : '0'
  }

  return (
    <div className="wrap">
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
        <div className="lang-switcher">
          <button
            type="button"
            className={`lang-btn ${lang === 'uk' ? 'active' : ''}`}
            onClick={() => changeLang('uk')}
            title="Українська"
          >
            UA
          </button>
          <button
            type="button"
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => changeLang('en')}
            title="English"
          >
            EN
          </button>
        </div>
      </div>

      {!isStandalone && deferredPrompt && (
        <div className="install-banner">
          <div className="install-text">
            <strong>{t.installApp}</strong>
            <span>{t.installSubtitle}</span>
          </div>
          <button type="button" className="install-btn" onClick={handleInstallClick}>
            {t.installBtn}
          </button>
        </div>
      )}

      {!isStandalone && isIos && (
        <div className="ios-install-banner">
          <button
            type="button"
            className="ios-guide-toggle"
            onClick={() => setShowIosGuide(!showIosGuide)}
          >
            <span>{t.iosGuideTitle}</span>
            <span>{showIosGuide ? '▲' : '▼'}</span>
          </button>
          {showIosGuide && (
            <div className="ios-guide-content">
              {lang === 'uk' ? (
                <>
                  Натисніть <strong>{t.iosGuideShareText}</strong> (іконка <span className="share-icon">⎋</span> або <span className="share-icon">⤓</span>) внизу Safari та виберіть <strong>{t.iosGuideActionText}</strong>.
                </>
              ) : (
                <>
                  Tap <strong>{t.iosGuideShareText}</strong> (icon <span className="share-icon">⎋</span> or <span className="share-icon">⤓</span>) at the bottom of Safari and select <strong>{t.iosGuideActionText}</strong>.
                </>
              )}
            </div>
          )}
        </div>
      )}

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

        <div className="preset-buttons">
          <button
            type="button"
            className="preset-btn"
            onClick={() => {
              setTotal('10000')
            }}
          >
            10,000 {t.presetUnit}
          </button>
          <button
            type="button"
            className="preset-btn"
            onClick={() => {
              setTotal('20000')
            }}
          >
            20,000 {t.presetUnit}
          </button>
          <button
            type="button"
            className="preset-btn"
            onClick={() => {
              setTotal('50000')
            }}
          >
            50,000 {t.presetUnit}
          </button>
        </div>
      </div>

      <div className="results-section">
        <div className="card stack">
          <p className="label">{t.fullPallets}</p>
          <p className="value" id="fullPallets">
            {fullPalletsText}
          </p>
        </div>

        <div className="card accent stack">
          <p className="label">{t.lastPallet}</p>
          <p className="value" id="lastPallet">
            {lastPalletText}
          </p>
        </div>

        {hasRows && (
          <div className="grid2" id="rowsBlock">
            <div className="card">
              <p className="label">{t.perRow}</p>
              <p className="value" id="perRow">
                {perRowText}
              </p>
            </div>
            <div className="card accent">
              <p className="label">{t.rowsToOpen}</p>
              <p className="value" id="rowsToOpen">
                {rowsToOpenText}
              </p>
            </div>
          </div>
        )}

        <div className="card">
          <p className="label">{t.withPartial}</p>
          <p className="value" id="withPartial">
            {withPartialText}
          </p>
          {hasInputs && <p className="card-note">{breakdownNoteText}</p>}
        </div>
      </div>
    </div>
  )
}
