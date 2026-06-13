"use client";

export default function Error({ error }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-bold text-cyan-700">
        Oops! Something went wrong.
      </h2>

      <p className="text-gray-600">{error.message}</p>
    </div>
  );
}
