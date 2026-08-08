import { useState } from 'react'
import type { PalletRecord } from '../types/calculator'
import type { Translations } from '../i18n'
import { PalletFormModal } from './PalletFormModal'

interface PalletRegistryViewProps {
  t: Translations
  filteredRecords: PalletRecord[]
  searchQuery: string
  onSearchChange: (q: string) => void
  onAddRecord: (data: Omit<PalletRecord, 'id' | 'date'>) => void
  onUpdateRecord: (id: string, data: Partial<Omit<PalletRecord, 'id'>>) => void
  onDeleteRecord: (id: string) => void
}

export function PalletRegistryView({
  t,
  filteredRecords,
  searchQuery,
  onSearchChange,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord
}: PalletRegistryViewProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editingRecord, setEditingRecord] = useState<PalletRecord | null>(null)

  const handleOpenAdd = () => {
    setEditingRecord(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (record: PalletRecord) => {
    setEditingRecord(record)
    setIsModalOpen(true)
  }

  const handleSave = (data: Omit<PalletRecord, 'id' | 'date'>) => {
    if (editingRecord) {
      onUpdateRecord(editingRecord.id, data)
    } else {
      onAddRecord(data)
    }
  }

  return (
    <div className="registry-section">
      <div className="registry-top-bar">
        <div className="search-input-wrapper">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
          />
        </div>

        <button type="button" className="add-pallet-btn" onClick={handleOpenAdd}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>{t.addPalletBtn}</span>
        </button>
      </div>

      <div className="registry-list">
        {filteredRecords.length === 0 ? (
          <div className="empty-registry">
            <svg
              width="44"
              height="44"
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
            <p>{t.emptyRegistry}</p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div key={record.id} className="pallet-card">
              <div className="pallet-card-header">
                <div className="pallet-product-name">{record.productName}</div>
                <span className="pallet-date">{record.date}</span>
              </div>

              <div className="pallet-details-grid">
                {record.rows && (
                  <div className="detail-item">
                    <span className="detail-label">{t.rowsPerPalletLabel}:</span>
                    <span className="detail-value">{record.rows} рядів</span>
                  </div>
                )}
                {record.quantity && (
                  <div className="detail-item">
                    <span className="detail-label">{t.bottlesLabel}:</span>
                    <span className="detail-value">{record.quantity} шт</span>
                  </div>
                )}
                {record.palletTime && (
                  <div className="detail-item">
                    <span className="detail-label">{t.palletTimeLabel}:</span>
                    <span className="detail-value highlight-time">{record.palletTime}</span>
                  </div>
                )}
              </div>

              {record.note && (
                <div className="pallet-note">{record.note}</div>
              )}

              <div className="pallet-card-actions">
                <button
                  type="button"
                  className="pallet-action-btn edit-btn"
                  onClick={() => handleOpenEdit(record)}
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
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span>Редагувати</span>
                </button>

                <button
                  type="button"
                  className="pallet-action-btn delete-btn"
                  onClick={() => {
                    if (confirm(t.deletePalletConfirm)) {
                      onDeleteRecord(record.id)
                    }
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  <span>Видалити</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <PalletFormModal
        t={t}
        isOpen={isModalOpen}
        editingRecord={editingRecord}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}
