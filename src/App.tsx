import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { TabSwitcher } from './components/TabSwitcher'
import { InstallBanners } from './components/InstallBanners'
import { CalculatorForm } from './components/CalculatorForm'
import { ResultsDisplay } from './components/ResultsDisplay'
import { TimeCalculatorForm } from './components/TimeCalculatorForm'
import { TimeResultsDisplay } from './components/TimeResultsDisplay'
import { usePalletCalculator } from './hooks/usePalletCalculator'
import { useTimeCalculator } from './hooks/useTimeCalculator'
import { usePwaInstall } from './hooks/usePwaInstall'
import { detectLanguage, translations, type Language } from './i18n'
import type { TabType } from './types/calculator'

export default function App() {
  const [lang, setLang] = useState<Language>(() => detectLanguage())
  const [activeTab, setActiveTab] = useState<TabType>('quantity')

  const {
    total,
    setTotal,
    perPallet,
    setPerPallet,
    rows,
    setRows,
    result: quantityResult
  } = usePalletCalculator(lang)

  const {
    currentTime,
    setCurrentTime,
    targetTime,
    setTargetTime,
    durationHours,
    setDurationHours,
    durationMinutes,
    setDurationMinutes,
    systemTime,
    useCurrentSystemTime,
    result: timeResult
  } = useTimeCalculator(lang)

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

      <TabSwitcher activeTab={activeTab} onChangeTab={setActiveTab} t={t} />

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

      {activeTab === 'quantity' ? (
        <>
          <CalculatorForm
            t={t}
            total={total}
            setTotal={setTotal}
            perPallet={perPallet}
            setPerPallet={setPerPallet}
            rows={rows}
            setRows={setRows}
          />
          <ResultsDisplay t={t} result={quantityResult} />
        </>
      ) : (
        <>
          <TimeCalculatorForm
            t={t}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            targetTime={targetTime}
            setTargetTime={setTargetTime}
            durationHours={durationHours}
            setDurationHours={setDurationHours}
            durationMinutes={durationMinutes}
            setDurationMinutes={setDurationMinutes}
            systemTime={systemTime}
            onUseNow={useCurrentSystemTime}
          />
          <TimeResultsDisplay t={t} result={timeResult} />
        </>
      )}
    </div>
  )
}
