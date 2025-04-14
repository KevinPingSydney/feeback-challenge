import type { Feedback } from '@/types/feedback';
import { db } from './db';

// DONE: Implement data fetching functions
// - Add status filtering capabilities
// - Add sorting options
// - Add pagination support (optional)

export interface GetFeedbackOptions {
  status?: Feedback['status'];
  sortBy?: keyof Feedback;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export async function getFeedback(options: GetFeedbackOptions = {}): Promise<{
  feedback: Feedback[];
  total: number;
  page: number;
  pageSize: number;
}> {
  const {
    status,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    pageSize = 10,
  } = options;

  try {
    // First get all feedback with filtering and sorting
    const allFeedback = await db.feedback.findMany({
      where: status ? { status } : undefined,
      orderBy: { [sortBy]: sortOrder },
    });

    // Calculate pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedFeedback = allFeedback.slice(startIndex, endIndex);

    return {
      feedback: paginatedFeedback,
      total: allFeedback.length,
      page,
      pageSize,
    };
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return {
      feedback: [],
      total: 0,
      page,
      pageSize,
    };
  }
}

export async function getFeedbackById(id: string): Promise<Feedback | null> {
  try {
    return await db.feedback.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error fetching feedback with id ${id}:`, error);
    return null;
  }
}
