import { useEffect, useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { FitToPoints } from './FitToPoints'
import { formatMs, clamp, radiusFor } from './utils'

export function MapSection({ points, metric, metricValues }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return
    setTimeout(() => {
      mapRef.current.invalidateSize()
    }, 50)
  }, [points])

  return (
    <MapContainer
      center={[48, 24]}
      zoom={4}
      scrollWheelZoom
      style={{ width: '100%', height: 520 }}
      whenCreated={map => {
        mapRef.current = map
      }}
    >
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
              color: 'rgba(0, 0, 0, 0.25)',
              weight: 1,
              fillColor: '#1DB954',
              fillOpacity: 0.45
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
  )
}
