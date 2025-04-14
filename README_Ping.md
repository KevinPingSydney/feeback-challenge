# Product Feedback Portal - Implementation Approach

## Overview

This document outlines my approach to implementing the Product Feedback Portal, focusing on creating a performant, robust, type-safe application using Next.js, TypeScript, and modern React patterns.

### Decisions

1. **State Management Split**:

   - Server State: SWR for data fetching and caching
   - Local State: React Context for UI state (filters, etc.)
   - Form State: React Hook Form

2. **Type Safety**:

   - Zod schemas for runtime validation
   - Strict TypeScript configuration

3. **Performance Optimizations**:
   - Optimistic UI updates for better UX
   - Proper data caching with SWR
   - Component memoization where beneficial

## Implementation Approach

### 1. Feedback Submission Form

- Implement form using React Hook Form
- Add Zod validation schema for:
  - Title (required, min/max length)
  - Description (required, min/max length)
  - Category (enum validation)
- Add error handling and loading states
- Implement client-side validation
- Add success/error notifications

### 2. Status Filtering

- Implement as URL-based filters for shareable links
- Use URL search params for persistence
- Add filter components with proper TypeScript types
- Ensure filters work with SSR
- Optimize re-renders using useMemo/useCallback

### 3. Upvote Functionality

- Implement optimistic updates for instant feedback
- Add rollback mechanism for failed requests
- Use SWR's mutate for cache updates
- Implement proper error handling
- Add rate limiting on the API side

### 5. Data Fetching Strategy

- Implement SWR hooks for data fetching
- Add proper loading states
- Implement error boundaries

- Optimize cache invalidation

## Future Improvements

1. Add comprehensive test coverage
2. Add user authentication
3. Improve error handling and logging
4. Add analytics tracking
5. Further improve code quality, which is not maxmised because of time constrain

## Out of scope

For this coding chanllenge, the followings are out of scope for time constrain

- Rate limiting
- Unit testing
- Retry logic
- Scalability

However, I still did manual and POSTMAN request testing.

## Conclusion

This implementation focuses on creating a performant, maintainable, type-safe feedback portal while adhering to React and TypeScript best practices. The approach prioritizes user experience through optimistic updates and proper error handling.

# Many thanks for reviewing the code.
