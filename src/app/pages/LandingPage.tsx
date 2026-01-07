import { useNavigate } from 'react-router-dom'
import { ChartBar, TrendingUp, Music } from 'lucide-react'
import { motion } from 'motion/react'

import bgVideo from '../video/spotify_adv.mp4'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-[100dvh] overflow-hidden -mt-16">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Theme-aware overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-white/70 via-white/60 to-[#1DB954]/10
            dark:from-black/85 dark:via-black/70 dark:to-[#1DB954]/20
          "
        />

        {/* Top fade (for header merge) */}
        <div
          className="
            absolute top-0 left-0 right-0 h-32 z-10
            bg-gradient-to-b
            from-white/80 dark:from-black/80
            to-transparent
          "
        />
      </div>

      {/* Left content wrapper */}
      <div className="relative z-10 min-h-screen flex items-center pt-16">
        <div className="ml-6 md:ml-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="
              bg-white/70 dark:bg-black/60
              backdrop-blur-xl
              rounded-2xl
              p-8 md:p-10
              shadow-2xl
              border border-black/10 dark:border-white/10
              text-gray-900 dark:text-white
            "
          >
            {/* Icons */}
            <div className="flex gap-4 mb-6">
              <ChartBar className="h-6 w-6 text-[#1DB954]" />
              <Music className="h-6 w-6 text-[#1DB954]" />
              <TrendingUp className="h-6 w-6 text-[#1DB954]" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Your music. <br />
              <span className="text-[#1DB954]">Your stats.</span> <br />
              Your story.
            </h1>

            {/* Subtitle */}
            <p className="mb-8 text-gray-700 dark:text-gray-300">
              Discover deep insights into your music listening habits. Track your
              favorite artists, songs, and genres with beautiful visualizations.
            </p>

            {/* CTA */}
            <button
              onClick={() => navigate('/profile')}
              className="
                w-full
                py-3
                font-semibold
                rounded-full
                bg-[#1DB954]
                text-black
                hover:bg-[#1ed760]
                transition
              "
            >
              Go to Profile
            </button>

            {/* Secondary action */}
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              or{' '}
              <button
                onClick={() => navigate('/profile')}
                className="text-[#1DB954] hover:underline"
              >
                upload your listening report
              </button>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade (for footer merge) */}
      <div
        className="
          absolute bottom-0 left-0 right-0 h-16 z-10
          bg-gradient-to-t
          from-white/80 dark:from-black/80
          to-transparent
        "
      />
    </div>
  )
}
