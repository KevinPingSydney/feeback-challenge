'use client';

import { Button } from '@/components/ui/button';
import type { FeedbackStatus } from '@/types/feedback';
import { useFeedback } from '@/context/feedback-context';

// TODO: Implement status filter component
// - Create a component that allows filtering by status
// - Use either URL params or state management for the filter
// - Ensure the filter is preserved when navigating
// - Make it visually clear which filter is active

export default function StatusFilter() {
  const { statusFilter, setStatusFilter } = useFeedback();
  const statuses: FeedbackStatus[] = ['All', 'Open', 'In Progress', 'Closed'];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {statuses.map((status) => (
        <Button
          key={status}
          variant={statusFilter === status ? 'default' : 'outline'}
          onClick={() => setStatusFilter(status)}
        >
          {status}
        </Button>
      ))}
    </div>
  );
}
