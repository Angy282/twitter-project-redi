import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";

export async function GET() {
  await connectDB();

  const tweets = await Tweet.find();

  // console.log(tweets)

  return NextResponse.json(tweets);
}

// posting a new tweet

export async function POST(request) {
  await connectDB();

  const body = await request.json();

  // if body and title are blank-> should not be saved (same as in frontend part)
  if (!body.title?.trim() || !body.body?.trim()) {
    return NextResponse.json(
      {
        error: "Title and body are required",
      },{
        status: 400,
      },
    );
  }

  const tweet = await Tweet.create({
    title: body.title.trim(),
    body: body.body.trim(),
  });

  return NextResponse.json(tweet, {
    status: 201,
  });
}
