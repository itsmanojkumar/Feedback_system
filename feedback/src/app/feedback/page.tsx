'use client'
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface feedbackform {
  feedback: string;
}

export default function FeedbackPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name') ?? '';
  const improve = searchParams.get('improve') ?? '';
  const strengths = searchParams.get('strengths') ?? '';
  const feedback = searchParams.get('feedback') ?? '';

  const [feedbackform, setFeedbackform] = useState<string>("");

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: name,
      feedback: feedbackform,
    };
    console.log("payload is", payload);
    try {
      const response = await fetch("http://127.0.0.1:8000/feedback", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        console.log("data sent successfully");
      } else {
        console.log("error posting the data");
      }
    } catch (error) {
      console.log(error);
    }
    setFeedbackform("")
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <form
        onSubmit={handlesubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Feedback Page</h1>

        <div className="text-gray-700 space-y-1">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Strengths:</strong> {strengths}</p>
          <p><strong>Areas to Improve:</strong> {improve}</p>
          <p><strong>Previous Feedback:</strong> {feedback}</p>
        </div>

        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
            Your Feedback:
          </label>
          <textarea
            id="feedback"
            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setFeedbackform(e.target.value)}
            value={feedbackform}
            placeholder="Enter your feedback here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
