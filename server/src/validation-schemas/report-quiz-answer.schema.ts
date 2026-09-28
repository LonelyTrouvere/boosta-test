import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ReportQuizAnswerSchema {
  @IsUUID('4')
  @IsNotEmpty()
  answerId!: string;

  @IsUUID('4')
  @IsNotEmpty()
  questionId!: string;
}

export class ReportQuizCreateSchema {
  @IsUUID('4', { message: 'visitorId must be a valid UUID' })
  @IsNotEmpty()
  visitorId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty({ message: 'No answers provided' })
  @Type(() => ReportQuizAnswerSchema)
  answers!: ReportQuizAnswerSchema[];
}
