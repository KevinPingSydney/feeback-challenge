// This is a mock database client
// In a real application, we may use an ORM like Prisma, Drizzle etc for example

import type { Feedback } from '@/types/feedback';

// Mock data
const feedbackData: Feedback[] = [
  {
    id: '1',
    title: 'Add dark mode support',
    description:
      'It would be great to have a dark mode option for the dashboard.',
    category: 'Feature',
    status: 'Open',
    upvotes: 24,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Improve loading performance',
    description:
      'The dashboard takes too long to load when there are many items.',
    category: 'Improvement',
    status: 'In Progress',
    upvotes: 18,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Fix login button on mobile',
    description: 'The login button is not visible on mobile devices.',
    category: 'Bug',
    status: 'Closed',
    upvotes: 12,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock database client
export const db = {
  feedback: {
    findMany: async (options?: {
      where?: Partial<Feedback>;
      orderBy?: Record<string, 'asc' | 'desc'>;
    }) => {
      let result = [...feedbackData];

      if (options?.where) {
        const filters = options.where;
        result = result.filter((item) => {
          return Object.entries(filters).every(([key, value]) => {
            return item[key as keyof Feedback] === value;
          });
        });
      }

      if (options?.orderBy) {
        const [field, direction] = Object.entries(options.orderBy)[0];
        result.sort((a, b) => {
          const aValue = a[field as keyof Feedback];
          const bValue = b[field as keyof Feedback];

          if (direction === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          }
        });
      }

      return result;
    },
    findUnique: async (options: { where: { id: string } }) => {
      return feedbackData.find((item) => item.id === options.where.id) || null;
    },
    create: async (options: {
      data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>;
    }) => {
      const newFeedback: Feedback = {
        id: String(feedbackData.length + 1),
        ...options.data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      feedbackData.push(newFeedback);
      return newFeedback;
    },
    update: async (options: {
      where: { id: string };
      data: Partial<Feedback> | { upvotes: { increment: number } | number };
    }) => {
      const index = feedbackData.findIndex(
        (item) => item.id === options.where.id
      );

      if (index === -1) {
        throw new Error('Feedback not found');
      }

      const updatedFeedback = { ...feedbackData[index] };

      if (
        'upvotes' in options.data &&
        typeof options.data.upvotes === 'object' &&
        'increment' in options.data.upvotes
      ) {
        updatedFeedback.upvotes += options.data.upvotes.increment;
      } else {
        Object.assign(updatedFeedback, options.data);
      }

      updatedFeedback.updatedAt = new Date().toISOString();
      feedbackData[index] = updatedFeedback;

      return updatedFeedback;
    },
  },
};
