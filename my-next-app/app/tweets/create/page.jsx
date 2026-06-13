"use client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState, React } from "react";

export default function CreateTweet() {
  // states
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Please fill all fields");
      return;
    }
    const res = await fetch("/api/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      const error = await res.json();

      alert(error.error);

      return;
    }

    // console.log("Tweet created successfully");

    // after submitting the tweet.. redirecting
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-end mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Feed
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Create Tweet</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tweet title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <textarea
          placeholder="What's up?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border p-2 w-full mb-4"
          rows="5"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Post Tweet
        </button>
      </form>
    </div>
  );
}
