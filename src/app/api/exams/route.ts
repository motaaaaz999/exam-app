import { getExamsResponse } from "@/lib/types/exams";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // 1- get token from cookie
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    //2- check if there is token in cookie
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //3- get subject id using search params
    // request url turn your url to an object like this {http://localhost:3000/api/exams?subject=5}
    //searchParams.get('subject') => return the value of subject from link (will return 5)
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subject");

    // 4- request to backend for fetching data
    const response = await fetch(
      `https://exam.elevateegy.com/api/v1/exams?subject=${subjectId}`,
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
        { error: `failed to fetch exams: ${response.statusText}` },
        { status: response.status }
      );
    }

    //5- return Data
    const payload: getExamsResponse = await response.json();
    return NextResponse.json(payload);

    // catch error
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
