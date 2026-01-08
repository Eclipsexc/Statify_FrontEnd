import { useMusicData } from '../context/MusicDataContext'
import { ProfileHeaderNoData } from '../components/profile/ProfileHeaderNoData'

export default function ProfileNoDataPage() {
  const { handleFileUpload } = useMusicData()

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeaderNoData onUpload={handleFileUpload} />

      <div className="mt-20 flex flex-col items-center text-center text-zinc-400">
        <div className="text-lg font-medium mb-2">
          No listening data yet
        </div>

        <div className="max-w-md text-sm leading-relaxed">
          Upload your Spotify extended listening history to unlock
          detailed analytics, insights, and personalized statistics.
        </div>
      </div>
    </div>
  )
}
