import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { QuizAttempt } from '@prisma/client';
import { QuizAttemptCreateDTO } from 'src/dto/quiz-attempt-create.dto';

@Injectable()
export class QuestionsAttemptService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: QuizAttemptCreateDTO): Promise<QuizAttempt> {
    return await this.prisma.quizAttempt.create({
      data: body,
    });
  }

  async getById(id: string): Promise<QuizAttempt | null> {
    return await this.prisma.quizAttempt.findUnique({
      where: { id },
    });
  }
}
