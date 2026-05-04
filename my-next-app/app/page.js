import { card, typography } from "@/styles/global";
import TweetCard from "@/components/TweetCard";
import React from "react";
import Link from "next/link";

async function getAllTweets() {
  const res = await fetch("https://dummyjson.com/posts");
  return res.json();
}

export default async function HomePage() {
  const tweets = await getAllTweets();

  return (
    <main>
      <h1 className={typography.heading}>Tweet Tweet 🐥</h1>
      <ul className={card.cardsWrapper}>
        {tweets.posts.map((tweet) => (
          <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
            <TweetCard tweet={tweet} />
          </Link>
        ))}
      </ul>
    </main>
  );
}
