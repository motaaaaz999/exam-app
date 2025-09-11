"use server";
import { profileValues } from "../schemas/profile.schema";
import { UserResponse } from "../types/profile";
import { getToken } from "../utils/get-token";

export const editProfile = async (
  userData: profileValues
): Promise<UserResponse> => {
  try {
    const token = await getToken();
    if (!token?.accessToken) {
      throw new Error("No access token found");
    }
    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/editProfile",
      {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          token: token.accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`failed: ${response.statusText}`);
    }

    const payload: UserResponse = await response.json();

    return payload;
  } catch (error) {
    throw new Error(`failed to fetch profile data: ${error}`);
  }
};
