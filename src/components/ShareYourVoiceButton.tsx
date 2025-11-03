import { API_BASE_URL } from '../config/api';
import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface ShareYourVoiceButtonProps {
  className?: string;
}


function ShareYourVoiceButton({ className = '' }: ShareYourVoiceButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: 'general',
    title: '',
    content: '',
    author: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/forums/topics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Your voice has been shared! Thank you for contributing to the community.');
        setFormData({
          category: 'general',
          title: '',
          content: '',
          author: '',
        });
        setIsOpen(false);
      } else {
        alert('Failed to share your voice. Please try again.');
      }
    } catch (err) {
      console.error('Failed to share voice:', err);
      alert('Failed to share your voice. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-brand-gold text-brand-black px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition flex items-center gap-2 font-semibold z-40 ${className}`}
      >
        <MessageSquare className="w-5 h-5" />
        Share Your Voice
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-brand-gold" />
                <h2 className="text-2xl font-bold text-brand-black">Share Your Voice</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  Share your thoughts, ideas, or questions with the BlkXchange community. 
                  Your voice matters and helps build a stronger, more connected community.
                </p>
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  required
                >
                  <option value="general">General Discussion</option>
                  <option value="business">Business</option>
                  <option value="networking">Networking</option>
                  <option value="education">Education</option>
                  <option value="community">Community</option>
                  <option value="support">Support</option>
                  <option value="ideas">Ideas & Suggestions</option>
                </select>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  placeholder="What's on your mind?"
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                  placeholder="Share your thoughts, experiences, or questions..."
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-brand-gold text-brand-black rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Sharing...' : 'Share Your Voice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ShareYourVoiceButton;
