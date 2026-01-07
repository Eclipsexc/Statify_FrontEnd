import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MusicDataProvider } from './context/MusicDataContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { LandingPage } from './pages/LandingPage'
import { ProfilePage } from './pages/ProfilePage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import ListeningMap from './components/analytics/ListeningMap'

export default function App() {
  return (
    <MusicDataProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/__test-map" element={<ListeningMap />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </MusicDataProvider>
  )
}
