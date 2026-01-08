import { useNavigate } from 'react-router-dom'
import { AnalyticsHeader } from '../components/analytics/AnalyticsHeader'
import { OverviewStats } from '../components/analytics/OverviewStats'
import { HourlyRadarSection } from '../components/analytics/HourlyRadarSection'
import { TimeSeriesSection } from '../components/analytics/TimeSeriesSection'
import { DistributionSwitchSection } from '../components/analytics/distribution/DistributionSwitchSection'
import { useMusicData } from '../context/MusicDataContext'

export function AnalyticsPage() {
  const navigate = useNavigate()
  const { analytics, distributionAnalytics } = useMusicData()

  return (
    <div className="container mx-auto px-4 py-8">
      <AnalyticsHeader onBack={() => navigate('/profile')} />
      <OverviewStats analytics={analytics} />
      <HourlyRadarSection />
      <TimeSeriesSection />
      <DistributionSwitchSection analytics={distributionAnalytics} />
    </div>
  )
}
