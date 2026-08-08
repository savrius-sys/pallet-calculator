import type { PalletRecord } from '../types/calculator'
import type { Translations } from '../i18n'

interface RegistryPickerModalProps {
  t: Translations
  isOpen: boolean
  records: PalletRecord[]
  onClose: () => void
  onSelect: (record: PalletRecord) => void
}

export function RegistryPickerModal({
  t,
  isOpen,
  records,
  onClose,
  onSelect
}: RegistryPickerModalProps) {
  if (!isOpen) return null

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
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
            <h3>{t.selectFromRegistryTitle}</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {records.length === 0 ? (
            <div className="empty-registry">
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
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <p>{t.emptyRegistryPickHint}</p>
            </div>
          ) : (
            <div className="picker-list">
              {records.map((record) => (
                <button
                  key={record.id}
                  type="button"
                  className="picker-item-card"
                  onClick={() => {
                    onSelect(record)
                    onClose()
                  }}
                >
                  <div className="picker-item-header">
                    <span className="picker-item-name">{record.productName}</span>
                    <span className="picker-select-badge">Вибрати ➔</span>
                  </div>

                  <div className="picker-item-details">
                    {record.quantity && <span>Пляшок: <strong>{record.quantity} шт</strong></span>}
                    {record.rows && <span>Рядів: <strong>{record.rows}</strong></span>}
                    {record.palletTime && <span>Час: <strong>{record.palletTime}</strong></span>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
