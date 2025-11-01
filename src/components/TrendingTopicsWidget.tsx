import { useState, useEffect } from 'react';
import { TrendingUp, MessageCircle } from 'lucide-react';
import SidebarWidget from './SidebarWidget';

interface Topic {
  id: number;
  title: string;
  category: string;
  reply_count: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://blkxchangedeploymentapp-pwvsejlq.devinapps.com';

function TrendingTopicsWidget() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingTopics();
  }, []);

  const fetchTrendingTopics = async () => {
    try {
      const response = await fetch(`${API_URL}/api/forums/topics`);
      if (response.ok) {
        const data = await response.json();
        setTopics(data.slice(0, 5));
      }
    } catch (err) {
      console.error('Failed to fetch trending topics:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarWidget title="Trending Topics" icon={<TrendingUp className="w-5 h-5" />}>
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-gold mx-auto"></div>
        </div>
      ) : topics.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">No topics yet</p>
      ) : (
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 hover:bg-yellow-50 p-2 rounded transition cursor-pointer"
            >
              <h4 className="text-sm font-semibold text-brand-black mb-1 line-clamp-2">
                {topic.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded">{topic.category}</span>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{topic.reply_count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SidebarWidget>
  );
}

export default TrendingTopicsWidget;
