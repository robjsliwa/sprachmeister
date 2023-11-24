import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { kv } from "@vercel/kv";
import { isValidApiKey } from '@/utils';


export async function GET(request: NextRequest, { params }: { params: { lessonId: string } }) {
  if (!isValidApiKey(request)) {
    return NextResponse.json(
      {
        message: 'Invalid API key',
      },
      {
        status: 401,
      },
    );
  }
  const lessonId = params.lessonId;
  const wordsString: string | null = await kv.get(lessonId);

  if (!wordsString) {
    return NextResponse.json(
      {
        word: '',
      },
      {
        status: 201,
      },
    );
  }

  const words = wordsString.split(', ');
  const randomWord = words[Math.floor(Math.random() * words.length)];

  return NextResponse.json(
    {
      word: randomWord,
    },
    {
      status: 201,
    },
  );
}

export async function POST(request: NextRequest, { params }: { params: { lessonId: string } }) {
  if (!isValidApiKey(request)) {
    return NextResponse.json(
      {
        message: 'Invalid API key',
      },
      {
        status: 401,
      },
    );
  }
  const requestBody = await request.json();
  const lessonId = params.lessonId;
  const newWords = requestBody.words;

  const existingWords = await kv.get(lessonId) || '';
  const updatedWords = existingWords + (existingWords ? ', ' : '') + newWords.join(', ');

  await kv.set(lessonId, updatedWords, { ex: 43200 });

  return NextResponse.json(
    {
      message: 'Words added successfully',
    },
    {
      status: 201,
    },
  );
}