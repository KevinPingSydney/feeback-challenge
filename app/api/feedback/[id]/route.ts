import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { feedbackUpdateSchema, validateRequest } from '@/lib/validation';

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

    const validation = validateRequest(feedbackUpdateSchema, body);
    if (!validation.success) {
      return validation.response;
    }

    const feedback = await db.feedback.update({
      where: { id: params.id },
      data: validation.data,
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error updating feedback:', error);

    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update feedback' },
      { status: 500 }
    );
  }
}
