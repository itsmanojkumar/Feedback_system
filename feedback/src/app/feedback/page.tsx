'use client'
import { useSearchParams } from 'next/navigation';

export default function FeedbackPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name') ?? '';
  const improve = searchParams.get('improve') ?? '';
  const strengths = searchParams.get('strengths') ?? '';
  const feedback = searchParams.get('feedback') ?? '';

  return (
    <div className='flex gap-5 m-5'>
      <h1>Feedback Page</h1>
      <p>Name: {name}</p>
      <p>Strengths: {strengths}</p>
      <p>Areas to Improve: {improve}</p>
      <p>Feedback: {feedback}</p>
      <textarea className="w-150 h-32 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder='Enter feedback'></textarea>
      <button>Send</button>
    </div>
  );
}
