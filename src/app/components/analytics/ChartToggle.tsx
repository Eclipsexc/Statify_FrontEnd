type Option<T extends string> = {
  value: T
  label: string
}

type Props<T extends string> = {
  value: T
  onChange: (v: T) => void
  options: Option<T>[]
}

export function ChartToggle<T extends string>({
  value,
  onChange,
  options
}: Props<T>) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-zinc-200 dark:bg-zinc-800 p-1">
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            value === o.value
              ? 'bg-green-500 text-black'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
