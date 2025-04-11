import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// TODO: Implement feedback schema validation
// - Create a Zod schema for feedback validation
// - Validate request body against the schema
// - Return appropriate error responses for invalid data

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

    // TODO: Validate request body using Zod
    // - Create a schema for feedback submission
    // - Validate the request body against the schema
    // - Return validation errors if any

    const feedback = await db.feedback.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        status: body.status || 'Open',
        upvotes: 0,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);

    // TODO: Implement proper error handling
    // - Differentiate between validation errors and server errors
    // - Return appropriate status codes and error messages

    return NextResponse.json(
      { error: 'Failed to create feedback' },
      { status: 500 }
    );
  }
}
