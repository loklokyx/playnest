"use client";
import { useState } from "react";
import { account, ID } from "./appwrite.js";

const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const login = async (email, password) => {
    const session = await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  };

  const register = async () => {
    await account.create(ID.unique(), email, password, name);
    login(email, password);
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <p className="text-gray-700 text-lg font-medium">Logged in as <span className="font-semibold text-blue-500">{loggedInUser.name}</span></p>
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
        <p className="text-red-500 text-center font-semibold text-lg mb-4">Not logged in</p>
        <form className="space-y-4 text-black">
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
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => login(email, password)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
            <button
              type="button"
              onClick={register}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
