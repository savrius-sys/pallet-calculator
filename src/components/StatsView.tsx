import { useMemo } from 'react'
import type { PalletRecord, HistoryItem } from '../types/calculator'
import type { Translations } from '../i18n'

interface StatsViewProps {
  t: Translations
  records: PalletRecord[]
  history: HistoryItem[]
}

export function StatsView({ t, records, history }: StatsViewProps) {
  const stats = useMemo(() => {
    const totalPallets = records.length

    let totalBottles = 0
    let totalRows = 0

    const productMap: Record<string, { count: number; bottles: number; rows: number }> = {}

    records.forEach((r) => {
      const q = parseInt(r.quantity, 10) || 0
      const rw = parseInt(r.rows, 10) || 0

      totalBottles += q
      totalRows += rw

      const pName = r.productName.trim() || 'Без назви'
      if (!productMap[pName]) {
        productMap[pName] = { count: 0, bottles: 0, rows: 0 }
      }
      productMap[pName].count += 1
      productMap[pName].bottles += q
      productMap[pName].rows += rw
    })

    const productList = Object.entries(productMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.bottles - a.bottles)

    const avgBottles = totalPallets > 0 ? Math.round(totalBottles / totalPallets) : 0

    const calcCounts = {
      quantity: history.filter((h) => h.tab === 'quantity').length,
      time: history.filter((h) => h.tab === 'time').length,
      layer: history.filter((h) => h.tab === 'layer').length
    }

    return {
      totalPallets,
      totalBottles,
      totalRows,
      avgBottles,
      historyCount: history.length,
      calcCounts,
      productList
    }
  }, [records, history])

  const hasData = stats.totalPallets > 0 || stats.historyCount > 0

  if (!hasData) {
    return (
      <div className="stats-section empty-stats">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
        <p>{t.noStatsData}</p>
      </div>
    )
  }

  return (
    <div className="stats-section">
      <div className="stats-header-title">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
        <h2>{t.statsTitle}</h2>
      </div>

      {/* KPI Cards Grid */}
      <div className="stats-kpi-grid">
        <div className="kpi-card blue">
          <div className="kpi-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <div className="kpi-data">
            <span className="kpi-value">{stats.totalPallets}</span>
            <span className="kpi-label">{t.totalPalletsCard}</span>
          </div>
        </div>

        <div className="kpi-card green">
          <div className="kpi-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>
          <div className="kpi-data">
            <span className="kpi-value">{stats.totalBottles.toLocaleString('uk-UA')}</span>
            <span className="kpi-label">{t.totalBottlesCard}</span>
          </div>
        </div>

        <div className="kpi-card amber">
          <div className="kpi-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
            </svg>
          </div>
          <div className="kpi-data">
            <span className="kpi-value">{stats.totalRows}</span>
            <span className="kpi-label">{t.totalRowsCard}</span>
          </div>
        </div>

        <div className="kpi-card purple">
          <div className="kpi-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="kpi-data">
            <span className="kpi-value">{stats.historyCount}</span>
            <span className="kpi-label">{t.historyCalcsCard}</span>
          </div>
        </div>
      </div>

      {/* Product Breakdown List */}
      {stats.productList.length > 0 && (
        <div className="stats-box">
          <h3 className="stats-box-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
            <span>{t.productBreakdownTitle}</span>
          </h3>

          <div className="product-stats-list">
            {stats.productList.map((item) => (
              <div key={item.name} className="product-stat-card">
                <div className="product-stat-header">
                  <span className="product-stat-name">{item.name}</span>
                  <span className="product-stat-badge">{item.count} палет</span>
                </div>
                <div className="product-stat-details">
                  <span>Пляшок: <strong>{item.bottles.toLocaleString('uk-UA')} шт</strong></span>
                  <span>Рядів: <strong>{item.rows}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calculators Usage Breakdown */}
      {stats.historyCount > 0 && (
        <div className="stats-box">
          <h3 className="stats-box-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <span>{t.calcTypeBreakdownTitle}</span>
          </h3>

          <div className="usage-bars">
            <div className="usage-row">
              <div className="usage-label">
                <span>{t.tabQuantity}</span>
                <span>{stats.calcCounts.quantity}</span>
              </div>
              <div className="usage-track">
                <div
                  className="usage-fill blue"
                  style={{
                    width: `${stats.historyCount > 0 ? (stats.calcCounts.quantity / stats.historyCount) * 100 : 0}%`
                  }}
                />
              </div>
            </div>

            <div className="usage-row">
              <div className="usage-label">
                <span>{t.tabTime}</span>
                <span>{stats.calcCounts.time}</span>
              </div>
              <div className="usage-track">
                <div
                  className="usage-fill green"
                  style={{
                    width: `${stats.historyCount > 0 ? (stats.calcCounts.time / stats.historyCount) * 100 : 0}%`
                  }}
                />
              </div>
            </div>

            <div className="usage-row">
              <div className="usage-label">
                <span>{t.tabLayer}</span>
                <span>{stats.calcCounts.layer}</span>
              </div>
              <div className="usage-track">
                <div
                  className="usage-fill amber"
                  style={{
                    width: `${stats.historyCount > 0 ? (stats.calcCounts.layer / stats.historyCount) * 100 : 0}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
