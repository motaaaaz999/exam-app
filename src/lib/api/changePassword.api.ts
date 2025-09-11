"use server";

import { cookies } from "next/headers";
import { changePasswordValues } from "../schemas/changePassword.schema";
import { changePasswordResponse } from "../types/changePassword";
import { getToken } from "../utils/get-token";

export const changePassword = async (
  userData: changePasswordValues
): Promise<changePasswordResponse> => {
  try {
    const token = await getToken();
    if (!token?.accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/changePassword",
      {
        method: "PATCH",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          token: token.accessToken,
        },
      }
    );

    const payload: changePasswordResponse = await response.json();

    if (!response.ok) {
      throw payload.message || "Somthing Went Wrong";
    }

    // store the new token after changing password
    cookies().set("next-auth.session-token", payload.token, {
      httpOnly: true,
    });

    return payload;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
