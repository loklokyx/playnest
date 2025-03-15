"use client";

import { useState, useEffect } from "react";
import { account } from "../auth";
import { redirect } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<{ name: string } | null>(
    null,
  );

  /**
   * ✅ Check if user is already logged in
   */
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const user = await account.get(); // ✅ Get the current user
        if (user) {
          setLoggedInUser(user);
          redirect("/"); // ✅ Redirect to home or dashboard if user is already logged in
        }
      } catch (err) {
        console.log("No active session, user not logged in.", err);
      }
    };
    checkUserSession();
  }, []);

  /**
   * User login
   */
  const login = async (): Promise<void> => {
    setError(null);
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      redirect("/"); // ✅ Redirect to home or dashboard after login
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login failed:", err);
    }
  };

  if (loggedInUser) {
    redirect("/"); // ✅ Redirect to home or dashboard if user is already logged in
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-2">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form
          className="space-y-4 text-black"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={login}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition  cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account yet?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
