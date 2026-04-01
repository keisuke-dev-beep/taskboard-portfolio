import { NextResponse } from 'next/server';
import { deleteTask, toggleTask } from '@/lib/mock-db';

export async function PATCH(
  _request: Request,
  context: { params: { id: string } }
) {
  const updatedTask = toggleTask(context.params.id);

  if (!updatedTask) {
    return NextResponse.json(
      { message: '対象のタスクが見つかりません。' },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedTask);
}

export async function DELETE(
  _request: Request,
  context: { params: { id: string } }
) {
  const success = deleteTask(context.params.id);

  if (!success) {
    return NextResponse.json(
      { message: '対象のタスクが見つかりません。' },
      { status: 404 }
    );
  }

  return new NextResponse(null, { status: 204 });
}
