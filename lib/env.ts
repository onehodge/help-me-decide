import { z } from "zod";

// Define the environment schema
// For now, we don't have any environment variables, but this is where we would add them
// when we integrate with an actual LLM API
const envSchema = z.object({
  // For example, when we add OpenAI or another LLM provider:
  // LLM_API_KEY: z.string().min(1),
  // LLM_API_URL: z.string().url(),
  
  // Add more environment variables as needed
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// Helper function to get environment variables with proper typings
// This centralizes and type-checks all environment access
export function getEnv() {
  try {
    return envSchema.parse({
      // For example:
      // LLM_API_KEY: process.env.LLM_API_KEY,
      // LLM_API_URL: process.env.LLM_API_URL,
      
      NODE_ENV: process.env.NODE_ENV,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .filter(e => e.code === "invalid_type" && e.received === "undefined")
        .map(e => e.path.join("."));
      
      if (missingVars.length > 0) {
        console.error(`❌ Missing required environment variables: ${missingVars.join(", ")}`);
        console.error("Please check your .env file or environment configuration.");
      } else {
        console.error("❌ Invalid environment variables:", error.errors);
      }
    } else {
      console.error("❌ Error validating environment variables:", error);
    }
    
    // In development, we want to see errors but still continue
    // In production, we should fail fast if environment is misconfigured
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    
    // Return a minimal valid environment for development
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV || "development",
    });
  }
}

// Export a singleton instance for convenience
export const env = getEnv(); 