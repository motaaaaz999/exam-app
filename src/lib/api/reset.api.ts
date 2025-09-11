"use server";
import { ResetPasswordResponse, UserResetData } from "../types/resetPassword";

export const resetPassword = async (
  userData: UserResetData
): Promise<ResetPasswordResponse> => {
  try {
    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const payload: ResetPasswordResponse = await response.json();

    if (!response.ok || payload.code) {
      throw payload.message || "Something Went Wrong";
    }

    return payload;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
