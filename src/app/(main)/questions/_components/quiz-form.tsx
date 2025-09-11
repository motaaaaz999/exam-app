"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/lib/types/questions";
import { useQuestions } from "../../_hooks/use-questions";
import { Progress } from "@/components/ui/progress";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useResult } from "../../_hooks/use-result";
import ResultView from "./result";
import { Loader2 } from "lucide-react";

// Component Props
interface QuizFormProps {
  examId: string;
}

// Types
/**
 * Payload structure for individual question answers
 * - questionId: Required identifier for the question
 * - correct: Optional answer key (undefined if unanswered)
 */
export type AnswerPayload = {
  questionId: string;
  correct?: string;
};

/**
 * Form values structure for react-hook-form
 * - answers: Array of answer payloads for all questions
 * - time: Optional time tracking (seconds spent or remaining)
 */
export type FormValues = {
  answers: AnswerPayload[];
  time?: number;
};

// ===== MAIN COMPONENT =====
export default function QuizForm({ examId }: QuizFormProps) {
  // ==== STATES ====
  // State to control when to show results instead of quiz form
  const [showResult, setShowResult] = useState(false);
  // Track current question index for pagination
  const [currentIndex, setCurrentIndex] = useState(0);

  // ==== MUTATION ====
  // Custom hook for handling quiz submission and result fetching
  const { mutate, resultData, isError, isSuccess, isPending } = useResult();
  // Custom hook to fetch questions for the specific exam
  const { payload, isLoading, error } = useQuestions(examId);

  //  ==== VARIABLE ====
  const questions: Question[] = payload?.questions ?? [];
  // Calculate progress percentage for progress bar
  const progress = ((currentIndex + 1) / (questions.length || 1)) * 100;
  // Timer configuration
  const MINUTES = 20;
  const TOTAL_SECONDS = MINUTES * 60;
  // Get current question and check if it's the last one
  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  //==== REF ====
  // Use ref to store remaining time without causing re-renders
  const remainingRef = useRef<number>(TOTAL_SECONDS);

  // ===== FORM INITIALIZATION =====
  const defaultValues = useMemo<FormValues>(() => {
    return {
      answers: questions.map((q) => ({
        questionId: q._id,
        correct: undefined, // Initially no answer selected
      })),
      time: undefined,
    };
  }, [questions]);

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
    shouldUnregister: false, // Keep field values when components unmount
  });

  // ==== FUNCTIONS ====
  // TIMER EVENT HANDLERS
  /**
   * Handler called when countdown timer reaches zero
   * Automatically calculates time spent and submits the form
   */
  const handleTimeUp = () => {
    // Calculate time spent from remaining time
    const remaining = remainingRef.current ?? 0;
    const timeSpent = Math.max(0, TOTAL_SECONDS - remaining);

    // Set the time value in form and submit
    form.setValue("time", timeSpent);
    form.handleSubmit(onSubmit)();
  };

  // Function which returns format time into M:S (Minutes:Seconds)
  /**
   * Format seconds into MM:SS display format
   * @param seconds - Number of seconds to format
   * @returns Formatted time string (e.g., "05:30")
   */
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // FORM SUBMISSION HANDLER
  /**
   * Main form submission handler
   * Processes form values and sends them to the result mutation
   */
  const onSubmit: SubmitHandler<FormValues> = (values) => {
    if (typeof values.time === "undefined") {
      // Calculate time spent
      const remaining = remainingRef.current ?? TOTAL_SECONDS;
      values.time = Math.max(0, TOTAL_SECONDS - remaining);
    }

    // Transform answers to remove empty/undefined responses
    // Keep questionId for all questions, add correct answer only if provided
    const transformedAnswers = values.answers.map((a) => {
      if (a.correct && a.correct !== "") {
        return { questionId: a.questionId, correct: a.correct };
      }
      return { questionId: a.questionId }; // Unanswered question
    });

    // Final payload
    const payload = {
      ...values,
      answers: transformedAnswers,
    };

    //Submit to backend
    mutate(payload);
  };

  // ==== EFFECTS ====
  // Effect to show results when submission is successful
  useEffect(() => {
    if (isSuccess && resultData) {
      setShowResult(true);
    }
  }, [isSuccess, resultData]);

  // Reset form with new defaults when questions are loaded
  useEffect(() => {
    if (questions.length) {
      form.reset(defaultValues);
    }
  }, [questions]);

  // ===== ERROR AND LOADING STATES =====
  // Handle error state when questions fail to load
  if (error) return <p>Error loading questions</p>;

  // Handle case when no questions are available
  if (!questions.length) return <p>No questions found</p>;

  // ===== RESULT VIEW RENDERING =====
  // Show results page when quiz is completed
  if (showResult && resultData) {
    return (
      <>
        {/* Header */}
        <header className="w-full font-mono text-gray-500 flex mb-1 justify-between">
          <h1>Frontend Development - {questions[0].exam?.title}</h1>
          <p aria-label={`Question ${currentIndex + 1} of ${questions.length}`}>
            Question{" "}
            <span className="text-blue-600 font-bold">{currentIndex + 1}</span>{" "}
            of {questions.length}
          </p>
        </header>

        {/* Progress bar */}
        <Progress
          key={`progress-${currentIndex}`}
          value={progress}
          className="w-full rounded-none mb-6 h-4 transition-[width] duration-500 ease-in-out"
        />
        {/* Results Component */}
        <ResultView result={resultData} />
      </>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border-none"
        role="form"
        aria-label="Quiz question form"
      >
        {/* ==== QUESTION CARD ===== */}
        <Card key={currentQuestion._id} className="border-none shadow-none">
          {/* Header */}
          <header className="w-full font-mono text-gray-500 flex mb-1 justify-between">
            <p>Frontend Development - {questions[0].exam?.title}</p>
            <p>
              Question{" "}
              <span className="text-blue-600 font-bold">
                {currentIndex + 1}
              </span>{" "}
              of {questions.length}
            </p>
          </header>

          {/* Progress bar  */}
          <Progress
            key={`progress-${currentIndex}`}
            value={progress}
            className="w-full rounded-none mb-6 h-4 transition-[width] duration-500 ease-in-out"
          />

          <CardContent className="space-y-4 p-0 m-0">
            {/* ===== QUESTION AND ANSWERS FORM FIELD ===== */}
            <FormField
              control={form.control}
              name={`answers.${currentIndex}.correct` as const}
              render={({ field }) => (
                <FormItem>
                  {/* Question */}
                  <FormLabel className="font-mono text-[24px] font-semibold text-blue-600">
                    {currentQuestion.question}
                  </FormLabel>

                  <FormControl>
                    {/* Radio group for answer options */}
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      {/* Map of answers which in current question */}
                      {currentQuestion.answers.map((ans) => (
                        <FormItem
                          key={ans.key}
                          className="flex items-center bg-gray-50 hover:bg-gray-100 p-4 space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={ans.key} />
                          </FormControl>

                          {/* Answers */}
                          <FormLabel className="font-mono text-gray-800 text-sm cursor-pointer">
                            {ans.answer}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* ==== NAVIGATION ==== */}
        <div className="flex justify-evenly items-center gap-4">
          {/* Previous Button */}
          <Button
            className="w-1/2"
            type="button"
            variant="outline"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => i - 1)}
          >
            Previous
          </Button>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center">
            <CountdownCircleTimer
              isPlaying // Start timer immediately
              duration={TOTAL_SECONDS}
              colors={["#3b82f6", "#f59e0b", "#ef4444"]}
              colorsTime={[TOTAL_SECONDS, 60, 0]} // Color change thresholds
              onComplete={() => {
                handleTimeUp(); // Auto-submit when time runs out
                return { shouldRepeat: false, delay: 0 } as any;
              }}
              size={72}
            >
              {({ remainingTime }) => {
                // Update ref without causing re-render
                remainingRef.current = remainingTime;
                return (
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-base font-mono font-semibold">
                      {formatTime(remainingTime)}
                    </span>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          </div>

          {/* NEXT/SUBMIT Button*/}
          {isLast ? (
            <Button
              className="w-1/2"
              type="submit"
              disabled={
                !form.watch(`answers.${currentIndex}.correct`) || isPending
              }
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          ) : (
            <Button
              className="w-1/2"
              type="button"
              onClick={() => setCurrentIndex((i) => i + 1)}
              disabled={!form.watch(`answers.${currentIndex}.correct`)} // Require answer to proceed
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
