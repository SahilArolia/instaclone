"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { googleSignIn } from "@/app/actions/authActions";
import { usePathname } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const userType = sessionStorage.getItem("userType");

    if (pathname === "/") {
      console.log("User manually visited Home, clearing session...");
      sessionStorage.removeItem("userType"); // Clear session if user manually visits home
      setIsChecking(false);
      return;
    }

    if (userType === "google" && pathname !== "/feed") {
      console.log("User logged in with Google, redirecting...");
      router.push("/feed");
    } else {
      setIsChecking(false);
    }
  }, [pathname, router]);

  const handleGuestLogin = () => {
    sessionStorage.setItem("userType", "guest");
    console.log("Guest Mode Activated");

    setTimeout(() => {
      router.push("/feed");
    }, 100);
  };

  if (isChecking) return null; // Prevent flashing before checking storage

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white relative">
      {/* Background Wrapper */}
      <div className="absolute inset-0 bg-gray-900 brightness-125">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 via-purple-900 to-black opacity-70 animate-gradient" />
      </div>

      {/* Instagram Logo */}
      <Image
        src="/ig.png"
        alt="Instagram Icon"
        width={200}
        height={200}
        className="z-50"
      />

      {/* Continue as Guest Button */}
      <button
        onClick={handleGuestLogin}
        className="mt-6 w-60 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition z-50 border border-gray-400"
      >
        Continue as Guest
      </button>

      {/* Login Using Google Button */}
      <form action={googleSignIn} className="mt-4 w-full flex justify-center">
        <button
          type="submit"
          className="w-60 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition z-50 border border-gray-400 block"
        >
          Login Using Google
        </button>
      </form>

      {/* Background Animation */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 12s ease infinite;
          will-change: background-position;
        }
      `}</style>
    </div>
  );
}
