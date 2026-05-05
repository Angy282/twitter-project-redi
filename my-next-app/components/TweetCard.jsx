import React from "react";

export default async function TweetCard({ tweet }) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg p-4 h-full">
      <h1>{tweet.title}</h1>
      <p>{tweet.body}</p>
      <p>
        👍 {tweet.reactions.likes} | 👎 {tweet.reactions.dislikes}
      </p>
    </div>
  );
}
