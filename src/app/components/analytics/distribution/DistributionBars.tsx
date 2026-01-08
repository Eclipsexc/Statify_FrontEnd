'use client'

import { useEffect, useState } from 'react'

type DistributionItem = {
  name: string
  value: number
  sub?: string
}

type Props = {
  data: DistributionItem[]
}

export function DistributionBars({ data }: Props) {
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [visible, setVisible] = useState<Record<string, boolean>>({})
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const p: Record<string, number> = {}
    const v: Record<string, boolean> = {}

    data.forEach(item => {
      p[item.name] = 0
      v[item.name] = false
    })

    setProgress(p)
    setVisible(v)

    data.forEach((item, i) => {
      setTimeout(() => {
        setVisible(s => ({ ...s, [item.name]: true }))
        requestAnimationFrame(() => {
          setProgress(s => ({
            ...s,
            [item.name]: item.value
          }))
        })
      }, i * 70)
    })
  }, [data])

  return (
    <div className="flex flex-col gap-5">
      <style>{`
        @keyframes barPulse {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.25); }
          100% { filter: brightness(1); }
        }
      `}</style>

      {data.map(item => {
        const isOther = item.name.trim().toLowerCase() === 'other'
        const barColor = isOther
          ? '#71717a'
          : 'linear-gradient(90deg, #22c55e, #1DB954)'

        const opacity =
          active === null
            ? 1
            : active === item.name
            ? 1
            : 0.25

        return (
          <div
            key={item.name}
            onMouseEnter={() => setActive(item.name)}
            onMouseLeave={() => setActive(null)}
            className={`
              group flex items-center gap-6 rounded-md px-2 py-1
              transition-all duration-300
              ${visible[item.name]
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2'}
              hover:bg-zinc-100 dark:hover:bg-zinc-800/60
            `}
            style={{ opacity }}
          >
            <div className="w-40 flex flex-col leading-tight">
              <div className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                {item.name}
              </div>

              {item.sub && (
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {item.sub}
                </div>
              )}
            </div>

            <div className="flex-1 h-[10px] rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              <div
                className="
                  h-full origin-left
                  transition-[width] duration-700
                  ease-[cubic-bezier(.22,.61,.36,1)]
                  group-hover:animate-[barPulse_0.6s_ease-in-out]
                "
                style={{
                  width: `${progress[item.name] ?? 0}%`,
                  background: barColor
                }}
              />
            </div>

            <div className="w-12 text-right text-[13px] font-semibold tabular-nums text-zinc-700 dark:text-zinc-300">
              {item.value}%
            </div>
          </div>
        )
      })}
    </div>
  )
}
