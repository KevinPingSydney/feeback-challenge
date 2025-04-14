import { z } from 'zod';
import { FeedbackCategoryEnum, FeedbackStatusEnum } from '@/types/feedback';

// TODO: Implement Zod schemas for feedback validation
// - Create schemas for feedback creation and updates
// - Add validation rules for each field
// - Export the schemas for use in API routes and forms

// Example schema structure (to be completed)
export const feedbackSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description is too long'),
  category: z.enum([
    FeedbackCategoryEnum.Bug,
    FeedbackCategoryEnum.Feature,
    FeedbackCategoryEnum.Improvement,
    FeedbackCategoryEnum.Documentation,
    FeedbackCategoryEnum.Other,
  ] as const),
  status: z
    .enum([
      FeedbackStatusEnum.Open,
      FeedbackStatusEnum.InProgress,
      FeedbackStatusEnum.Closed,
    ] as const)
    .optional(),
});

export const feedbackUpdateSchema = feedbackSchema.partial();

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
export type FeedbackUpdateValues = z.infer<typeof feedbackUpdateSchema>;

// TODO: Create a schema for feedback updates
// - Make all fields optional
// - Reuse validation rules from the main schema
