import { useState, useEffect, useCallback } from 'react'

export function usePwaInstall() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false)

  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('pallet_hide_install_guide') === 'true'
  })

  const [isStandalone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).standalone === true ||
      document.referrer.includes('android-app://')
    )
  })

  const [isIos] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstall = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [])

  const handleInstallClick = useCallback(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null)
      }
    }
  }, [deferredPrompt])

  const toggleIosGuide = useCallback(() => {
    setShowIosGuide((prev) => !prev)
  }, [])

  const dismissGuide = useCallback(() => {
    setIsDismissed(true)
    localStorage.setItem('pallet_hide_install_guide', 'true')
  }, [])

  return {
    isStandalone,
    isDismissed,
    isIos,
    deferredPrompt,
    showIosGuide,
    handleInstallClick,
    toggleIosGuide,
    dismissGuide
  }
}
