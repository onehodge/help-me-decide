"use client";

import React from 'react';

type Question = {
  question: string;
  choices: [string, string];
};

type QuestionFlowProps = {
  questions: Question[];
  currentQuestionIndex: number;
  answers: string[];
  onAnswer: (choice: string) => void;
  onBack: () => void;
};

const QuestionFlow: React.FC<QuestionFlowProps> = ({
  questions,
  currentQuestionIndex,
  answers,
  onAnswer,
  onBack
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="w-full max-w-md px-4">
      <button
        onClick={onBack}
        disabled={currentQuestionIndex === 0}
        className="text-[#2F2F2F] font-medium flex items-center mb-12"
      >
        ← Back
      </button>
      
      <h2 className="text-xl font-normal text-center mb-12 leading-relaxed font-serif">
        {currentQuestion.question}
      </h2>
      
      <div className="space-y-5 mb-12">
        {currentQuestion.choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(choice)}
            className={`w-full text-center py-5 px-6 rounded-md border transition-all ${
              answers[currentQuestionIndex] === choice
                ? "bg-[#8A8D6F] text-[#F9F6F1] border-[#8A8D6F] font-medium"
                : "bg-transparent border-[#E7D9B8] text-[#2F2F2F] hover:bg-[#E7D9B8]/30 font-medium"
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
      
      <div className="mt-16 text-center text-[#B7A99A] font-medium tracking-wider">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
    </div>
  );
};

export default QuestionFlow; 