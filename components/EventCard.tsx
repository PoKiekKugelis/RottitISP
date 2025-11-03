"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface EventCardProps {
  id: number | string;
  title: string;
  author: string;
  community: string;
  content: string;
}

export default function EventCard({
  id,
  title,
  author,
  community,
  content
}: EventCardProps) {
  return (
    <div className="bg-primary">
    <Card className="p-4 hover:border-primary/50 transition-colors">
      <div className="flex gap-3">
        {/* Event content */}
        <div className="flex-1">
          <Link href={`/rot/${community}`}>
            <Badge variant="outline" className="text-xs mb-1 hover:bg-background cursor-pointer">
              rot/{community}
            </Badge>
          </Link>

          <Link
            href={`/rot/${community}/event/${id}`}
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
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
}