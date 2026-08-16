import { useState } from 'react'
import type { Achievement } from '../types/achievements'
import type { Translations } from '../i18n'

interface AchievementsModalProps {
  t: Translations
  isOpen: boolean
  achievements: Achievement[]
  unlockedCount: number
  totalCount: number
  onClose: () => void
}

export function AchievementsModal({
  t,
  isOpen,
  achievements,
  unlockedCount,
  totalCount,
  onClose
}: AchievementsModalProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all')

  if (!isOpen) return null

  const percentage = Math.round((unlockedCount / totalCount) * 100)

  const categories = [
    { id: 'all', label: 'Всі' },
    { id: 'calc', label: t.achievementsCategoryCalc },
    { id: 'registry', label: t.achievementsCategoryRegistry },
    { id: 'tools', label: t.achievementsCategoryTools },
    { id: 'special', label: t.achievementsCategorySpecial }
  ]

  const filteredAchievements = achievements.filter(
    (a) => filterCategory === 'all' || a.category === filterCategory
  )

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content achievements-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="achievements-modal-title">
            <span className="trophy-icon">🏆</span>
            <h3>{t.achievementsTitle}</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* Progress Bar Header */}
          <div className="achievements-progress-card">
            <div className="achievements-progress-text">
              <span>{t.achievementsUnlocked(unlockedCount, totalCount)}</span>
              <span className="percentage">{percentage}%</span>
            </div>
            <div className="achievements-progress-track">
              <div
                className="achievements-progress-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="achievements-category-chips">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-chip ${filterCategory === cat.id ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="achievements-grid">
            {filteredAchievements.map((ach) => {
              const isUnlocked = ach.unlockedAt !== null
              const title = (t[ach.titleKey as keyof Translations] as string) || ach.titleKey
              const desc = (t[ach.descKey as keyof Translations] as string) || ach.descKey

              return (
                <div
                  key={ach.id}
                  className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-card-icon">{ach.icon}</div>
                  <div className="achievement-card-info">
                    <div className="achievement-card-title">{title}</div>
                    <div className="achievement-card-desc">{desc}</div>
                    <div className="achievement-card-status">
                      {isUnlocked ? (
                        <span className="status-unlocked">
                          ✓ {t.achievementUnlockedAt(ach.unlockedAt!)}
                        </span>
                      ) : (
                        <span className="status-locked">🔒 {t.achievementLocked}</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
