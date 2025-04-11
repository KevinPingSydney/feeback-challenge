import { z } from 'zod';

// TODO: Implement Zod schemas for feedback validation
// - Create schemas for feedback creation and updates
// - Add validation rules for each field
// - Export the schemas for use in API routes and forms

// Example schema structure (to be completed)
export const feedbackSchema = z.object({
  // TODO: Add validation rules for each field
  // - title: required, min/max length
  // - description: required, min/max length
  // - category: must be one of the valid categories
  // - status: must be one of the valid statuses
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;

// TODO: Create a schema for feedback updates
// - Make all fields optional
// - Reuse validation rules from the main schema
