import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { GetSubjectsResponse } from "@/lib/types/subject";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get query parameters from pages
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const response = await fetch(
      `https://exam.elevateegy.com/api/v1/subjects?page=${page}&limit=6`,
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
        { error: `Failed to fetch subjects: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data: GetSubjectsResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
