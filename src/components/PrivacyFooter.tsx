import { useState, useRef, type ChangeEvent } from 'react'
import type { Translations } from '../i18n'

interface PrivacyFooterProps {
  t: Translations
  onExport: () => void
  onImport: (file: File) => void
}

export function PrivacyFooter({ t, onExport, onImport }: PrivacyFooterProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isNoteHidden, setIsNoteHidden] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('hide_privacy_note') === 'true'
  })

  const handleDismissNote = () => {
    setIsNoteHidden(true)
    localStorage.setItem('hide_privacy_note', 'true')
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImport(file)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <footer className="global-privacy-footer">
      {!isNoteHidden && (
        <div className="privacy-banner">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', flex: 1 }}>
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
              style={{ flexShrink: 0, marginTop: '2px' }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{t.privacyNote}</span>
          </div>
          <button
            type="button"
            className="banner-close-btn"
            onClick={handleDismissNote}
            title="Прибрати примітку"
          >
            ✕
          </button>
        </div>
      )}

      <div className="data-actions-row">
        <button
          type="button"
          className="data-action-btn export-btn"
          onClick={onExport}
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>{t.exportDataBtn}</span>
        </button>

        <button
          type="button"
          className="data-action-btn import-btn"
          onClick={() => fileInputRef.current?.click()}
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>{t.importDataBtn}</span>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          style={{ display: 'none' }}
        />
      </div>
    </footer>
  )
}
