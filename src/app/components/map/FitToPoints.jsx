import { useMap } from 'react-leaflet'
import { useMemo } from 'react'

export function FitToPoints({ points }) {
  const map = useMap()

  useMemo(() => {
    if (!points.length) return
    const bounds = points.map(p => [p.lat, p.lng])
    map.fitBounds(bounds, { padding: [28, 28] })
  }, [map, points])

  return null
}
