"use client";

import { api } from "@/lib/api";
import AnswerOption from "@/components/answer-option";
import { Question } from "@/types/question";
import { AnswerOption as AnswerOptionType } from "@/types/answer-option";
import { useEffect, useState } from "react";
import QuestionProgressBar from "@/components/question-progress-bar";
import QuestionPaginator from "@/components/question-paginator";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";

export default function Home() {
  const [error, setError] = useState<Error | null>(null);
  if (error) {
    throw error;
  }

  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<[string, string][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [visitorId] = useState(() => {
    try {
      let storedToken = localStorage.getItem("visitorId");

      if (!storedToken) {
        storedToken = crypto.randomUUID();
        localStorage.setItem("visitorId", storedToken);
      }

      return storedToken;
    } catch (e) {
      console.log("localStorage error");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      api.questions
        .getQuestions()
        .then((data) => {
          setQuestions(data);
        })
        .catch((e) => {
          setError(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  const handleSelectOption = (question: Question, option: AnswerOptionType) => {
    setAnswers((prev) => [
      ...prev.filter(([q]) => q !== question.id),
      [question.id, option.id],
    ]);

    if (currentStep != questions.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const handleFinish = async () => {
    let visitor = visitorId;
    if (!visitor) {
      visitor = crypto.randomUUID();
      localStorage.setItem("visitorId", visitor);
    }

    try {
      const report = await api.reports.createReport({
        visitorId: visitor,
        answers: answers.map(([question, option]) => ({
          answerId: option,
          questionId: question,
        })),
      });

      router.push(`/report/${report.id}`);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
        return;
      }
    }
  };

  if (isLoading) {
    return (
      <div className="questions-page px-3 md:px-5 flex flex-col flex-1 pb-3 md:pb-5 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="questions-page px-3 md:px-5 flex flex-col flex-1 pb-3 md:pb-5">
      <QuestionProgressBar
        currentStep={currentStep}
        totalSteps={questions.length}
      />
      <div className="questions-page__question mx-auto w-full md:w-2/3 flex flex-col gap-4">
        {questions.length > 0 && (
          <div
            key={currentStep}
            className={`flex flex-col gap-4 ${
              direction === "next" ? "animate-slide-next" : "animate-slide-prev"
            }`}
          >
            <p className="mb-4 text-center text-2xl md:text-3xl font-semibold leading-snug min-h-[2.75em] flex items-center justify-center">
              {questions[currentStep].text}
            </p>
            <fieldset className="questions-page__options flex flex-col gap-4">
              {questions[currentStep].options.map((option) => (
                <AnswerOption
                  key={option.id}
                  option={option}
                  name={questions[currentStep].id}
                  checked={
                    !!answers.find(
                      ([q, o]) =>
                        q === questions[currentStep].id && o === option.id,
                    )
                  }
                  onSelect={handleSelectOption.bind(
                    null,
                    questions[currentStep],
                    option,
                  )}
                />
              ))}
            </fieldset>
          </div>
        )}
      </div>
      <QuestionPaginator
        currentStep={currentStep}
        totalSteps={questions.length}
        setDirection={setDirection}
        setCurrentStep={setCurrentStep}
        canFinish={
          currentStep === questions.length - 1 &&
          answers.length === questions.length
        }
        handleFinish={handleFinish}
      />
    </div>
  );
}
