'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useFeedback } from '@/hooks/use-feedback';
import type { Feedback } from '@/types/feedback';

interface UpvoteButtonProps {
  feedback: Feedback;
}

export function UpvoteButton({ feedback }: UpvoteButtonProps) {
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [optimisticUpvotes, setOptimisticUpvotes] = useState(feedback.upvotes);
  const { toast } = useToast();
  const { upvote } = useFeedback();

  const handleUpvote = async () => {
    try {
      setIsUpvoting(true);
      // Optimistic update
      setOptimisticUpvotes((prev) => prev + 1);

      await upvote(feedback);
    } catch (error) {
      // Rollback optimistic update
      setOptimisticUpvotes(feedback.upvotes);
      toast({
        title: 'Error',
        description: 'Failed to upvote feedback. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUpvoting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleUpvote}
      disabled={isUpvoting}
      className="flex items-center gap-1"
      aria-label="Upvote feedback"
    >
      <ChevronUp className="h-4 w-4" />
      <span>{optimisticUpvotes}</span>
    </Button>
  );
}
