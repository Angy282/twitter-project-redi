import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";

export async function POST(_, { params }) {
  await connectDB();

  const { id } = await params;

  const updatedTweet = await Tweet.findByIdAndUpdate(
    id,
    {
      $inc: {
        "reactions.dislikes": 1,
      },
    },
    { new: true },
  );

  return NextResponse.json(updatedTweet);
}
