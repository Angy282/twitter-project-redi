import EditForm from "@/components/EditForm";
import Link from "next/link";

async function getTweet(id) {
  const res = await fetch(`http://localhost:3000/api/tweets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tweet");
  }

  return res.json();
}

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
