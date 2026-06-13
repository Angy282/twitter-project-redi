import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";

// dynamix route for each specific tweet by id
export async function GET(_, { params }) {
  await connectDB();
  const { id } = await params;

  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return NextResponse.json({ message: "Tweet not found" }, { status: 404 });
  }

  return NextResponse.json(tweet);
}

// deleting the specific post by id

export async function DELETE(_, { params }) {
  await connectDB();
  const { id } = await params;

  await Tweet.findByIdAndDelete(id);

  return NextResponse.json({
    message: "Tweet deleted",
  });
}

// updating a tweet

export async function PUT(request, { params }) {
  await connectDB();

  const { id } = await params;
  const body = await request.json();

  const updatedTweet = await Tweet.findByIdAndUpdate(
    id,
    {
      body: body.body,
      title: body.title,
    },
    {
      new: true,
    },
  );

  return NextResponse.json(updatedTweet)
}
