import type { Translations } from '../i18n'

interface InstallBannersProps {
  t: Translations
  isStandalone: boolean
  isDismissed: boolean
  isIos: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deferredPrompt: any
  showIosGuide: boolean
  onInstallClick: () => void
  onToggleIosGuide: () => void
  onDismiss: () => void
}

export function InstallBanners({
  t,
  isStandalone,
  isDismissed,
  isIos,
  deferredPrompt,
  showIosGuide,
  onInstallClick,
  onToggleIosGuide,
  onDismiss
}: InstallBannersProps) {
  // If launched from Home Screen (standalone mode) OR user dismissed the banner, render NOTHING
  if (isStandalone || isDismissed) return null

  return (
    <div className="install-banners-wrapper">
      {deferredPrompt && (
        <div className="install-banner">
          <div className="install-text">
            <strong>{t.installApp}</strong>
            <span>{t.installSubtitle}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button type="button" className="install-btn" onClick={onInstallClick}>
              {t.installBtn}
            </button>
            <button
              type="button"
              className="banner-close-btn"
              onClick={onDismiss}
              title="Сховати"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="ios-install-banner">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <button
            type="button"
            className="ios-guide-toggle"
            onClick={onToggleIosGuide}
            style={{ flex: 1 }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <span>{t.installGuideTitle}</span>
            </span>
            <span>{showIosGuide ? '▲' : '▼'}</span>
          </button>

          <button
            type="button"
            className="banner-close-btn"
            onClick={onDismiss}
            title="Прибрати підказку"
            style={{ marginLeft: '8px' }}
          >
            ✕
          </button>
        </div>

        {showIosGuide && (
          <div className="ios-guide-content" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            {isIos ? (
              <p style={{ margin: 0 }}>{t.iosGuideSteps}</p>
            ) : (
              <>
                <p style={{ margin: 0 }}>{t.androidGuideSteps}</p>
                <p style={{ margin: 0, opacity: 0.9 }}>{t.iosGuideSteps}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
