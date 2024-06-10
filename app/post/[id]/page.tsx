"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/lib/axios";
import { Post } from "@/app/components/Card";

const PostDetail = () => {
  const params = useParams();
  const id = params?.id;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`auth/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          setPost(response.data);
        });
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.body}</p>
      <p className="text-sm text-gray-500">Author ID: {post.userId}</p>
    </div>
  );
};

export default PostDetail;
