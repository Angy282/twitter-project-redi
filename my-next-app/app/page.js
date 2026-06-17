import { card, typography } from "@/styles/global";

import TweetCard from "@/components/TweetCard";

import { connectDB } from "@/lib/mongodb";

import Tweet from "@/models/Tweet";

async function getAllTweets() {
  await connectDB();

  const tweets = await Tweet.find().sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(tweets));
}

export default async function HomePage() {
  const tweets = await getAllTweets();
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
