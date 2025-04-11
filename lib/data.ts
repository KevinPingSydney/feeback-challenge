import type { Feedback } from '@/types/feedback';
import { db } from './db';

// TODO: Implement data fetching functions
// - Add filtering capabilities
// - Add sorting options
// - Add pagination support (optional)

export async function getFeedback(): Promise<Feedback[]> {
  try {
    return await db.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return [];
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
