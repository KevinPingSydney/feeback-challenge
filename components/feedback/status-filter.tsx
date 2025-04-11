'use client';

import { Button } from '@/components/ui/button';
import type { FeedbackStatus } from '@/types/feedback';

// TODO: Implement status filter component
// - Create a component that allows filtering by status
// - Use either URL params or state management for the filter
// - Ensure the filter is preserved when navigating
// - Make it visually clear which filter is active

export default function StatusFilter() {
  // TODO: Implement filter state management
  // - Track the current filter state
  // - Update the URL or context/store when filter changes
  // - Sync with URL params if using URL-based filtering

  const statuses: FeedbackStatus[] = ['All', 'Open', 'In Progress', 'Closed'];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {statuses.map((status) => (
        <Button
          key={status}
          variant="outline"
          // TODO: Set active state based on current filter
          // TODO: Implement click handler to update filter
        >
          {status}
        </Button>
      ))}
    </div>
  );
}
