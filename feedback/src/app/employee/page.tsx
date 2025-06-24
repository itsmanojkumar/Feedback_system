'use client'
import { useState } from 'react';

interface FeedbackItem {
  message: string;
}

interface UserFeedback {
  name: string;
  feedback: FeedbackItem[];
}

export default function FeedbackPage() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [allFeedback, setAllFeedback] = useState<UserFeedback[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getFeedback = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setFeedback([]);
    setName('');
    setAllFeedback([]);

    try {
      const response = await fetch(`https://backend-server-feedback.onrender.com/feedback/${encodeURIComponent(username)}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Failed to fetch feedback');
        return;
      }

      setName(data.name || username);
      setFeedback(Array.isArray(data.feedback) ? data.feedback : []);
    } catch {
      setError('Failed to fetch feedback');
    } finally {
      setLoading(false);
    }
  };

  const getAllFeedback = async () => {
    setLoading(true);
    setError('');
    setFeedback([]);
    setName('');
    setAllFeedback([]);

    try {
      const response = await fetch(`https://backend-server-feedback.onrender.com/feedback`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Failed to fetch all feedback');
        return;
      }

      setAllFeedback(Array.isArray(data) ? data : []);
    } catch {
      setError('Failed to fetch all feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">User Feedback</h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          disabled={loading}
        />
        <button
          onClick={getFeedback}
          disabled={loading || !username.trim()}
          className={`px-6 py-3 rounded-md font-semibold text-white transition 
            ${loading || !username.trim() ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {loading ? 'Loading...' : 'Get Feedback'}
        </button>

        <button
          onClick={getAllFeedback}
          disabled={loading}
          className={`px-6 py-3 rounded-md font-semibold text-white transition 
            ${loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
          `}
        >
          {loading ? 'Loading...' : 'Fetch All Feedback'}
        </button>
      </div>

      {error && (
        <p className="text-red-600 font-medium mb-6 text-center">{error}</p>
      )}

      {/* Single user feedback */}
      {name && (
        <div className="bg-gray-50 p-6 rounded-md shadow-inner mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Name: {name}</h2>
          {feedback.length === 0 ? (
            <p className="text-gray-600">No feedback available.</p>
          ) : (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {feedback.map((fb, index) => (
                <li key={index} className="bg-white p-3 rounded-md shadow-sm">
                  {fb.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* All users feedback */}
      {allFeedback.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">All User Feedback</h2>
          {allFeedback.map((user, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-md shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{user.name}</h3>
              {user.feedback.length === 0 ? (
                <p className="text-gray-600">No feedback available.</p>
              ) : (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {user.feedback.map((fb, i) => (
                    <li key={i} className="bg-white p-3 rounded-md shadow-sm">
                      {fb.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
