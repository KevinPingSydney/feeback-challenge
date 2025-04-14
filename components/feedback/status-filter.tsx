'use client';

import { Button } from '@/components/ui/button';
import type { FeedbackStatus } from '@/types/feedback';
import { useRouter, useSearchParams } from 'next/navigation';

// DONE: Implement status filter component
// - Create a component that allows filtering by status
// - Use either URL params or state management for the filter
// - Ensure the filter is preserved when navigating
// - Make it visually clear which filter is active

export default function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') || 'All';
  const statuses: FeedbackStatus[] = ['All', 'Open', 'In Progress', 'Closed'];

  const handleStatusChange = (status: FeedbackStatus) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === 'All') {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {statuses.map((status) => (
        <Button
          key={status}
          variant={currentStatus === status ? 'default' : 'outline'}
          onClick={() => handleStatusChange(status)}
        >
          {status}
        </Button>
      ))}
    </div>
  );
}
