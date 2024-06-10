"use client";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Post } from "../../components/Card";
import { useTheme } from "@/app/context/theme";

const PostPage: FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className={`p-10 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{post?.body}</p>
      <div>
        <p>Likes: {post?.reactions.likes}</p>
        <p>Dislikes: {post?.reactions.dislikes}</p>
        <p>Views: {post?.views}</p>
      </div>
    </div>
  );
};

export default PostPage;
