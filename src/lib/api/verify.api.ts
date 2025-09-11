import { OTPvalue } from "../schemas/forgotPassword.schema";
import { verifyResponse } from "../types/verify";

export const verify = async (OTP: OTPvalue) => {
  try {
    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(OTP),
      }
    );

    const payload: verifyResponse = await response.json();
    if (!response.ok) {
      throw payload.message || "Something Went Wrong";
    }

    return payload;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
