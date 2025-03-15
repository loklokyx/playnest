"use client";

import { useState } from "react";
import { account, ID } from "../auth";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  /**
   * Register a new account
   */
  const register = async (): Promise<void> => {
    setError(null);
    try {
      await account.create(ID.unique(), email, password, name);
    } catch (err) {
      setError("Register failed. Please try again.");
      console.error("Register failed:", err);
    } finally {
      redirect("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="mr-2 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
        >
          <span className="text-white font-bold">P</span>
        </motion.div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          PlayNest
        </h1>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 my-4">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-2">
          Register
        </h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form
          className="space-y-4 text-black"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            onClick={register}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign in now
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
