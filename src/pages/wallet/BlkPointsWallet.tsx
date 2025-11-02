import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Wallet, TrendingUp, TrendingDown, Gift, AlertCircle, Loader, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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
  { id: 1, name: '10% Discount Code', points: 500, description: 'Get 10% off your next purchase' },
  { id: 2, name: 'Premium Article Access', points: 200, description: 'Access to exclusive premium content' },
  { id: 3, name: 'Event VIP Pass', points: 1000, description: 'VIP access to any community event' },
  { id: 4, name: 'Featured Vendor Listing', points: 1500, description: 'Feature your business for 30 days' },
];

function BlkPointsWallet() {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [redeeming, setRedeeming] = useState<number | null>(null);

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
      
      fetchTransactions();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRedeeming(null);
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

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Gift className="w-6 h-6 text-brand-gold" />
              Redeem Rewards
            </h2>
            <div className="space-y-4">
              {REWARDS.map((reward) => (
                <div key={reward.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{reward.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-brand-gold">{reward.points}</div>
                      <div className="text-xs text-gray-600">points</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={redeeming === reward.id || (wallet?.points_balance || 0) < reward.points}
                    className="w-full py-2 bg-brand-gold text-brand-black rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {redeeming === reward.id ? 'Redeeming...' : 
                     (wallet?.points_balance || 0) < reward.points ? 'Insufficient Points' : 'Redeem'}
                  </button>
                </div>
              ))}
            </div>
          </div>

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

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">💡 How to Earn BlkPoints</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Sign up: 100 points (one-time bonus)</li>
                <li>• RSVP to events: 50 points per event</li>
                <li>• Attend events: 100 points per event</li>
                <li>• Comment on articles: 10 points per comment</li>
                <li>• Share content: 25 points per share</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlkPointsWallet;
