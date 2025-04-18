"use client";

import React from 'react';

type Decision = {
  recommendation: "Option A" | "Option B";
  reasoning: string;
};

type ResultDisplayProps = {
  decision: Decision;
  optionA: string;
  optionB: string;
  onRestart: () => void;
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  decision,
  optionA,
  optionB,
  onRestart
}) => {
  // Display the actual option name based on the recommendation
  const recommendedOption = decision.recommendation === "Option A" ? optionA : optionB;
  
  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="text-center my-4">
        <h2 className="text-3xl font-serif text-[#2F2F2F] mb-4">
          Our Pick:
        </h2>
        <h3 className="text-4xl font-serif text-[#2F2F2F]">
          {decision.recommendation}
        </h3>
      </div>
      
      <div className="mt-8 mb-12 flex justify-center">
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 80 80" 
          fill="none" 
          className="text-[#475341]"
        >
          <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2" fill="none" />
          <path
            d="M28 40l8 8L52 30"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      <p className="text-[#2F2F2F] text-center text-xl max-w-lg font-serif leading-relaxed mb-12">
        {decision.reasoning}
      </p>
      
      <button
        onClick={onRestart}
        className="border border-[#E7D9B8] bg-transparent text-[#2F2F2F] px-14 py-4 rounded-md hover:bg-[#E7D9B8]/30 transition-all font-medium text-lg"
      >
        Restart
      </button>
    </div>
  );
};

export default ResultDisplay; 