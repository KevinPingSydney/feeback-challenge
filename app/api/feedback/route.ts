import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { feedbackSchema } from '@/lib/validation';

export async function GET() {
  // TODO: Implement filtering by status
  // - Extract status filter from query params
  // - Filter feedback items based on status
  // - Return filtered feedback items

  try {
    const feedbackItems = await db.feedback.findMany({
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
