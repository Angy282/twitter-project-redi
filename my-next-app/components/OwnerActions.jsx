"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import DeleteBtn from "./DeleteBtn";

export default function OwnerActions({ tweet }) {
  const { user } = useAuth();

  const isAuthor = user?.username === tweet.author;

  if (!isAuthor) return null;

  return (
    <div className="mt-6 flex gap-3">
      <Link
        href={`/tweets/${tweet._id}/edit`}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
      >
        Edit
      </Link>

      <DeleteBtn tweetId={tweet._id} />
    </div>
  );
}
