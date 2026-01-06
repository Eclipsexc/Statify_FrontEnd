import { motion } from 'framer-motion'
import { X } from 'lucide-react'

type Artist = {
  id: string | number
  name: string
  image: string
  plays: number
  followers?: number
  totalMinutes?: number
  firstStreamedAt?: string
  lastStreamedAt?: string
  popularity?: number
}

type Props = {
  artist: Artist
  onClose: () => void
}

export function ArtistModal({ artist, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-xl bg-card rounded-2xl p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 opacity-60 hover:opacity-100"
        >
          <X />
        </button>

        <div className="flex gap-6">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-32 h-32 rounded-full"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {artist.name}
            </h2>

            <p className="text-sm text-[#1DB954] mb-4">
              {(artist.followers ?? 0).toLocaleString()} followers
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total streams</p>
                <p className="font-semibold">
                  {artist.plays ?? '—'}×
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Total minutes</p>
                <p className="font-semibold">
                  {artist.totalMinutes ?? '—'}m
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">First streamed</p>
                <p className="font-semibold">
                  {artist.firstStreamedAt ?? '—'}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Last streamed</p>
                <p className="font-semibold">
                  {artist.lastStreamedAt ?? '—'}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Popularity</p>
                <p className="font-semibold">
                  {artist.popularity ?? '—'}/10
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
