import type { Language, Translations } from '../i18n'

interface InstallBannersProps {
  t: Translations
  lang: Language
  isStandalone: boolean
  isIos: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deferredPrompt: any
  showIosGuide: boolean
  onInstallClick: () => void
  onToggleIosGuide: () => void
}

export function InstallBanners({
  t,
  lang,
  isStandalone,
  isIos,
  deferredPrompt,
  showIosGuide,
  onInstallClick,
  onToggleIosGuide
}: InstallBannersProps) {
  if (isStandalone) return null

  return (
    <>
      {deferredPrompt && (
        <div className="install-banner">
          <div className="install-text">
            <strong>{t.installApp}</strong>
            <span>{t.installSubtitle}</span>
          </div>
          <button type="button" className="install-btn" onClick={onInstallClick}>
            {t.installBtn}
          </button>
        </div>
      )}

      {isIos && (
        <div className="ios-install-banner">
          <button
            type="button"
            className="ios-guide-toggle"
            onClick={onToggleIosGuide}
          >
            <span>{t.iosGuideTitle}</span>
            <span>{showIosGuide ? '▲' : '▼'}</span>
          </button>
          {showIosGuide && (
            <div className="ios-guide-content">
              {lang === 'uk' ? (
                <>
                  Натисніть <strong>{t.iosGuideShareText}</strong> (іконка <span className="share-icon">⎋</span> або <span className="share-icon">⤓</span>) внизу Safari та виберіть <strong>{t.iosGuideActionText}</strong>.
                </>
              ) : (
                <>
                  Tap <strong>{t.iosGuideShareText}</strong> (icon <span className="share-icon">⎋</span> or <span className="share-icon">⤓</span>) at the bottom of Safari and select <strong>{t.iosGuideActionText}</strong>.
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}
