'use client'

import { DistributionBars } from './DistributionBars'
import { DistributionPie } from './DistributionPie'

type DistributionItem = {
  name: string
  value: number
  sub?: string
}

type Props = {
  data: DistributionItem[]
  mode: 'bar' | 'pie'
}

export function DistributionSection({ data, mode }: Props) {
  return (
    <div className="rounded-xl border border-muted px-6 py-5">
      {mode === 'bar' ? (
        <DistributionBars data={data} />
      ) : (
        <DistributionPie data={data} />
      )}
    </div>
  )
}
