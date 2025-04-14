'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Feedback } from '@/types/feedback';
import Link from 'next/link';
import { UpvoteButton } from './upvote-button';
import { useSearchParams } from 'next/navigation';

type FeedbackItemProps = {
  feedback: Feedback;
};

export default function FeedbackItem({ feedback }: FeedbackItemProps) {
  const searchParams = useSearchParams();

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
            <Link
              href={`/feedback/${feedback.id}?${searchParams.toString()}`}
              className="hover:underline"
            >
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
        <UpvoteButton feedback={feedback} />
        <span className="text-sm text-muted-foreground">
          {new Date(feedback.createdAt).toLocaleDateString()}
        </span>
      </CardFooter>
    </Card>
  );
}
