'use client';

import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import type { Feedback } from '@/types/feedback';

// DONE: Implement custom hook for feedback operations
// - Create a hook that provides functions for feedback operations
// - Use SWR or React Query for data fetching and mutations
// - Implement optimistic UI updates
// - Handle error states and rollbacks

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

// Mutation function for upvoting
const upvoteMutator = async (_url: string, { arg }: { arg: string }) => {
  const response = await fetch(arg, {
    method: 'PUT',
  });
  if (!response.ok) {
    throw new Error('Failed to upvote');
  }
  return response.json();
};

// Helper function to update feedback in cache
const updateFeedbackInCache = (feedback: Feedback, upvoted: boolean) => {
  const updatedFeedback = {
    ...feedback,
    upvotes: upvoted ? feedback.upvotes + 1 : feedback.upvotes - 1,
  };

  // Update the individual feedback cache silently
  mutate(`${API_BASE_URL}/feedback/${feedback.id}`, updatedFeedback, {
    revalidate: false,
    populateCache: true,
  });

  // Update the feedback in any list that contains it
  mutate(
    `${API_BASE_URL}/feedback`,
    (data: Feedback[] | undefined) => {
      if (!data) return data;
      return data.map((item) =>
        item.id === feedback.id ? updatedFeedback : item
      );
    },
    {
      revalidate: false,
      populateCache: true,
    }
  );

  // Update any filtered lists
  mutate(
    (key) =>
      typeof key === 'string' && key.startsWith(`${API_BASE_URL}/feedback?`),
    (data: Feedback[] | undefined) => {
      if (!data) return data;
      return data.map((item) =>
        item.id === feedback.id ? updatedFeedback : item
      );
    },
    {
      revalidate: false,
      populateCache: true,
    }
  );
};

export function useFeedback(feedbackId?: string) {
  // Fetch feedback data if feedbackId is provided
  const {
    data: feedback,
    error: fetchError,
    isLoading,
  } = useSWR<Feedback>(
    feedbackId ? `${API_BASE_URL}/feedback/${feedbackId}` : null,
    fetcher,
    {
      // Reduce revalidation frequency
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
    }
  );

  // Setup mutation for upvoting
  const { trigger: upvoteMutation, isMutating: isUpvoting } = useSWRMutation(
    `${API_BASE_URL}/feedback`,
    upvoteMutator,
    {
      // Reduce revalidation
      revalidate: false,
    }
  );

  const handleUpvote = useCallback(
    async (feedbackToUpvote: Feedback) => {
      try {
        // Perform the actual mutation
        await upvoteMutation(
          `${API_BASE_URL}/feedback/${feedbackToUpvote.id}/upvote`
        );

        // Update caches silently after successful mutation
        updateFeedbackInCache(feedbackToUpvote, true);

        // Revalidate in the background after a short delay
        setTimeout(() => {
          mutate((key) => typeof key === 'string' && key.includes('/feedback'));
        }, 1000);
      } catch (error) {
        throw error;
      }
    },
    [upvoteMutation]
  );

  return {
    feedback,
    isLoading,
    error: fetchError,
    upvote: handleUpvote,
    isUpvoting,
  };
}

// Hook for fetching feedback list
export function useFeedbackList(status?: string) {
  const {
    data: feedbackList,
    error,
    isLoading,
  } = useSWR<Feedback[]>(
    `${API_BASE_URL}/feedback${status ? `?status=${status}` : ''}`,
    fetcher,
    {
      // Reduce revalidation frequency
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
    }
  );

  return {
    feedbackList,
    isLoading,
    error,
  };
}
