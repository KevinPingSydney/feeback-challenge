import type { Feedback } from '@/types/feedback';

export const useFeedback = () => {
  return {
    upvote: async (feedback: Feedback) => {
      // Just simulate a delay without changing the data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return feedback;
    },
    isUpvoting: false,
  };
};
