// app/feedback/page.tsx
import { Suspense } from 'react';
import FeedbackPage from './feedbackpage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading feedback page...</div>}>
      <FeedbackPage />
    </Suspense>
  );
}
