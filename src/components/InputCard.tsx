"use client";

import React from 'react';
import Image from 'next/image';

type InputCardProps = {
  optionA: string;
  setOptionA: (value: string) => void;
  optionB: string;
  setOptionB: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

const InputCard: React.FC<InputCardProps> = ({
  optionA,
  setOptionA,
  optionB,
  setOptionB,
  onSubmit,
  isLoading
}) => {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-medium text-center mb-12 text-[#2F2F2F] font-serif">
        Help Me Decide
      </h1>
      
      <div className="space-y-4">
        <div>
          <input
            id="optionA"
            type="text"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            className="w-full px-5 py-4 border border-[#E7D9B8] rounded-md bg-transparent text-[#2F2F2F] placeholder-[#B7A99A]"
            placeholder="Should I do..."
          />
        </div>
        
        <div>
          <input
            id="optionB"
            type="text"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            className="w-full px-5 py-4 border border-[#E7D9B8] rounded-md bg-transparent text-[#2F2F2F] placeholder-[#B7A99A]"
            placeholder="Or should I do"
          />
        </div>
        
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full py-3 mt-6 font-medium text-white bg-[#475341] rounded-md hover:bg-opacity-90 transition-all"
        >
          {isLoading ? "Thinking..." : "Help Me Decide"}
        </button>
      </div>
      
      <div className="flex justify-center mt-20">
        <Image 
          src="/vintage-characters.svg" 
          alt="Vintage characters in conversation" 
          width={200}
          height={150}
          className="opacity-80"
        />
      </div>
    </div>
  );
};

export default InputCard; 