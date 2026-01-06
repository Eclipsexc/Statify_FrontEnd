import { motion } from 'framer-motion'

type Track = {
  id: string | number
  cover: string
  name: string
  artist: string
}

type Props = {
  tracks: Track[]
  onSelect: (track: Track) => void
}

export function TrackGrid({ tracks, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto pr-2">
      {tracks.map((t, i) => (
        <motion.div
          key={t.id}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={() => onSelect(t)}
          className="p-3 rounded-lg bg-card cursor-pointer hover:shadow-lg"
        >
          <img
            src={t.cover}
            alt={t.name}
            className="w-full aspect-square rounded mb-2"
          />
          <h3 className="text-xs font-semibold truncate">{t.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{t.artist}</p>
        </motion.div>
      ))}
    </div>
  )
}
