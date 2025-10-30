"use client";

import { ArrowBigUp, ArrowBigDown, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  id: number;
  title: string;
  author: string;
  community?: string;
  votes: number;
  comments: number;
  content?: string;
}

export default function PostCard({ 
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
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowBigUp className="h-6 w-6" />
          </button>
          <span className="font-bold text-sm">{votes}</span>
          <button className="text-muted-foreground hover:text-secondary transition-colors">
            <ArrowBigDown className="h-6 w-6" />
          </button>
        </div>

        {/* Post content */}
        <div className="flex-1">
          {community && (
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">
                rot/{community}
              </Badge>
            </div>
          )}
          <h2 className="text-lg font-semibold hover:underline cursor-pointer mb-1">
            {title}
          </h2>
          {content && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {content}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Posted by u/{author}</span>
            <button className="flex items-center gap-1 hover:bg-accent px-2 py-1 rounded">
              <MessageSquare className="h-4 w-4" />
              <span>{comments} comments</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
