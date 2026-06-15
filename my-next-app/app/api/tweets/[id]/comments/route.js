import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Comment from "@/models/Comment";

export async function GET(request, context) {
  await connectDB();

  const { id } = await context.params;

  const comments = await Comment.find({
    tweetId: id,
  }).sort({ createdAt: -1 });

  return NextResponse.json(comments);
}

export async function POST(request, context) {
  await connectDB();

  const { id } = await context.params;

  const { body, author } = await request.json();

  if (!body.trim()) {
    return NextResponse.json(
      { error: "Comment cannot be empty" },
      { status: 400 },
    );
  }

  const comment = await Comment.create({
    body: body.trim(),
    author,
    tweetId: id,
  });

  return NextResponse.json(comment, {
    status: 201,
  });
}
