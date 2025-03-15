"use client";

import { useState } from "react";
import { account } from "../auth";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<{ name: string } | null>(
    null,
  );
  const router = useRouter();

  /**
   * User login
   */
  const Login = async (): Promise<void> => {
    setError(null);
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      router.push("/"); // Redirect to home page after login
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login failed:", err);
    }
  };

  /**
   * User logout
   */
  const logout = async (): Promise<void> => {
    try {
      await account.deleteSession("current");
      setLoggedInUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loggedInUser) {
    return (
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <p className="text-gray-700 text-lg font-medium">
          Logged in already:{" "}
          <span className="font-semibold text-blue-500">
            {loggedInUser.name}
          </span>
        </p>
        <button
          type="button"
          onClick={logout}
          className="mt-4 bg-blue-300 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition w-full cursor-pointer"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-center text-2xl font-bold text-gray-700">Login</h2>
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
            onClick={Login}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account yet?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
