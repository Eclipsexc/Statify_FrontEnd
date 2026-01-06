type TimeFilterValue = '4-weeks' | '6-months' | 'all-time'

type Props = {
  value: TimeFilterValue
  onChange: (v: TimeFilterValue) => void
}

const OPTIONS: { value: TimeFilterValue; label: string }[] = [
  { value: '4-weeks', label: '4 weeks' },
  { value: '6-months', label: '6 months' },
  { value: 'all-time', label: 'All time' },
]

export function TimeFilter({ value, onChange }: Props) {
  return (
    <div className="inline-flex bg-card rounded-full p-1 mb-12">
      {OPTIONS.map((o) => {
        const active = value === o.value

        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`
              px-5 py-2 text-sm rounded-full
              transition-all duration-200
              ${active
                ? 'bg-[#1DB954] text-white'
                : 'text-muted-foreground hover:text-foreground'}
            `}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
