import { Loader, CircleCheck, CircleX } from 'lucide-react'

type Props = {
  status: 'no-data' | 'syncing' | 'ready'
}

const CONFIG = {
  'no-data': {
    icon: CircleX,
    color: '#EF4444',
    text: 'No data uploaded',
    bg: 'bg-red-500/10',
  },
  syncing: {
    icon: Loader,
    color: '#3B82F6',
    text: 'Syncing data...',
    bg: 'bg-blue-500/10',
    spin: true,
  },
  ready: {
    icon: CircleCheck,
    color: '#1DB954',
    text: 'Data successfully loaded',
    bg: 'bg-green-500/10',
  },
} as const

export function StatusBadge({ status }: Props) {
  const cfg = CONFIG[status]
  const Icon = cfg.icon

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${cfg.bg} mb-4`}>
      <Icon
        className={`h-4 w-4 ${cfg.spin ? 'animate-spin' : ''}`}
        style={{ color: cfg.color }}
      />
      <span className="text-sm" style={{ color: cfg.color }}>
        {cfg.text}
      </span>
    </div>
  )
}
