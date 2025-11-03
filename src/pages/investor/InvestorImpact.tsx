import { API_BASE_URL } from '../../config/api';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { TrendingUp, Building2, Rocket, Landmark, DollarSign, Users, Target } from 'lucide-react';
import { sampleInvestmentSummary, sampleCategoryInvestments, Investment, InvestmentSummary } from '../../sampleData/investments';


const CATEGORY_INFO = {
  HBCU: {
    icon: Building2,
    color: 'blue',
    title: 'HBCUs',
    description: 'Supporting Historically Black Colleges and Universities',
  },
  Startup: {
    icon: Rocket,
    color: 'purple',
    title: 'Black-Owned Startups',
    description: 'Investing in innovative Black entrepreneurs',
  },
  Bank: {
    icon: Landmark,
    color: 'green',
    title: 'Black Banks',
    description: 'Strengthening Black financial institutions',
  },
};

function InvestorImpact() {
  const { isAuthenticated } = useAuth();
  const [summary, setSummary] = useState<InvestmentSummary>(sampleInvestmentSummary);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryInvestments, setCategoryInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    fetchInvestmentSummary();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryInvestments(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchInvestmentSummary = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/investments`);

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setSummary(data);
        }
      }
    } catch (err: any) {
      console.error('Failed to fetch investments:', err);
    }
  };

  const fetchCategoryInvestments = async (category: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/investments/by-category/${category}`);

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setCategoryInvestments(data);
        } else {
          setCategoryInvestments(sampleCategoryInvestments[category] || []);
        }
      } else {
        setCategoryInvestments(sampleCategoryInvestments[category] || []);
      }
    } catch (err: any) {
      console.error('Failed to fetch category investments:', err);
      setCategoryInvestments(sampleCategoryInvestments[category] || []);
    }
  };

  const totalInvested = summary.total_invested || 0;
  const breakdown = summary.category_breakdown || { HBCU: 0, Startup: 0, Bank: 0 };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-brand-black" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investor Impact Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how your Investor subscription supports HBCUs, Black-owned startups, and Black banks. 
            3% of every subscription is reinvested into the Black community.
          </p>
        </div>

        <div className="bg-gradient-to-br from-brand-gold to-yellow-600 rounded-xl shadow-lg p-8 mb-12 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Total Community Investment</h2>
              <p className="text-yellow-100">Cumulative impact from all Investor subscriptions</p>
            </div>
            <DollarSign className="w-16 h-16 opacity-50" />
          </div>
          <div className="text-5xl font-bold mb-2">
            ${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-yellow-100">
            Invested across {(summary.hbcu_count || 0) + (summary.startup_count || 0) + (summary.bank_count || 0)} organizations
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {Object.entries(CATEGORY_INFO).map(([key, info]) => {
            const Icon = info.icon;
            const amount = breakdown[key as keyof typeof breakdown] || 0;
            const percentage = totalInvested > 0 ? (amount / totalInvested) * 100 : 0;
            const count = key === 'HBCU' ? summary.hbcu_count : 
                         key === 'Startup' ? summary.startup_count : 
                         summary.bank_count;

            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                className={`bg-white rounded-xl shadow-lg p-6 text-left transition hover:shadow-xl ${
                  selectedCategory === key ? 'ring-4 ring-brand-gold' : ''
                }`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                  info.color === 'blue' ? 'bg-blue-100' :
                  info.color === 'purple' ? 'bg-purple-100' :
                  'bg-green-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    info.color === 'blue' ? 'text-blue-600' :
                    info.color === 'purple' ? 'text-purple-600' :
                    'text-green-600'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{info.description}</p>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{percentage.toFixed(1)}% of total</span>
                  <span className="text-gray-600">{count || 0} organizations</span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {CATEGORY_INFO[selectedCategory as keyof typeof CATEGORY_INFO].title} Investments
            </h2>
            {categoryInvestments.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No investments in this category yet.</p>
            ) : (
              <div className="space-y-4">
                {categoryInvestments.map((investment) => (
                  <div key={investment.id} className="border border-gray-200 rounded-lg p-6 hover:border-brand-gold transition">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{investment.recipient_name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{investment.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-gold">
                          ${investment.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-xs text-gray-600">
                          {new Date(investment.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-brand-gold" />
            Recent Investments
          </h2>
          {summary.recent_investments.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No investments yet. Be the first Investor subscriber!</p>
          ) : (
            <div className="space-y-4">
              {summary.recent_investments.map((investment) => {
                const categoryInfo = CATEGORY_INFO[investment.category as keyof typeof CATEGORY_INFO];
                const Icon = categoryInfo.icon;
                
                return (
                  <div key={investment.id} className="border border-gray-200 rounded-lg p-6 hover:border-brand-gold transition">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        categoryInfo.color === 'blue' ? 'bg-blue-100' :
                        categoryInfo.color === 'purple' ? 'bg-purple-100' :
                        'bg-green-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          categoryInfo.color === 'blue' ? 'text-blue-600' :
                          categoryInfo.color === 'purple' ? 'text-purple-600' :
                          'text-green-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{investment.recipient_name}</h3>
                            <p className="text-sm text-gray-600">{categoryInfo.title}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-brand-gold">
                              ${investment.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-xs text-gray-600">
                              {new Date(investment.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{investment.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-start gap-6">
            <Users className="w-12 h-12 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-3">Join the Movement</h3>
              <p className="text-purple-100 mb-4">
                Become an Investor subscriber and directly support HBCUs, Black-owned startups, and Black banks. 
                3% of your subscription fee is reinvested into the Black community, and you'll get full transparency 
                on where your investment goes.
              </p>
              {!isAuthenticated ? (
                <a
                  href="/signup"
                  className="inline-block px-6 py-3 bg-brand-gold text-brand-black font-semibold rounded-lg hover:bg-yellow-500 transition"
                >
                  Sign Up Now
                </a>
              ) : (
                <a
                  href="/subscription"
                  className="inline-block px-6 py-3 bg-brand-gold text-brand-black font-semibold rounded-lg hover:bg-yellow-500 transition"
                >
                  Upgrade to Investor
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorImpact;
