export interface ReportQuizCreate {
  visitorId: string;
  answers: ReportQuizAnswer[];
}

export type ReportQuizAnswer = {
  questionId: string;
  answerId: string;
}
