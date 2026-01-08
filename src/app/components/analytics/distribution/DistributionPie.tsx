'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

type DistributionItem = {
  name: string
  value: number
}

type Props = {
  data: DistributionItem[]
}

export const COLORS = [
  '#1DB954',
  '#22c55e',
  '#34d399',
  '#10b981',
  '#059669',
  '#047857',
  '#065f46',
  '#022c22',
  '#00aa77',
  '#00875a',
  '#0f766e'
]

export function DistributionPie({ data }: Props) {
  const [active, setActive] = useState<number | null>(null)
  const current = active !== null ? data[active] : null

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-[360px_420px] items-center gap-20">
        <div className="relative h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                cx="50%"
                cy="50%"
                stroke="none"
                onMouseLeave={() => setActive(null)}
                isAnimationActive
                animationDuration={800}
              >
                {data.map((_, i) => {
                  const opacity =
                    active === null
                      ? 1
                      : active === i
                      ? 1
                      : 0.25

                  return (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                      onMouseEnter={() => setActive(i)}
                      style={{
                        transition: 'opacity 0.25s ease',
                        opacity
                      }}
                    />
                  )
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            {current ? (
<div className="
  px-3 py-2 rounded-md
  bg-zinc-100/30 dark:bg-zinc-900/30
  backdrop-blur-sm
  transition-all duration-200
">
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {current.name}
                </div>
                <div className="mt-0.5 text-2xl font-bold text-green-500">
                  {current.value}%
                </div>
              </div>
            ) : (
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Hover to explore
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {data.map((item, i) => {
            const opacity =
              active === null
                ? 1
                : active === i
                ? 1
                : 0.25

            return (
              <div
                key={item.name}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="
                  flex items-center justify-between gap-6 text-sm
                  transition-colors duration-200
                "
                style={{ opacity }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="
                    text-zinc-900 dark:text-zinc-100
                    transition-colors
                  ">
                    {item.name}
                  </span>
                </div>

                <span className="text-zinc-600 dark:text-zinc-300 tabular-nums w-[52px] text-right">
                  {item.value}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
