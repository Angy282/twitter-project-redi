"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CommentForm({ tweetId }) {
  const [body, setBody] = useState("");

  const router = useRouter();
  const { user } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting comment");

    if (!body.trim()) return;

    const res = await fetch(`/api/tweets/${tweetId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body,
        author: user.username,
      }),
    });
  console.log("Status:", res.status);
  const data = await res.json();

  console.log(data);
    if (res.ok) {
      setBody("");
      router.refresh();
    }
  }

  if (!user) {
    return <p className="text-gray-500 mt-6">Login to comment.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a comment..."
        className="w-full border rounded-lg p-3"
        rows="3"
      />

      <button
        type="submit"
        className="mt-3 bg-sky-500 text-white px-4 py-2 rounded-lg"
      >
        Add Comment
      </button>
    </form>
  );
}
