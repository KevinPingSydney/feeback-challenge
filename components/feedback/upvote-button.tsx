'use client';

import { memo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useFeedback } from '@/hooks/use-feedback';
import { useUpvoteTracking } from '@/hooks/use-upvote-tracking';
import type { Feedback } from '@/types/feedback';

interface UpvoteButtonProps {
  feedback: Feedback;
}

function UpvoteButtonComponent({ feedback }: UpvoteButtonProps) {
  const { toast } = useToast();
  const { upvote, isUpvoting } = useFeedback(feedback.id);
  const [optimisticUpvotes, setOptimisticUpvotes] = useState(feedback.upvotes);
  const { hasUpvoted, addUpvote, removeUpvote } = useUpvoteTracking(
    feedback.id
  );

  // Update local state when feedback prop changes
  if (optimisticUpvotes !== feedback.upvotes) {
    setOptimisticUpvotes(feedback.upvotes);
  }

  const handleUpvote = async () => {
    if (hasUpvoted) return;

    try {
      // Update local state immediately
      setOptimisticUpvotes((prev) => prev + 1);
      addUpvote();
      await upvote(feedback);
    } catch (error) {
      // Rollback on error
      setOptimisticUpvotes(feedback.upvotes);
      removeUpvote();

      toast({
        title: 'Error',
        description: 'Failed to upvote feedback. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleUpvote}
      disabled={isUpvoting || hasUpvoted}
      className={`flex items-center gap-1 ${hasUpvoted ? 'bg-accent text-accent-foreground' : ''}`}
      aria-label="Upvote feedback"
    >
      <ChevronUp className="h-4 w-4" />
      <span>{optimisticUpvotes}</span>
    </Button>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const UpvoteButton = memo(UpvoteButtonComponent);
