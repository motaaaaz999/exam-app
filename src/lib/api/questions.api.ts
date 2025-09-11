import { getQuestionsResponse } from "../types/questions";

export const getQuestions = async (
  id: string
): Promise<getQuestionsResponse> => {
  try {
    const response = await fetch(`/api/questions?exam=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`failed to fetch questions: ${response.statusText}`);
    }
    const payload = await response.json();
    return payload;
  } catch (error) {
    throw error;
  }
};
