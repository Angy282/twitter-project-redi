import { card, typography, variants } from "@/styles/global";
import React from "react";

async function getTweet(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  return res.json();
}

export default async function TweetDetails({ params }) {
  const { id } = await params;
  const tweet = await getTweet(id);

  return (
    <div className={card.cardWrapper + " p-4"}>
      <h1 className={typography.heading}>Tweet Details</h1>

      <p>{tweet.body}</p>
      <p className="m-6">
        👍 {tweet.reactions.likes} | 👎 {tweet.reactions.dislikes}
      </p>
      <a className={variants.secondary} href="/" style={{ color: "blue", textDecoration: "underline" }}>
        ← Back to Feed
      </a>
    </div>
  );
}
