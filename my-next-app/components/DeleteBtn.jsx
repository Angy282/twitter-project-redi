"use client";

import { useRouter } from "next/navigation";

export default function DeleteBtn({ tweetId }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Delete this tweet?");

    if (!confirmed) return;

    const res = await fetch(`/api/tweets/${tweetId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
      router.push("/");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  );
}
