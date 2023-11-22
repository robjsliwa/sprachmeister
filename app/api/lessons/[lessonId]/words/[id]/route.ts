import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function DELETE(request: NextRequest, { params }: { params: { lessonId: string, id: string } }) {
    return NextResponse.json(
      {
        verb: 'DELETE',
        message: `lessonId: ${params.lessonId}, id: ${params.id}`,
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