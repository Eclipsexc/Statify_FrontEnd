import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArtistModal } from './ArtistModal'

type Artist = {
  id: string | number
  name: string
  image: string
  plays: number
  followers: number
  totalMinutes: number
  firstStreamedAt: string
  lastStreamedAt: string
  popularity: number
}

type Props = {
  artists: Artist[]
}

const COLS = 5
const ROWS = 3
const WINDOW_SIZE = COLS * ROWS

export function TopArtists({ artists }: Props) {
  const [startRow, setStartRow] = useState(0)
  const [activeArtist, setActiveArtist] = useState<Artist | null>(null)

  const totalRows = Math.ceil(artists.length / COLS)
  const maxStartRow = Math.max(0, totalRows - ROWS)

  const startIndex = startRow * COLS
  const visible = artists.slice(startIndex, startIndex + WINDOW_SIZE)

  const canUp = startRow > 0
  const canDown = startRow < maxStartRow

  return (
    <>
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Top Artists</h2>

          <div className="flex gap-2">
            <button
              onClick={() => setStartRow(r => Math.max(0, r - 1))}
              disabled={!canUp}
              className={`h-9 w-9 rounded-lg border flex items-center justify-center
                transition-all duration-200
                ${canUp
                  ? 'hover:scale-105 dark:hover:bg-neutral-800'
                  : 'opacity-30 cursor-not-allowed'}`}
            >
              <ChevronUp className="h-4 w-4" />
            </button>

            <button
              onClick={() => setStartRow(r => Math.min(maxStartRow, r + 1))}
              disabled={!canDown}
              className={`h-9 w-9 rounded-lg border flex items-center justify-center
                transition-all duration-200
                ${canDown
                  ? 'hover:scale-105 dark:hover:bg-neutral-800'
                  : 'opacity-30 cursor-not-allowed'}`}
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {visible.map((a, i) => {
            const rank = startIndex + i + 1

            return (
              <motion.div
                key={a.id}
                onClick={() => setActiveArtist(a)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="relative p-6 rounded-xl bg-card text-center cursor-pointer
                  hover:shadow-lg"
              >
                <div className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-md
                  bg-[#1DB954] text-white">
                  #{rank}
                </div>

                <img
                  src={a.image}
                  alt={a.name}
                  className="w-28 h-28 rounded-full mx-auto mb-3 object-cover"
                />

                <h3 className="text-sm font-semibold truncate">
                  {a.name}
                </h3>

                <p className="text-xs text-[#1DB954]">
                  {a.plays} plays
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <AnimatePresence>
        {activeArtist && (
          <ArtistModal
            artist={activeArtist}
            onClose={() => setActiveArtist(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
