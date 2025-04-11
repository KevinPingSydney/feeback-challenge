// TODO: Expand these types as needed for your implementation
// - Add additional properties as required
// - Use utility types where appropriate
// - Consider using discriminated unions for different feedback states

export type FeedbackStatus = 'All' | 'Open' | 'In Progress' | 'Closed';
export type FeedbackCategory =
  | 'Bug'
  | 'Feature'
  | 'Improvement'
  | 'Documentation'
  | 'Other';

export interface Feedback {
  id: string;
  title: string;
  description: string;
  category: FeedbackCategory;
  status: Exclude<FeedbackStatus, 'All'>;
  upvotes: number;
  createdAt: string;
  updatedAt: string;
}

// TODO: Create a type for feedback creation
// - Omit auto-generated fields
// - Make some fields optional if needed

// TODO: Create a type for feedback updates
// - Make all fields optional
// - Consider using Partial<T> or Pick<T>
