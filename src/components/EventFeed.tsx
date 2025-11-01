import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';

interface Event {
  id: number;
  name: string;
  description: string;
  category: string;
  date: string;
  location: string;
  image_url: string | null;
  created_at: string;
}

interface EventFeedProps {
  category?: string;
  limit?: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://blkxchangedeploymentapp-pwvsejlq.devinapps.com';

function EventFeed({ category, limit }: EventFeedProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [category]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const url = category 
        ? `${API_URL}/api/events?category=${category}`
        : `${API_URL}/api/events`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setEvents(limit ? data.slice(0, limit) : data);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    return eventDate >= now;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p>No events available at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <div className="flex flex-col sm:flex-row">
            {event.image_url && (
              <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0">
                <img
                  src={event.image_url}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-brand-gold text-brand-black px-2 py-1 rounded text-xs font-semibold">
                      {event.category}
                    </span>
                    {isUpcoming(event.date) && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-brand-black mb-2">
                    {event.name}
                  </h3>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {event.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-brand-gold" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="hidden sm:block text-gray-400">•</div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button className="flex items-center gap-1 text-brand-gold hover:text-yellow-600 text-sm font-medium transition">
                  <ExternalLink className="w-4 h-4" />
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventFeed;
