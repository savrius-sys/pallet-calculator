import { useState, useEffect, useRef } from 'react'
import type { Translations } from '../i18n'

interface StopwatchProps {
  t: Translations
  onApplyTime: (minutes: number, seconds: number) => void
}

export function Stopwatch({ t, onApplyTime }: StopwatchProps) {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [elapsedMs, setElapsedMs] = useState<number>(0)
  const elapsedMsRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    elapsedMsRef.current = elapsedMs
  }, [elapsedMs])

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - elapsedMsRef.current

      const updateTimer = () => {
        const now = performance.now()
        const currentElapsed = now - startTimeRef.current
        setElapsedMs(currentElapsed)
        animFrameRef.current = requestAnimationFrame(updateTimer)
      }

      animFrameRef.current = requestAnimationFrame(updateTimer)
    } else if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [isRunning])

  const handleStartPause = () => {
    setIsRunning((prev) => !prev)
  }

  const handleReset = () => {
    setIsRunning(false)
    setElapsedMs(0)
    elapsedMsRef.current = 0
  }

  const handleApply = () => {
    const totalSecs = Math.round(elapsedMs / 1000)
    const mins = Math.floor(totalSecs / 60)
    const secs = totalSecs % 60
    onApplyTime(mins, secs)
  }

  const totalSecs = Math.floor(elapsedMs / 1000)
  const mins = Math.floor(totalSecs / 60)
  const secs = totalSecs % 60
  const tenths = Math.floor((elapsedMs % 1000) / 100)

  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${tenths}`

  return (
    <div className={`stopwatch-card ${isRunning ? 'running' : ''}`}>
      <div className="stopwatch-display">
        <span className="stopwatch-digits">{formattedTime}</span>
      </div>

      <div className="stopwatch-actions">
        <button
          type="button"
          className={`stopwatch-btn start-btn ${isRunning ? 'active-pause' : ''}`}
          onClick={handleStartPause}
        >
          {isRunning ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              <span>{t.pauseStopwatch}</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>{t.startStopwatch}</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="stopwatch-btn reset-btn"
          onClick={handleReset}
          disabled={elapsedMs === 0 && !isRunning}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span>{t.resetStopwatch}</span>
        </button>

        <button
          type="button"
          className="stopwatch-btn apply-btn"
          onClick={handleApply}
          disabled={elapsedMs === 0}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{t.useStopwatchTime}</span>
        </button>
      </div>
    </div>
  )
}
