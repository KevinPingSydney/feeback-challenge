import { useState, useCallback } from 'react';

const STORAGE_KEY = 'upvotedItems';

// Helper functions for localStorage operations
const getUpvotedItems = (): string[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

const setUpvotedItems = (items: string[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export function useUpvoteTracking(feedbackId: string) {
  const [hasUpvoted, setHasUpvoted] = useState(() => {
    return getUpvotedItems().includes(feedbackId);
  });

  const addUpvote = useCallback(() => {
    const upvotedItems = getUpvotedItems();
    upvotedItems.push(feedbackId);
    setUpvotedItems(upvotedItems);
    setHasUpvoted(true);
  }, [feedbackId]);

  const removeUpvote = useCallback(() => {
    const upvotedItems = getUpvotedItems();
    const index = upvotedItems.indexOf(feedbackId);
    if (index > -1) {
      upvotedItems.splice(index, 1);
      setUpvotedItems(upvotedItems);
      setHasUpvoted(false);
    }
  }, [feedbackId]);

  return {
    hasUpvoted,
    addUpvote,
    removeUpvote,
  };
}
