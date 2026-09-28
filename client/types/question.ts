import { AnswerOption } from "./answer-option";

export interface Question {
  id: string;
  code: string;
  text: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  options: AnswerOption[];
};
