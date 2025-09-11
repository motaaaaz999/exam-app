"use client";
import { submitAnswer } from "@/lib/api/submitAnswers.api";
import { useMutation } from "@tanstack/react-query";

export const useResult = () => {
  const {
    isError,
    isSuccess,
    isPending,
    data: resultData,
    mutate,
    reset,
  } = useMutation({
    mutationFn: submitAnswer,
    onSuccess: (data) => {
      console.log("answer data:", data);
    },
    onError: (error) => {
      console.log("failed to fetch answers", error);
    },
  });

  return {
    isError,
    isPending,
    isSuccess,
    resultData,
    mutate,
    reset,
  };
};
