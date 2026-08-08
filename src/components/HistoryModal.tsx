import type { HistoryItem, TabType } from '../types/calculator'
import type { Translations } from '../i18n'

interface HistoryModalProps {
  t: Translations
  isOpen: boolean
  history: HistoryItem[]
  onClose: () => void
  onClear: () => void
  onDelete: (id: string) => void
  onRestore: (tab: TabType, inputs: HistoryItem['inputs']) => void
}

export function HistoryModal({
  t,
  isOpen,
  history,
  onClose,
  onClear,
  onDelete,
  onRestore
}: HistoryModalProps) {
  if (!isOpen) return null

  const getTabLabel = (tab: TabType) => {
    switch (tab) {
      case 'quantity':
        return t.tabQuantity
      case 'time':
        return t.tabTime
      case 'layer':
        return t.tabLayer
      case 'crud':
        return t.tabCrud
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            <svg
              width="18"
              height="18"
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
            <h3>{t.historyTitle}</h3>
          </div>

          <div className="modal-header-actions">
            {history.length > 0 && (
              <button
                type="button"
                className="clear-all-btn"
                onClick={onClear}
                title={t.clearHistory}
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
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            )}
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="modal-body">
          {history.length === 0 ? (
            <div className="empty-history">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
              <p>{t.emptyHistory}</p>
            </div>
          ) : (
            <div className="history-list">
              {history.map((item) => (
                <div key={item.id} className="history-item-card">
                  <div className="history-item-top">
                    <span className={`tab-tag ${item.tab}`}>
                      {getTabLabel(item.tab)}
                    </span>
                    <span className="history-time">{item.timestamp}</span>
                  </div>

                  <p className="history-item-title">{item.title}</p>
                  <p className="history-item-summary">{item.summary}</p>

                  <div className="history-item-actions">
                    <button
                      type="button"
                      className="history-action-btn restore-btn"
                      onClick={() => {
                        onRestore(item.tab, item.inputs)
                        onClose()
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                      <span>{t.restoreEntry}</span>
                    </button>

                    <button
                      type="button"
                      className="history-action-btn delete-btn"
                      onClick={() => onDelete(item.id)}
                      title={t.deleteEntry}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6L6 18" />
                        <path d="M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="privacy-banner" style={{ marginTop: '12px' }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="privacy-icon"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{t.privacyNote}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
