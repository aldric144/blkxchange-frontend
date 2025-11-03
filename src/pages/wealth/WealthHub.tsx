import { API_BASE_URL } from '../../config/api';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Lock, CheckCircle, TrendingUp, Award, Target } from 'lucide-react';


interface WealthModule {
  id: number;
  title: string;
  description: string;
  content: string;
  tier_required: string;
  points_reward: number;
  duration_minutes: number;
  category: string;
  order_index: number;
  is_locked: boolean;
  is_completed: boolean;
}

interface WealthStats {
  total_modules: number;
  completed_modules: number;
  completion_percentage: number;
  total_wealth_points: number;
  current_tier: string;
  next_unlock_goal: string | null;
}

export default function WealthHub() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'progress' | 'rewards'>('courses');
  const [modules, setModules] = useState<WealthModule[]>([]);
  const [stats, setStats] = useState<WealthStats | null>(null);
  const [selectedModule, setSelectedModule] = useState<WealthModule | null>(null);
  const [, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchModules();
    fetchStats();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/wealth/modules`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setModules(data);
      }
    } catch (err) {
      console.error('Failed to fetch modules:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/wealth/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const completeModule = async (moduleId: number) => {
    setIsCompleting(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/wealth/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ module_id: moduleId })
      });

      if (response.ok) {
        const data = await response.json();
        await fetchModules();
        await fetchStats();
        setSelectedModule(null);
        alert(`Congratulations! You earned ${data.points_earned} BlkPoints!`);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to complete module');
      }
    } catch (err) {
      setError('Failed to complete module');
    } finally {
      setIsCompleting(false);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Free': return 'text-gray-600';
      case 'Premium': return 'text-brand-gold';
      case 'Investor': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'Free': return 'bg-gray-100 text-gray-800';
      case 'Premium': return 'bg-yellow-100 text-yellow-800';
      case 'Investor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedModules = modules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, WealthModule[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-black to-brand-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Wealth Hub</h1>
              <p className="text-xl text-gray-300">Build Generational Wealth Through Education</p>
            </div>
            {stats && (
              <div className="text-right">
                <div className="text-3xl font-bold text-brand-gold">{stats.total_wealth_points}</div>
                <div className="text-sm text-gray-300">Wealth Points Earned</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-brand-black">
                    {stats.completed_modules}/{stats.total_modules}
                  </p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="text-2xl font-bold text-brand-black">
                    {Math.round(stats.completion_percentage)}%
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Tier</p>
                  <p className={`text-2xl font-bold ${getTierColor(stats.current_tier)}`}>
                    {stats.current_tier}
                  </p>
                </div>
                <Award className="w-10 h-10 text-brand-gold" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Next Goal</p>
                  <p className="text-2xl font-bold text-brand-black">
                    {stats.next_unlock_goal || 'Max Tier'}
                  </p>
                </div>
                <Target className="w-10 h-10 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('courses')}
              className={`${
                activeTab === 'courses'
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Courses & Resources
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`${
                activeTab === 'progress'
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Progress
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`${
                activeTab === 'rewards'
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Rewards
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'courses' && (
          <div className="space-y-8">
            {Object.entries(groupedModules).map(([category, categoryModules]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-brand-black mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryModules.map((module) => (
                    <div
                      key={module.id}
                      className={`bg-white rounded-lg shadow-md overflow-hidden ${
                        module.is_locked ? 'opacity-60' : 'hover:shadow-lg transition-shadow cursor-pointer'
                      }`}
                      onClick={() => !module.is_locked && setSelectedModule(module)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-brand-black mb-2">
                              {module.title}
                            </h3>
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getTierBadgeColor(module.tier_required)}`}>
                              {module.tier_required}
                            </span>
                          </div>
                          {module.is_locked && <Lock className="w-5 h-5 text-gray-400" />}
                          {module.is_completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {module.duration_minutes} min
                          </span>
                          <span className="text-brand-gold font-semibold">
                            +{module.points_reward} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-brand-black mb-6">Your Learning Journey</h2>
            <div className="space-y-4">
              {modules.filter(m => m.is_completed).map((module) => (
                <div key={module.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-brand-black">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.category}</p>
                    </div>
                  </div>
                  <span className="text-brand-gold font-semibold">+{module.points_reward} pts</span>
                </div>
              ))}
              {modules.filter(m => m.is_completed).length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No modules completed yet. Start learning to earn BlkPoints!
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-brand-black mb-6">Rewards & Benefits</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-brand-gold pl-4">
                <h3 className="font-semibold text-lg text-brand-black mb-2">BlkPoints for Learning</h3>
                <p className="text-gray-600">
                  Earn 75-150 BlkPoints for completing each module. Use your points to vote on DAO proposals,
                  redeem rewards, or donate to community causes.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg text-brand-black mb-2">Unlock Premium Content</h3>
                <p className="text-gray-600">
                  Upgrade to Premium or Investor tier to access advanced modules on investing, real estate,
                  tax optimization, and wealth transfer strategies.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-lg text-brand-black mb-2">Build Generational Wealth</h3>
                <p className="text-gray-600">
                  Apply what you learn to build lasting wealth for your family and community. Track your
                  progress and celebrate milestones along the way.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Module Detail Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-brand-black mb-2">{selectedModule.title}</h2>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getTierBadgeColor(selectedModule.tier_required)}`}>
                    {selectedModule.tier_required}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">{selectedModule.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {selectedModule.duration_minutes} minutes
                  </span>
                  <span className="text-brand-gold font-semibold">
                    +{selectedModule.points_reward} BlkPoints
                  </span>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{selectedModule.content}</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-4">
                {!selectedModule.is_completed && (
                  <button
                    onClick={() => completeModule(selectedModule.id)}
                    disabled={isCompleting}
                    className="flex-1 bg-brand-gold text-brand-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCompleting ? 'Completing...' : 'Mark as Complete'}
                  </button>
                )}
                {selectedModule.is_completed && (
                  <div className="flex-1 bg-green-100 text-green-800 font-semibold py-3 rounded-lg text-center">
                    ✓ Completed
                  </div>
                )}
                <button
                  onClick={() => setSelectedModule(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
