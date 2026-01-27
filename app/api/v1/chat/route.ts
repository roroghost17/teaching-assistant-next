import { NextRequest, NextResponse } from 'next/server';
import { ChatMessage, getTeacherResponse } from '../utils/openaiUtils';

export async function POST(request: NextRequest) {
  try {
    // Get the Maxim logger instance
    const body = await request.json();
    const { nativeLanguage, targetLanguage, difficulty, message } = body;
    
    const messages: ChatMessage[] = [];
    
    const refactoredMessage: ChatMessage = {
      role: 'user',
      content: message,
    }
    messages.push(refactoredMessage);
    
    const traceId = request.headers.get("maxim-trace-id") || undefined;

    const response = await getTeacherResponse({ nativeLanguage, targetLanguage, difficulty, messages, traceId });

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}