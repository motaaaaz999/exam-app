import { getQuestionsResponse } from "@/lib/types/questions";
import { error } from "console";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // get token from cookies
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // check if there is token
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //get exam id using search params
    const { searchParams } = new URL(request.url);
    const examId = searchParams.get("exam");

    //fetching data

    const response = await fetch(
      `https://exam.elevateegy.com/api/v1/questions?exam=${examId}`,
      {
        method: "GET",
        headers: {
          token: token.accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `failed to fetch questions: ${response.statusText}` },
        { status: response.status }
      );
    }

    //return data in NextResponse
    const payload: getQuestionsResponse = await response.json();
    return NextResponse.json(payload);
  } catch (error) {}
}
