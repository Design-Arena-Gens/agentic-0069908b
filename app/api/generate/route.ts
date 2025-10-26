import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body) {
      return NextResponse.json(
        { success: false, error: 'No JSON data received' },
        { status: 400 }
      );
    }

    const prompt = body.prompt?.trim();
    const temperature = parseFloat(body.temperature || '0.5');

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'No prompt provided' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: temperature,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      response: text
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: `API Error: ${error.message}` },
      { status: 500 }
    );
  }
}
