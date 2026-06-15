import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  await connectDB();
  const { email, password } = await request.json();
  // check if these details match what is saved in the db
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return NextResponse.json(
      {
        error: "Invalid credentials",
      },
      { status: 401 },
    );
  }

  // this creates a new token for the user if the details match
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const response = NextResponse.json({
    message: "Login successfull",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });

  response.cookies.set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
