"use client";
import { signIn } from "next-auth/react";

export async function googleSignIn() {
  try {
    // Ensure userType is updated before redirecting
    sessionStorage.setItem("userType", "google");

    await signIn("google", { callbackUrl: "/feed" });
  } catch (error) {
    console.error("Sign-in failed", error);
  }
}

// Default export for button component (keep it if needed)
export default function GoogleSignInButton() {
  return (
    <button
      onClick={googleSignIn}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Sign in with Google
    </button>
  );
}
