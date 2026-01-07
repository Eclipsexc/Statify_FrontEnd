'use client'

import { useState } from 'react'
import { ChartCard } from '../ChartCard'
import { GenrePie } from './GenrePie'
import { GenreBars } from './GenreBars'
import { ChartToggle } from '../ChartToggle'

type Genre = {
  name: string
  value: number
}

const data: Genre[] = [
  { name: 'Alternative', value: 22 },
  { name: 'Hip-Hop', value: 18 },
  { name: 'Rock', value: 15 },
  { name: 'Pop', value: 12 },
  { name: 'Indie', value: 9 },
  { name: 'Electronic', value: 8 },
  { name: 'R&B', value: 6 },
  { name: 'Jazz', value: 4 },
  { name: 'Metal', value: 3 },
  { name: 'Classical', value: 3 }
]

export function GenreSection() {
  const [type, setType] = useState<'bar' | 'pie'>('bar')

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Топ жанри
        </h2>

        <ChartToggle
          value={type}
          onChange={setType}
          options={[
            { value: 'bar', label: 'bar' },
            { value: 'pie', label: 'pie' }
          ]}
        />
      </div>

      <ChartCard>
        {type === 'bar' && <GenreBars key="bars" data={data} />}
        {type === 'pie' && <GenrePie data={data} />}
      </ChartCard>
    </section>
  )
}
