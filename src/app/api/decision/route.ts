import { NextRequest, NextResponse } from "next/server";
import { generateDecision } from "@lib/llm";
import { DecisionRequestSchema } from "@lib/zodSchemas";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body with Zod
    const body = await request.json();
    const result = DecisionRequestSchema.safeParse(body);
    
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
    const { optionA, optionB, answers } = result.data;
    
    // Generate decision using our centralized LLM service
    const decision = await generateDecision(optionA, optionB, answers);
    
    return NextResponse.json(decision);
  } catch (error) {
    console.error("Error in decision API:", error);
    return NextResponse.json(
      { error: "Failed to generate decision" },
      { status: 500 }
    );
  }
} 