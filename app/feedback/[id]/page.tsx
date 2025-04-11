import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getFeedbackById } from '@/lib/data';

export default async function FeedbackDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const feedback = await getFeedbackById(params.id);

  if (!feedback) {
    notFound();
  }

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/">
            <span aria-hidden="true">&larr;</span> Back to List
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{feedback.title}</h1>
            <p className="text-muted-foreground">{feedback.category}</p>
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
          <p className="whitespace-pre-wrap">{feedback.description}</p>

          {/* 
            TODO: Implement upvote functionality
            - Create an UpvoteButton component
            - Implement optimistic UI updates
            - Handle error states and rollbacks
          */}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
