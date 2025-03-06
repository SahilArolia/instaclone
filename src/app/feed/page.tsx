"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";
import Sidebar from "@/component/sidebar";
import { toast } from "react-hot-toast";

interface Post {
  image: string;
  caption: string;
  likes?: number;
  comments?: string[];
  bookmarked?: boolean;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isGuest, setIsGuest] = useState(false);

  // Load user type and posts from localStorage
  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    setIsGuest(userType === "guest");

    try {
      const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      setPosts(storedPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
      localStorage.removeItem("posts");
    }
  }, []);

  // Save posts to localStorage when updated
  useEffect(() => {
    if (!isGuest && posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts, isGuest]);

  return (
    <div className="w-screen min-h-screen flex bg-gradient-to-b from-blue-300 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-60 bg-gray-900 text-white p-5">
        <Sidebar isOpen={true} toggleSidebar={() => {}} />
      </aside>

      {/* Scrollable Main Content */}
      <main className="ml-60 flex-1 flex flex-col items-center p-6 overflow-y-auto h-screen">
        <div className="w-full max-w-2xl mt-6 space-y-8">
          {posts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              {isGuest ? "Login to see posts!" : "No posts available."}
            </p>
          ) : (
            posts.map(
              (
                { image, likes = 0, caption, comments = [], bookmarked },
                index
              ) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700"
                >
                  {/* Post Image */}
                  <Image
                    src={image}
                    alt="Post Image"
                    width={400}
                    height={300}
                    className="rounded-lg w-full"
                  />

                  {/* Post Caption */}
                  <p className="mt-2 text-gray-800 dark:text-gray-300">
                    {caption}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-between mt-4 text-gray-600 dark:text-gray-400">
                    {/* Like Button */}
                    <button
                      onClick={() => {
                        if (isGuest) {
                          toast.error("Please log in to like posts!");
                          return;
                        }
                        setPosts((prev) =>
                          prev.map((post, i) =>
                            i === index
                              ? { ...post, likes: (post.likes || 0) + 1 }
                              : post
                          )
                        );
                      }}
                      className="flex items-center gap-1"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{likes}</span>
                    </button>

                    {/* Bookmark Button */}
                    <button
                      onClick={() => {
                        if (isGuest) {
                          toast.error("Please log in to bookmark posts!");
                          return;
                        }
                        setPosts((prev) =>
                          prev.map((post, i) =>
                            i === index
                              ? { ...post, bookmarked: !post.bookmarked }
                              : post
                          )
                        );
                      }}
                      className="flex items-center gap-1"
                    >
                      <Bookmark
                        className={
                          bookmarked ? "w-5 h-5 text-yellow-400" : "w-5 h-5"
                        }
                      />
                    </button>
                  </div>

                  {/* Comments */}
                  <div className="mt-4">
                    {comments.map((comment, i) => (
                      <p
                        key={i}
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        {comment}
                      </p>
                    ))}
                  </div>

                  {/* Comment Input */}
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (isGuest) {
                            toast.error("Please log in to comment!");
                            return;
                          }
                          setPosts((prev) =>
                            prev.map((post, i) =>
                              i === index
                                ? {
                                    ...post,
                                    comments: [
                                      ...(post.comments || []),
                                      e.currentTarget.value,
                                    ],
                                  }
                                : post
                            )
                          );
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
              )
            )
          )}
        </div>
      </main>
    </div>
  );
}
