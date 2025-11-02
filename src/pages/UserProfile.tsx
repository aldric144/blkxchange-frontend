import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Calendar, MessageCircle, Award, ArrowLeft } from 'lucide-react';

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned_at: string;
}

interface Event {
  id: number;
  event_id: number;
  status: string;
  created_at: string;
}

interface Comment {
  id: number;
  article_id: number;
  content: string;
  created_at: string;
}

interface UserProfileData {
  id: number;
  username: string;
  email: string;
  membership_tier: string;
  join_date: string;
  events: Event[];
  badges: Badge[];
  comments: Comment[];
  stats: {
    total_events: number;
    total_badges: number;
    total_comments: number;
  };
}

const API_URL = import.meta.env.VITE_API_URL || 'https://blkxchangedeploymentapp-pwvsejlq.devinapps.com';

function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/users/username/${username}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return formatDate(dateString);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-black mb-4">User Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The user you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-brand-gold text-brand-black rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-ivory">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-brand-black hover:text-brand-gold transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-brand-black" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-brand-black mb-2">{profile.username}</h1>
              <p className="text-gray-600 mb-4">{profile.email}</p>
              <div className="flex gap-4 flex-wrap">
                <span className="px-4 py-2 bg-brand-gold text-brand-black font-semibold rounded-full">
                  {profile.membership_tier}
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {formatDate(profile.join_date)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Calendar className="w-8 h-8 text-brand-gold mx-auto mb-2" />
            <p className="text-3xl font-bold text-brand-black mb-1">{profile.stats.total_events}</p>
            <p className="text-gray-600">Events Attended</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <MessageCircle className="w-8 h-8 text-brand-gold mx-auto mb-2" />
            <p className="text-3xl font-bold text-brand-black mb-1">{profile.stats.total_comments}</p>
            <p className="text-gray-600">Comments Posted</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Award className="w-8 h-8 text-brand-gold mx-auto mb-2" />
            <p className="text-3xl font-bold text-brand-black mb-1">{profile.stats.total_badges}</p>
            <p className="text-gray-600">Badges Earned</p>
          </div>
        </div>

        {profile.badges.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-brand-black mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-brand-gold" />
              Badges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.badges.map((badge) => (
                <div key={badge.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{badge.icon || '🏆'}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-brand-black mb-1">{badge.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                      <p className="text-xs text-gray-500">Earned {getRelativeTime(badge.earned_at)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-brand-black mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-brand-gold" />
              Recent Events
            </h2>
            {profile.events.length > 0 ? (
              <div className="space-y-4">
                {profile.events.slice(0, 5).map((event) => (
                  <div key={event.id} className="border-l-4 border-brand-gold pl-4 py-2">
                    <p className="font-semibold text-brand-black">Event #{event.event_id}</p>
                    <p className="text-sm text-gray-600">Status: {event.status}</p>
                    <p className="text-xs text-gray-500">{getRelativeTime(event.created_at)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No events attended yet</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-brand-black mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-brand-gold" />
              Recent Comments
            </h2>
            {profile.comments.length > 0 ? (
              <div className="space-y-4">
                {profile.comments.slice(0, 5).map((comment) => (
                  <div key={comment.id} className="border-l-4 border-brand-gold pl-4 py-2">
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">{comment.content}</p>
                    <p className="text-xs text-gray-500">
                      On Article #{comment.article_id} • {getRelativeTime(comment.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No comments posted yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
