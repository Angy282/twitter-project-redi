"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function TweetCard({ tweet }) {
  const router = useRouter();

  // move it to the deletebtn component
  async function handleDelete() {
    const confirmed = confirm("Delete this tweet?");

    if (!confirmed) return;

    const res = await fetch(`/api/tweets/${tweet._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  }
  return (
    <div className="group rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg p-4 h-full">
      <Link href={`/tweets/${tweet._id}`}>
        <h2>{tweet.title}</h2>
        <p>{tweet.body}</p>
      </Link>
      <p className="mt-3">
        👍 {tweet.reactions?.likes ?? 0} | 👎 {tweet.reactions?.dislikes ?? 0}
      </p>

      <Link
        href={`/tweets/${tweet._id}/edit`}
        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
      >
        Edit
      </Link>
      
      <button
        onClick={handleDelete}
        className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete tweet
      </button>
    </div>
  );
}
