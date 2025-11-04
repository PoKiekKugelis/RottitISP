"use client"

import { useEffect, useState } from "react"
import PostCard from "@/components/PostCard";
import type { Post } from "@/lib/mock/posts";
import { getClientPosts } from "@/lib/mock/posts";

interface PostFeedProps {
  communityName?: string;
}

export default function PostFeed({ communityName }: PostFeedProps) {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const all = getClientPosts()
    setPosts(communityName ? all.filter((p) => p.community === communityName) : all)
  }, [communityName])

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
