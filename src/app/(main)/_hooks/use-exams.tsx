"use client";
import { getExams } from "@/lib/api/exams.api";
import { getExamsResponse } from "@/lib/types/exams";
import { useQuery } from "@tanstack/react-query";

export const useExams = (subjectId: string) => {
  const {
    data: payload,
    isLoading,
    error,
  } = useQuery<getExamsResponse>({
    queryKey: ["exams", subjectId],
    queryFn: () => getExams(subjectId),
    enabled: !!subjectId, //useQuery will not be executed if id is not existed
  });

  return { payload, isLoading, error };
};
