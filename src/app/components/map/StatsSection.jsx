import React from 'react'
import { formatMs } from './utils'

export function StatsSection({
  points,
  totals,
  metric,
  textOpacity,
  bgColor,
  borderColor,
  progressBg,
  isDark
}) {
  const citiesCount = points.length
  const border = `3px solid ${borderColor || (isDark ? 'white' : 'black')}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ borderRadius: 18, border, padding: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>
          Summary ({totals.year})
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
          <div style={{ padding: 12, borderRadius: 14, background: bgColor }}>
            <div style={{ fontSize: 12, opacity: textOpacity }}>Cities</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>
              {totals.cities}
            </div>
          </div>

          <div style={{ padding: 12, borderRadius: 14, background: bgColor }}>
            <div style={{ fontSize: 12, opacity: textOpacity }}>Sessions</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>
              {totals.totalSessions}
            </div>
          </div>

          <div style={{ padding: 12, borderRadius: 14, background: bgColor }}>
            <div style={{ fontSize: 12, opacity: textOpacity }}>Time played</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginTop: 6 }}>
              {formatMs(totals.totalMs)}
            </div>
          </div>

          <div style={{ padding: 12, borderRadius: 14, background: bgColor }}>
            <div style={{ fontSize: 12, opacity: textOpacity }}>Metric</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginTop: 6 }}>
              {metric === 'msPlayed' ? 'Time played' : 'Sessions'}
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderRadius: 18, border, padding: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>City breakdown</div>

        <div
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            maxHeight: citiesCount >= 2 ? 140 : 'none',
            overflowY: citiesCount >= 2 ? 'auto' : 'visible',
            paddingRight: citiesCount >= 2 ? 6 : 0
          }}
        >
          {points
            .slice()
            .sort((a, b) =>
              metric === 'sessions' ? b.sessions - a.sessions : b.msPlayed - a.msPlayed
            )
            .map(p => {
              const val = metric === 'sessions' ? p.sessions : p.msPlayed
              const total = metric === 'sessions' ? totals.totalSessions : totals.totalMs
              const pct = total ? Math.round((val / total) * 100) : 0

              return (
                <div
                  key={`${p.lat}-${p.lng}`}
                  style={{
                    padding: 10,
                    borderRadius: 14,
                    background: bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800 }}>
                      {p.city}, {p.country}
                    </div>
                    <div style={{ fontSize: 12, opacity: textOpacity, marginTop: 2 }}>
                      {formatMs(p.msPlayed)} • {p.sessions} sessions
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontSize: 12, opacity: textOpacity }}>{pct}%</div>
                    <div
                      style={{
                        width: 130,
                        height: 8,
                        borderRadius: 999,
                        background: progressBg
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '100%',
                          background: 'rgba(29,185,84,0.85)',
                          borderRadius: 999
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        <div
          style={{
            fontSize: 12,
            opacity: 0.5,
            lineHeight: 1.35,
            marginTop: 12
          }}
        >
          Interpretation note: this visualization is based on country-level connection metadata and/or IP-derived approximation. It is not a movement trace.
        </div>
      </div>
    </div>
  )
}
