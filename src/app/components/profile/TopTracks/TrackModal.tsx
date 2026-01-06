import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Track } from './TopTracks'

type Props = {
  track: Track
  onClose: () => void
}

export function TrackModal({ track, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 16 }}
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
            src={track.cover}
            className="w-32 h-32 rounded-xl object-cover"
            alt={track.name}
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">
              {track.name}
            </h2>

            <p className="text-sm opacity-70 mb-3">
              {track.artist}
              {track.album && ` · ${track.album}`}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total streams</p>
                <p className="font-semibold">{track.plays}×</p>
              </div>

              <div>
                <p className="text-muted-foreground">Total minutes</p>
                <p className="font-semibold">{track.totalMinutes}m</p>
              </div>

              <div>
                <p className="text-muted-foreground">Track length</p>
                <p className="font-semibold">{track.duration}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Popularity</p>
                <p className="font-semibold">{track.popularity}/10</p>
              </div>

              <div>
                <p className="text-muted-foreground">First streamed</p>
                <p className="font-semibold">{track.firstStreamedAt}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Last streamed</p>
                <p className="font-semibold">{track.lastStreamedAt}</p>
              </div>

              {track.releaseYear && (
                <div>
                  <p className="text-muted-foreground">Release year</p>
                  <p className="font-semibold">{track.releaseYear}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
