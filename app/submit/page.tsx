'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function SubmitFeedbackPage() {
  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Submit Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 
            TODO: Implement feedback submission form
            - Create a form with title, description, category, and status fields
            - Use react-hook-form or similar for form state management
            - Implement client-side validation with Zod
            - Show validation errors inline
            - Handle form submission to the API
            - Implement loading state during submission
          */}
          <div className="text-muted-foreground">
            Form implementation needed
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <Button type="submit" form="feedback-form">
            Submit Feedback
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
