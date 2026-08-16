import { useEffect } from 'react'
import type { Achievement } from '../types/achievements'
import type { Translations } from '../i18n'

interface AchievementToastProps {
  achievement: Achievement | null
  t: Translations
  onDismiss: () => void
}

export function AchievementToast({ achievement, t, onDismiss }: AchievementToastProps) {
  useEffect(() => {
    if (!achievement) return
    const timer = setTimeout(() => {
      onDismiss()
    }, 4500)
    return () => clearTimeout(timer)
  }, [achievement, onDismiss])

  if (!achievement) return null

  // Lookup translated title and desc
  const title = t[achievement.titleKey as keyof Translations] as string || achievement.titleKey
  const desc = t[achievement.descKey as keyof Translations] as string || achievement.descKey

  return (
    <div className="achievement-toast-container" onClick={onDismiss}>
      <div className="achievement-toast-content">
        <div className="achievement-toast-icon">{achievement.icon}</div>
        <div className="achievement-toast-info">
          <div className="achievement-toast-header">{t.achievementUnlockedToast}</div>
          <div className="achievement-toast-title">{title}</div>
          <div className="achievement-toast-desc">{desc}</div>
        </div>
        <button type="button" className="achievement-toast-close" onClick={onDismiss}>
          &times;
        </button>
      </div>
    </div>
  )
}
