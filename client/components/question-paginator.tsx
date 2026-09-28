import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function QuestionPaginator({
  currentStep,
  totalSteps,
  setDirection,
  setCurrentStep,
  canFinish,
  handleFinish,
}: {
  currentStep: number;
  totalSteps: number;
  setDirection: Dispatch<SetStateAction<"next" | "prev">>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  canFinish?: boolean;
  handleFinish?: () => void;
}) {
  const handleNext = () => {
    setDirection("next");
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="paginator mt-auto mx-auto w-full md:w-2/3 flex justify-between">
      <button
        className="px-2 py-2 bg-blue-04 hover:bg-blue-03 rounded-sm disabled:opacity-50 disabled:hover:bg-blue-04"
        disabled={currentStep === 0}
        onClick={handlePrev}
      >
        <Image src="/arrow-left.svg" alt="Previous" height={24} width={24} />
      </button>
      <p className="text-center text-blue-02 text-xl/7">
        {currentStep + 1}/{totalSteps}
      </p>
      <button
        className="px-2 py-2 bg-blue-04 hover:bg-blue-03 rounded-sm disabled:opacity-50 disabled:hover:bg-blue-04"
        disabled={!canFinish && currentStep === totalSteps - 1}
        onClick={canFinish && currentStep === totalSteps - 1 ? handleFinish : handleNext}
      >
        <Image src="/arrow-right.svg" alt="Next" height={24} width={24} />
      </button>
    </div>
  );
}
