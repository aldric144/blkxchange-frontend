import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, Share2 } from 'lucide-react';
import RSVPButton from '../components/RSVPButton';

interface Event {
  id: number;
  name: string;
  description: string;
  category: string;
  date: string;
  location: string;
  image_url: string | null;
  created_at: string;
  rsvp_count: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://blkxchangedeploymentapp-pwvsejlq.devinapps.com';

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Event not found');
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: event?.name || 'Event',
      text: event?.description || '',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleRSVPSuccess = () => {
    if (event) {
      setEvent({ ...event, rsvp_count: event.rsvp_count + 1 });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-black mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/blkxchange360/community-hub')}
            className="px-6 py-2 bg-brand-gold text-brand-black rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-brand-ivory">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-brand-black hover:text-brand-gold transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        {event.image_url && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src={event.image_url}
              alt={event.name}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-brand-gold text-brand-black text-sm font-semibold rounded-full mb-3">
                {event.category}
              </span>
              <h1 className="text-4xl font-bold text-brand-black mb-4">{event.name}</h1>
            </div>
            <button
              onClick={handleShare}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              title="Share event"
            >
              <Share2 className="w-5 h-5 text-brand-black" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-3 text-brand-gold" />
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-semibold">{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-3 text-brand-gold" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <Users className="w-5 h-5 mr-3 text-brand-gold" />
              <div>
                <p className="text-sm text-gray-500">Attendees</p>
                <p className="font-semibold">{event.rsvp_count} attending</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-brand-black mb-4">About This Event</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.description}</p>
          </div>

          <div className="flex justify-center">
            <RSVPButton eventId={event.id} onSuccess={handleRSVPSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
