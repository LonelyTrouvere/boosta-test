import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { QuestionsController } from './controllers/questions.controller';
import { QuestionsService } from './services/questions.service';
import { ReportService } from './services/report.service';
import { ReportsController } from './controllers/reports.controller';
import { QuestionsAttemptService } from './services/quiz-attempt.service';
import { AnswerOptionsService } from './services/answer-options.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [QuestionsController, ReportsController],
  providers: [
    PrismaService,
    QuestionsService,
    AnswerOptionsService,
    QuestionsAttemptService,
    ReportService,
  ],
})
export class AppModule {}
