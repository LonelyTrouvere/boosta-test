import { Report } from "@/types/report";
import TestMeter from "./test-meter";

export default function ReportHeader({ report }: { report: Report }) {
  return (
    <div className="report-header bg-light-blue-02 py-8 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="report-header__description flex flex-col justify-center text-center md:text-left">
          <h1 className="text-dark-blue-02 font-bold text-[36px]/[44px] md:text-[48px]/[58px]">
            Your ADHD score
          </h1>
          <h2 className="text-dark-blue-03 text-p md:text-[24px]/[32px] mt-1 font-medium">
            {report.getTraitLevel()}
          </h2>
        </div>

        <div className="shrink-0 flex items-center justify-center">
          <TestMeter score={report.scorePercent} />
        </div>
      </div>
    </div>
  );
}
