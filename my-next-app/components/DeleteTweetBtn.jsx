"use client";

import { useRouter } from "next/navigation";

export default function DeleteTweetBtn({ id }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this tweet?");

    if (!confirmed) return;

    await fetch(`/api/tweets/${id}`, {
      method: "DELETE",
    });

    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Delete Tweet
    </button>
  );
}
