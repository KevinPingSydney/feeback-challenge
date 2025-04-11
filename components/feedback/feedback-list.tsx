import { getFeedback } from '@/lib/data';
import FeedbackItem from './feedback-item';

// TODO: Implement filtering by status
// - Accept a status filter parameter
// - Filter the feedback items based on the status
// - Ensure the component re-renders when the filter changes

export default async function FeedbackList() {
  const feedbackItems = await getFeedback();

  if (feedbackItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No feedback yet</h3>
        <p className="text-muted-foreground">
          Be the first to submit feedback!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedback={item} />
      ))}
    </div>
  );
}
