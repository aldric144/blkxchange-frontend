import { API_BASE_URL } from '../config/api';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MessageCircle, Calendar, User, ArrowLeft, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
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


function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previousArticle, setPreviousArticle] = useState<Article | null>(null);
  const [nextArticle, setNextArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticleAndList = async () => {
      try {
        setLoading(true);
        const articleId = slug?.split('-').pop();
        
        const articleResponse = await fetch(`${API_BASE_URL}/api/articles/${articleId}`);
        if (!articleResponse.ok) {
          throw new Error('Article not found');
        }
        const articleData = await articleResponse.json();
        setArticle(articleData);
        
        const allArticlesResponse = await fetch(`${API_BASE_URL}/api/articles`);
        if (allArticlesResponse.ok) {
          const allArticlesData = await allArticlesResponse.json();
          
          const sortedArticles = allArticlesData.sort((a: Article, b: Article) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          
          const currentIndex = sortedArticles.findIndex((a: Article) => a.id === articleData.id);
          if (currentIndex !== -1) {
            if (currentIndex > 0) {
              setPreviousArticle(sortedArticles[currentIndex - 1]);
            }
            if (currentIndex < sortedArticles.length - 1) {
              setNextArticle(sortedArticles[currentIndex + 1]);
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticleAndList();
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

  const createSlug = (title: string, id: number) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `${slug}-${id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c89b3c] mx-auto"></div>
          <p className="mt-4 text-white">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The article you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/news')}
            className="bg-[#c89b3c] text-black px-6 py-2 rounded-lg hover:bg-[#B9962E] transition"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/news')}
          className="flex items-center text-white hover:text-[#c89b3c] transition mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to News
        </button>

        <article className="bg-[#111111] rounded-xl shadow-lg overflow-hidden border border-[#c89b3c]">
          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#c89b3c] text-black px-3 py-1 rounded-full text-sm font-bold uppercase">
                {article.category}
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {article.title}
            </h1>

            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-800">
              <div className="flex items-center text-[#c89b3c]">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">By {article.author}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-[#c89b3c] hover:text-[#B9962E] transition"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap" style={{ lineHeight: '1.8' }}>
                {article.body}
              </div>
            </div>
          </div>
        </article>

        {/* Next/Previous Article Navigation */}
        <div className="mt-8 flex justify-between items-center gap-4">
          {previousArticle ? (
            <Link
              to={`/news/${createSlug(previousArticle.title, previousArticle.id)}`}
              className="flex items-center gap-2 bg-[#111111] border border-[#c89b3c] text-white hover:bg-[#c89b3c] hover:text-black transition-all px-6 py-4 rounded-lg flex-1 max-w-md"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="text-left">
                <div className="text-xs text-gray-400 uppercase mb-1">Previous Article</div>
                <div className="font-semibold line-clamp-1">{previousArticle.title}</div>
              </div>
            </Link>
          ) : (
            <div className="flex-1 max-w-md"></div>
          )}

          {nextArticle ? (
            <Link
              to={`/news/${createSlug(nextArticle.title, nextArticle.id)}`}
              className="flex items-center gap-2 bg-[#111111] border border-[#c89b3c] text-white hover:bg-[#c89b3c] hover:text-black transition-all px-6 py-4 rounded-lg flex-1 max-w-md justify-end text-right"
            >
              <div className="text-right">
                <div className="text-xs text-gray-400 uppercase mb-1">Next Article</div>
                <div className="font-semibold line-clamp-1">{nextArticle.title}</div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div className="flex-1 max-w-md"></div>
          )}
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-6 h-6 text-[#c89b3c]" />
            <h2 className="text-2xl font-bold text-white">Comments</h2>
          </div>
          <CommentSection articleId={article.id} />
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
