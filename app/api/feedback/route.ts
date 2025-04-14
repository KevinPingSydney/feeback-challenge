import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { feedbackSchema } from '@/lib/validation';
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

    // Validate request body using Zod
    const validationResult = feedbackSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const feedback = await db.feedback.create({
      data: {
        title: validationResult.data.title,
        description: validationResult.data.description,
        category: validationResult.data.category,
        status: validationResult.data.status || 'Open',
        upvotes: 0,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);

    // Handle different types of errors
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
