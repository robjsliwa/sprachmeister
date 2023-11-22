import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function GET(request: NextRequest, { params }: { params: { lessonId: string } }) {
  return NextResponse.json(
    {
      verb: 'GET',
      message: `lessonId: ${params.lessonId}`,
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}

export function POST(request: NextRequest) {
  return NextResponse.json(
    {
      verb: 'POST',
      message: 'Hello from the API',
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}