import { useState, useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import SidebarWidget from './SidebarWidget';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://blkxchangedeploymentapp-pwvsejlq.devinapps.com';

function UpcomingEventsWidget() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`);
      if (response.ok) {
        const data = await response.json();
        const upcoming = data.filter((event: Event) => new Date(event.date) >= new Date());
        setEvents(upcoming.slice(0, 3));
      }
    } catch (err) {
      console.error('Failed to fetch upcoming events:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <SidebarWidget title="Upcoming Events" icon={<Calendar className="w-5 h-5" />}>
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-gold mx-auto"></div>
        </div>
      ) : events.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 hover:bg-yellow-50 p-2 rounded transition cursor-pointer"
            >
              <h4 className="text-sm font-semibold text-brand-black mb-2 line-clamp-2">
                {event.name}
              </h4>
              <div className="flex flex-col gap-1 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-brand-gold" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-gold" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SidebarWidget>
  );
}

export default UpcomingEventsWidget;
