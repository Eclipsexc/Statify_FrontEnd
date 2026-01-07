'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChartCard } from './ChartCard'

const data = [
  { name: 'Alternative', value: 35, color: '#22c55e' },
  { name: 'Hip-Hop', value: 28, color: '#16a34a' },
  { name: 'Rock', value: 22, color: '#15803d' },
  { name: 'Pop', value: 15, color: '#166534' }
]

export function GenrePieSection() {
  const [active, setActive] = useState<number | null>(null)

  const total = data.reduce((s, d) => s + d.value, 0)
  const current = active !== null ? data[active] : null

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Топ жанри</h2>

      <ChartCard>
        <div className="relative h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={130}
                paddingAngle={3}
                onMouseLeave={() => setActive(null)}
              >
                {data.map((g, i) => (
                  <Cell
                    key={g.name}
                    fill={g.color}
                    onMouseEnter={() => setActive(i)}
                    style={{
                      transition: 'all 0.25s ease',
                      filter:
                        active === i
                          ? 'drop-shadow(0 0 10px rgba(34,197,94,0.55))'
                          : 'none',
                      transform:
                        active === i ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <AnimatePresence>
            {current && (
              <motion.div
                key={current.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              >
                <div className="text-lg font-semibold">
                  {current.name}
                </div>
                <div className="text-3xl font-bold text-green-400">
                  {Math.round((current.value / total) * 100)}%
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {data.map((g, i) => (
            <div
              key={g.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: g.color }}
                />
                <span>{g.name}</span>
              </div>
              <span className="opacity-70">{g.value}%</span>
            </div>
          ))}
        </div>
      </ChartCard>
    </section>
  )
}
