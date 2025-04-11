import { Suspense } from 'react';
import FeedbackList from '@/components/feedback/feedback-list';
import { FeedbackListSkeleton } from '@/components/skeletons/feedback-skeletons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container max-w-5xl py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Product Feedback</h1>
          <p className="text-muted-foreground">
            View and submit feedback for our product
          </p>
        </div>
        <Button asChild>
          <Link href="/submit">+ Add Feedback</Link>
        </Button>
      </div>

      {/* 
        TODO: Implement status filter component
        - Create a StatusFilter component that allows filtering by status
        - Use either URL params or state management for the filter
        - Ensure the filter is preserved when navigating
      */}

      <Suspense fallback={<FeedbackListSkeleton />}>
        <FeedbackList />
      </Suspense>
    </main>
  );
}
