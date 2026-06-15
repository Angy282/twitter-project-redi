"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
// sending the details to the backend to check if they are correct and get the token back if they are correct ->stores the cookie -> updates the auth context with the user details -> redirects to  the desired page
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    login(data.user);

    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-sky-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
