"use client";
import { client, account } from "@/app/(auth)/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
export default function ProfilePage() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
 
  // ✅ 获取用户信息
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setEmail(user.email);
        setName(user.name || "");
        setPhone(user.prefs?.phone || ""); // 确保 phone 可用
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ 处理更新用户信息
  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    try {
      await account.updatePrefs({ phone });
      await account.updateName(name);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-center text-2xl font-bold text-gray-700">Profile</h2>
        {loading ? (
          <p className="text-center text-gray-500 mt-4">Loading...</p>
        ) : (
          <>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {success && <p className="text-green-500 text-center mt-2">{success}</p>}

            <div className="space-y-4 mt-4">
              <div>
                <label className="text-gray-600">Email (Read-only)</label>
                <input
                  placeholder="Email"
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500"
                />
              </div>
              <div>
                <label className="text-gray-600">Name</label>
                <input
                  placeholder="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-gray-600">Phone</label>
                <input
                placeholder="Phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <Button onClick={handleSave} className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Save
              </Button>
              <Button onClick={() => redirect("/")} className="w-full mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                Return to Home
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

