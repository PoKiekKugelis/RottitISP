"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowBigUp, ArrowBigDown, MessageSquare } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  id: number | string;
  title: string;
  author: string;
  community: string;
  votes: number;
  comments: number;
  content: string;
}

export default function PostCard({
  id,
  title,
  author,
  community,
  votes,
  comments,
  content
}: PostCardProps) {
  return (
    <Card className="p-4 hover:border-primary/50 transition-colors">
      <div className="flex gap-3">
        {/* Likes */}
        <div className="flex flex-col items-center gap-1">
          <button className="text-muted-foreground hover:text-primary">
            <ArrowBigUp className="h-6 w-6 cursor-pointer" />
          </button>
          <span className="font-bold text-sm">{votes}</span>
          <button className="text-muted-foreground hover:text-primary">
            <ArrowBigDown className="h-6 w-6 cursor-pointer" />
          </button>
        </div>

        {/* Post content */}
        <div className="flex-1">
          <Link href={`/rot/${community}`}>
            <Badge variant="outline" className="text-xs mb-1 hover:bg-background cursor-pointer">
              rot/{community}
            </Badge>
          </Link>

          <Link
            href={`/rot/${community}/post/${id}`}
            className="hover:underline"
          >
            <h2 className="text-lg font-semibold mb-1">
              {title}
            </h2>
          </Link>

          <p className="text-sm text-muted-foreground mb-2">
            {content}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Posted by u/{author}</span>
            <div className="flex items-center gap-1 hover:bg-background px-2 py-1">
              <MessageSquare className="h-4 w-4" />
              <div>{comments} comments</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
