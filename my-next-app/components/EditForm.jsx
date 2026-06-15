"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// we need to import this in the page
export default function EditForm({ tweet }) {
  const router = useRouter();

  const [title, setTitle] = useState(tweet.title);
  const [body, setBody] = useState(tweet.body);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/tweets/${tweet._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    if (!res.ok) {
      alert("Failed to update tweet");
      return;
    }
    // redirecting and refreshing
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)} // we need to add this to update the state when the user types and the new value renders. same with body
        className="border p-2 w-full mb-4"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 w-full mb-4"
        rows="5"
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </form>
  );
}
