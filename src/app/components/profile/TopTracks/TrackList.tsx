import { motion } from 'framer-motion'
import type { Track } from './TopTracks' 

type Props = {
  tracks: Track[]
  containerRef: React.RefObject<HTMLDivElement | null>
  onScroll: () => void
  onSelect: (track: Track) => void
}

export function TrackList({ tracks, containerRef, onScroll, onSelect }: Props) {
  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide h-[320px]"
    >
      {tracks.map((t, i) => (
        <motion.div
          key={t.id}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={() => onSelect(t)}
          className="w-48 flex-shrink-0 p-4 rounded-lg bg-card cursor-pointer hover:shadow-lg"
        >
          <div className="relative mb-2">
            <img
              src={t.cover}
              alt={t.name}
              className="w-full aspect-square rounded"
            />
            <div className="absolute top-1 left-1 bg-[#1DB954] text-white text-xs px-2 rounded">
              #{i + 1}
            </div>
          </div>

          <h3 className="text-sm font-semibold truncate">{t.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{t.artist}</p>
          <p className="text-xs text-[#1DB954]">{t.plays} plays</p>
        </motion.div>
      ))}
    </div>
  )
}
