"use server";

import { EmailValue } from "../schemas/forgotPassword.schema";
import { forgotPasswordResponse } from "../types/forgotPassword";

export const forgotPassword = async (
  email: EmailValue
): Promise<forgotPasswordResponse> => {
  try {
    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/forgotPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      }
    );

    const payload: forgotPasswordResponse = await response.json();
    if (!response.ok) {
      throw payload.message || "Something Went Wrong";
    }
    return payload;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
