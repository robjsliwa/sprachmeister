import { NextRequest } from 'next/server';

export function isValidApiKey(request: NextRequest) {
    const apiKey = request.headers.get('x-api-key');
    const validApiKey = process.env.API_KEY;
    return apiKey === validApiKey;
}