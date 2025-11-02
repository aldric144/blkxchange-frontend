import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import CommentSection from '../components/CommentSection';

interface Article {
  id: number;
  title: string;
  category: string;
  body: string;
  author: string;
  image_url: string | null;
  created_at: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://blkxchangedeploymentapp-pwvsejlq.devinapps.com';

function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const articleId = slug?.split('-').pop();
        const response = await fetch(`${API_URL}/api/articles/${articleId}`);
        
        if (!response.ok) {
          throw new Error('Article not found');
        }
        
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const handleShare = async () => {
    const shareData = {
      title: article?.title || 'BlkXchange Article',
      text: `Check out this article: ${article?.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto"></div>
          <p className="mt-4 text-brand-black">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-black mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The article you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/news')}
            className="bg-brand-gold text-brand-black px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-ivory">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-brand-black hover:text-brand-gold transition mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-brand-gold text-brand-black px-3 py-1 rounded-full text-sm font-semibold">
                {article.category}
              </span>
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-brand-black mb-4">
              {article.title}
            </h1>

            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center text-gray-700">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{article.author}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-brand-gold hover:text-yellow-600 transition"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {article.body}
              </div>
            </div>
          </div>
        </article>

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-6 h-6 text-brand-gold" />
            <h2 className="text-2xl font-bold text-brand-black">Comments</h2>
          </div>
          <CommentSection articleId={article.id} />
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
