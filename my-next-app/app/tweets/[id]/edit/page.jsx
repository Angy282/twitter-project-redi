import EditForm from "@/components/EditForm";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";

async function getTweet(id) {
  await connectDB();

  const tweet = await Tweet.findById(id).lean();

  if (!tweet) {
    throw new Error("Tweet not found");
  }

  return JSON.parse(JSON.stringify(tweet));
}
// after fetching the tweet by id, we pass it to form component.
export default async function EditTweetPage({ params }) {
  const { id } = await params;
  const tweet = await getTweet(id);

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-end mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Feed
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Edit Tweet</h1>

      <EditForm tweet={tweet} />
    </div>
  );
}
