import { API_BASE_URL } from '../config/api';
import { useState } from 'react';
import { X, Users, Lock, Unlock } from 'lucide-react';

interface GroupRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}


function GroupRequestModal({ isOpen, onClose, onSuccess }: GroupRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'business',
    is_private: true,
    image_url: '',
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Group request submitted successfully! Our team will review it shortly.');
        setFormData({
          name: '',
          description: '',
          category: 'business',
          is_private: true,
          image_url: '',
        });
        onSuccess?.();
        onClose();
      } else {
        alert('Failed to submit group request. Please try again.');
      }
    } catch (err) {
      console.error('Failed to submit group request:', err);
      alert('Failed to submit group request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-brand-gold" />
            <h2 className="text-2xl font-bold text-brand-black">Request a New Group</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Group Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              placeholder="e.g., Black Entrepreneurs Network"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              required
            >
              <option value="business">Business</option>
              <option value="networking">Networking</option>
              <option value="education">Education</option>
              <option value="community">Community</option>
              <option value="professional">Professional Development</option>
              <option value="social">Social</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
              placeholder="Describe the purpose and goals of your group..."
              required
            />
          </div>

          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
              Group Image URL (Optional)
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_private"
              name="is_private"
              checked={formData.is_private}
              onChange={(e) => setFormData(prev => ({ ...prev, is_private: e.target.checked }))}
              className="w-5 h-5 text-brand-gold focus:ring-brand-gold border-gray-300 rounded"
            />
            <label htmlFor="is_private" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              {formData.is_private ? (
                <>
                  <Lock className="w-4 h-4" />
                  Private Group (Members only)
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  Public Group (Open to all)
                </>
              )}
            </label>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Your group request will be reviewed by our team. 
              You will be notified once it's approved and ready to use.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-brand-gold text-brand-black rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GroupRequestModal;
