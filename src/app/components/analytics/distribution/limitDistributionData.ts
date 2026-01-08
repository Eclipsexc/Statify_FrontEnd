export type DistributionItem = {
  name: string
  value: number
  sub?: string
}

export function limitDistributionData<T extends { value: number } & Record<string, any>>(data: T[], limit: number = 10): T[] {
  const sorted = [...data].sort((a, b) => b.value - a.value)
  const top = sorted.slice(0, limit)
  const rest = sorted.slice(limit)

  const totalTop = top.reduce((acc, d) => acc + d.value, 0)
  const totalRest = rest.reduce((acc, d) => acc + d.value, 0)
  const totalAll = totalTop + totalRest

  const normalizedTop = top.map(d => ({
    ...d,
    value: +(d.value / totalAll * 100).toFixed(1)
  }))

  if (rest.length === 0) return normalizedTop

  const other = {
    ...rest[0],
    name: 'Other',
    value: +(totalRest / totalAll * 100).toFixed(1),
    sub: undefined
  }

  return [...normalizedTop, other]
}
