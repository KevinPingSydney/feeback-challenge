'use client';

import { Suspense } from 'react';
import FeedbackList from '@/components/feedback/feedback-list';
import { FeedbackListSkeleton } from '@/components/skeletons/feedback-skeletons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FeedbackProvider } from '@/context/feedback-context';
import StatusFilter from '@/components/feedback/status-filter';

export default function Home() {
  return (
    <FeedbackProvider>
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

        <StatusFilter />

        <Suspense fallback={<FeedbackListSkeleton />}>
          <FeedbackList />
        </Suspense>
      </main>
    </FeedbackProvider>
  );
}
