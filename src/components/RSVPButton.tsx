import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface RSVPButtonProps {
  eventId: number;
  onSuccess?: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://blkxchangedeploymentapp-pwvsejlq.devinapps.com';

function RSVPButton({ eventId, onSuccess }: RSVPButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('attending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId.trim()) {
      setError('Please enter your user ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: parseInt(userId),
          status: status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RSVP');
      }

      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setUserId('');
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit RSVP');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setError(null);
    setSuccess(false);
    setUserId('');
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-8 py-3 bg-brand-gold text-brand-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors shadow-lg"
      >
        RSVP to Event
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-brand-black">RSVP to Event</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {success ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-brand-black mb-2">RSVP Submitted!</h3>
                <p className="text-gray-600">Thank you for confirming your attendance.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                    User ID
                  </label>
                  <input
                    type="number"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="Enter your user ID"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your user ID can be found in your profile settings
                  </p>
                </div>

                <div className="mb-6">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    RSVP Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  >
                    <option value="attending">Attending</option>
                    <option value="maybe">Maybe</option>
                    <option value="not_attending">Not Attending</option>
                  </select>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-brand-gold text-brand-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit RSVP'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default RSVPButton;
