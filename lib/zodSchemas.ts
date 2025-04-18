import { z } from "zod";

// Schema for question choice
export const ChoiceSchema = z.object({
  question: z.string().min(1),
  choices: z.array(z.string().min(1)).min(2)
});

// Schema for the questions API request
export const QuestionsRequestSchema = z.object({
  optionA: z.string().min(1),
  optionB: z.string().min(1)
});

// Schema for the questions API response
export const QuestionsResponseSchema = z.array(ChoiceSchema);

// Schema for the decision API request
export const DecisionRequestSchema = z.object({
  optionA: z.string().min(1),
  optionB: z.string().min(1),
  answers: z.array(z.string().min(1)).min(1)
});

// Schema for the decision API response
export const DecisionResponseSchema = z.object({
  recommendation: z.enum(["Option A", "Option B"]),
  reasoning: z.string().min(1)
});

// Helper type for TypeScript inference
export type QuestionsRequest = z.infer<typeof QuestionsRequestSchema>;
export type DecisionRequest = z.infer<typeof DecisionRequestSchema>;
export type DecisionResponse = z.infer<typeof DecisionResponseSchema>; 