import { useNavigate } from 'react-router-dom'
import { AnalyticsHeader } from '../components/analytics/AnalyticsHeader'
import { OverviewStats } from '../components/analytics/OverviewStats'
import { HourlyRadarSection } from '../components/analytics/HourlyRadarSection'
import { TimeSeriesSection } from '../components/analytics/TimeSeriesSection'
import { GenreSection } from '../components/analytics/genres/GenreSection'
import { useMusicData } from '../context/MusicDataContext'

export function AnalyticsPage() {
  const navigate = useNavigate()
  const { analytics } = useMusicData()

  return (
    <div className="container mx-auto px-4 py-8">
      <AnalyticsHeader onBack={() => navigate('/profile')} />

      <OverviewStats analytics={analytics} />

      <HourlyRadarSection />

      <TimeSeriesSection />

      <GenreSection />
    </div>
  )
}
