'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { FeedbackStatus } from '@/types/feedback';

// DONE: The CONTEXT is not used in this project. We use the URL params instead.

// TODO: Implement feedback context
// - Create a context for feedback state
// - Provide functions for filtering and sorting
// - Consider using useReducer for complex state management

type FeedbackContextType = {
  statusFilter: FeedbackStatus;
  setStatusFilter: (status: FeedbackStatus) => void;
  // TODO: Add more context values and functions as needed
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus>('All');

  // TODO: Implement additional state and functions
  // - Add sorting options
  // - Add filtering by category
  // - Add search functionality (optional)

  return (
    <FeedbackContext.Provider
      value={{
        statusFilter,
        setStatusFilter,
        // TODO: Add more context values
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
