import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const feedback = await db.feedback.findUnique({
      where: { id: params.id },
    });

    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // TODO: Validate request body using Zod
    // - Create a schema for feedback updates
    // - Validate the request body against the schema
    // - Return validation errors if any

    const feedback = await db.feedback.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        status: body.status,
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error updating feedback:', error);

    // TODO: Implement proper error handling
    // - Check for not found errors
    // - Differentiate between validation errors and server errors
    // - Return appropriate status codes and error messages

    return NextResponse.json(
      { error: 'Failed to update feedback' },
      { status: 500 }
    );
  }
}
