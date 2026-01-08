import { useRef } from 'react'
import { Upload, User, Lock } from 'lucide-react'
import { StatusBadge } from './StatusBadge'

type Props = {
  onUpload: (file: File) => void
}

export function ProfileHeaderNoData({ onUpload }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="mb-12">
      <div className="flex items-center gap-8">
        <div className="h-36 w-36 rounded-full bg-[#1DB954] flex items-center justify-center">
          <User className="h-20 w-20 text-white" />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-3">
            Music Lover
          </h1>

          <div className="flex flex-col gap-2">
            <div className="inline-flex self-start">
              <StatusBadge status="no-data" />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.csv"
              onChange={(e) =>
                e.target.files && onUpload(e.target.files[0])
              }
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="
                inline-flex items-center gap-2
                px-5 py-2.5 rounded-full
                bg-[#1a7f45]
                text-white
                hover:bg-[#146c3a]
                transition-colors
                self-start
              "
            >
              <Upload className="h-4 w-4" />
              Upload listening report
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            disabled
            className="
              px-6 py-3 rounded-full
              border border-red-500
              text-red-500
              cursor-not-allowed
              flex items-center gap-2
            "
          >
            <Lock className="h-4 w-4" />
            Detailed Analytics
          </button>

          <div
            className="
              text-sm text-red-500 animate-pulse
              w-[280px]
              text-center
              leading-relaxed
            "
          >
            Upload extended Spotify listening history to unlock advanced analytics and personalized insights.
          </div>
        </div>
      </div>
    </div>
  )
}
