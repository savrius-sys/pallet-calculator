import { useState, type FormEvent } from 'react'
import type { PalletRecord } from '../types/calculator'
import type { Translations } from '../i18n'

interface PalletFormModalProps {
  t: Translations
  isOpen: boolean
  editingRecord: PalletRecord | null
  onClose: () => void
  onSave: (data: Omit<PalletRecord, 'id' | 'date'>) => void
}

export function PalletFormModal({
  t,
  isOpen,
  editingRecord,
  onClose,
  onSave
}: PalletFormModalProps) {
  if (!isOpen) return null

  return (
    <PalletFormContent
      t={t}
      key={editingRecord ? editingRecord.id : 'new'}
      editingRecord={editingRecord}
      onClose={onClose}
      onSave={onSave}
    />
  )
}

function PalletFormContent({
  t,
  editingRecord,
  onClose,
  onSave
}: Omit<PalletFormModalProps, 'isOpen'>) {
  const [productName, setProductName] = useState<string>(editingRecord ? editingRecord.productName : '')
  const [rows, setRows] = useState<string>(editingRecord ? editingRecord.rows : '')
  const [quantity, setQuantity] = useState<string>(editingRecord ? editingRecord.quantity : '')
  const [palletTime, setPalletTime] = useState<string>(editingRecord ? editingRecord.palletTime : '')
  const [note, setNote] = useState<string>(editingRecord ? editingRecord.note : '')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!productName.trim()) return

    onSave({
      productName: productName.trim(),
      rows: rows.trim(),
      quantity: quantity.trim(),
      palletTime: palletTime.trim(),
      note: note.trim()
    })

    onClose()
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
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <h3>{editingRecord ? t.editPalletTitle : t.newPalletTitle}</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body form-section">
          <div className="input-group">
            <label htmlFor="productName">{t.productNameLabel}</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder={t.productNamePlaceholder}
              autoFocus
              required
            />
          </div>

          <div className="grid2">
            <div className="input-group">
              <label htmlFor="palletRows">{t.rowsPerPalletLabel}</label>
              <input
                type="number"
                id="palletRows"
                value={rows}
                onChange={(e) => setRows(e.target.value)}
                min="0"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="напр. 8"
              />
            </div>

            <div className="input-group">
              <label htmlFor="palletQuantity">{t.bottlesLabel}</label>
              <input
                type="number"
                id="palletQuantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={t.bottlesPlaceholder}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="palletTime">{t.palletTimeLabel}</label>
            <input
              type="text"
              id="palletTime"
              value={palletTime}
              onChange={(e) => setPalletTime(e.target.value)}
              placeholder={t.palletTimePlaceholder}
            />
          </div>

          <div className="input-group">
            <label htmlFor="palletNote">{t.noteLabel}</label>
            <input
              type="text"
              id="palletNote"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.notePlaceholder}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              {t.cancelBtn}
            </button>
            <button type="submit" className="save-btn">
              {t.saveBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
