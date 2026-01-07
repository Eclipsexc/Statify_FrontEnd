import React, { useMemo, useState, useEffect  } from 'react'
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  useMap
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const RAW_DATA = [
  {
    ts: '2023-06-03T14:27:09Z',
    ms_played: 126500,
    geo: {
      country: 'UA',
      city: 'Lviv',
      lat: 49.84,
      lng: 24.03
    }
  },
  {
    ts: '2023-06-04T18:11:00Z',
    ms_played: 84500,
    geo: {
      country: 'UA',
      city: 'Lviv',
      lat: 49.84,
      lng: 24.03
    }
  },
  {
    ts: '2023-07-06T08:17:22Z',
    ms_played: 92500,
    geo: {
      country: 'PL',
      city: 'Krakow',
      lat: 50.06,
      lng: 19.94
    }
  },
  {
    ts: '2023-08-12T21:43:10Z',
    ms_played: 154000,
    geo: {
      country: 'UA',
      city: 'Kyiv',
      lat: 50.45,
      lng: 30.52
    }
  },
  {
    ts: '2023-09-02T10:05:44Z',
    ms_played: 67800,
    geo: {
      country: 'UA',
      city: 'Odesa',
      lat: 46.48,
      lng: 30.73
    }
  },
  {
    ts: '2023-10-18T16:30:01Z',
    ms_played: 112300,
    geo: {
      country: 'DE',
      city: 'Berlin',
      lat: 52.52,
      lng: 13.40
    }
  },
  {
    ts: '2023-11-07T19:54:36Z',
    ms_played: 50300,
    geo: {
      country: 'CZ',
      city: 'Prague',
      lat: 50.08,
      lng: 14.43
    }
  }
]

function FitToPoints({ points }) {
  const map = useMap()
  useMemo(() => {
    if (!points.length) return
    const bounds = points.map(p => [p.lat, p.lng])
    map.fitBounds(bounds, { padding: [28, 28] })
  }, [map, points])
  return null
}

function formatMs(ms) {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  return `${h}h ${m}m`
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v))
}

function radiusFor(value, minV, maxV) {
  if (maxV === minV) return 18
  const t = (value - minV) / (maxV - minV)
  return 10 + t * 26
}

function groupByCity(data, yearFilter) {
  const grouped = new Map()

  for (const d of data) {
    if (!d.geo || !d.geo.lat || !d.geo.lng || !d.ts) continue
    const year = new Date(d.ts).getFullYear()
    if (year !== yearFilter) continue

    const key = `${d.geo.lat}-${d.geo.lng}`
    if (!grouped.has(key)) {
      grouped.set(key, {
        year,
        city: d.geo.city,
        country: d.geo.country,
        lat: d.geo.lat,
        lng: d.geo.lng,
        sessions: 0,
        msPlayed: 0
      })
    }

    const entry = grouped.get(key)
    entry.msPlayed += d.ms_played
    entry.sessions += 1
  }

  return Array.from(grouped.values())
}

export default function ListeningMapMock() {
  const years = useMemo(() => {
    const set = new Set(RAW_DATA.map(x => new Date(x.ts).getFullYear()))
    return Array.from(set).sort((a, b) => a - b)
  }, [])

  const [year, setYear] = useState(years[0] ?? 2022)
  const [metric, setMetric] = useState('msPlayed')

const [isDark, setIsDark] = useState(true)

useEffect(() => {
  const updateTheme = () => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }

  updateTheme()

  const observer = new MutationObserver(updateTheme)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })

  return () => observer.disconnect()
}, [])


const lightTheme = {
  borderColor: 'rgba(0,0,0,0.16)',
  bgColor: 'rgba(0,0,0,0.05)',
  bgColorActive: 'rgba(0,0,0,0.11)',
  textOpacity: 0.74,
  progressBg: 'rgba(0,0,0,0.12)'
}

const darkTheme = {
  borderColor: 'rgba(255,255,255,0.12)',
  bgColor: 'rgba(255,255,255,0.06)',
  bgColorActive: 'rgba(255,255,255,0.18)',
  textOpacity: 0.80,
  progressBg: 'rgba(255,255,255,0.12)'
}

const theme = isDark ? darkTheme : lightTheme

const {
  borderColor,
  bgColor,
  bgColorActive,
  textOpacity,
  progressBg
} = theme


  const points = useMemo(() => groupByCity(RAW_DATA, year), [year])
  const citiesCount = points.length

  const metricValues = useMemo(() => {
    const vals = points.map(p =>
      metric === 'sessions' ? p.sessions : p.msPlayed
    )
    const minV = vals.length ? Math.min(...vals) : 0
    const maxV = vals.length ? Math.max(...vals) : 0
    return { minV, maxV }
  }, [points, metric])

  const totals = useMemo(() => {
    const totalSessions = points.reduce((s, p) => s + p.sessions, 0)
    const totalMs = points.reduce((s, p) => s + p.msPlayed, 0)
    return { totalSessions, totalMs, cities: points.length }
  }, [points])


  
  return (
    <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', padding: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>Listening Geography</div>
          <div style={{ fontSize: 13, opacity: textOpacity, marginTop: 4 }}>
            GPS-based city data from geo, not conn_country.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 13, opacity: textOpacity }}>Year</div>
            <select
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              style={{
                height: 34,
                borderRadius: 10,
                border: `1px solid ${borderColor}`,
                background: bgColor,
                color: 'inherit',
                padding: '0 10px',
                outline: 'none'
              }}
            >
              {years.map(y => (
                <option key={y} value={y} style={{ color: '#111' }}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              onClick={() => setMetric('msPlayed')}
              style={{
                height: 34,
                padding: '0 10px',
                borderRadius: 10,
                border: `1px solid ${borderColor}`,
                background: metric === 'msPlayed' ? bgColorActive : bgColor,
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              Time played
            </button>
            <button
              onClick={() => setMetric('sessions')}
              style={{
                height: 34,
                padding: '0 10px',
                borderRadius: 10,
                border: `1px solid ${borderColor}`,
                background: metric === 'sessions' ? bgColorActive : bgColor,
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              Sessions
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, marginTop: 14 }}>
        <div
          style={{
            borderRadius: 18,
            border: `1px solid ${borderColor}`,
            overflow: 'hidden',
            minHeight: 520
          }}
        >
          <MapContainer center={[48, 24]} zoom={4} style={{ width: '100%', height: 520 }} scrollWheelZoom>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution="&copy; OpenStreetMap &copy; CARTO"
            />

            <FitToPoints points={points} />

            {points.map(p => {
              const value = metric === 'sessions' ? p.sessions : p.msPlayed
              const r = radiusFor(value, metricValues.minV, metricValues.maxV)
              const opacity = clamp(
                0.35 +
                  ((value - metricValues.minV) /
                    (metricValues.maxV - metricValues.minV)) *
                    0.55,
                0.35,
                0.9
              )

              return (
                <CircleMarker
                  key={`${p.lat}-${p.lng}`}
                  center={[p.lat, p.lng]}
                  radius={r}
                  pathOptions={{
                    color: 'rgba(255,255,255,0.65)',
                    weight: 1,
                    fillColor: `rgba(29,185,84,${opacity})`,
                    fillOpacity: 1
                  }}
                >
                  <Tooltip direction="top" offset={[0, -4]} opacity={1}>
                    <div>
                      <div style={{ fontWeight: 700 }}>
                        {p.city}, {p.country}
                      </div>
                      <div style={{ fontSize: 12, marginTop: 6 }}>
                        Time played: {formatMs(p.msPlayed)}
                      </div>
                      <div style={{ fontSize: 12 }}>
                        Sessions: {p.sessions}
                      </div>
                    </div>
                  </Tooltip>
                </CircleMarker>
              )
            })}
          </MapContainer>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ borderRadius: 18, border: `1px solid ${borderColor}`, padding: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>
              Summary ({year})
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

          <div style={{ borderRadius: 18, border: `1px solid ${borderColor}`, padding: 14 }}>
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
                  metric === 'sessions'
                    ? b.sessions - a.sessions
                    : b.msPlayed - a.msPlayed
                )
                .map(p => {
                  const val = metric === 'sessions' ? p.sessions : p.msPlayed
                  const total =
                    metric === 'sessions'
                      ? totals.totalSessions
                      : totals.totalMs
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
                        <div style={{ fontSize: 12, opacity: textOpacity }}>
                          {pct}%
                        </div>
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
              Interpretation note: this visualization is based on country-level
              connection metadata and/or IP-derived approximation. It is not a
              movement trace.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
