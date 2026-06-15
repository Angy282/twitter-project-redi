import { card, typography } from "@/styles/global";
import TweetCard from "@/components/TweetCard";
import React from "react";
import Link from "next/link";

async function getAllTweets() {
  const res = await fetch("http://localhost:3000/api/tweets", {});

  if (!res.ok) {
    throw new Error("Failed to fetch tweets");
  }

  return res.json();
}

export default async function HomePage() {
  const tweets = await getAllTweets();
  console.log(tweets);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className={`${typography.heading} text-center mb-8`}>
        🐥 Tweet Tweet
      </h1>

      {/* <Link href="/tweets/create">Create Tweet</Link> */}
      <ul className={card.cardsWrapper}>
        {tweets.map((tweet) => (
          <TweetCard key={tweet._id} tweet={tweet} />
        ))}
      </ul>
    </main>
  );
}
