'use client';

import { useEffect, useState } from 'react';
import FeedbackItem from './feedback-item';
import { useFeedback } from '@/context/feedback-context';
import { fetchFeedback } from '@/lib/api-client';
import type { Feedback } from '@/types/feedback';
import { FeedbackListSkeleton } from '@/components/skeletons/feedback-skeletons';

// TODO: Implement filtering by status
// - Accept a status filter parameter
// - Filter the feedback items based on the status
// - Ensure the component re-renders when the filter changes

export default function FeedbackList() {
  const { statusFilter } = useFeedback();
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeedback() {
      setIsLoading(true);
      try {
        const items = await fetchFeedback(
          statusFilter === 'All' ? undefined : statusFilter
        );
        setFeedbackItems(items);
      } catch (error) {
        console.error('Error loading feedback:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFeedback();
  }, [statusFilter]);

  if (isLoading) {
    return <FeedbackListSkeleton />;
  }

  if (feedbackItems.length === 0) {
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
      {feedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedback={item} />
      ))}
    </div>
  );
}
