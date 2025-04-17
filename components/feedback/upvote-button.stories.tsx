import type { Meta, StoryObj } from '@storybook/react';
import { UpvoteButton } from './upvote-button';
import { FeedbackCategoryEnum, FeedbackStatusEnum } from '@/types/feedback';
import type { Feedback } from '@/types/feedback';

const meta: Meta<typeof UpvoteButton> = {
  title: 'Components/Feedback/UpvoteButton',
  component: UpvoteButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    feedback: {
      control: 'object',
      description: 'The feedback item to upvote',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UpvoteButton>;

// Mock feedback data
const mockFeedback = {
  id: '1',
  title: 'Test Feedback',
  description: 'Test Description',
  upvotes: 10,
  status: FeedbackStatusEnum.Open,
  category: FeedbackCategoryEnum.Feature,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Default state
export const Default: Story = {
  args: {
    feedback: mockFeedback,
  },
};

// Zero upvotes state
export const WithZeroUpvotes: Story = {
  args: {
    feedback: {
      ...mockFeedback,
      upvotes: 0,
    },
  },
};

// Many upvotes state
export const WithManyUpvotes: Story = {
  args: {
    feedback: {
      ...mockFeedback,
      upvotes: 999,
    },
  },
};

// Loading state
export const Loading: Story = {
  args: {
    feedback: mockFeedback,
  },
  parameters: {
    mockData: [
      {
        url: '/api/feedback/*',
        method: 'PUT',
        status: 200,
        delay: 2000,
        response: (request: { body: Feedback }) => request.body,
      },
    ],
  },
};
