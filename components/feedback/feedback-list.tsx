'use client';

import FeedbackItem from './feedback-item';
import { useSearchParams } from 'next/navigation';
import { FeedbackListSkeleton } from '@/components/skeletons/feedback-skeletons';
import { useFeedbackList } from '@/hooks/use-feedback';

// DONE: Implement filtering by status
// - Accept a status filter parameter
// - Filter the feedback items based on the status
// - Ensure the component re-renders when the filter changes

export default function FeedbackList() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'All';
  const { feedbackList, isLoading, error } = useFeedbackList(
    status === 'All' ? undefined : status
  );

  if (isLoading) {
    return <FeedbackListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-destructive">
          Error loading feedback
        </h3>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  if (!feedbackList || feedbackList.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No feedback yet</h3>
        <p className="text-muted-foreground">
          Be the first to submit feedback!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedbackList.map((item) => (
        <FeedbackItem key={item.id} feedback={item} />
      ))}
    </div>
  );
}
