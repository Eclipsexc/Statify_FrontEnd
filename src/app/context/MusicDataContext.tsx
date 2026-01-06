import React, { createContext, useContext, useState, ReactNode } from 'react';

type DataStatus = 'no-data' | 'syncing' | 'loaded';
type TimeFilter = '4-weeks' | '6-months' | 'all-time';
type ViewMode = 'list' | 'grid';

interface Track {
  id: string;
  name: string;
  artist: string;
  cover: string;
  plays: number;
}

interface Artist {
  id: string;
  name: string;
  image: string;
  plays: number;
}

interface Stream {
  id: string;
  trackName: string;
  artistName: string;
  cover: string;
  timestamp: string;
}

interface Analytics {
  totalStreams: number;
  minutesStreamed: number;
  hoursStreamed: number;
  differentTracks: number;
  differentArtists: number;
  differentAlbums: number;
}

interface MusicDataContextType {
  dataStatus: DataStatus;
  setDataStatus: (status: DataStatus) => void;
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  topGenres: string[];
  topTracks: Track[];
  topArtists: Artist[];
  recentStreams: Stream[];
  analytics: Analytics;
  handleFileUpload: (file: File) => void;
}

const MusicDataContext = createContext<MusicDataContextType | undefined>(undefined);

export function MusicDataProvider({ children }: { children: ReactNode }) {
  const [dataStatus, setDataStatus] = useState<DataStatus>('no-data');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('4-weeks');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  // Mock data
  const topGenres = ['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Indie', 'R&B', 'Jazz'];

  const topTracks: Track[] = Array.from({ length: 50 }, (_, i) => ({
    id: `track-${i}`,
    name: `Song Title ${i + 1}`,
    artist: `Artist ${Math.floor(i / 3) + 1}`,
    cover: `https://picsum.photos/seed/track${i}/200/200`,
    plays: 1000 - i * 15,
  }));

  const topArtists: Artist[] = Array.from({ length: 50 }, (_, i) => ({
    id: `artist-${i}`,
    name: `Artist ${i + 1}`,
    image: `https://picsum.photos/seed/artist${i}/200/200`,
    plays: 5000 - i * 50,
  }));

  const recentStreams: Stream[] = Array.from({ length: 20 }, (_, i) => ({
    id: `stream-${i}`,
    trackName: `Recent Song ${i + 1}`,
    artistName: `Artist ${Math.floor(i / 2) + 1}`,
    cover: `https://picsum.photos/seed/stream${i}/100/100`,
    timestamp: i === 0 ? '2 minutes ago' : i === 1 ? '1 hour ago' : `${i} hours ago`,
  }));

  const analytics: Analytics = {
    totalStreams: 12543,
    minutesStreamed: 45230,
    hoursStreamed: 754,
    differentTracks: 1234,
    differentArtists: 567,
    differentAlbums: 892,
  };

  const handleFileUpload = (file: File) => {
    setDataStatus('syncing');
    // Simulate upload and processing
    setTimeout(() => {
      setDataStatus('loaded');
    }, 3000);
  };

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
        handleFileUpload,
      }}
    >
      {children}
    </MusicDataContext.Provider>
  );
}

export function useMusicData() {
  const context = useContext(MusicDataContext);
  if (!context) {
    throw new Error('useMusicData must be used within MusicDataProvider');
  }
  return context;
}
