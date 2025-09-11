"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CircleQuestionMark } from "lucide-react";
import Link from "next/link";
import React from "react";
import QuizForm from "./quiz-form";
import { useQuestions } from "../../_hooks/use-questions";
import { ExamQuestionSkeleton } from "../../_components/skeleton";

// PROPS
interface questionsProps {
  examId: string;
}
export default function Questions({ examId }: questionsProps) {
  // ==== MUTATION ====
  const { payload, isLoading } = useQuestions(examId);

  // ==== LOADING ====
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ExamQuestionSkeleton />
      </div>
    );
  }

  // ===== MAIN RENDER =====
  return (
    <>
      <section className="flex flex-col  gap-4   min-h-screen items-center">
        {/* Header */}
        <header className="w-full flex gap-[10px] flex-row-reverse">
          <div className="bg-blue-600 flex flex-row  w-full h-[77px]   text-[#FFFFFF] p-4 text-3xl font-inter font-semibold ">
            {/* Question mark icon */}
            <CircleQuestionMark className=" h-11 w-11" />
            {/* Title */}
            <span className=" flex justify-center items-center px-3">
              [{payload?.questions[0].exam?.title}] Questions
            </span>
          </div>

          {/* Navigation to exams page */}
          <Link href={`/exams/${payload?.questions[0].subject?._id}`}>
            <Button className="h-[77px] w-[38px]  bg-white  border-[1.5px] hover:bg-white border-blue-600">
              <ChevronLeft className="h-6 w-6 text-blue-600" />
            </Button>
          </Link>
        </header>

        {/* Render QuizForm Component  */}
        <div className="bg-white w-full p-6  flex-1 ">
          {" "}
          <QuizForm examId={examId} />
        </div>
      </section>
    </>
  );
}
