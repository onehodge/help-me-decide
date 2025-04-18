import { NextRequest, NextResponse } from "next/server";
import { generateQuestions } from "@lib/llm";
import { QuestionsRequestSchema } from "@lib/zodSchemas";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body with Zod
    const body = await request.json();
    const result = QuestionsRequestSchema.safeParse(body);
    
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { 
          error: "Invalid request data", 
          details: result.error.format() 
        }, 
        { status: 400 }
      );
    }
    
    // Extract validated data
    const { optionA, optionB } = result.data;
    
    // Generate questions using our centralized LLM service
    const questions = await generateQuestions(optionA, optionB);
    
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error in questions API:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" }, 
      { status: 500 }
    );
  }
} 