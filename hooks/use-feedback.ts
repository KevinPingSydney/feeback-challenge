'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { upvoteFeedback } from '@/lib/api-client';
import type { Feedback } from '@/types/feedback';

// TODO: Implement custom hook for feedback operations
// - Create a hook that provides functions for feedback operations
// - Use SWR or React Query for data fetching and mutations
// - Implement optimistic UI updates
// - Handle error states and rollbacks

export function useFeedback() {
  const router = useRouter();

  const handleUpvote = useCallback(
    async (feedback: Feedback) => {
      try {
        await upvoteFeedback(feedback.id);
        // Refresh the page to get the latest data
        router.refresh();
      } catch (error) {
        console.error('Failed to upvote feedback:', error);
        throw error; // Re-throw to let the component handle the error
      }
    },
    [router]
  );

  return {
    upvote: handleUpvote,
  };
}
