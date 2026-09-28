export default function UnderstandingScore({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-4 rounded-2xl bg-bar"></div>
      <div className="understanding-strength flex flex-col gap-4 border-l-score">
        <h3 className="text-h3 text-dark-blue-02">Understanding Your Score</h3>
        <p className="text-p text-dark-blue-03">{children}</p>
      </div>
    </div>
  );
}
