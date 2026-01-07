'use client'

import { useEffect, useState } from 'react'

type Genre = {
  name: string
  value: number
}

type Props = {
  data: Genre[]
}

export function GenreBars({ data }: Props) {
  const max = Math.max(...data.map(d => d.value))
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [visible, setVisible] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const p: Record<string, number> = {}
    const v: Record<string, boolean> = {}

    data.forEach(g => {
      p[g.name] = 0
      v[g.name] = false
    })

    setProgress(p)
    setVisible(v)

    data.forEach((g, i) => {
      setTimeout(() => {
        setVisible(s => ({ ...s, [g.name]: true }))
        requestAnimationFrame(() => {
          setProgress(s => ({
            ...s,
            [g.name]: (g.value / max) * 100
          }))
        })
      }, i * 70)
    })
  }, [data, max])

  return (
    <div className="flex flex-col gap-5">
      <style jsx>{`
        @keyframes barPulse {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
          100% { filter: brightness(1); }
        }
      `}</style>

      {data.map(g => (
        <div
          key={g.name}
          className={`group flex items-center gap-6 rounded-md px-2 py-1
            transition-all duration-300
            ${visible[g.name]
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-2'}
            hover:bg-zinc-100 dark:hover:bg-zinc-800/60
            hover:translate-x-1
          `}
        >
          <div className="w-32 text-[13px] font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
            {g.name}
          </div>

          <div className="flex-1 h-[10px] rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full transition-[width] duration-700 ease-[cubic-bezier(.22,.61,.36,1)]
                         group-hover:animate-[barPulse_0.6s_ease-in-out]
                         origin-left"
              style={{
                width: `${progress[g.name] ?? 0}%`,
                background: 'linear-gradient(90deg, #22c55e, #1DB954)'
              }}
            />
          </div>

          <div className="w-12 text-right text-[13px] font-semibold tabular-nums text-zinc-700 dark:text-zinc-300">
            {g.value}%
          </div>
        </div>
      ))}
    </div>
  )
}
