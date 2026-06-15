import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";
import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

export async function GET() {
  await connectDB();

  const tweets = await Tweet.find();

  // console.log(tweets)

  return NextResponse.json(tweets);
}

// posting a new tweet

export async function POST(request) {
  await connectDB();

  const { title, body, author } = await request.json();
  // if body and title are blank-> should not be saved (same as in frontend part)
  if (!title.trim() || !body.trim()) {
    return NextResponse.json(
      {
        error: "All fields are required",
      },
      {
        status: 400,
      },
    );
  }

  const token = (await cookies()).get("authToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const tweet = await Tweet.create({
    title: title.trim(),
    body: body.trim(),
    author: decoded.username,
  });

  return NextResponse.json(tweet, {
    status: 201,
  });
}
