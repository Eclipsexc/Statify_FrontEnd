'use client'

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { ChartCard } from './ChartCard'

const data = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  streams: Math.floor(Math.random() * 100) + 20,
  minutes: Math.floor(Math.random() * 200) + 50
}))

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null

  const { name, value } = payload[0]
  return (
    <div
      className="
        rounded-lg
        border-2
        px-4 py-2
        shadow-lg
        text-sm
        bg-white
        border-black
        dark:bg-black
        dark:border-white
        dark:text-white
      "
    >
      <div className="text-xs opacity-70 mb-1">
        Hour {label}
      </div>

      <div className="font-semibold tabular-nums">
        <span className={name === 'streams' ? 'text-[#1DB954]' : 'text-[#3B82F6]'}>
          {value}
        </span>{' '}
        {name}
      </div>
    </div>
  )
}

export function HourlyRadarSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Listening Activity by Hour</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Streams Count">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={data}>
              <PolarGrid stroke="#27272A" />
              <PolarAngleAxis dataKey="hour" tick={{ fill: '#A1A1AA' }} />
              <Radar dataKey="streams" stroke="#1DB954" fill="#1DB954" fillOpacity={0.3} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Minutes Streamed">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={data}>
              <PolarGrid stroke="#27272A" />
              <PolarAngleAxis dataKey="hour" tick={{ fill: '#A1A1AA' }} />
              <Radar dataKey="minutes" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  )
}
