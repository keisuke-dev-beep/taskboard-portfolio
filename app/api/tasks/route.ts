import { NextRequest, NextResponse } from 'next/server';
import { addTask, getTasks } from '@/lib/mock-db';

export async function GET() {
  return NextResponse.json(getTasks());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const title = String(body.title ?? '').trim();

  if (!title) {
    return NextResponse.json(
      { message: 'title は必須です。' },
      { status: 400 }
    );
  }

  const newTask = addTask(title);
  return NextResponse.json(newTask, { status: 201 });
}
