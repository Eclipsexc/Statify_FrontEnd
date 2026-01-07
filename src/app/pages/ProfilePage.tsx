import { useNavigate } from 'react-router-dom'
import { useMusicData } from '../context/MusicDataContext'

import { ProfileHeader } from '../components/profile/ProfileHeader'
import { TimeFilter } from '../components/profile/TimeFilter'
import { TopGenres } from '../components/profile/TopGenres'
import { TopTracks } from '../components/profile/TopTracks/TopTracks'
import { TopArtists } from '../components/profile/TopArtists'
import { RecentStreams } from '../components/profile/RecentStreams'

export function ProfilePage() {
  const navigate = useNavigate()

  const {
    dataStatus,
    timeFilter,
    setTimeFilter,
    viewMode,
    setViewMode,
    topGenres,
    topTracks,
    topArtists,
    recentStreams,
    handleFileUpload,
  } = useMusicData()

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader
        dataStatus={dataStatus}
        onUpload={handleFileUpload}
        onAnalytics={() => navigate('/analytics')}
      />

      <TimeFilter
        value={timeFilter}
        onChange={setTimeFilter}
      />

      <TopGenres genres={topGenres} />

      <TopTracks
        tracks={topTracks}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />

      <TopArtists artists={topArtists} />

      <RecentStreams streams={recentStreams} />
    </div>
  )
}
