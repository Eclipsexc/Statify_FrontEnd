import { useState } from 'react'

export type TimeSeriesChartType = 'line' | 'bar'

export function useAnalyticsCharts() {
  const [timeSeriesType, setTimeSeriesType] = useState<TimeSeriesChartType>('line')

  const isLine = timeSeriesType === 'line'
  const isBar = timeSeriesType === 'bar'

  return {
    timeSeriesType,
    setTimeSeriesType,
    isLine,
    isBar
  }
}
