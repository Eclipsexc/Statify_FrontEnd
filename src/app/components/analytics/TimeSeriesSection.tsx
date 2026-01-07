'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { ChartCard } from './ChartCard'
import { ChartToggle } from './ChartToggle'

type Granularity = 'day' | 'week' | 'month' | 'year'

const granularity: Granularity = 'month'

const data = Array.from({ length: 30 }, (_, i) => ({
  label: `${i + 1}`,
  streams: Math.floor(Math.random() * 150) + 50
}))

function getSubtitle(g: Granularity) {
  switch (g) {
    case 'day':
      return 'Streams aggregated by day'
    case 'week':
      return 'Streams aggregated by week'
    case 'month':
      return 'Streams aggregated by month'
    case 'year':
      return 'Streams aggregated by year'
  }
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null

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
        {label}
      </div>

      <div className="font-semibold tabular-nums">
        <span className="text-[#1DB954]">
          {payload[0].value}
        </span>{' '}
        streams
      </div>
    </div>
  )
}

export function TimeSeriesSection() {
  const [type, setType] = useState<'line' | 'bar'>('line')

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Listening Intensity
          </h2>
          <p className="text-sm text-muted-foreground">
            {getSubtitle(granularity)}
          </p>
        </div>

        <ChartToggle
          value={type}
          onChange={setType}
          options={[
            { value: 'line', label: 'line' },
            { value: 'bar', label: 'bar' }
          ]}
        />
      </div>

      <ChartCard title="Streams">
        <ResponsiveContainer width="100%" height={400}>
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid stroke="#27272A" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#1DB954', strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="streams"
                stroke="#1DB954"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid stroke="#27272A" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(29,185,84,0.1)' }}
              />
              <Bar
                dataKey="streams"
                fill="#1DB954"
                radius={[8, 8, 0, 0]}
                isAnimationActive
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </ChartCard>
    </section>
  )
}
