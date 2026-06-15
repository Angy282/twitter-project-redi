"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  console.log(user);


  return (
    <nav className="bg-slate-800 text-white px-6 py-4 shadow">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          🐣 Tweet Tweet
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/tweets/create"
            className="bg-white text-sky-500 px-4 py-2 rounded-lg font-medium"
          >
            Create Tweet
          </Link>
          {/* conditional rendering of the user if it exist or not */}
          {user ? (
            <>
              <span className="font-medium">Hi {user.username}</span>

              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-white text-sky-500 px-4 py-2 rounded-lg font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
