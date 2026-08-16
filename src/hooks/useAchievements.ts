import { useState, useEffect, useCallback } from 'react'
import type { Achievement, AchievementId, AchievementsState } from '../types/achievements'

const STORAGE_KEY = 'pallet_app_achievements_v1'

const BASE_ACHIEVEMENTS: Omit<Achievement, 'unlockedAt'>[] = [
  {
    id: 'first_calc',
    icon: '🎯',
    titleKey: 'ach_first_calc_title',
    descKey: 'ach_first_calc_desc',
    category: 'calc'
  },
  {
    id: 'calc_10',
    icon: '🔢',
    titleKey: 'ach_calc_10_title',
    descKey: 'ach_calc_10_desc',
    category: 'calc',
    progress: { current: 0, target: 10 }
  },
  {
    id: 'calc_50',
    icon: '🏆',
    titleKey: 'ach_calc_50_title',
    descKey: 'ach_calc_50_desc',
    category: 'calc',
    progress: { current: 0, target: 50 }
  },
  {
    id: 'time_master',
    icon: '⏱️',
    titleKey: 'ach_time_master_title',
    descKey: 'ach_time_master_desc',
    category: 'calc'
  },
  {
    id: 'layer_master',
    icon: '🥞',
    titleKey: 'ach_layer_master_title',
    descKey: 'ach_layer_master_desc',
    category: 'calc'
  },
  {
    id: 'stopwatch_used',
    icon: '⏱️',
    titleKey: 'ach_stopwatch_used_title',
    descKey: 'ach_stopwatch_used_desc',
    category: 'tools'
  },
  {
    id: 'registry_first',
    icon: '📦',
    titleKey: 'ach_registry_first_title',
    descKey: 'ach_registry_first_desc',
    category: 'registry'
  },
  {
    id: 'registry_5',
    icon: '📚',
    titleKey: 'ach_registry_5_title',
    descKey: 'ach_registry_5_desc',
    category: 'registry',
    progress: { current: 0, target: 5 }
  },
  {
    id: 'registry_pick',
    icon: '⚡',
    titleKey: 'ach_registry_pick_title',
    descKey: 'ach_registry_pick_desc',
    category: 'registry'
  },
  {
    id: 'night_shift',
    icon: '🦉',
    titleKey: 'ach_night_shift_title',
    descKey: 'ach_night_shift_desc',
    category: 'special'
  },
  {
    id: 'backup_done',
    icon: '💾',
    titleKey: 'ach_backup_done_title',
    descKey: 'ach_backup_done_desc',
    category: 'tools'
  },
  {
    id: 'stats_viewed',
    icon: '📊',
    titleKey: 'ach_stats_viewed_title',
    descKey: 'ach_stats_viewed_desc',
    category: 'special'
  }
]

export function useAchievements() {
  const [state, setState] = useState<AchievementsState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // fallback
    }
    return {}
  })

  const [toastAchievement, setToastAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state])

  const unlockAchievement = useCallback((id: AchievementId) => {
    setState((prev) => {
      if (prev[id]?.unlockedAt) return prev // already unlocked

      const nowStr = new Date().toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })

      const newState = {
        ...prev,
        [id]: { unlockedAt: nowStr }
      }

      // Trigger toast
      const base = BASE_ACHIEVEMENTS.find((a) => a.id === id)
      if (base) {
        setToastAchievement({ ...base, unlockedAt: nowStr })
      }

      return newState
    })
  }, [])

  const checkNightShift = useCallback(() => {
    const hour = new Date().getHours()
    if (hour >= 22 || hour < 6) {
      unlockAchievement('night_shift')
    }
  }, [unlockAchievement])

  const checkCalcEvents = useCallback((calcHistoryCount: number, tabType: string) => {
    unlockAchievement('first_calc')
    checkNightShift()

    if (calcHistoryCount >= 10) unlockAchievement('calc_10')
    if (calcHistoryCount >= 50) unlockAchievement('calc_50')

    if (tabType === 'time') unlockAchievement('time_master')
    if (tabType === 'layer') unlockAchievement('layer_master')
  }, [unlockAchievement, checkNightShift])

  const checkRegistryEvents = useCallback((registryRecordsCount: number) => {
    if (registryRecordsCount >= 1) unlockAchievement('registry_first')
    if (registryRecordsCount >= 5) unlockAchievement('registry_5')
  }, [unlockAchievement])

  const dismissToast = useCallback(() => {
    setToastAchievement(null)
  }, [])

  const achievementsList: Achievement[] = BASE_ACHIEVEMENTS.map((base) => {
    const itemState = state[base.id]
    return {
      ...base,
      unlockedAt: itemState?.unlockedAt || null
    }
  })

  const unlockedCount = achievementsList.filter((a) => a.unlockedAt !== null).length
  const totalCount = achievementsList.length

  return {
    achievements: achievementsList,
    unlockedCount,
    totalCount,
    unlockAchievement,
    checkCalcEvents,
    checkRegistryEvents,
    toastAchievement,
    dismissToast
  }
}
