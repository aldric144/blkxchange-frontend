import { API_BASE_URL } from '../../config/api';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Vote, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';


interface Proposal {
  id: number;
  user_id: number;
  username: string;
  title: string;
  summary: string;
  description: string | null;
  category: string | null;
  status: string;
  votes_for: number;
  votes_against: number;
  total_points_for: number;
  total_points_against: number;
  created_at: string;
  user_has_voted: boolean;
  user_vote_value: string | null;
}

export default function DAOGovernance() {
  const { user, token } = useAuth();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [newProposal, setNewProposal] = useState({
    title: '',
    summary: '',
    description: '',
    category: ''
  });

  const [voteData, setVoteData] = useState({
    vote_value: 'for',
    points_to_use: 100
  });

  useEffect(() => {
    fetchProposals();
  }, [activeFilter]);

  const fetchProposals = async () => {
    setIsLoading(true);
    try {
      const url = activeFilter === 'all' 
        ? `${API_BASE_URL}/api/dao/proposals`
        : `${API_BASE_URL}/api/dao/proposals?status_filter=${activeFilter}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProposals(data);
      }
    } catch (err) {
      console.error('Failed to fetch proposals:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createProposal = async () => {
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/dao/propose`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProposal)
      });

      if (response.ok) {
        setShowCreateModal(false);
        setNewProposal({ title: '', summary: '', description: '', category: '' });
        fetchProposals();
        alert('Proposal created successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to create proposal');
      }
    } catch (err) {
      setError('Failed to create proposal');
    }
  };

  const castVote = async () => {
    if (!selectedProposal) return;
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/dao/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          proposal_id: selectedProposal.id,
          vote_value: voteData.vote_value,
          points_to_use: voteData.points_to_use
        })
      });

      if (response.ok) {
        setShowVoteModal(false);
        setSelectedProposal(null);
        fetchProposals();
        alert('Vote cast successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to cast vote');
      }
    } catch (err) {
      setError('Failed to cast vote');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-blue-100 text-blue-800',
      passed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'passed': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTierWeight = (tier: string) => {
    const weights = { Free: 1, Premium: 2, Investor: 5 };
    return weights[tier as keyof typeof weights] || 1;
  };

  const filteredProposals = proposals;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-black to-brand-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">BlkDAO Governance</h1>
              <p className="text-xl text-gray-300">Shape the Future of BlkXchange</p>
            </div>
            {user?.membership_tier === 'Investor' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 bg-brand-gold text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                <Plus className="w-5 h-5" />
                <span>New Proposal</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Voting Power Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-brand-black mb-2">Your Voting Power</h3>
              <p className="text-gray-600">
                As a <span className="font-semibold text-brand-gold">{user?.membership_tier}</span> member,
                your vote weight is <span className="font-semibold">{getTierWeight(user?.membership_tier || 'Free')}x</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-brand-gold">{getTierWeight(user?.membership_tier || 'Free')}x</div>
              <div className="text-sm text-gray-500">Vote Multiplier</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['all', 'active', 'passed', 'rejected', 'pending'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`${
                  activeFilter === filter
                    ? 'border-brand-gold text-brand-gold'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {filter}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Proposals List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading proposals...</p>
          </div>
        ) : filteredProposals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Vote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No proposals found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedProposal(proposal)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded ${getStatusBadge(proposal.status)}`}>
                          {getStatusIcon(proposal.status)}
                          <span className="capitalize">{proposal.status}</span>
                        </span>
                        {proposal.category && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {proposal.category}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-brand-black mb-2">{proposal.title}</h3>
                      <p className="text-gray-600 mb-3">{proposal.summary}</p>
                      <p className="text-sm text-gray-500">
                        Proposed by <span className="font-semibold">{proposal.username}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-semibold text-gray-700">
                          {proposal.votes_for} For ({proposal.total_points_for} pts)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-semibold text-gray-700">
                          {proposal.votes_against} Against ({proposal.total_points_against} pts)
                        </span>
                      </div>
                    </div>
                    {proposal.user_has_voted && (
                      <span className="text-sm text-brand-gold font-semibold">
                        ✓ You voted {proposal.user_vote_value}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded ${getStatusBadge(selectedProposal.status)}`}>
                      {getStatusIcon(selectedProposal.status)}
                      <span className="capitalize">{selectedProposal.status}</span>
                    </span>
                    {selectedProposal.category && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {selectedProposal.category}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-brand-black mb-2">{selectedProposal.title}</h2>
                  <p className="text-sm text-gray-500">
                    Proposed by <span className="font-semibold">{selectedProposal.username}</span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-brand-black mb-2">Summary</h3>
                <p className="text-gray-700 mb-4">{selectedProposal.summary}</p>
                
                {selectedProposal.description && (
                  <>
                    <h3 className="font-semibold text-brand-black mb-2">Description</h3>
                    <p className="text-gray-700 mb-4">{selectedProposal.description}</p>
                  </>
                )}

                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-gray-700">For</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{selectedProposal.votes_for}</p>
                    <p className="text-sm text-gray-500">{selectedProposal.total_points_for} points</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="font-semibold text-gray-700">Against</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600">{selectedProposal.votes_against}</p>
                    <p className="text-sm text-gray-500">{selectedProposal.total_points_against} points</p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-4">
                {!selectedProposal.user_has_voted && selectedProposal.status === 'active' && (
                  <button
                    onClick={() => setShowVoteModal(true)}
                    className="flex-1 bg-brand-gold text-brand-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition"
                  >
                    Cast Your Vote
                  </button>
                )}
                {selectedProposal.user_has_voted && (
                  <div className="flex-1 bg-green-100 text-green-800 font-semibold py-3 rounded-lg text-center">
                    ✓ You voted {selectedProposal.user_vote_value}
                  </div>
                )}
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vote Modal */}
      {showVoteModal && selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-brand-black mb-4">Cast Your Vote</h2>
              <p className="text-gray-600 mb-6">
                Voting on: <span className="font-semibold">{selectedProposal.title}</span>
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Vote
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setVoteData({ ...voteData, vote_value: 'for' })}
                      className={`p-4 border-2 rounded-lg font-semibold transition ${
                        voteData.vote_value === 'for'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 text-gray-700 hover:border-green-300'
                      }`}
                    >
                      <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                      For
                    </button>
                    <button
                      onClick={() => setVoteData({ ...voteData, vote_value: 'against' })}
                      className={`p-4 border-2 rounded-lg font-semibold transition ${
                        voteData.vote_value === 'against'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-300 text-gray-700 hover:border-red-300'
                      }`}
                    >
                      <XCircle className="w-6 h-6 mx-auto mb-2" />
                      Against
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BlkPoints to Use
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={voteData.points_to_use}
                    onChange={(e) => setVoteData({ ...voteData, points_to_use: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Voting power: {voteData.points_to_use} × {getTierWeight(user?.membership_tier || 'Free')} = {voteData.points_to_use * getTierWeight(user?.membership_tier || 'Free')} total points
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={castVote}
                  className="flex-1 bg-brand-gold text-brand-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition"
                >
                  Confirm Vote
                </button>
                <button
                  onClick={() => {
                    setShowVoteModal(false);
                    setError('');
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Proposal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-brand-black mb-4">Create New Proposal</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newProposal.title}
                    onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="Enter proposal title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Summary *
                  </label>
                  <textarea
                    value={newProposal.summary}
                    onChange={(e) => setNewProposal({ ...newProposal, summary: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="Brief summary of your proposal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newProposal.description}
                    onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="Detailed description of your proposal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newProposal.category}
                    onChange={(e) => setNewProposal({ ...newProposal, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Platform">Platform</option>
                    <option value="Community">Community</option>
                    <option value="Investment">Investment</option>
                    <option value="Governance">Governance</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={createProposal}
                  disabled={!newProposal.title || !newProposal.summary}
                  className="flex-1 bg-brand-gold text-brand-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Proposal
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewProposal({ title: '', summary: '', description: '', category: '' });
                    setError('');
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
