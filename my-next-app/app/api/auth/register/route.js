import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  await connectDB();

  const { username, email, password } = await request.json();

  // we need some checks before we save the new user: 1.all fields are filled? 2.is the user already taken?
  if (!username || !email || !password) {
    return NextResponse.json(
      { error: "All fields are requirred." },
      { status: 400 },
    );
  }
// db checks if either matches
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    return NextResponse.json(
      {
        error: "User already exists.",
      },
      { status: 409 },
    );
  }
// if everything checks. we move to creating an encryped password and new user.
  const secretPass = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: secretPass,
  });

  return NextResponse.json(
    {
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    },
    { status: 201 },
  );
}
