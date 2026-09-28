export default function QuestionProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const progressPercent =
    totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="progress-bar h-1 rounded-md bg-progress-bar mb-3 overflow-hidden">
      <div
        className="progress-bar__active rounded-md bg-blue-01 h-1 transition-[width] duration-300 ease-out"
        style={{
          width: `${Math.min(100, Math.max(0, progressPercent))}%`,
        }}
      />
    </div>
  );
}
