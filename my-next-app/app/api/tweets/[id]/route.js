import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// reading the cookie and verfiying the token
// who is making the requests (only the authenticated user)
async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET); //the tokent as not modified
  } catch {
    return null;
  }
}
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

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return NextResponse.json(
      { error: "Tweet not found" },

      { status: 404 },
    );
  }
// deleting only the authorized specific user
  if (tweet.author !== currentUser.username) {
    return NextResponse.json(
      { error: "You can only delete your own tweets" },

      { status: 403 },
    );
  }
  await Tweet.findByIdAndDelete(id);

  return NextResponse.json({
    message: "Tweet deleted",
  });
}

// updating a tweet
// make it possible only for authorized logged in authors.
export async function PUT(request, { params }) {
  await connectDB();

  const currentUser = await getCurrentUser();
// verify user
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
  }
// check if the logged in user is the owner of the tweet so he can edit
  if (tweet.author !== currentUser.username) {
    return NextResponse.json(
      { error: "You can only edit your own tweets" },
      { status: 403 },
    );
  }

  const body = await request.json();

  const updatedTweet = await Tweet.findByIdAndUpdate(
    id,
    {
      title: body.title.trim(),
      body: body.body.trim(),
    },
    { new: true }, //returns the new one instead of the old
  );

  return NextResponse.json(updatedTweet);
}
