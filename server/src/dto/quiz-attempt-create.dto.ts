import { Prisma } from '@prisma/client';

export type QuizAttemptCreateDTO = Omit<
  Prisma.QuizAttemptCreateInput,
  'id' | 'createdAt' | 'answers' | 'completedAt'
>;
