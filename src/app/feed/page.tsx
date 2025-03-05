"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  // Load user type and posts from localStorage
  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    setIsGuest(userType === "guest");

    if (userType !== "guest") {
      try {
        const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
        setPosts(storedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
        localStorage.removeItem("posts");
      }
    }
  }, []);

  // Save posts to localStorage when updated
  useEffect(() => {
    if (!isGuest && posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts, isGuest]);

  // Handle Like
  const handleLike = (index: number) => {
    if (isGuest) {
      toast.error("Please log in to like posts!");
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index ? { ...post, likes: (post.likes || 0) + 1 } : post
      )
    );
  };

  // Handle Comment
  const addComment = (
    index: number,
    comment: string,
    inputElement: HTMLInputElement | null
  ) => {
    if (isGuest) {
      toast.error("Please log in to comment!");
      return;
    }
    if (!comment.trim()) return;

    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      )
    );

    if (inputElement) inputElement.value = "";
  };

  // Handle Bookmark
  const handleBookmark = (index: number) => {
    if (isGuest) {
      toast.error("Please log in to bookmark posts!");
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  return (
    <div className="w-screen min-h-screen flex bg-gradient-to-b from-blue-300 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-60 bg-gray-900 text-white p-5 transition-transform duration-300 
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:relative`}
      >
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      </aside>

      {/* Main Feed */}
      <main className="flex-1 flex flex-col items-center p-6">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 left-4 z-30 p-2 rounded-full bg-gray-800 text-white lg:hidden"
        >
          ☰
        </button>

        <h1 className="text-gray-900 dark:text-white text-3xl font-[Pacifico] mb-6">
          For You
        </h1>

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
                      onClick={() => handleLike(index)}
                      className="flex items-center gap-1"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{likes}</span>
                    </button>

                    {/* Bookmark Button */}
                    <button
                      onClick={() => handleBookmark(index)}
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
                          addComment(
                            index,
                            e.currentTarget.value,
                            e.currentTarget
                          );
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

/* In the above code, we have created a simple feed page where users can view posts, like them, comment on them, and bookmark them. The posts are stored in the local storage of the browser. 
  The page has a sidebar that can be toggled on mobile devices. The posts are displayed in a card layout with an image, caption, like button, bookmark button, comments, and comment input. 
  The user type and posts are loaded from the local storage when the page loads. The posts are saved to the local storage when they are updated. 
  The user can like a post, add a comment to a post, and bookmark a post. If the user is a guest, they will see a message asking them to log in to perform these actions. 
  The page is styled using Tailwind CSS and supports dark mode. 
  Step 4: Create a Profile Page 
  Next, let’s create a profile page where users can view their profile details and update them. 
  Create a new file  src/app/profile/page.tsx  and add the following code:*/
