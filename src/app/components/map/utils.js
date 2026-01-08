export function formatMs(ms) {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  return `${h}h ${m}m`
}

export function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v))
}

export function radiusFor(value, minV, maxV) {
  if (maxV === minV) return 18
  const t = (value - minV) / (maxV - minV)
  return 10 + t * 26
}

export function groupByCity(data, yearFilter) {
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
