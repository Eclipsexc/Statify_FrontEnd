import { useEffect, useMemo, useState } from 'react'

import { HeaderSection } from '@/app/components/map/HeaderSection'
import { MapSection } from '@/app/components/map/MapSection'
import { StatsSection } from '@/app/components/map/StatsSection'

import { groupByCity } from '@/app/components/map/utils'
import { getTheme } from '@/app/components/map/theme'

const RAW_DATA = [
  { ts: '2023-06-03T14:27:09Z', ms_played: 126500, geo: { country: 'UA', city: 'Lviv', lat: 49.84, lng: 24.03 } },
  { ts: '2023-06-04T18:11:00Z', ms_played: 84500, geo: { country: 'UA', city: 'Lviv', lat: 49.84, lng: 24.03 } },
  { ts: '2024-07-06T08:17:22Z', ms_played: 92500, geo: { country: 'PL', city: 'Krakow', lat: 50.06, lng: 19.94 } },
  { ts: '2024-08-12T21:43:10Z', ms_played: 154000, geo: { country: 'UA', city: 'Kyiv', lat: 50.45, lng: 30.52 } },
  { ts: '2023-09-02T10:05:44Z', ms_played: 67800, geo: { country: 'UA', city: 'Odesa', lat: 46.48, lng: 30.73 } },
  { ts: '2023-10-18T16:30:01Z', ms_played: 112300, geo: { country: 'DE', city: 'Berlin', lat: 52.52, lng: 13.4 } },
  { ts: '2023-11-07T19:54:36Z', ms_played: 50300, geo: { country: 'CZ', city: 'Prague', lat: 50.08, lng: 14.43 } }
]

export default function ListeningMap() {
  const years = useMemo(() => {
    const set = new Set(RAW_DATA.map(d => new Date(d.ts).getFullYear()))
    return Array.from(set).sort((a, b) => a - b)
  }, [])

  const [year, setYear] = useState(years[0])
  const [metric, setMetric] = useState('msPlayed')
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    syncTheme()

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const theme = getTheme(isDark)
  const { borderColor, bgColor, textOpacity, progressBg } = theme

  const points = useMemo(() => groupByCity(RAW_DATA, year), [year])

  const metricValues = useMemo(() => {
    const values = points.map(p =>
      metric === 'sessions' ? p.sessions : p.msPlayed
    )
    return {
      minV: values.length ? Math.min(...values) : 0,
      maxV: values.length ? Math.max(...values) : 0
    }
  }, [points, metric])

  const totals = useMemo(() => ({
    year,
    cities: points.length,
    totalSessions: points.reduce((s, p) => s + p.sessions, 0),
    totalMs: points.reduce((s, p) => s + p.msPlayed, 0)
  }), [points, year])

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 16 }}>
      <HeaderSection
        year={year}
        setYear={setYear}
        years={years}
        metric={metric}
        setMetric={setMetric}
        theme={theme}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 12,
          marginTop: 14
        }}
      >
        <div
          style={{
            borderRadius: 18,
            border: `1px solid ${borderColor}`,
            overflow: 'hidden',
            minHeight: 520
          }}
        >
          <MapSection
            points={points}
            metric={metric}
            metricValues={metricValues}
          />
        </div>

        <StatsSection
          points={points}
          totals={totals}
          metric={metric}
          textOpacity={textOpacity}
          bgColor={bgColor}
          borderColor={borderColor}
          progressBg={progressBg}
          isDark={isDark}
        />
      </div>
    </div>
  )
}
