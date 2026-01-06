import { useState } from 'react'
import { Grid3x3, List, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { TrackList } from './TrackList'
import { TrackGrid } from './TrackGrid'
import { useTrackScroll } from './useTrackScroll'
import { TrackModal } from './TrackModal'

export type Track = {
  id: string | number
  cover: string
  name: string
  artist: string
  plays: number
  followers?: number
  totalMinutes?: number
  popularity?: number
  duration?: string
  releaseYear?: number
  album?: string
  firstStreamedAt?: string
  lastStreamedAt?: string
}

type ViewMode = 'list' | 'grid'

type Props = {
  tracks: Track[]
  viewMode: ViewMode
  onViewChange: (v: ViewMode) => void
}

export function TopTracks({ tracks, viewMode, onViewChange }: Props) {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null)

  const {
    ref,
    visibleCount,
    scroll,
    onScroll,
    reset,
    canLeft,
    canRight,
  } = useTrackScroll(tracks.length)

  return (
    <>
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Top Tracks</h2>

          <div className="flex items-center gap-2">
            {viewMode === 'list' && (
              <>
                <button
                  onClick={() => scroll('left')}
                  disabled={!canLeft}
                  className={`h-9 w-9 rounded-lg border flex items-center justify-center
                    transition-all duration-200
                    ${canLeft
                      ? 'bg-neutral-100 text-black hover:bg-neutral-200 hover:scale-105 active:scale-95 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700'
                      : 'opacity-30 cursor-not-allowed'}`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={() => scroll('right')}
                  disabled={!canRight}
                  className={`h-9 w-9 rounded-lg border flex items-center justify-center
                    transition-all duration-200
                    ${canRight
                      ? 'bg-neutral-100 text-black hover:bg-neutral-200 hover:scale-105 active:scale-95 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700'
                      : 'opacity-30 cursor-not-allowed'}`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            <button
              onClick={() => {
                onViewChange('list')
                reset()
              }}
              className={`p-2 rounded-lg transition-all
                ${viewMode === 'list'
                  ? 'bg-[#1DB954] text-white'
                  : 'bg-secondary hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
            >
              <List />
            </button>

            <button
              onClick={() => onViewChange('grid')}
              className={`p-2 rounded-lg transition-all
                ${viewMode === 'grid'
                  ? 'bg-[#1DB954] text-white'
                  : 'bg-secondary hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
            >
              <Grid3x3 />
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <TrackList
            tracks={tracks.slice(0, visibleCount)}
            containerRef={ref}
            onScroll={onScroll}
            onSelect={setActiveTrack}
          />
        ) : (
          <TrackGrid
            tracks={tracks}
            onSelect={setActiveTrack}
          />
        )}
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
