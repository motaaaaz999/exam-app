"use client";
import { getQuestions } from "@/lib/api/questions.api";
import { getQuestionsResponse } from "@/lib/types/questions";
import { useQuery } from "@tanstack/react-query";

export const useQuestions = (examId: string) => {
  const {
    data: payload,
    isLoading,
    error,
  } = useQuery<getQuestionsResponse>({
    queryKey: ["questions", examId],
    queryFn: () => getQuestions(examId),
    enabled: !!examId,
  });

  return { payload, isLoading, error };
};
