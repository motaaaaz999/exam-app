import { getExamsResponse } from "../types/exams";

export const getExams = async (id: string): Promise<getExamsResponse> => {
  try {
    const response = await fetch(
      `/api/exams?subject=${id}`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`failed to fetch exams: ${response.statusText}`);
    }

    const payload = await response.json();
    return payload;
  } catch (error) {
    throw error;
  }
};
