"use client";

import { useState } from "react";

interface FaqDrawerProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function Drawer({
  question,
  answer,
  defaultOpen = false,
}: FaqDrawerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between text-left gap-4 pb-4 group cursor-pointer focus:outline-none"
      >
        <span className="font-bold text-p text-dark-blue-02 group-hover:opacity-90">
          {question}
        </span>

        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-[#D0DFEB] flex items-center justify-center text-[#8AA2BA] transition-transform duration-200 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </span>
      </button>

      <div className="w-full h-px bg-[#EAEFF4]" />

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isOpen ? "grid-rows-[1fr] pt-4 pb-2" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[15px]/[24px] text-dark-blue-03">{answer}</p>
        </div>
      </div>
    </div>
  );
}
