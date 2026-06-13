import { card, typography, variants } from "@/styles/global";
import DeleteTweetBtn from "@/components/DeleteTweetBtn";

async function getTweet(id) {
  const res = await fetch(`http://localhost:3000/api/tweets/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function TweetDetails({ params }) {
  const { id } = await params;
  const tweet = await getTweet(id);

  return (
    <div className={card.cardWrapper + " p-4"}>
      <h1 className={typography.heading}>{tweet.title}</h1>

      <p className="mt-4">{tweet.body}</p>

      <a
        className={variants.secondary}
        href="/"
        style={{
          color: "blue",
          textDecoration: "underline",
        }}
      >
        ← Back to Feed
      </a>
      <DeleteTweetBtn id={tweet._id} />
    </div>
  );
}
