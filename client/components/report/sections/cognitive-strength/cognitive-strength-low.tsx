import BulletPoint from "./bullet-point";

const STRENGTHS: string[] = [
  "Strong ability to sustain attention and complete tasks",
  "Consistent and reliable in personal and professional responsibilities",
  "Good impulse control and measured decision-making",
  "Effective time management and organizational skills",
];

export default function CognitiveStrengthLow() {
  return (
    <div className="flex flex-col gap-9">
      <h3 className="text-h3 text-dark-blue-02">
        Your Cognitive and Behavioral Strengths
      </h3>
      <div className="flex flex-col gap-4">
        {STRENGTHS.map((strength, index) => (
          <BulletPoint key={index}>{strength}</BulletPoint>
        ))}
      </div>
    </div>
  );
}
