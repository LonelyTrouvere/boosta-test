import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { QuestionsService } from 'src/services/questions.service';
import { ReportService } from 'src/services/report.service';
import { ReportQuizCreateSchema } from 'src/validation-schemas/report-quiz-answer.schema';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportService: ReportService,
    private readonly questionService: QuestionsService,
  ) {}

  @Post()
  async create(@Body() data: ReportQuizCreateSchema) {
    const questionList = await this.questionService.findAll();
    const questionIds = data.answers.map((ans) => ans.questionId);
    const questions = await this.questionService.findQuestionAndAnser(
      data.answers,
    );

    if (
      questions.length !== questionList.length ||
      questions.length != questionIds.length
    ) {
      throw new NotFoundException(
        'One or more questions were not found or have been deactivated.',
      );
    }

    for (const question of questions) {
      if (!question.options || question.options.length === 0) {
        throw new BadRequestException('Question and answer mismatch');
      }
    }

    return this.reportService.create(data.visitorId, questions);
  }

  @Get(':reportId')
  async getReportById(@Param('reportId') reportId: string) {
    const report = await this.reportService.getReportById(reportId);
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }
}
