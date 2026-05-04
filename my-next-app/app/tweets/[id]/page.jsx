import React from "react";

async function getTweet(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  return res.json();
}

export default async function TweetDetails({ params }) {
  console.log("PARAMS RAW:", params);

  const { id } = await params;

  console.log("ID:", id);

  return (
    <div>
      <h1>{tweet.title}</h1>
      <p>{tweet.body}</p>
      <p>
        👍 {tweet.reactions.likes} | 👎 {tweet.reactions.dislikes}
      </p>
      {/* <p>Tags: {tweet.tags.join(", ")}</p> */}
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        ← Back to Feed
      </a>
    </div>
  );
}
