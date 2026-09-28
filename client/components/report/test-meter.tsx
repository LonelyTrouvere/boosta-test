import { PieChart } from "@mui/x-charts/PieChart";

const SEGMENTS = [
  { id: 1, value: 20, color: "#83C5A5" },
  { id: 2, value: 20, color: "#A8CD89" },
  { id: 3, value: 20, color: "#E0D165" },
  { id: 4, value: 20, color: "#E8A748" },
  { id: 5, value: 20, color: "#E75E40" },
];

export default function TestMeter({
  score = 52,
  maxScore = 100,
}: {
  score?: number;
  maxScore?: number;
}) {
  const clamped = Math.max(0, Math.min(score, maxScore));
  const targetAngle = (clamped / maxScore) * 230 - 115;

  return (
    <div className="w-[280px] mx-auto flex flex-col items-center select-none relative">
      <div className="relative w-[280px] h-[210px]">
        <PieChart
          width={280}
          height={260}
          margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
          skipAnimation
          series={[
            {
              data: SEGMENTS,
              startAngle: -115,
              endAngle: 115,
              innerRadius: 82,
              outerRadius: 108,
              cornerRadius: 6,
              paddingAngle: 4,
              cx: 140,
              cy: 130,
            },
          ]}
        />

        {/* Tapered teardrop needle positioned over the center pivot */}
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 280 210"
          width="280"
          height="210"
        >
          <defs>
            <style>{`
              @keyframes needleSweep {
                from {
                  transform: rotate(-115deg);
                }
                to {
                  transform: rotate(${targetAngle}deg);
                }
              }
              .animated-needle {
                transform-origin: 140px 130px;
                animation: needleSweep 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
              }
            `}</style>
          </defs>

          <g className="animated-needle">
            <path
              d="M 140 148 
                 A 18 18 0 0 1 127 122 
                 L 140 50 
                 L 153 122 
                 A 18 18 0 0 1 140 148 Z"
              fill="#18334D"
            />
          </g>
        </svg>
      </div>

      <div className="text-2xl font-black text-[#18334D] tracking-tight -mt-6">
        {score} / {maxScore}
      </div>
    </div>
  );
}
