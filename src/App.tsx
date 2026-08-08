import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { TabSwitcher } from './components/TabSwitcher'
import { InstallBanners } from './components/InstallBanners'
import { CalculatorForm } from './components/CalculatorForm'
import { ResultsDisplay } from './components/ResultsDisplay'
import { TimeCalculatorForm } from './components/TimeCalculatorForm'
import { TimeResultsDisplay } from './components/TimeResultsDisplay'
import { LayerCalculatorForm } from './components/LayerCalculatorForm'
import { LayerResultsDisplay } from './components/LayerResultsDisplay'
import { PalletRegistryView } from './components/PalletRegistryView'
import { StatsView } from './components/StatsView'
import { HistoryModal } from './components/HistoryModal'
import { PrivacyFooter } from './components/PrivacyFooter'
import { usePalletCalculator } from './hooks/usePalletCalculator'
import { useTimeCalculator } from './hooks/useTimeCalculator'
import { useLayerCalculator } from './hooks/useLayerCalculator'
import { usePalletRegistry } from './hooks/usePalletRegistry'
import { usePwaInstall } from './hooks/usePwaInstall'
import { useHistory } from './hooks/useHistory'
import { exportAppData, importAppData } from './utils/dataTransfer'
import { detectLanguage, translations, type Language } from './i18n'
import type { TabType, HistoryItem } from './types/calculator'

export default function App() {
  const [lang, setLang] = useState<Language>(() => detectLanguage())
  const [activeTab, setActiveTab] = useState<TabType>('quantity')
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false)

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
    rowMinutes,
    setRowMinutes,
    rowSeconds,
    setRowSeconds,
    rowsPerPallet,
    setRowsPerPallet,
    result: layerResult
  } = useLayerCalculator(lang)

  const {
    records: registryRecords,
    setRecords: setRegistryRecords,
    filteredRecords: registryFiltered,
    searchQuery: registrySearch,
    setSearchQuery: setRegistrySearch,
    addRecord: addRegistryRecord,
    updateRecord: updateRegistryRecord,
    deleteRecord: deleteRegistryRecord
  } = usePalletRegistry()

  const {
    isStandalone,
    isDismissed,
    isIos,
    deferredPrompt,
    showIosGuide,
    handleInstallClick,
    toggleIosGuide,
    dismissGuide
  } = usePwaInstall()

  const {
    history,
    setHistory,
    addHistoryEntry,
    deleteHistoryItem,
    clearHistory
  } = useHistory()

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = translations[lang].title
  }, [lang])

  // Auto-save Quantity calculation
  useEffect(() => {
    if (!quantityResult.hasInputs) return
    const timer = setTimeout(() => {
      const title = `${total} шт (${perPallet}/палету)`
      const summary = `Разом палет: ${quantityResult.withPartialText}`
      addHistoryEntry('quantity', title, summary, { total, perPallet, rows })
    }, 1000)
    return () => clearTimeout(timer)
  }, [quantityResult.hasInputs, total, perPallet, rows, quantityResult.withPartialText, addHistoryEntry])

  // Auto-save Time calculation
  useEffect(() => {
    if (!timeResult.hasInputs) return
    const timer = setTimeout(() => {
      const title = `Час: до ${targetTime || '18:00'} (${durationHours}г ${durationMinutes}хв/палету)`
      const summary = `Потрібно: ${timeResult.palletsNeededText} палет (${timeResult.timeRemainingFormatted})`
      addHistoryEntry('time', title, summary, { currentTime, targetTime, durationHours, durationMinutes })
    }, 1000)
    return () => clearTimeout(timer)
  }, [timeResult.hasInputs, currentTime, targetTime, durationHours, durationMinutes, timeResult.palletsNeededText, timeResult.timeRemainingFormatted, addHistoryEntry])

  // Auto-save Layer calculation
  useEffect(() => {
    if (!layerResult.hasInputs) return
    const timer = setTimeout(() => {
      const title = `Ряди: ${rowMinutes}хв ${rowSeconds}с/ряд (${rowsPerPallet} рядів/палету)`
      const summary = `Час на палету: ${layerResult.timePerPalletText}`
      addHistoryEntry('layer', title, summary, { rowMinutes, rowSeconds, rowsPerPallet })
    }, 1000)
    return () => clearTimeout(timer)
  }, [layerResult.hasInputs, rowMinutes, rowSeconds, rowsPerPallet, layerResult.timePerPalletText, addHistoryEntry])

  const handleRestoreHistory = (tab: TabType, inputs: HistoryItem['inputs']) => {
    setActiveTab(tab)
    if (tab === 'quantity') {
      if (inputs.total !== undefined) setTotal(inputs.total)
      if (inputs.perPallet !== undefined) setPerPallet(inputs.perPallet)
      if (inputs.rows !== undefined) setRows(inputs.rows)
    } else if (tab === 'time') {
      if (inputs.currentTime !== undefined) setCurrentTime(inputs.currentTime)
      if (inputs.targetTime !== undefined) setTargetTime(inputs.targetTime)
      if (inputs.durationHours !== undefined) setDurationHours(inputs.durationHours)
      if (inputs.durationMinutes !== undefined) setDurationMinutes(inputs.durationMinutes)
    } else if (tab === 'layer') {
      if (inputs.rowMinutes !== undefined) setRowMinutes(inputs.rowMinutes)
      if (inputs.rowSeconds !== undefined) setRowSeconds(inputs.rowSeconds)
      if (inputs.rowsPerPallet !== undefined) setRowsPerPallet(inputs.rowsPerPallet)
    }
  }

  const handleExport = () => {
    exportAppData(registryRecords, history)
  }

  const handleImport = (file: File) => {
    importAppData(
      file,
      (newRecords, newHistory) => {
        if (newRecords.length > 0) {
          setRegistryRecords(newRecords)
        }
        if (newHistory.length > 0) {
          setHistory(newHistory)
        }
        alert(translations[lang].importSuccess)
      },
      (errorMsg) => {
        alert(errorMsg)
      }
    )
  }

  const changeLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('app_lang', newLang)
  }

  const t = translations[lang]

  return (
    <div className="wrap">
      <Header
        t={t}
        lang={lang}
        onChangeLang={changeLang}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      <TabSwitcher activeTab={activeTab} onChangeTab={setActiveTab} t={t} />

      <InstallBanners
        t={t}
        isStandalone={isStandalone}
        isDismissed={isDismissed}
        isIos={isIos}
        deferredPrompt={deferredPrompt}
        showIosGuide={showIosGuide}
        onInstallClick={handleInstallClick}
        onToggleIosGuide={toggleIosGuide}
        onDismiss={dismissGuide}
      />

      {activeTab === 'quantity' && (
        <>
          <CalculatorForm
            t={t}
            total={total}
            setTotal={setTotal}
            perPallet={perPallet}
            setPerPallet={setPerPallet}
            rows={rows}
            setRows={setRows}
            registryRecords={registryRecords}
          />
          <ResultsDisplay t={t} result={quantityResult} />
        </>
      )}

      {activeTab === 'time' && (
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

      {activeTab === 'layer' && (
        <>
          <LayerCalculatorForm
            t={t}
            rowMinutes={rowMinutes}
            setRowMinutes={setRowMinutes}
            rowSeconds={rowSeconds}
            setRowSeconds={setRowSeconds}
            rowsPerPallet={rowsPerPallet}
            setRowsPerPallet={setRowsPerPallet}
          />
          <LayerResultsDisplay t={t} result={layerResult} />
        </>
      )}

      {activeTab === 'crud' && (
        <PalletRegistryView
          t={t}
          filteredRecords={registryFiltered}
          searchQuery={registrySearch}
          onSearchChange={setRegistrySearch}
          onAddRecord={addRegistryRecord}
          onUpdateRecord={updateRegistryRecord}
          onDeleteRecord={deleteRegistryRecord}
        />
      )}

      {activeTab === 'stats' && (
        <StatsView t={t} records={registryRecords} history={history} />
      )}

      <PrivacyFooter t={t} onExport={handleExport} onImport={handleImport} />

      <HistoryModal
        t={t}
        isOpen={isHistoryOpen}
        history={history}
        onClose={() => setIsHistoryOpen(false)}
        onClear={clearHistory}
        onDelete={deleteHistoryItem}
        onRestore={handleRestoreHistory}
      />
    </div>
  )
}
