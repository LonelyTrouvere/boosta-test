import { AnswerOption, Question } from '@prisma/client';

export type QuizUserAnswer = Question & { options: AnswerOption[] };
