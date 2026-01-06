import { Link } from 'react-router-dom'
import { Search, Sun, Moon, User } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        border-b
        backdrop-blur-xl
        transition-colors
        bg-white/80 border-black/10
        dark:bg-black/60 dark:border-white/10
      "
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#1DB954] flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="font-bold text-lg">Statify</span>
        </Link>

        {/* Search */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search tracks / artists"
              className="
                w-full rounded-full px-10 py-2 text-sm outline-none
                bg-gray-100 text-black
                focus:ring-2 focus:ring-[#1DB954]
                dark:bg-white/10 dark:text-white
              "
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-black/10 dark:hover:bg-white/10"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <Link
            to="/profile"
            className="rounded-full p-2 hover:bg-black/10 dark:hover:bg-white/10"
          >
            <div className="h-8 w-8 rounded-full bg-[#1DB954] flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
