import React from "react";
import { ExamQuestionSkeleton } from "./(main)/_components/skeleton";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <ExamQuestionSkeleton />
    </div>
  );
}
