export const listeningActivityByHour = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  streams: 20 + (i * 7) % 90,
  minutes: 50 + (i * 13) % 180
}))

export const listeningOverTime = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  streams: 60 + (i * 11) % 140
}))

export const genreDistribution = [
  { name: 'Pop', value: 30, color: '#1DB954' },
  { name: 'Rock', value: 25, color: '#3B82F6' },
  { name: 'Hip Hop', value: 20, color: '#8B5CF6' },
  { name: 'Electronic', value: 15, color: '#F59E0B' },
  { name: 'Other', value: 10, color: '#EF4444' }
]
