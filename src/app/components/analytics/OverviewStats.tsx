import { motion } from 'motion/react'
import { ChartBar, Clock, Music, Users, Album } from 'lucide-react'

type Analytics = {
  totalStreams: number
  minutesStreamed: number
  hoursStreamed: number
  differentTracks: number
  differentArtists: number
  differentAlbums: number
}

type Props = {
  analytics: Analytics
}

export function OverviewStats({ analytics }: Props) {
  const cards = [
    { icon: ChartBar, label: 'Total Streams', value: analytics.totalStreams, color: '#1DB954' },
    { icon: Clock, label: 'Minutes Streamed', value: analytics.minutesStreamed, color: '#3B82F6' },
    { icon: Clock, label: 'Hours Streamed', value: analytics.hoursStreamed, color: '#8B5CF6' },
    { icon: Music, label: 'Different Tracks', value: analytics.differentTracks, color: '#F59E0B' },
    { icon: Users, label: 'Different Artists', value: analytics.differentArtists, color: '#EF4444' },
    { icon: Album, label: 'Different Albums', value: analytics.differentAlbums, color: '#10B981' }
  ]

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: `${card.color}20` }}>
                <Icon className="h-6 w-6" style={{ color: card.color }} />
              </div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-3xl font-bold" style={{ color: card.color }}>
                {card.value.toLocaleString()}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
