import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AnswerOptionsService } from './answer-options.service';
import { QuestionsAttemptService } from './quiz-attempt.service';
import { ResultType } from '@prisma/client';
import { QuizAttempt } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Sections } from 'src/dto/sections';
import { QuizUserAnswer } from 'src/dto/quiz-user-answer.dto';

@Injectable()
export class ReportService {
  constructor(
    private readonly answerOptionsService: AnswerOptionsService,
    private readonly quizAttemptService: QuestionsAttemptService,
    private readonly prisma: PrismaService,
  ) {}

  getReportById(reportId: string): Promise<QuizAttempt | null> {
    return this.quizAttemptService.getById(reportId);
  }

  async create(
    visitorId: string,
    data: QuizUserAnswer[],
  ): Promise<QuizAttempt> {
    const { minScore, maxScore } =
      await this.answerOptionsService.calculateScoreBounds();

    const rawScore = data.reduce(
      (total, answer) => total + answer.options[0].weight,
      0,
    );

    if (maxScore === minScore) {
      throw new InternalServerErrorException('Failed to calculate score');
    }

    const score = (rawScore - minScore) / (maxScore - minScore);
    const percentage = Math.round(score * 100);

    return await this.prisma.$transaction(async (tx) => {
      const attempt = await tx.quizAttempt.create({
        data: {
          visitorToken: visitorId,
          totalScore: rawScore,
          scorePercent: percentage,
          resultType: this.getResultType(percentage),
          reportSnapshot: {
            sections: [
              Sections.UNDERSTANDING,
              Sections.STRENGTHS,
              Sections.REGULATION,
              Sections.FAQ,
            ],
          },
        },
      });

      await tx.quizAnswer.createMany({
        data: data.map((question) => ({
          questionCodeSnapshot: question.code,
          questionTextSnapshot: question.text,
          optionTextSnapshot: question.options[0].text,
          weightSnapshot: question.options[0].weight,
          questionId: question.id,
          attemptId: attempt.id,
          selectedOptionId: question.options[0].id,
        })),
      });

      return attempt;
    });
  }

  getResultType(scorePercent: number): ResultType {
    return scorePercent >= 50
      ? ResultType.HIGH_ADHD_TRAITS
      : ResultType.LOW_ADHD_TRAITS;
  }
}
