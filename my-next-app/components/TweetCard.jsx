"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { card } from "@/styles/global";
import { useAuth } from "@/context/AuthContext";
import LikeBtns from "./LikeBtns";
import DeleteBtn from "./DeleteBtn";

export default function TweetCard({ tweet }) {
  const router = useRouter();

  // move it to the deletebtn component
  // like/dislike functions - move to LikeBtns.jsx later?

  // enabling the edit and delete buttons only for the author of the tweet
  const { user } = useAuth();
  const isAuthor = user?.username === tweet.author;

  return (
    <div className={card.cardWrapper}>
      <Link href={`/tweets/${tweet._id}`}>
        <h2>{tweet.title}</h2>
        <p className="text-sm text-gray-500">Posted by {tweet.author}</p>
        <p>{tweet.body}</p>
      </Link>
      <LikeBtns tweetId={tweet._id} reactions={tweet.reactions} />
      {isAuthor && (
        <div className="mt-3 flex gap-2">
          <Link
            href={`/tweets/${tweet._id}/edit`}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </Link>

          <DeleteBtn tweetId={tweet._id} />
        </div>
      )}
    </div>
  );
}
