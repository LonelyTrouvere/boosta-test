import { Question } from "@/types/question";
import { ReportDTO } from "@/types/report";
import { ReportQuizCreate } from "@/types/report-quiz-create";
import { ApiError } from "./api-error";

const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return `${process.env.BACKEND_URL}/api` || "http://server:4000/api";
  }

  return "/api";
};

async function sendRequest<TResponse, TBody = unknown>(
  path: string,
  options?: {
    method?: "GET" | "POST";
    body?: TBody;
    cache?: RequestCache;
  },
): Promise<TResponse> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    cache: options?.cache ?? "no-store",
  });

  const contentType = response.headers.get("content-type");
  const data: unknown = contentType?.includes("application/json")
    ? await response.json()
    : null;
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;

    if (data && typeof data === "object" && "message" in data) {
      const serverMessage = (data as { message: unknown }).message;
      if (Array.isArray(serverMessage)) {
        errorMessage = serverMessage.join(", ");
      } else if (typeof serverMessage === "string") {
        errorMessage = serverMessage;
      }
    }

    throw new ApiError(response.status, errorMessage, data);
  }

  return data as TResponse;
}

export const api = {
  questions: {
    getQuestions: (): Promise<Question[]> =>
      sendRequest<Question[]>("/questions", {
        method: "GET",
      }),
  },
  reports: {
    getReportById: (reportId: string): Promise<ReportDTO> =>
      sendRequest<ReportDTO>(`/reports/${reportId}`, {
        method: "GET",
      }),
    createReport: (reportData: ReportQuizCreate): Promise<ReportDTO> =>
      sendRequest<ReportDTO, ReportQuizCreate>("/reports", {
        method: "POST",
        body: reportData,
      }),
  },
};
