// TODO: Expand these types as needed for your implementation
// - Add additional properties as required
// - Use utility types where appropriate
// - Consider using discriminated unions for different feedback states

export const FeedbackStatusEnum = {
  All: 'All',
  Open: 'Open',
  InProgress: 'In Progress',
  Closed: 'Closed',
} as const;

export const FeedbackCategoryEnum = {
  Bug: 'Bug',
  Feature: 'Feature',
  Improvement: 'Improvement',
  Documentation: 'Documentation',
  Other: 'Other',
} as const;

export type FeedbackStatus =
  (typeof FeedbackStatusEnum)[keyof typeof FeedbackStatusEnum];
export type FeedbackCategory =
  (typeof FeedbackCategoryEnum)[keyof typeof FeedbackCategoryEnum];

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
