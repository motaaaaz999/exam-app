"use server";

import { FormValues } from "@/app/(main)/questions/_components/quiz-form";
import { getToken } from "../utils/get-token";
import { QuizResultResponse } from "../types/result";

export const submitAnswer = async (
  answers: FormValues
): Promise<QuizResultResponse> => {
  try {
    const jwt = await getToken();

    if (!jwt?.accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/questions/check",
      {
        method: "POST",
        body: JSON.stringify(answers),
        headers: {
          "Content-Type": "application/json",
          token: jwt.accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`failed: ${response.statusText}`);
    }
    const payload = await response.json();
    return payload as QuizResultResponse;
  } catch (error) {
    throw new Error(`failed to fetch answers data ${error}`);
  }
};
