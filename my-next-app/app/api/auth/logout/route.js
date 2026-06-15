import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Logged out",
  });
// clear the cookies and redirect
  response.cookies.set("authToken", "", {
    expires: new Date(0),

    path: "/",
  });

  return response;
}
