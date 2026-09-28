import BulletPoint from "./bullet-point";

const STRENGTHS: string[] = [
  "Strong creative problem-solving abilities, adaptability, and enthusiasm",
  "Ability to think outside the box, offering innovative solutions others would not consider",
  "Highly energetic and passionate, bringing enthusiasm into projects and conversations",
  "Resilience — pushing forward despite setbacks",
  "Ability to hyperfocus on areas of interest can serve as a valuable asset when properly channeled",
];

export default function CognitiveStrengthHigh() {
  return (
    <div className="flex flex-col gap-9">
      <div>
        <h3 className="text-h3 text-dark-blue-02 mb-1">
          Your Cognitive and Behavioral Strengths
        </h3>
        <p className="text-p text-dark-blue-03">
          Despite these challenges, you possess real strengths:
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {STRENGTHS.map((strength, index) => (
          <BulletPoint key={index}>{strength}</BulletPoint>
        ))}
      </div>
    </div>
  );
}
