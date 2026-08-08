import { useState, useMemo, useEffect } from 'react'
import { calculateTimePallets, getCurrentTimeString } from '../utils/timeCalculator'
import type { Language } from '../i18n'

export function useTimeCalculator(lang: Language) {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [targetTime, setTargetTime] = useState<string>('')
  const [durationHours, setDurationHours] = useState<string>('')
  const [durationMinutes, setDurationMinutes] = useState<string>('')

  // Live auto time fallback update every 15 seconds if currentTime is empty
  const [systemTime, setSystemTime] = useState<string>(() => getCurrentTimeString())

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemTime(getCurrentTimeString())
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const result = useMemo(() => {
    const effectiveTime = currentTime.trim() !== '' ? currentTime : systemTime
    return calculateTimePallets(
      { currentTime: effectiveTime, targetTime, durationHours, durationMinutes },
      lang
    )
  }, [currentTime, targetTime, durationHours, durationMinutes, lang, systemTime])

  const useCurrentSystemTime = () => {
    setCurrentTime(getCurrentTimeString())
  }

  const clearCurrentTime = () => {
    setCurrentTime('')
  }

  return {
    currentTime,
    setCurrentTime,
    targetTime,
    setTargetTime,
    durationHours,
    setDurationHours,
    durationMinutes,
    setDurationMinutes,
    systemTime,
    useCurrentSystemTime,
    clearCurrentTime,
    result
  }
}
