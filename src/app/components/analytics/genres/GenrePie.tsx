import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

type Genre = {
  name: string
  value: number
}

type Props = {
  data: Genre[]
}

const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534']

export function GenrePie({ data }: Props) {
  const [active, setActive] = useState<number | null>(null)

  const total = data.reduce((s, d) => s + d.value, 0)
  const current = active !== null ? data[active] : null

  return (
    <div className="relative h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            isAnimationActive
            animationBegin={150}
            animationDuration={900}
            animationEasing="ease-out"
            onMouseLeave={() => setActive(null)}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
                onMouseEnter={() => setActive(i)}
                style={{
                  transition: 'opacity 0.25s ease',
                  opacity: active === null || active === i ? 1 : 0.35
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {current && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-sm opacity-80">
            {current.name}
          </div>
          <div className="text-2xl font-bold text-green-400">
            {Math.round((current.value / total) * 100)}%
          </div>
        </div>
      )}
    </div>
  )
}
