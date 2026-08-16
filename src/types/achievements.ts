export type AchievementId =
  | 'first_calc'
  | 'calc_10'
  | 'calc_50'
  | 'time_master'
  | 'layer_master'
  | 'stopwatch_used'
  | 'registry_first'
  | 'registry_5'
  | 'registry_pick'
  | 'night_shift'
  | 'backup_done'
  | 'stats_viewed'

export interface Achievement {
  id: AchievementId
  icon: string
  titleKey: string
  descKey: string
  category: 'calc' | 'registry' | 'tools' | 'special'
  unlockedAt: string | null // ISO date string if unlocked, or null
  progress?: {
    current: number
    target: number
  }
}

export type AchievementsState = Record<AchievementId, { unlockedAt: string | null; currentProgress?: number }>
