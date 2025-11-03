import { API_BASE_URL } from '../../config/api';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Users, MessageCircle, Calendar, TrendingUp, Award } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

interface AnalyticsOverview {
  total_users: number;
  total_articles: number;
  total_comments: number;
  total_topics: number;
  total_replies: number;
  total_events: number;
  total_rsvps: number;
  engagement_score: number;
  top_contributors: Array<{ username: string; comment_count: number }>;
  most_active_forum_users: Array<{ username: string; topic_count: number }>;
}

interface EventAnalytics {
  events_with_rsvps: Array<{
    event_id: number;
    event_name: string;
    event_date: string;
    event_category: string;
    total_rsvps: number;
    status_breakdown: Record<string, number>;
  }>;
  category_rsvps: Record<string, number>;
  most_popular_events: Array<{
    event_id: number;
    event_name: string;
    total_rsvps: number;
  }>;
  total_events: number;
  total_rsvps: number;
  average_rsvps_per_event: number;
}

const API_URL = API_BASE_URL || 'https://blkxchangedeploymentapp-pwvsejlq.devinapps.com';

function AnalyticsDashboard() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [eventAnalytics, setEventAnalytics] = useState<EventAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [overviewRes, eventsRes] = await Promise.all([
          fetch(`${API_URL}/api/analytics/overview`),
          fetch(`${API_URL}/api/analytics/events`)
        ]);

        if (!overviewRes.ok || !eventsRes.ok) {
          throw new Error('Failed to fetch analytics');
        }

        const overviewData = await overviewRes.json();
        const eventsData = await eventsRes.json();

        setOverview(overviewData);
        setEventAnalytics(eventsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (error || !overview || !eventAnalytics) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-black mb-4">Failed to Load Analytics</h2>
          <p className="text-gray-600">{error || 'Unable to fetch analytics data'}</p>
        </div>
      </div>
    );
  }

  const engagementData = {
    labels: ['Comments', 'Forum Topics', 'Forum Replies', 'Event RSVPs'],
    datasets: [
      {
        label: 'Engagement Metrics',
        data: [overview.total_comments, overview.total_topics, overview.total_replies, overview.total_rsvps],
        backgroundColor: ['#FFD700', '#FFA500', '#FF8C00', '#FF6347'],
      },
    ],
  };

  const categoryRSVPData = {
    labels: Object.keys(eventAnalytics.category_rsvps),
    datasets: [
      {
        label: 'RSVPs by Category',
        data: Object.values(eventAnalytics.category_rsvps),
        backgroundColor: '#FFD700',
        borderColor: '#000000',
        borderWidth: 1,
      },
    ],
  };

  const topEventsData = {
    labels: eventAnalytics.most_popular_events.slice(0, 10).map(e => e.event_name),
    datasets: [
      {
        label: 'RSVPs',
        data: eventAnalytics.most_popular_events.slice(0, 10).map(e => e.total_rsvps),
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-brand-black mb-8">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-brand-gold" />
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <p className="text-3xl font-bold text-brand-black mb-1">{overview.total_users}</p>
            <p className="text-gray-600">Users</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <MessageCircle className="w-8 h-8 text-brand-gold" />
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <p className="text-3xl font-bold text-brand-black mb-1">{overview.total_comments}</p>
            <p className="text-gray-600">Comments</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-brand-gold" />
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <p className="text-3xl font-bold text-brand-black mb-1">{overview.total_events}</p>
            <p className="text-gray-600">Events</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-brand-gold" />
              <span className="text-sm text-gray-500">Score</span>
            </div>
            <p className="text-3xl font-bold text-brand-black mb-1">{overview.engagement_score}</p>
            <p className="text-gray-600">Engagement</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-brand-black mb-6">Engagement Overview</h2>
            <div className="h-80">
              <Bar
                data={engagementData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-brand-black mb-6">RSVPs by Category</h2>
            <div className="h-80">
              <Doughnut
                data={categoryRSVPData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-brand-black mb-6">Top Events by RSVPs</h2>
          <div className="h-80">
            <Line
              data={topEventsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-brand-black mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-brand-gold" />
              Top Contributors
            </h2>
            {overview.top_contributors.length > 0 ? (
              <div className="space-y-3">
                {overview.top_contributors.map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-brand-gold">#{index + 1}</span>
                      <span className="font-semibold text-brand-black">{contributor.username}</span>
                    </div>
                    <span className="text-gray-600">{contributor.comment_count} comments</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No contributors yet</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-brand-black mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-brand-gold" />
              Most Active Forum Users
            </h2>
            {overview.most_active_forum_users.length > 0 ? (
              <div className="space-y-3">
                {overview.most_active_forum_users.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-brand-gold">#{index + 1}</span>
                      <span className="font-semibold text-brand-black">{user.username}</span>
                    </div>
                    <span className="text-gray-600">{user.topic_count} topics</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No forum activity yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-brand-black mb-6">Event Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-brand-black mb-2">{eventAnalytics.total_events}</p>
              <p className="text-gray-600">Total Events</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-brand-black mb-2">{eventAnalytics.total_rsvps}</p>
              <p className="text-gray-600">Total RSVPs</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-brand-black mb-2">
                {eventAnalytics.average_rsvps_per_event.toFixed(1)}
              </p>
              <p className="text-gray-600">Avg RSVPs per Event</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
