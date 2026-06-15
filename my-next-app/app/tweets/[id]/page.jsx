import { card, typography, variants } from "@/styles/global";
import Link from "next/link";
// import DeleteBtn from "@/components/DeleteBtn";
import OwnerActions from "@/components/OwnerActions";
import CommentForm from "@/components/CommentForm";

async function getTweet(id) {
  const res = await fetch(`http://localhost:3000/api/tweets/${id}`, {
    cache: "no-store",
  });

  return res.json();
}
// fetching comments for a specific tweet
async function getComments(id) {
  const res = await fetch(
    `http://localhost:3000/api/tweets/${id}/comments`,

    {
      cache: "no-store",
    },
  );

  return res.json();
}

export default async function TweetDetails({ params }) {
  const { id } = await params;
  const tweet = await getTweet(id);
  const comments = await getComments(id);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className={card.cardWrapper + " p-4"}>
        <Link href="/" className="text-sky-600 hover:underline">
          ← Back to Feed
        </Link>
        <h1 className="text-4xl font-bold text-center text-sky-700 mb-6">
          {tweet.title}
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">{tweet.body}</p>

        <p className="text-sm text-gray-500 mb-6">Posted by {tweet.author}</p>
        <div className="mt-8 flex items-center gap-4">
          <OwnerActions tweet={tweet} />
        </div>
      </div>
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">
          Comments ({comments.length})
        </h2>

        <CommentForm tweetId={tweet._id.toString()} />

        <div className="mt-6 space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">{comment.author}</p>

              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// <h1 className={typography.heading}>{tweet.title}</h1>
