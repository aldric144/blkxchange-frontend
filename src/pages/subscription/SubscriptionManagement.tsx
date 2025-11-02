import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Crown, Sparkles, TrendingUp, Check, AlertCircle, Loader } from 'lucide-react';

interface Subscription {
  id: number;
  subscription_type: string;
  start_date: string;
  end_date: string | null;
  status: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://blkxchangedeploymentapp-pwvsejlq.devinapps.com';

const SUBSCRIPTION_TIERS = [
  {
    type: 'Free',
    price: 0,
    icon: Sparkles,
    color: 'gray',
    features: [
      'Access to marketplace',
      'Basic community features',
      'View events and articles',
      'Limited BlkPoints earning',
    ],
  },
  {
    type: 'Premium',
    price: 9.99,
    icon: Crown,
    color: 'gold',
    features: [
      'All Free features',
      'Unlimited BlkPoints earning',
      'Priority event access',
      'Exclusive content access',
      'Monthly rewards',
      'Ad-free experience',
    ],
  },
  {
    type: 'Investor',
    price: 99.99,
    icon: TrendingUp,
    color: 'purple',
    features: [
      'All Premium features',
      '3% reinvestment in HBCUs, Startups & Black Banks',
      'Investor transparency dashboard',
      'Quarterly impact reports',
      'VIP event access',
      'Direct founder connections',
      'Investment opportunities',
    ],
  },
];

function SubscriptionManagement() {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [upgrading, setUpgrading] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchSubscription();
  }, [isAuthenticated, navigate]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`${API_URL}/api/subscription/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch subscription');

      const data = await response.json();
      setSubscription(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async (targetType: string) => {
    if (!token) return;

    setUpgrading(targetType);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/subscription/upgrade`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscription_type: targetType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Upgrade failed');
      }

      const data = await response.json();
      setSubscription(data);
      
      alert(`Successfully upgraded to ${targetType}!`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpgrading(null);
    }
  };

  const handlePayment = async (tier: string, price: number) => {
    alert(`Payment integration coming soon!\n\nYou would be charged $${price} for ${tier} subscription.\n\nFor now, clicking "Upgrade" will activate your subscription.`);
    await handleUpgrade(tier);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    );
  }

  const currentTier = subscription?.subscription_type || 'Free';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Membership
          </h1>
          <p className="text-xl text-gray-600">
            Unlock more features and support the Black community
          </p>
          {subscription && (
            <div className="mt-4 inline-block px-6 py-2 bg-brand-gold text-brand-black rounded-full font-semibold">
              Current Plan: {currentTier}
            </div>
          )}
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {SUBSCRIPTION_TIERS.map((tier) => {
            const Icon = tier.icon;
            const isCurrent = currentTier === tier.type;
            const canUpgrade = 
              (currentTier === 'Free' && tier.type !== 'Free') ||
              (currentTier === 'Premium' && tier.type === 'Investor');

            return (
              <div
                key={tier.type}
                className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                  isCurrent ? 'ring-4 ring-brand-gold' : ''
                }`}
              >
                <div className={`p-6 ${
                  tier.color === 'gold' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  tier.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-700' :
                  'bg-gray-100'
                }`}>
                  <Icon className={`w-12 h-12 mb-4 ${
                    tier.color === 'gray' ? 'text-gray-600' : 'text-white'
                  }`} />
                  <h3 className={`text-2xl font-bold mb-2 ${
                    tier.color === 'gray' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {tier.type}
                  </h3>
                  <div className={`text-4xl font-bold ${
                    tier.color === 'gray' ? 'text-gray-900' : 'text-white'
                  }`}>
                    ${tier.price}
                    {tier.price > 0 && (
                      <span className="text-lg font-normal">/year</span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-3 bg-gray-200 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Current Plan
                    </button>
                  ) : canUpgrade ? (
                    <button
                      onClick={() => tier.price > 0 ? handlePayment(tier.type, tier.price) : handleUpgrade(tier.type)}
                      disabled={upgrading === tier.type}
                      className="w-full py-3 bg-brand-gold text-brand-black rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
                    >
                      {upgrading === tier.type ? 'Processing...' : `Upgrade to ${tier.type}`}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 bg-gray-200 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Not Available
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 max-w-3xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            💡 About Our Investor Tier
          </h3>
          <p className="text-blue-800">
            When you subscribe to the Investor tier, 3% of your subscription fee is reinvested into HBCUs, 
            Black-owned startups, and Black banks. You'll get full transparency on where your investment 
            goes through our Investor Impact Dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionManagement;
