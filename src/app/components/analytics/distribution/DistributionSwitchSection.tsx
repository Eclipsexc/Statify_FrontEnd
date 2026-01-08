'use client'

import { useState } from 'react'
import { DistributionSection } from './DistributionSection'
import { limitDistributionData } from './limitDistributionData'

type Analytics = {
  platformStats?: { platform: string; totalMs: number; sessions: number }[]
  topArtists?: { name: string; plays: number }[]
  topAlbums?: { name: string; artist?: string; plays: number }[]
}

type Props = {
  analytics?: Analytics
}

const OPTIONS = [
  { label: 'Platforms', value: 'platforms' },
  { label: 'Artists', value: 'artists' },
  { label: 'Albums', value: 'albums' },
] as const

const MODES = ['bar', 'pie'] as const

type Option = (typeof OPTIONS)[number]['value']
type Mode = (typeof MODES)[number]

export function DistributionSwitchSection({ analytics }: Props) {
  const [option, setOption] = useState<Option>('platforms')
  const [mode, setMode] = useState<Mode>('bar')

  const platforms = analytics?.platformStats ?? []
  const artists = analytics?.topArtists ?? []
  const albums = analytics?.topAlbums ?? []

  const raw =
    option === 'platforms'
      ? platforms.map(p => ({
          name: p.platform,
          value: Math.round(p.totalMs / 60000),
        }))
      : option === 'artists'
        ? artists.map(a => ({
            name: a.name,
            value: a.plays,
          }))
        : albums.map(a => ({
            name: a.name,
            sub: a.artist,
            value: a.plays,
          }))

  const data = limitDistributionData(raw, 10)

  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Distribution
          </h2>

          <div className="flex rounded-full border border-muted overflow-hidden shadow-sm">
            {OPTIONS.map(o => (
              <button
                key={o.value}
                onClick={() => setOption(o.value)}
                className={`px-4 py-1.5 text-[13px] font-semibold tracking-tight uppercase transition-all
                  ${option === o.value
                    ? 'bg-[#1DB954] text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/40'}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex rounded-full border border-muted overflow-hidden shadow-sm self-start sm:self-auto">
          {MODES.map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 text-[13px] font-semibold tracking-tight uppercase transition-all
                ${mode === m
                  ? 'bg-[#1DB954] text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/40'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <DistributionSection data={data} mode={mode} />
    </section>
  )
}
