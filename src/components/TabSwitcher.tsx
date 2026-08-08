import type { TabType } from '../types/calculator'
import type { Translations } from '../i18n'

interface TabSwitcherProps {
  activeTab: TabType
  onChangeTab: (tab: TabType) => void
  t: Translations
}

export function TabSwitcher({ activeTab, onChangeTab, t }: TabSwitcherProps) {
  return (
    <div className="tab-switcher">
      <button
        type="button"
        className={`tab-btn ${activeTab === 'quantity' ? 'active' : ''}`}
        onClick={() => onChangeTab('quantity')}
      >
        <span>📦</span> {t.tabQuantity}
      </button>
      <button
        type="button"
        className={`tab-btn ${activeTab === 'time' ? 'active' : ''}`}
        onClick={() => onChangeTab('time')}
      >
        <span>⏱️</span> {t.tabTime}
      </button>
    </div>
  )
}
