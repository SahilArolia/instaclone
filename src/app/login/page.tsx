"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    if (userType) {
      console.log("User already logged in, redirecting...");
      router.push("/feed");
    }
  }, [router]);

  // Handle login and redirect
  const handleLogin = (type: string) => {
    sessionStorage.setItem("userType", type);
    console.log(`UserType set to: ${type}`);

    setTimeout(() => {
      router.push("/feed");
    }, 100); // Ensures storage is updated before redirecting
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      {/* Guest Login */}
      <button
        onClick={() => handleLogin("guest")}
        className="bg-blue-500 px-4 py-2 rounded mb-4"
      >
        Continue as Guest
      </button>

      {/* Mock User Login */}
      <button
        onClick={() => handleLogin("user")}
        className="bg-green-500 px-4 py-2 rounded"
      >
        Login as User (Mock)
      </button>
    </div>
  );
}
