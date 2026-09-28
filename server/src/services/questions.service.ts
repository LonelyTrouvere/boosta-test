import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import type { Question } from '@prisma/client';
import { ReportQuizAnswerSchema } from 'src/validation-schemas/report-quiz-answer.schema';
import { QuizUserAnswer } from 'src/dto/quiz-user-answer.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Question[]> {
    return await this.prisma.question.findMany({
      where: { isActive: true, deletedAt: null },
      include: {
        options: {
          where: { isActive: true },
          orderBy: { weight: 'desc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findQuestionAndAnser(
    data: ReportQuizAnswerSchema[],
  ): Promise<QuizUserAnswer[]> {
    const questionIds = data.map((d) => d.questionId);
    const selectedOptionIds = data.map((d) => d.answerId);

    const questions = await this.prisma.question.findMany({
      where: {
        id: { in: questionIds },
        isActive: true,
        deletedAt: null,
      },
      include: {
        options: {
          where: {
            id: { in: selectedOptionIds },
            isActive: true,
            deletedAt: null,
          },
        },
      },
    });

    return questions;
  }
}
