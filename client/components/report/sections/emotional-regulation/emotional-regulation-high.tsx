import BulletPoint from "./bullet-point";

const BULLETS: string[] = [
  "Experience intense emotional highs and lows, sometimes reacting impulsively",
  "Struggle with frustration and impatience, making it difficult to regulate emotions in stressful situations",
  "Feel overwhelmed by minor setbacks or unexpected changes",
  "Find it challenging to control impulsive behaviors such as interrupting conversations or making snap decisions",
];

export default function EmotionalRegulationHigh() {
  return (
    <div className="flex flex-col gap-9">
      <div>
        <h3 className="text-h3 text-dark-blue-02 mb-1">
          Your Emotional Regulation and Impulse Control
        </h3>
        <p className="text-p text-dark-blue-03">
          Your high ADHD traits may significantly influence your emotional
          experiences and reactions. You may:
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {BULLETS.map((bullet, index) => (
          <BulletPoint key={index}>{bullet}</BulletPoint>
        ))}
      </div>
      <p className="text-p text-dark-blue-02">
        While emotional regulation may be difficult, learning self-awareness
        techniques and coping strategies can help create more emotional
        stability.
      </p>
    </div>
  );
}
