import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { feedbackSchema, validateRequest } from '@/lib/validation';
import { FeedbackStatusEnum } from '@/types/feedback';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    // Validate status against allowed values
    const validStatus =
      status &&
      Object.values(FeedbackStatusEnum).includes(
        status as (typeof FeedbackStatusEnum)[keyof typeof FeedbackStatusEnum]
      )
        ? (status as Exclude<
            (typeof FeedbackStatusEnum)[keyof typeof FeedbackStatusEnum],
            'All'
          >)
        : undefined;

    const feedbackItems = await db.feedback.findMany({
      where: validStatus ? { status: validStatus } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(feedbackItems);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateRequest(feedbackSchema, body);
    if (!validation.success) {
      return validation.response;
    }

    const feedback = await db.feedback.create({
      data: {
        ...validation.data,
        status: validation.data.status || 'Open',
        upvotes: 0,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);

    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return NextResponse.json(
          { error: 'Resource not found' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create feedback' },
      { status: 500 }
    );
  }
}
