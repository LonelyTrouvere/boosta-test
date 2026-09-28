import Footer from "@/components/footer";
import ReportComposer from "@/components/report/report-composer";
import ReportHeader from "@/components/report/report-header";
import { api } from "@/lib/api";
import { ApiError } from "@/lib/api-error";
import { Report } from "@/types/report";
import { ReportPageParams } from "@/types/report-page-params";
import { notFound } from "next/navigation";

export default async function QuizPage({ params }: ReportPageParams) {
  const { reportId } = await params;

  let report!: Report;
  try {
    const reportData = await api.reports.getReportById(reportId);
    report = new Report(reportData);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      notFound();
    }
  }

  return (
    <main className="min-h-dvh flex flex-col">
      <ReportHeader report={report} />
      <ReportComposer report={report} />
      <Footer />
    </main>
  );
}
