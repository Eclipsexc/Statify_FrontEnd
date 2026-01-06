import { useState } from 'react';
import { ArrowLeft, ChartBar, Clock, Music, Disc3, Users, Album } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMusicData } from '../context/MusicDataContext';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

export function AnalyticsPage() {
  const navigate = useNavigate();
  const { analytics } = useMusicData();
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');

  // Mock data for charts
  const listeningActivityByHour = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    streams: Math.floor(Math.random() * 100) + 20,
    minutes: Math.floor(Math.random() * 200) + 50,
  }));

  const listeningOverTime = Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    streams: Math.floor(Math.random() * 150) + 50,
  }));

  const genreDistribution = [
    { name: 'Pop', value: 30, color: '#1DB954' },
    { name: 'Rock', value: 25, color: '#3B82F6' },
    { name: 'Hip Hop', value: 20, color: '#8B5CF6' },
    { name: 'Electronic', value: 15, color: '#F59E0B' },
    { name: 'Other', value: 10, color: '#EF4444' },
  ];

  const statCards = [
    { icon: ChartBar, label: 'Total Streams', value: analytics.totalStreams.toLocaleString(), color: '#1DB954' },
    { icon: Clock, label: 'Minutes Streamed', value: analytics.minutesStreamed.toLocaleString(), color: '#3B82F6' },
    { icon: Clock, label: 'Hours Streamed', value: analytics.hoursStreamed.toLocaleString(), color: '#8B5CF6' },
    { icon: Music, label: 'Different Tracks', value: analytics.differentTracks.toLocaleString(), color: '#F59E0B' },
    { icon: Users, label: 'Different Artists', value: analytics.differentArtists.toLocaleString(), color: '#EF4444' },
    { icon: Album, label: 'Different Albums', value: analytics.differentAlbums.toLocaleString(), color: '#10B981' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/profile')}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </button>
        <h1 className="text-4xl font-bold">Detailed Analytics</h1>
      </div>

      {/* Overview Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-[#1DB954]/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${card.color}20` }}>
                    <Icon className="h-6 w-6" style={{ color: card.color }} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
                <p className="text-3xl font-bold" style={{ color: card.color }}>{card.value}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Listening Activity by Hour - Circular Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Listening Activity by Hour</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Streams by Hour */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-semibold mb-4">Streams Count</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={listeningActivityByHour}>
                <PolarGrid stroke="#27272A" />
                <PolarAngleAxis
                  dataKey="hour"
                  tick={{ fill: '#A1A1AA', fontSize: 12 }}
                  tickFormatter={(value) => `${value}h`}
                />
                <Radar
                  name="Streams"
                  dataKey="streams"
                  stroke="#1DB954"
                  fill="#1DB954"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid #27272A', borderRadius: '8px' }}
                  labelStyle={{ color: '#FAFAFA' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Minutes by Hour */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-semibold mb-4">Minutes Streamed</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={listeningActivityByHour}>
                <PolarGrid stroke="#27272A" />
                <PolarAngleAxis
                  dataKey="hour"
                  tick={{ fill: '#A1A1AA', fontSize: 12 }}
                  tickFormatter={(value) => `${value}h`}
                />
                <Radar
                  name="Minutes"
                  dataKey="minutes"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid #27272A', borderRadius: '8px' }}
                  labelStyle={{ color: '#FAFAFA' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Listening Activity Over Time */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Listening Activity Over Time</h2>
          <div className="flex gap-2">
            {(['line', 'bar'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  chartType === type
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border">
          <ResponsiveContainer width="100%" height={400}>
            {chartType === 'line' ? (
              <LineChart data={listeningOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                <XAxis
                  dataKey="day"
                  stroke="#A1A1AA"
                  tick={{ fill: '#A1A1AA' }}
                  tickFormatter={(value) => value.replace('Day ', '')}
                />
                <YAxis stroke="#A1A1AA" tick={{ fill: '#A1A1AA' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid #27272A', borderRadius: '8px' }}
                  labelStyle={{ color: '#FAFAFA' }}
                />
                <Legend wrapperStyle={{ color: '#FAFAFA' }} />
                <Line
                  type="monotone"
                  dataKey="streams"
                  stroke="#1DB954"
                  strokeWidth={2}
                  dot={{ fill: '#1DB954', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            ) : (
              <BarChart data={listeningOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                <XAxis
                  dataKey="day"
                  stroke="#A1A1AA"
                  tick={{ fill: '#A1A1AA' }}
                  tickFormatter={(value) => value.replace('Day ', '')}
                />
                <YAxis stroke="#A1A1AA" tick={{ fill: '#A1A1AA' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#121212', border: '1px solid #27272A', borderRadius: '8px' }}
                  labelStyle={{ color: '#FAFAFA' }}
                />
                <Legend wrapperStyle={{ color: '#FAFAFA' }} />
                <Bar dataKey="streams" fill="#1DB954" radius={[8, 8, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </section>

      {/* Genre Distribution */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Genre Distribution</h2>
        <div className="p-6 rounded-xl bg-card border border-border">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={genreDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
              >
                {genreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#121212', border: '1px solid #27272A', borderRadius: '8px' }}
                labelStyle={{ color: '#FAFAFA' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}