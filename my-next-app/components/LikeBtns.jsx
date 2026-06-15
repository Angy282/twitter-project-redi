"use client";

import { useRouter } from "next/navigation";

export default function LikeBtns({ tweetId, reactions }) {
  const router = useRouter();

  async function handleLike() {
    const res = await fetch(`/api/tweets/${tweetId}/like`, {
      method: "POST",
    });

    if (res.ok) {
      router.refresh();
    }
  }

  async function handleDislike() {
    const res = await fetch(`/api/tweets/${tweetId}/dislike`, {
      method: "POST",
    });

    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <div className="mt-3 flex items-center gap-4">
      <button
        onClick={handleLike}
        className="rounded px-3 py-1 bg-green-100 hover:bg-green-200"
      >
        👍 {reactions?.likes ?? 0}
      </button>

      <button
        onClick={handleDislike}
        className="rounded px-3 py-1 bg-red-100 hover:bg-red-200"
      >
        👎 {reactions?.dislikes ?? 0}
      </button>
    </div>
  );
}
