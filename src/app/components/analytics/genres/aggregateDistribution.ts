type Item = {
  name: string
  value: number
}

export function aggregateDistribution(
  data: Item[],
  options?: {
    minPercent?: number
    maxItems?: number
    otherLabel?: string
  }
): Item[] {
  const {
    minPercent = 5,
    maxItems = 10,
    otherLabel = 'Other'
  } = options || {}

  const total = data.reduce((s, d) => s + d.value, 0)

  const sorted = [...data].sort((a, b) => b.value - a.value)

  const main: Item[] = []
  let otherValue = 0

  sorted.forEach((item, i) => {
    const percent = (item.value / total) * 100

    if (percent < minPercent || main.length >= maxItems) {
      otherValue += item.value
    } else {
      main.push(item)
    }
  })

  if (otherValue > 0) {
    main.push({
      name: otherLabel,
      value: Math.round(otherValue)
    })
  }

  return main
}
