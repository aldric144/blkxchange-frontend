import { API_BASE_URL } from '../config/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Article {
  id: number;
  title: string;
  category: string;
  body: string;
  author: string;
  image_url: string | null;
  created_at: string;
}

function News() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Latest News');

  const categories = [
    'Latest News',
    'Black Achievements',
    'Entrepreneur Spotlight',
    'Education & Culture',
    'Faith & Resilience'
  ];

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'Latest News'
        ? `${API_BASE_URL}/api/articles`
        : `${API_BASE_URL}/api/articles?category=${selectedCategory}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoading(false);
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #002d1f 0%, #000000 100%)' }}>
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            The Black Chronicle™
          </h1>
          <div className="flex justify-center mb-6">
            <div className="border-b-4 border-[#c89b3c] w-32"></div>
          </div>
          <p className="text-[#c89b3c] text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Telling Our Stories. Building Our Legacy.
          </p>
          <p className="text-white text-lg max-w-3xl mx-auto mb-8" style={{ lineHeight: '1.6' }}>
            The Black Chronicle™ spotlights Black brilliance, innovation, and empowerment from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-[#00894C] text-white hover:bg-[#00A855] px-8 py-6 text-lg font-semibold rounded-lg"
              onClick={() => document.getElementById('submit-story')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Submit an Article
            </Button>
            <Button 
              className="bg-[#c89b3c] text-black hover:bg-[#B9962E] px-8 py-6 text-lg font-semibold rounded-lg"
              onClick={() => document.getElementById('articles-grid')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Read Latest Stories
            </Button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-4 font-medium transition-all relative ${
                  selectedCategory === category
                    ? 'text-[#c89b3c]'
                    : 'text-white hover:text-[#c89b3c]'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {category}
                {selectedCategory === category && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c89b3c]"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div id="articles-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c89b3c] mx-auto"></div>
            <p className="mt-4 text-white">Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 bg-[#111111] rounded-xl border border-[#c89b3c] p-12">
            <BookOpen className="w-16 h-16 text-[#c89b3c] mx-auto mb-4" />
            <h3 className="text-white text-2xl font-bold mb-2">No Articles Yet</h3>
            <p className="text-gray-400 mb-6">Be the first to share a story in this category!</p>
            <Button 
              className="bg-[#c89b3c] text-black hover:bg-[#B9962E] px-6 py-3 rounded-lg font-semibold"
              onClick={() => document.getElementById('submit-story')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Submit an Article
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article)}
                className="bg-[#111111] rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(200,155,60,0.4)] transition-all cursor-pointer border border-[#c89b3c]"
                style={{ borderRadius: '12px' }}
              >
                <img
                  src={article.image_url || "https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?w=800&h=450&fit=crop"}
                  alt={article.title}
                  className="w-full aspect-video object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?w=800&h=450&fit=crop";
                  }}
                />
                <div className="p-4">
                  <div className="mb-3">
                    <span className="bg-[#c89b3c] text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-white text-lg font-bold mb-2 line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-3 line-clamp-3" style={{ lineHeight: '1.6' }}>
                    {truncateText(article.body, 120)}
                  </p>
                  
                  <div className="flex items-center text-[#c89b3c] text-sm font-medium">
                    <User className="w-4 h-4 mr-1" />
                    <span>By {article.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Article Section */}
      {articles.length > 0 && (
        <div className="bg-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <span className="bg-[#c89b3c] text-black px-4 py-2 rounded-full text-sm font-bold uppercase">
                LATEST ARTICLE
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src={articles[0].image_url || "https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?w=800&h=600&fit=crop"}
                  alt={articles[0].title}
                  className="w-full rounded-xl"
                  style={{ borderRadius: '12px' }}
                />
              </div>
              <div>
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {articles[0].title}
                </h2>
                <p className="text-gray-300 text-lg mb-6" style={{ lineHeight: '1.6' }}>
                  {truncateText(articles[0].body, 300)}
                </p>
                <div className="flex items-center text-[#c89b3c] text-lg font-medium mb-6">
                  <User className="w-5 h-5 mr-2" />
                  <span>By {articles[0].author}</span>
                </div>
                <Button 
                  className="bg-[#c89b3c] text-black hover:bg-black hover:text-[#c89b3c] hover:border hover:border-[#c89b3c] px-8 py-4 text-lg font-semibold rounded-lg transition-all"
                  onClick={() => handleArticleClick(articles[0])}
                >
                  Read Full Story
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Your Story Section */}
      <div id="submit-story" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#c89b3c] text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Submit Your Story
            </h2>
            <p className="text-white text-lg" style={{ lineHeight: '1.6' }}>
              Share stories of Black excellence, innovation, and achievement with our community.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Full Name *</label>
              <input
                type="text"
                className="w-full bg-black border-2 border-[#c89b3c] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00894C]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email *</label>
              <input
                type="email"
                className="w-full bg-black border-2 border-[#c89b3c] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00894C]"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Headline *</label>
              <input
                type="text"
                className="w-full bg-black border-2 border-[#c89b3c] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00894C]"
                placeholder="Enter article headline"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Category *</label>
              <select className="w-full bg-black border-2 border-[#c89b3c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00894C]">
                <option value="">Select a category</option>
                <option value="Black Achievements">Black Achievements</option>
                <option value="Entrepreneur Spotlight">Entrepreneur Spotlight</option>
                <option value="Education & Culture">Education & Culture</option>
                <option value="Faith & Resilience">Faith & Resilience</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Your Story *</label>
              <textarea
                rows={8}
                className="w-full bg-black border-2 border-[#c89b3c] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00894C]"
                placeholder="Share your story..."
              ></textarea>
            </div>

            <div className="text-center">
              <Button 
                type="submit"
                className="bg-[#c89b3c] text-black hover:bg-black hover:text-[#c89b3c] hover:border-2 hover:border-[#c89b3c] px-12 py-4 text-lg font-bold rounded-lg transition-all"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Story
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-black border-t border-[#c89b3c] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-[#c89b3c] text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Are you a Black business owner or entrepreneur?
          </h3>
          <p className="text-white text-lg mb-6">
            Join the Movement. Build Your Legacy.
          </p>
          <Button 
            className="bg-[#c89b3c] text-black hover:bg-black hover:text-[#c89b3c] hover:border-2 hover:border-[#c89b3c] px-10 py-4 text-lg font-bold rounded-lg transition-all"
            onClick={() => navigate('/vendor-apply')}
          >
            Become a Vendor
          </Button>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="bg-black py-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 <span className="text-[#c89b3c] font-semibold">BlkXchange™</span>. All rights reserved. 
            Empowering Black excellence through economic unity.
          </p>
        </div>
      </div>
    </div>
  );
}

export default News;
