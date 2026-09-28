-- CreateEnum
CREATE TYPE "ResultType" AS ENUM ('HIGH_ADHD_TRAITS', 'LOW_ADHD_TRAITS');

-- DropForeignKey
ALTER TABLE "AnswerOption" DROP CONSTRAINT "AnswerOption_questionId_fkey";

-- DropIndex
DROP INDEX "AnswerOption_questionId_idx";

-- AlterTable
ALTER TABLE "AnswerOption" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "id" TEXT NOT NULL,
    "visitorToken" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "scorePercent" INTEGER NOT NULL,
    "resultType" "ResultType" NOT NULL,
    "reportSnapshot" JSONB NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAnswer" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedOptionId" TEXT NOT NULL,
    "questionCodeSnapshot" TEXT NOT NULL,
    "questionTextSnapshot" TEXT NOT NULL,
    "optionTextSnapshot" TEXT NOT NULL,
    "weightSnapshot" INTEGER NOT NULL,

    CONSTRAINT "QuizAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnswerOption" ADD CONSTRAINT "AnswerOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "QuizAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_selectedOptionId_fkey" FOREIGN KEY ("selectedOptionId") REFERENCES "AnswerOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
