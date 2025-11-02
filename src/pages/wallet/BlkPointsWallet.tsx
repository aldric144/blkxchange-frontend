import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Wallet, TrendingUp, TrendingDown, Gift, AlertCircle, Loader, ArrowUpRight, ArrowDownRight, ShoppingCart, UserPlus, MessageSquare, Calendar, User, Star, Heart } from 'lucide-react';

interface WalletData {
  id: number;
  user_id: number;
  points_balance: number;
  total_earned: number;
  total_redeemed: number;
}

interface Transaction {
  id: number;
  transaction_type: string;
  points: number;
  description: string;
  created_at: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://blkxchangedeploymentapp-pwvsejlq.devinapps.com';

const REWARDS = [
  { id: 1, name: '$5 Discount', points: 500, description: 'Get $5 off your next purchase', value: 5 },
  { id: 2, name: '$10 Discount', points: 900, description: 'Get $10 off your next purchase', value: 10 },
  { id: 3, name: '$25 Discount', points: 2000, description: 'Get $25 off your next purchase', value: 25 },
];

const EARN_ACTIONS = [
  { icon: ShoppingCart, title: 'Make a Purchase', points: '10 pts / $1', description: 'Earn points on every dollar spent' },
  { icon: UserPlus, title: 'Refer a Friend', points: '500 pts', description: 'Invite friends to join BlkXchange' },
  { icon: MessageSquare, title: 'Post in Community', points: '25 pts', description: 'Share your thoughts in forums' },
  { icon: Calendar, title: 'Attend Event', points: '100 pts', description: 'Participate in community events' },
  { icon: User, title: 'Complete Profile', points: '250 pts', description: 'Fill out your profile information' },
  { icon: Star, title: 'Monthly Bonus', points: '50 pts', description: 'Active members get monthly rewards' },
];

const DONATION_TIERS = [
  { amount: 25, points: 125 },
  { amount: 50, points: 250 },
  { amount: 100, points: 500 },
  { amount: 250, points: 1250 },
];

function BlkPointsWallet() {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [redeeming, setRedeeming] = useState<number | null>(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<number>(50);
  const [donationCategory, setDonationCategory] = useState('Community Support');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchWalletData();
    fetchTransactions();
  }, [isAuthenticated, navigate]);

  const fetchWalletData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/wallet`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch wallet');

      const data = await response.json();
      setWallet(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_URL}/api/wallet/transactions?limit=20`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch transactions');

      const data = await response.json();
      setTransactions(data);
    } catch (err: any) {
      console.error('Failed to fetch transactions:', err);
    }
  };

  const handleRedeem = async (reward: typeof REWARDS[0]) => {
    if (!token || !wallet) return;

    if (wallet.points_balance < reward.points) {
      alert('Insufficient BlkPoints balance');
      return;
    }

    setRedeeming(reward.id);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/wallet/redeem`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          points: reward.points,
          description: `Redeemed: ${reward.name}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Redemption failed');
      }

      const data = await response.json();
      setWallet(data);
      
      alert(`Successfully redeemed ${reward.name}!\n\nYour reward code will be sent to your email.`);
      
      setShowRedeemModal(false);
      fetchTransactions();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRedeeming(null);
    }
  };

  const handleDonation = async () => {
    if (!token) return;
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/donations/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedDonation,
          category: donationCategory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create donation');
      }

      const data = await response.json();
      
      
      alert(`Donation checkout created!\n\nAmount: $${selectedDonation}\nBonus: ${data.points_bonus} BlkPoints\n\n(In production, you would be redirected to Stripe)`);
      
      const completeResponse = await fetch(`${API_URL}/api/donations/complete/${data.donation_id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (completeResponse.ok) {
        setShowDonationModal(false);
        fetchWalletData();
        fetchTransactions();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            BlkPoints Wallet
          </h1>
          <p className="text-xl text-gray-600">
            Earn points, redeem rewards, support the community
          </p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-brand-gold to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="w-8 h-8" />
              <span className="text-sm font-semibold">Current Balance</span>
            </div>
            <div className="text-4xl font-bold">{wallet?.points_balance || 0}</div>
            <div className="text-sm opacity-90 mt-1">BlkPoints</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-sm font-semibold text-gray-600">Total Earned</span>
            </div>
            <div className="text-4xl font-bold text-gray-900">{wallet?.total_earned || 0}</div>
            <div className="text-sm text-gray-600 mt-1">All time</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-semibold text-gray-600">Total Redeemed</span>
            </div>
            <div className="text-4xl font-bold text-gray-900">{wallet?.total_redeemed || 0}</div>
            <div className="text-sm text-gray-600 mt-1">All time</div>
          </div>
        </div>

        {/* Earn Actions */}
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ways to Earn BlkPoints</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EARN_ACTIONS.map((action, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-gold bg-opacity-10 rounded-lg">
                    <action.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                    <span className="text-brand-gold font-bold">{action.points}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Redeem & Donate Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Gift className="w-6 h-6 text-brand-gold" />
                Redeem Points
              </h2>
              <p className="text-gray-600 mb-6">
                Use your BlkPoints to get discounts on purchases and access exclusive rewards.
              </p>
              <button
                onClick={() => setShowRedeemModal(true)}
                className="w-full py-3 bg-brand-gold text-brand-black rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                View Rewards
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Make a Direct Contribution
              </h2>
              <p className="mb-6 opacity-90">
                Support the community and earn 5 BlkPoints per $1 donated. Contributions help fund HBCUs, startups, and Black-owned banks.
              </p>
              <button
                onClick={() => setShowDonationModal(true)}
                className="w-full py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {transactions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No transactions yet. Start earning BlkPoints!
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {transaction.transaction_type === 'earn' ? (
                            <div className="p-2 bg-green-100 rounded-lg">
                              <ArrowUpRight className="w-5 h-5 text-green-600" />
                            </div>
                          ) : (
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <ArrowDownRight className="w-5 h-5 text-purple-600" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">
                              {transaction.description || 
                               (transaction.transaction_type === 'earn' ? 'Points Earned' : 'Points Redeemed')}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(transaction.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                        <div className={`text-lg font-bold ${
                          transaction.transaction_type === 'earn' ? 'text-green-600' : 'text-purple-600'
                        }`}>
                          {transaction.transaction_type === 'earn' ? '+' : '-'}{transaction.points}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Redeem Modal */}
        {showRedeemModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Redeem BlkPoints</h2>
                  <button
                    onClick={() => setShowRedeemModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6 p-4 bg-brand-gold bg-opacity-10 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Your Balance: <span className="font-bold text-brand-gold text-lg">{wallet?.points_balance || 0} BlkPoints</span>
                  </p>
                </div>

                <div className="space-y-4">
                  {REWARDS.map((reward) => (
                    <div key={reward.id} className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 hover:border-brand-gold transition">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{reward.name}</h3>
                          <p className="text-sm text-gray-600">{reward.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-3xl font-bold text-brand-gold">{reward.points}</div>
                          <div className="text-xs text-gray-600">points</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRedeem(reward)}
                        disabled={redeeming === reward.id || (wallet?.points_balance || 0) < reward.points}
                        className="w-full py-3 bg-brand-gold text-brand-black rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {redeeming === reward.id ? 'Redeeming...' : 
                         (wallet?.points_balance || 0) < reward.points ? 'Insufficient Points' : `Redeem for $${reward.value} Off`}
                      </button>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Donation Modal */}
        {showDonationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Make a Contribution</h2>
                  <button
                    onClick={() => setShowDonationModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {DONATION_TIERS.map((tier) => (
                      <button
                        key={tier.amount}
                        onClick={() => setSelectedDonation(tier.amount)}
                        className={`p-4 border-2 rounded-lg transition ${
                          selectedDonation === tier.amount
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-300 hover:border-green-300'
                        }`}
                      >
                        <div className="text-2xl font-bold text-gray-900">${tier.amount}</div>
                        <div className="text-sm text-green-600 font-semibold">+{tier.points} pts</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contribution Category
                  </label>
                  <select
                    value={donationCategory}
                    onChange={(e) => setDonationCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Community Support">Community Support</option>
                    <option value="HBCU Fund">HBCU Fund</option>
                    <option value="Startup Investment">Startup Investment</option>
                    <option value="Black Banks">Black Banks</option>
                  </select>
                </div>

                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    You will earn <span className="font-bold text-green-600">{selectedDonation * 5} BlkPoints</span> for this ${selectedDonation} contribution.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={handleDonation}
                    className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
                  >
                    Continue to Payment
                  </button>
                  <button
                    onClick={() => setShowDonationModal(false)}
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
    </div>
  );
}

export default BlkPointsWallet;
