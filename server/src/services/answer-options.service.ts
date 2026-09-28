import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { ScoreBounds } from 'src/dto/score-bound';

@Injectable()
export class AnswerOptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateScoreBounds(): Promise<ScoreBounds> {
    const result = await this.prisma.$queryRaw<
      Array<{ min_total: bigint | number; max_total: bigint | number }>
    >`
      SELECT 
        COALESCE(SUM(bounds.min_weight), 0) AS min_total,
        COALESCE(SUM(bounds.max_weight), 0) AS max_total
      FROM "Question" q
      INNER JOIN (
        SELECT 
          "questionId",
          MIN(weight) AS min_weight,
          MAX(weight) AS max_weight
        FROM "AnswerOption"
        WHERE "isActive" = true AND "deletedAt" IS NULL
        GROUP BY "questionId"
      ) bounds ON bounds."questionId" = q.id
      WHERE q."isActive" = true AND q."deletedAt" IS NULL;
    `;

    const row = result[0];
    return {
      minScore: Number(row?.min_total ?? 0),
      maxScore: Number(row?.max_total ?? 0),
    };
  }
}
