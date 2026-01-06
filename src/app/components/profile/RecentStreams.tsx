import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrackModal } from './TopTracks/TrackModal'

type Stream = {
  id: string | number
  cover: string
  trackName: string
  artistName: string
  timestamp: string
}

type Track = {
  id: string | number
  cover: string
  name: string
  artist: string
  plays: number
  firstStreamedAt?: string
  lastStreamedAt?: string
}

type Props = {
  streams: Stream[]
}

export function RecentStreams({ streams }: Props) {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null)

  const openFromStream = (s: Stream) => {
    setActiveTrack({
      id: s.id,
      cover: s.cover,
      name: s.trackName,
      artist: s.artistName,
      plays: 1,
      firstStreamedAt: s.timestamp,
      lastStreamedAt: s.timestamp,
    })
  }

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Recent Streams
        </h2>

        <div className="space-y-2">
          {streams.map((s, i) => (
            <motion.div
              key={s.id}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.18 }}
              onClick={() => openFromStream(s)}
              className="flex gap-4 p-3 rounded-lg bg-card cursor-pointer hover:shadow-md"
            >
              <img
                src={s.cover}
                className="w-12 h-12 rounded"
              />

              <div className="flex-1">
                <h3 className="text-sm font-semibold">
                  {s.trackName}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {s.artistName}
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                {s.timestamp}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeTrack && (
          <TrackModal
            track={activeTrack}
            onClose={() => setActiveTrack(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
