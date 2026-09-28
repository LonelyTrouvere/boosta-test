import { ResultType } from "@/types/result-types";
import ReportHigh from "./report-high";
import ReportLow from "./report-low";
import Report from "./report";

export default function GetReportComponent({
  resultType,
}: {
  resultType: ResultType;
}): Report {
  if (resultType === "HIGH_ADHD_TRAITS") {
    return new ReportHigh();
  } else {
    return new ReportLow;
  }
}
