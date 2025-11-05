import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Users, Heart, TrendingUp, User as UserIcon, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '../api';
import { ImpactStats } from '../types';
import { API_BASE_URL } from '../config/api';

interface Article {
  id: number;
  title: string;
  category: string;
  body: string;
  author: string;
  image_url: string | null;
  created_at: string;
}

const sampleArticles: Article[] = [
  {
    id: 1,
    title: "Black Wall Street: A Legacy of Economic Empowerment",
    category: "History",
    body: "The Greenwood District of Tulsa, Oklahoma, known as Black Wall Street, was one of the most prosperous African American communities in the early 20th century. Despite the tragic events of 1921, its legacy continues to inspire economic empowerment and entrepreneurship in Black communities today.",
    author: "The Black Chronicle",
    image_url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=450&fit=crop",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Supporting Black-Owned Businesses: Why It Matters",
    category: "Business",
    body: "When you support Black-owned businesses, you're not just making a purchase—you're investing in community wealth, creating jobs, and building generational prosperity. Learn how your dollars can make a lasting impact.",
    author: "The Black Chronicle",
    image_url: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=450&fit=crop",
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "The Rise of Black Entrepreneurship in the Digital Age",
    category: "Technology",
    body: "From e-commerce to tech startups, Black entrepreneurs are leveraging digital platforms to build thriving businesses. Discover the innovators reshaping the economic landscape and creating opportunities for future generations.",
    author: "The Black Chronicle",
    image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    title: "Community Investment: Building Wealth Together",
    category: "Finance",
    body: "Economic empowerment starts with community investment. Learn how collective action, supporting local businesses, and reinvesting in our communities creates sustainable wealth and opportunities for all.",
    author: "The Black Chronicle",
    image_url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop",
    created_at: new Date().toISOString()
  }
];

const categories = [
  { name: 'Apparel & Accessories', value: 'apparel_accessories', icon: '👔' },
  { name: 'Art & Collectibles', value: 'art_collectibles', icon: '🎨' },
  { name: 'Automotive & Transportation', value: 'automotive_transportation', icon: '🚗' },
  { name: 'Beauty & Wellness', value: 'beauty_wellness', icon: '💄' },
  { name: 'Books & Stationery', value: 'books_stationery', icon: '📚' },
  { name: 'Food & Beverage', value: 'food_beverage', icon: '🍽️' },
  { name: 'Health & Pharmacy', value: 'health_pharmacy', icon: '💊' },
  { name: 'Home & Living', value: 'home_living', icon: '🏠' },
  { name: 'Trades & Manufacturing', value: 'manufacturing_trades', icon: '🔧' },
  { name: 'Technology & Gadgets', value: 'technology_gadgets', icon: '💻' }
];

export default function Landing() {
  const navigate = useNavigate();
  const [impactStats, setImpactStats] = useState<ImpactStats | null>(null);
  const [articles, setArticles] = useState<Article[]>(sampleArticles);

  useEffect(() => {
    api.getImpactStats().then(setImpactStats);
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/articles`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setArticles(data.slice(0, 4));
        }
      }
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    }
  };

  const createSlug = (title: string, id: number) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `${slug}-${id}`;
  };

  const handleArticleClick = (article: Article) => {
    const slug = createSlug(article.title, article.id);
    navigate(`/news/${slug}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-black to-brand-charcoal text-brand-ivory py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              Welcome to <span className="text-brand-gold">BlkXchange™</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              The Internet's Black Wall Street
            </p>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-400">
              Empowering Black and BIPOC entrepreneurs, professionals, and creators to sell products, 
              offer services, and give back to their communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace">
                <Button className="bg-brand-gold text-brand-black hover:bg-opacity-90 gold-underline-hover text-lg px-8 py-6 font-bold">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Marketplace
                </Button>
              </Link>
              <Link to="/vendor-apply">
                <Button className="bg-white text-brand-gold hover:bg-opacity-90 gold-underline-hover text-lg px-8 py-6 font-bold">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Sell on BlkXchange
                </Button>
              </Link>
              <Link to="/professionals">
                <Button className="bg-white text-brand-gold hover:bg-opacity-90 gold-underline-hover text-lg px-8 py-6 font-bold">
                  <Users className="w-5 h-5 mr-2" />
                  Explore Professionals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy of Black Wall Street - YouTube Video Section */}
      <section className="py-16 bg-brand-black text-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-center mb-8 text-brand-gold">
            Legacy of Black Wall Street
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg border-4 border-brand-gold"
                src="https://www.youtube.com/embed/AMZ9kvXPGb8?autoplay=1&mute=1&loop=0&controls=1&modestbranding=1"
                title="The Untold Story of Black Wall Street and Beyond"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-lg text-gray-300 mt-4">
              The Untold Story of Black Wall Street and Beyond
            </p>
          </div>
          
          {/* Legacy Caption */}
          <div className="max-w-[900px] mx-auto mt-6 mb-8 px-4">
            <p className="text-center text-brand-gold font-heading font-medium text-lg md:text-xl">
              Honoring the resilience and entrepreneurial spirit of Black Wall Street, we continue the legacy of economic empowerment and community building.
            </p>
          </div>
        </div>
      </section>

      {/* From The Black Chronicle - News Section */}
      <section className="py-12 md:py-16" style={{ background: 'linear-gradient(180deg, #004B2E 0%, #000000 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Newspaper className="w-6 h-6 md:w-7 md:h-7 text-brand-gold" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-gold">
                  From The Black Chronicle
                </h2>
              </div>
              <p className="text-base md:text-lg text-white">
                Latest in Black Excellence, Innovation, and Achievement
              </p>
            </div>
            <Link to="/news">
              <Button className="bg-brand-gold text-brand-black hover:bg-[#B9962E] rounded-md transition-colors">
                View All Stories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="flex flex-col h-full bg-black rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer border border-brand-gold"
                >
                  <img
                    src={article.image_url || "https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?w=800&h=450&fit=crop"}
                    alt={article.title}
                    className="w-full aspect-video object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?w=800&h=450&fit=crop";
                    }}
                  />
                  <div className="p-3 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[#CCCCCC] text-sm mb-3 line-clamp-3 flex-grow">
                      {truncateText(article.body, 100)}
                    </p>
                    <div className="flex items-center text-brand-gold text-xs mt-auto">
                      <UserIcon className="w-3 h-3 mr-1" />
                      <span>{article.author}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-brand-black">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link key={category.value} to={`/marketplace?category=${category.value}`}>
                <button className="w-full bg-white text-brand-black font-semibold py-4 px-4 rounded-lg border-2 border-gray-300 hover:border-brand-gold transition-all hover:shadow-lg">
                  {category.name}
                </button>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/marketplace">
              <Button className="bg-white text-brand-gold border-2 border-brand-gold hover:bg-brand-gold hover:text-brand-black text-lg px-8 py-4">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-brand-charcoal text-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 section-divider-gold">
              Our Mission
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Born from the legacy of Black Wall Street, BlkXchange™ represents a new digital economy 
              built on unity, excellence, and reinvestment. Every purchase builds our future.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 text-brand-gold mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-brand-gold">Empower</h3>
              <p className="text-gray-300 text-lg">
                Support Black-owned businesses and BIPOC entrepreneurs in building sustainable enterprises.
              </p>
            </div>
            
            <div className="text-center">
              <Users className="w-16 h-16 text-brand-gold mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-brand-gold">Exchange</h3>
              <p className="text-gray-300 text-lg">
                Connect customers with quality products and professional services from our community.
              </p>
            </div>
            
            <div className="text-center">
              <Heart className="w-16 h-16 text-brand-gold mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-brand-gold">Elevate</h3>
              <p className="text-gray-300 text-lg">
                Every purchase contributes to scholarships, HBCUs, and community initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      {impactStats && (
        <section className="py-16 bg-brand-gold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-heading font-bold text-center mb-12 text-brand-black section-divider-gold">
              Community Impact
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-brand-black mb-2">
                  ${impactStats.total_donations.toFixed(2)}
                </div>
                <div className="text-brand-charcoal font-semibold text-lg">Total Donations</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-brand-black mb-2">
                  {impactStats.total_vendors}
                </div>
                <div className="text-brand-charcoal font-semibold text-lg">Active Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-brand-black mb-2">
                  {impactStats.total_professionals}
                </div>
                <div className="text-brand-charcoal font-semibold text-lg">Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-brand-black mb-2">
                  {impactStats.total_orders}
                </div>
                <div className="text-brand-charcoal font-semibold text-lg">Orders Completed</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link to="/impact">
                <Button className="bg-brand-black text-brand-gold hover:bg-brand-charcoal text-lg px-8 py-4">
                  View Full Impact Report
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Join the Movement Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 text-brand-black section-divider-gold">
            Join the Movement
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Be part of building a sustainable digital economy that reinvests in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/vendor-apply">
              <Button className="bg-brand-green text-white hover:opacity-90 text-lg px-8 py-6">
                Become a Vendor
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-gold text-lg px-8 py-6">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-white border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-sm">
            BlkXchange™ operates on a 15% community-centered revenue model: 85% goes directly to our vendors, 
            12% sustains platform operations, and 3% supports HBCUs, scholarships, and nonprofit partners.
          </p>
        </div>
      </section>
    </div>
  );
}
