import { RegisterValues } from "../schemas/auth.schema";

interface registerResponse {
  message: string;
  code: number;
}
export const registerUser = async (userData: RegisterValues) => {
  try {
    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      }
    );

    const payload: registerResponse = await response.json();
    if (!response.ok || payload.code) {
      throw payload.message || "Something Went Wrong";
    }

    return payload;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
