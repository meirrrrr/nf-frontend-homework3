"use client";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ThemeButton from "./ThemeButton";
import { useTheme } from "../context/theme";
import "../globals.css";

export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
}

export interface ApiResponse {
  posts: Post[];
}

const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(" ");
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
};

const Card: FC = () => {
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "https://dummyjson.com/auth/posts",
          {
            params: { limit: 5 },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch posts");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className={`lg:px-[120px] ${
        theme === "light" ? "bg-white" : "bg-gray-900 text-white"
      }`}
    >
      <ThemeButton />
      {posts?.map((post) => (
        <div
          key={post.id}
          className={`flex gap-3 flex-col border-t ${
            theme === "light" ? "border-gray-300" : "border-gray-700"
          } py-10`}
          onClick={() => router.push(`post/${post.id}`)}
        >
          <div className="flex justify-between text-xs mb-1 items-center">
            <p>Author&apos;s name in Topics Name</p>
            <p className="px-2 rounded-xl bg-lime-500 text-white">
              {post.tags.join(" ")}
            </p>
          </div>
          <div className="block mb-2">
            <h2 className="text-xl font-medium mb-0.5">{post.title}</h2>
            <p className="text-sm text-gray-500 leading-4 font-light">
              {truncateText(post.body, 20)}
            </p>
          </div>
          <div className="flex text-xs justify-between">
            <button>{post.views} views</button>
            <div className="flex gap-1">
              <p>Likes: {post.reactions.likes}</p>
              <p>Dislikes: {post.reactions.dislikes}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
