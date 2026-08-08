import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { InstallBanners } from './components/InstallBanners'
import { CalculatorForm } from './components/CalculatorForm'
import { ResultsDisplay } from './components/ResultsDisplay'
import { usePalletCalculator } from './hooks/usePalletCalculator'
import { usePwaInstall } from './hooks/usePwaInstall'
import { detectLanguage, translations, type Language } from './i18n'

export default function App() {
  const [lang, setLang] = useState<Language>(() => detectLanguage())

  const {
    total,
    setTotal,
    perPallet,
    setPerPallet,
    rows,
    setRows,
    result
  } = usePalletCalculator(lang)

  const {
    isStandalone,
    isIos,
    deferredPrompt,
    showIosGuide,
    handleInstallClick,
    toggleIosGuide
  } = usePwaInstall()

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = translations[lang].title
  }, [lang])

  const changeLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('app_lang', newLang)
  }

  const t = translations[lang]

  return (
    <div className="wrap">
      <Header t={t} lang={lang} onChangeLang={changeLang} />

      <InstallBanners
        t={t}
        lang={lang}
        isStandalone={isStandalone}
        isIos={isIos}
        deferredPrompt={deferredPrompt}
        showIosGuide={showIosGuide}
        onInstallClick={handleInstallClick}
        onToggleIosGuide={toggleIosGuide}
      />

      <CalculatorForm
        t={t}
        total={total}
        setTotal={setTotal}
        perPallet={perPallet}
        setPerPallet={setPerPallet}
        rows={rows}
        setRows={setRows}
      />

      <ResultsDisplay t={t} result={result} />
    </div>
  )
}
