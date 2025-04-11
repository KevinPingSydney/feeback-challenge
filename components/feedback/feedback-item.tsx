'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Feedback } from '@/types/feedback';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';

type FeedbackItemProps = {
  feedback: Feedback;
};

export default function FeedbackItem({ feedback }: FeedbackItemProps) {
  // TODO: Implement upvote functionality
  // - Create a function to handle upvoting
  // - Use SWR or React Query for data fetching and mutation
  // - Implement optimistic UI updates
  // - Handle error states and rollbacks

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-xl">
            <Link href={`/feedback/${feedback.id}`} className="hover:underline">
              {feedback.title}
            </Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground">{feedback.category}</p>
        </div>
        <Badge
          variant={
            feedback.status === 'Open'
              ? 'default'
              : feedback.status === 'In Progress'
                ? 'destructive'
                : 'secondary'
          }
        >
          {feedback.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2">{feedback.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          // TODO: Implement upvote handler
        >
          <ChevronUp className="h-4 w-4" />
          <span>{feedback.upvotes}</span>
        </Button>
        <span className="text-sm text-muted-foreground">
          {new Date(feedback.createdAt).toLocaleDateString()}
        </span>
      </CardFooter>
    </Card>
  );
}
