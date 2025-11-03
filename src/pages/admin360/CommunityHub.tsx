import { useState, useEffect } from 'react';
import { Users, Calendar, MessageCircle, Plus } from 'lucide-react';
import EventFeed from '../../components/EventFeed';
import GroupRequestModal from '../../components/GroupRequestModal';
import QuickLinksWidget from '../../components/QuickLinksWidget';
import TrendingTopicsWidget from '../../components/TrendingTopicsWidget';
import UpcomingEventsWidget from '../../components/UpcomingEventsWidget';
import { API_BASE_URL } from '../../config/api';
import { sampleForumTopics, ForumTopic } from '../../sampleData/forums';

function CommunityHub() {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'events' | 'groups' | 'forums'>('events');
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>(sampleForumTopics);

  useEffect(() => {
    if (activeTab === 'forums') {
      fetchForumTopics();
    }
  }, [activeTab]);

  const fetchForumTopics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/forums/topics`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setForumTopics(data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch forum topics:', err);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-brand-ivory">
      <div className="bg-brand-black text-brand-ivory py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">BlkXchange360 Community Hub</h1>
              <p className="text-gray-300">Connect, engage, and grow with the community</p>
            </div>
            <button
              onClick={() => setShowGroupModal(true)}
              className="flex items-center gap-2 bg-brand-gold text-brand-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
            >
              <Plus className="w-5 h-5" />
              Request New Group
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('events')}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                      activeTab === 'events'
                        ? 'border-b-2 border-brand-gold text-brand-gold'
                        : 'text-gray-600 hover:text-brand-gold'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                    Events
                  </button>
                  <button
                    onClick={() => setActiveTab('groups')}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                      activeTab === 'groups'
                        ? 'border-b-2 border-brand-gold text-brand-gold'
                        : 'text-gray-600 hover:text-brand-gold'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                    Groups
                  </button>
                  <button
                    onClick={() => setActiveTab('forums')}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                      activeTab === 'forums'
                        ? 'border-b-2 border-brand-gold text-brand-gold'
                        : 'text-gray-600 hover:text-brand-gold'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Forums
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'events' && (
                  <div>
                    <h2 className="text-2xl font-bold text-brand-black mb-6">Upcoming Events</h2>
                    <EventFeed />
                  </div>
                )}

                {activeTab === 'groups' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-brand-black">Community Groups</h2>
                      <button
                        onClick={() => setShowGroupModal(true)}
                        className="text-brand-gold hover:text-yellow-600 text-sm font-medium transition"
                      >
                        + Request New Group
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300 text-center">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Black Entrepreneurs Network
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Connect with fellow entrepreneurs and share insights
                        </p>
                        <button className="bg-brand-gold text-brand-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm">
                          Join Group
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300 text-center">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Professional Development
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Grow your skills and advance your career
                        </p>
                        <button className="bg-brand-gold text-brand-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm">
                          Join Group
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'forums' && (
                  <div>
                    <h2 className="text-2xl font-bold text-brand-black mb-6">Discussion Forums</h2>
                    <div className="space-y-4">
                      {forumTopics.map((topic) => (
                        <div key={topic.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition cursor-pointer border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-brand-black mb-1">
                                {topic.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {topic.excerpt}
                              </p>
                            </div>
                            <span className="text-xs bg-brand-gold text-brand-black px-2 py-1 rounded-full font-medium ml-2">
                              {topic.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {topic.author}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {topic.replies} replies
                            </span>
                            <span>•</span>
                            <span>{topic.views} views</span>
                            <span>•</span>
                            <span>{formatTimeAgo(topic.last_activity)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-80 space-y-6">
            <QuickLinksWidget />
            <TrendingTopicsWidget />
            <UpcomingEventsWidget />
          </div>
        </div>
      </div>

      <GroupRequestModal
        isOpen={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        onSuccess={() => {
          console.log('Group request submitted successfully');
        }}
      />
    </div>
  );
}

export default CommunityHub;
