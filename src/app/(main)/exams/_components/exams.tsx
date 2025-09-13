"use client";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, ChevronLeft, Timer } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useExams } from "../../_hooks/use-exams";
import { ExamQuestionSkeleton } from "../../_components/skeleton";

// PROPS
interface ExamsProps {
  subjectId: string;
}
export default function Exams({ subjectId }: ExamsProps) {
  // ==== MUTATION ====
  const { payload, isLoading } = useExams(subjectId);

  // Loading
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ExamQuestionSkeleton />
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col  gap-4   min-h-screen items-center">
        {/* Header */}
        <header className="w-full flex gap-[10px] flex-row-reverse">
          <div className="bg-blue-600 flex flex-row  w-full h-[77px]   text-[#FFFFFF] p-4 text-3xl font-inter font-semibold ">
            {/* Icon */}
            <BookOpenCheck className=" h-11 w-11" />

            {/* Title */}
            <span className=" flex justify-center items-center px-3">
              Exams
            </span>
          </div>

          {/* Navigate to Home */}
          <Link href={`/diplomas`}>
            <Button className="h-[77px] w-[38px]  bg-white  border-[1.5px] hover:bg-white border-blue-600">
              <ChevronLeft className="h-6 w-6 text-blue-600" />
            </Button>
          </Link>
        </header>

        <div className="bg-white w-full p-6  flex-1 ">
          {/* Exam Details */}
          {payload?.exams.map((exam) => (
            <Link key={exam._id} href={`/questions/${exam._id}`}>
              <div className="flex  flex-row justify-between items-center p-4 bg-blue-50 font-mono">
                {/* left side */}
                <div className=" text-[12px] sm:text-base  flex flex-col ">
                  {/* Quiz name */}
                  <p className="text-blue-600 "> {exam.title}</p>

                  {/* Questions Number */}
                  <p className="text-gray-500 ">
                    {exam.numberOfQuestions} Questions
                  </p>
                </div>

                {/* right side */}
                <p className=" justify-center items-center  text-[12px] sm:text-base text-gray-800 gap-2 flex ">
                  {/* Icon timer */}
                  <span>
                    <Timer className="h-3 w-3 sm:w-6 sm:h-6" />
                  </span>
                  {/* Duration */}
                  Duration: {exam.duration} minutes
                </p>
              </div>
            </Link>
          ))}

          {/*In case there is no data */}
          {payload?.exams.length == 0 ? (
            <div className="flex flex-row justify-between items-center p-4 bg-blue-50 font-mono">
              <p>No data to show</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
}
