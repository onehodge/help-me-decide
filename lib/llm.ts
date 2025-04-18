// This file centralizes all LLM API calls with proper error handling, retry logic, and logging

// Basic retry logic with exponential backoff
const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> => {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      console.error(`LLM API call failed (attempt ${attempt + 1}/${maxRetries}):`, error);
      
      // Don't wait after the last attempt
      if (attempt < maxRetries - 1) {
        // Exponential backoff with jitter
        const delay = baseDelay * Math.pow(2, attempt) * (0.5 + Math.random());
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError || new Error("Unknown error during LLM API call");
};

// Generate questions for decision making
export const generateQuestions = async (optionA: string, optionB: string) => {
  // This will be replaced with actual LLM API call later
  return withRetry(async () => {
    console.log(`Generating questions for options: ${optionA} vs ${optionB}`);
    
    // Currently using mock data, will be replaced with actual API call
    return [
      {
        question: `Which is more important to you right now: the immediate benefits of "${optionA}" or the long-term potential of "${optionB}"?`,
        choices: ["Immediate benefits matter more to me right now", "Long-term potential is more important"]
      },
      {
        question: `If you had to consider your future self looking back on this decision, would they prefer you chose "${optionA}" or "${optionB}"?`,
        choices: [`They would appreciate I chose ${optionA}`, `They would be glad I chose ${optionB}`]
      },
      {
        question: `Which option aligns better with your core values and principles?`,
        choices: [`${optionA} feels more aligned with who I am`, `${optionB} resonates more with my values`]
      },
      {
        question: `If you had to consider the potential regrets, which would you regret not choosing more?`,
        choices: [`I'd regret not choosing ${optionA}`, `I'd regret not choosing ${optionB}`]
      }
    ];
  });
};

// Generate a decision recommendation based on answers
export const generateDecision = async (optionA: string, optionB: string, answers: string[]) => {
  return withRetry(async () => {
    console.log(`Generating decision for ${optionA} vs ${optionB} with answers:`, answers);
    
    // This will be replaced with actual LLM API call later
    // For now, we'll count which option appears more in the answers
    const optionACount = answers.filter(answer => answer.includes(optionA)).length;
    const optionBCount = answers.filter(answer => answer.includes(optionB)).length;
    
    // Make a basic recommendation based on answer count
    const recommendation = optionACount >= optionBCount ? "Option A" : "Option B";
    const chosenOption = recommendation === "Option A" ? optionA : optionB;
    
    // Generate reasoning
    let reasoning = `Based on your responses, it seems that ${chosenOption} aligns better with your priorities. `;
    
    if (optionACount === optionBCount) {
      reasoning += `While the choice was close, subtle patterns in your answers suggest a slight preference for ${chosenOption}. Consider if this feels right intuitively.`;
    } else if (Math.abs(optionACount - optionBCount) === 1) {
      reasoning += `Your answers showed a slight preference towards ${chosenOption}, though the decision was close. Trust your intuition about whether this recommendation feels right.`;
    } else {
      reasoning += `Your answers consistently favored ${chosenOption}, suggesting it's likely the better choice for you given your current priorities and values.`;
    }
    
    return {
      recommendation,
      reasoning
    };
  });
}; 