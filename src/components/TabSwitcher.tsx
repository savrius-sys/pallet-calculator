import type { TabType } from '../types/calculator'
import type { Translations } from '../i18n'

interface TabSwitcherProps {
  activeTab: TabType
  onChangeTab: (tab: TabType) => void
  t: Translations
}

export function TabSwitcher({ activeTab, onChangeTab, t }: TabSwitcherProps) {
  return (
    <div className="tab-switcher" role="tablist" aria-label="Calculator mode">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'quantity'}
        className={`tab-btn ${activeTab === 'quantity' ? 'active' : ''}`}
        onClick={() => onChangeTab('quantity')}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
        <span>{t.tabQuantity}</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'time'}
        className={`tab-btn ${activeTab === 'time' ? 'active' : ''}`}
        onClick={() => onChangeTab('time')}
      >
        <svg
          width="15"
          height="15"
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
        <span>{t.tabTime}</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'layer'}
        className={`tab-btn ${activeTab === 'layer' ? 'active' : ''}`}
        onClick={() => onChangeTab('layer')}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
        </svg>
        <span>{t.tabLayer}</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'crud'}
        className={`tab-btn ${activeTab === 'crud' ? 'active' : ''}`}
        onClick={() => onChangeTab('crud')}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
        <span>{t.tabCrud}</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'stats'}
        className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
        onClick={() => onChangeTab('stats')}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
        <span>{t.tabStats}</span>
      </button>
    </div>
  )
}
