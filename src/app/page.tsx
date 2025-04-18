"use client";

import { useState } from "react";
import InputCard from "@/components/InputCard";
import QuestionFlow from "@/components/QuestionFlow";
import ResultDisplay from "@/components/ResultDisplay";

type Question = {
  question: string;
  choices: [string, string];
};

type Decision = {
  recommendation: "Option A" | "Option B";
  reasoning: string;
};

export default function Home() {
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<"input" | "questions" | "result">("input");

  const handleSubmitOptions = async () => {
    if (!optionA.trim() || !optionB.trim()) {
      alert("Please fill in both options");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionA, optionB }),
      });

      if (!response.ok) throw new Error("Failed to generate questions");
      
      const data = await response.json();
      setQuestions(data);
      setAnswers([]);
      setStage("questions");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (choice: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = choice;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      getDecision();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getDecision = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionA, optionB, answers }),
      });

      if (!response.ok) throw new Error("Failed to get decision");
      
      const data = await response.json();
      setDecision(data);
      setStage("result");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate decision. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = () => {
    setStage("input");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setDecision(null);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-10 px-4 bg-[#F9F6F1]">
      <div className="w-full max-w-md">
        {stage === "input" && (
          <InputCard 
            optionA={optionA}
            setOptionA={setOptionA}
            optionB={optionB}
            setOptionB={setOptionB}
            onSubmit={handleSubmitOptions}
            isLoading={isLoading}
          />
        )}

        {stage === "questions" && questions.length > 0 && (
          <QuestionFlow
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            onAnswer={handleAnswer}
            onBack={handleBack}
          />
        )}

        {stage === "result" && decision && (
          <ResultDisplay
            decision={decision}
            optionA={optionA}
            optionB={optionB}
            onRestart={resetApp}
          />
        )}
      </div>
    </main>
  );
}
