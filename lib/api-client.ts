import type { Feedback } from '@/types/feedback';

// TODO: Implement API client functions
// - Create functions for fetching, creating, updating, and upvoting feedback
// - Use fetch API with proper error handling
// - Add TypeScript types for request and response data

const API_BASE_URL = '/api';

export async function fetchFeedback(status?: string): Promise<Feedback[]> {
  // TODO: Implement fetch with status filter
  const url =
    status && status !== 'All'
      ? `${API_BASE_URL}/feedback?status=${status}`
      : `${API_BASE_URL}/feedback`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch feedback');
  }

  return response.json();
}

export async function fetchFeedbackById(id: string): Promise<Feedback> {
  // TODO: Implement fetch by ID
  const response = await fetch(`${API_BASE_URL}/feedback/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch feedback');
  }

  return response.json();
}

export async function createFeedback(data: any): Promise<Feedback> {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  // TODO: Implement create feedback
  // - Add proper type for the data parameter
  // - Validate data before sending

  const response = await fetch(`${API_BASE_URL}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // TODO: Handle validation errors
    throw new Error('Failed to create feedback');
  }

  return response.json();
}

export async function upvoteFeedback(id: string): Promise<Feedback> {
  // TODO: Implement upvote feedback

  const response = await fetch(`${API_BASE_URL}/feedback/${id}/upvote`, {
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error('Failed to upvote feedback');
  }

  return response.json();
}
