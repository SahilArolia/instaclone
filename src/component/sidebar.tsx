"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Home, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const [scrollY, setScrollY] = useState(0);
  const [isGuest, setIsGuest] = useState(false);
  const router = useRouter();

  // Check user type on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userType = sessionStorage.getItem("userType");
      setIsGuest(userType === "guest");
    }
  }, []);

  // Track scroll position
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Handle Create button click
  const handleCreateClick = () => {
    if (isGuest) {
      toast.error("Please log in to create a post!");
      router.push("/");
    } else {
      router.push("/create");
    }
  };

  return (
    <aside
      className={`fixed left-0 w-60 bg-gray-900 text-white p-5 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:relative lg:flex lg:flex-col`}
      style={{
        transform: `translateY(${Math.min(
          scrollY,
          typeof window !== "undefined" ? window.innerHeight - 100 : 0
        )}px)`,
        height: "100vh",
        willChange: "transform",
      }}
    >
      {/* Instagram Logo */}
      <div className="flex justify-center mb-8">
        <Image
          src="/ig.png"
          alt="Instagram Logo"
          width={140}
          height={140}
          priority
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-3 hover:text-gray-400">
          <Home size={20} /> Home
        </Link>
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-3 hover:text-gray-400"
        >
          <Plus size={20} /> Create
        </button>
      </nav>
    </aside>
  );
}
