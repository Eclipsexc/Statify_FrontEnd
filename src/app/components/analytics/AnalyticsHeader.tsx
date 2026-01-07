import { ArrowLeft } from 'lucide-react'
import { DateRangePicker } from './DateRangePicker'

type Props = {
  onBack: () => void
}

export function AnalyticsHeader({ onBack }: Props) {
  return (
    <div className="mb-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Profile
      </button>

      <div className="flex items-center justify-between gap-6">
        <h1 className="text-4xl font-bold">Detailed Analytics</h1>

        <div className="min-w-[280px]">
          <DateRangePicker />
        </div>
      </div>
    </div>
  )
}
