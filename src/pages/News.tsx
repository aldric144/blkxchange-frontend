import { API_BASE_URL } from '../config/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';
import QuickLinksWidget from '../components/QuickLinksWidget';
import TrendingTopicsWidget from '../components/TrendingTopicsWidget';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'business', 'community', 'education', 'technology', 'culture'];

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all'
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
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-black text-brand-ivory py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-10 h-10 text-brand-gold" />
            <h1 className="text-4xl font-bold">The Black Chronicle</h1>
          </div>
          <p className="text-gray-300">Stories, insights, and news from the Black community</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? 'bg-brand-gold text-brand-black'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No articles found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleArticleClick(article)}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
                  >
                    {article.image_url && (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-brand-gold text-brand-black px-3 py-1 rounded-full text-xs font-semibold">
                          {article.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(article.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      
                      <h2 className="text-xl font-bold text-brand-black mb-2 line-clamp-2">
                        {article.title}
                      </h2>
                      
                      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                        {truncateText(article.body, 150)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600 text-sm">
                          <User className="w-4 h-4 mr-1" />
                          <span>{article.author}</span>
                        </div>
                        <button className="flex items-center gap-1 text-brand-gold hover:text-yellow-600 text-sm font-medium transition">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-80 space-y-6">
            <QuickLinksWidget />
            <TrendingTopicsWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
