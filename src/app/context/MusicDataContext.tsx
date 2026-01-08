import React, { createContext, useContext, useState, ReactNode } from 'react'

export type DataStatus = 'no-data' | 'syncing' | 'loaded'
export type TimeFilter = '4-weeks' | '6-months' | 'all-time'
export type ViewMode = 'list' | 'grid'

export interface Track {
  id: string
  name: string
  artist: string
  cover: string
  plays: number
}

export interface Artist {
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

export interface Stream {
  id: string
  trackName: string
  artistName: string
  cover: string
  timestamp: string
}

export interface Analytics {
  totalStreams: number
  minutesStreamed: number
  hoursStreamed: number
  differentTracks: number
  differentArtists: number
  differentAlbums: number
}

export interface PlatformStat {
  platform: string
  totalMs: number
  sessions: number
}

export interface DistributionAnalytics {
  platformStats: PlatformStat[]
  topArtists: {
    name: string
    plays: number
  }[]
  topAlbums: {
    name: string
    artist: string
    plays: number
  }[]
}

interface MusicDataContextType {
  dataStatus: DataStatus
  setDataStatus: (status: DataStatus) => void
  timeFilter: TimeFilter
  setTimeFilter: (filter: TimeFilter) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  topGenres: string[]
  topTracks: Track[]
  topArtists: Artist[]
  recentStreams: Stream[]
  analytics: Analytics
  distributionAnalytics: DistributionAnalytics
  handleFileUpload: (file: File) => void
}

const MusicDataContext = createContext<MusicDataContextType | undefined>(undefined)

export function MusicDataProvider({ children }: { children: ReactNode }) {
  const [dataStatus, setDataStatus] = useState<DataStatus>('no-data')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('4-weeks')
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  const topGenres = ['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Indie', 'R&B', 'Jazz']

  const topTracks: Track[] = Array.from({ length: 50 }, (_, i) => ({
    id: `track-${i}`,
    name: `Song Title ${i + 1}`,
    artist: `Artist ${Math.floor(i / 3) + 1}`,
    cover: `https://picsum.photos/seed/track${i}/200/200`,
    plays: 1000 - i * 15,
  }))

  const topArtists: Artist[] = Array.from({ length: 50 }, (_, i) => ({
    id: `artist-${i}`,
    name: `Artist ${i + 1}`,
    image: `https://picsum.photos/seed/artist${i}/200/200`,
    plays: 5000 - i * 50,
    followers: 20000 - i * 200,
    totalMinutes: 12000 - i * 120,
    firstStreamedAt: `${2022 + Math.floor(i / 20)}-01-01`,
    lastStreamedAt: '2024-12-31',
    popularity: 10 - (i % 10),
  }))

  const recentStreams: Stream[] = Array.from({ length: 20 }, (_, i) => ({
    id: `stream-${i}`,
    trackName: `Recent Song ${i + 1}`,
    artistName: `Artist ${Math.floor(i / 2) + 1}`,
    cover: `https://picsum.photos/seed/stream${i}/100/100`,
    timestamp:
      i === 0
        ? '2 minutes ago'
        : i === 1
        ? '1 hour ago'
        : `${i} hours ago`,
  }))

  const analytics: Analytics = {
    totalStreams: 12543,
    minutesStreamed: 45230,
    hoursStreamed: 754,
    differentTracks: 1234,
    differentArtists: 567,
    differentAlbums: 892,
  }

  const distributionAnalytics: DistributionAnalytics = {
    platformStats: [
      { platform: 'iOS', totalMs: 3600000, sessions: 40 },
      { platform: 'Web', totalMs: 1800000, sessions: 25 },
      { platform: 'Desktop', totalMs: 900000, sessions: 10 },
    ],
    topArtists: [
      { name: 'Drake', plays: 42 },
      { name: 'Radiohead', plays: 31 },
      { name: 'Kendrick Lamar', plays: 27 },
    ],
    topAlbums: [
      { name: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', plays: 22 },
      { name: 'OK Computer', artist: 'Radiohead', plays: 18 },
      { name: 'Nothing Was the Same', artist: 'Drake', plays: 15 },
      { name: 'DAMN.', artist: 'Kendrick Lamar', plays: 14 },
      { name: 'Take Care', artist: 'Drake', plays: 13 },
      { name: 'Kid A', artist: 'Radiohead', plays: 12 },
      { name: 'Good Kid, M.A.A.D City', artist: 'Kendrick Lamar', plays: 11 },
      { name: 'Views', artist: 'Drake', plays: 10 },
      { name: 'Amnesiac', artist: 'Radiohead', plays: 9 },
      { name: 'More Life', artist: 'Drake', plays: 8 },
      { name: 'The Big Day', artist: 'Chance the Rapper', plays: 7 },
      { name: 'The Life of Pablo', artist: 'Kanye West', plays: 6 },
      { name: 'Donda', artist: 'Kanye West', plays: 5 },
      { name: 'Scorpion', artist: 'Drake', plays: 4 },
      { name: 'Section.80', artist: 'Kendrick Lamar', plays: 3 },
    ],
  }

  const handleFileUpload = () => {
    setDataStatus('syncing')
    setTimeout(() => {
      setDataStatus('loaded')
    }, 3000)
  }

  return (
    <MusicDataContext.Provider
      value={{
        dataStatus,
        setDataStatus,
        timeFilter,
        setTimeFilter,
        viewMode,
        setViewMode,
        topGenres,
        topTracks,
        topArtists,
        recentStreams,
        analytics,
        distributionAnalytics,
        handleFileUpload,
      }}
    >
      {children}
    </MusicDataContext.Provider>
  )
}

export function useMusicData() {
  const context = useContext(MusicDataContext)
  if (!context) {
    throw new Error('useMusicData must be used within MusicDataProvider')
  }
  return context
}
