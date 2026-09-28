import { Report } from "@/types/report";
import TopSection from "./sections/top-section";
import GetReportComponent from "./get-report-component";
import { ReportSnapshot } from "@/types/report-snapshot";

export default function ReportComposer({ report }: { report: Report }) {
  const snapshot: ReportSnapshot = report.reportSnapshot
    ? report.reportSnapshot
    : { sections: [] };
  const reportEngine = GetReportComponent({ resultType: report.resultType });

  return (
    <div className="report px-4 md:px-36 py-10 flex flex-col gap-10">
      <TopSection />
      {reportEngine.getComposed(snapshot.sections)}
    </div>
  );
}
