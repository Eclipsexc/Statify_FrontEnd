import { useRef } from 'react'
import { Upload, User } from 'lucide-react'
import { StatusBadge } from './StatusBadge'

type Props = {
  dataStatus: 'no-data' | 'syncing' | 'ready'
  onUpload: (file: File) => void
  onAnalytics: () => void
}

export function ProfileHeader({ dataStatus, onUpload, onAnalytics }: Props) {
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
              <StatusBadge status={dataStatus} />
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
                -mt-1
              "
            >
              <Upload className="h-4 w-4" />
              Upload listening report
            </button>
          </div>
        </div>

        <button
          onClick={onAnalytics}
          className="
            px-6 py-3 rounded-full
            border border-[#1DB954]
            text-[#1DB954]
            hover:bg-[#1DB954]
            hover:text-black
            transition-all
          "
        >
          Detailed Analytics
        </button>
      </div>
    </div>
  )
}
