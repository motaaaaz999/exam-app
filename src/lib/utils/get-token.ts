import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export const getToken = async () => {
  const tokenCookie =
    cookies().get("accessToken")?.value ||
    cookies().get("next-auth.session-token")?.value ||
    cookies().get("__Secure-next-auth.session-token")?.value;
  if (!tokenCookie) return null;

  try {
    const jwt = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    console.log("final boss", jwt);
    return jwt;
  } catch (error) {
    console.log("getToken error", error);
    return null;
  }
};
