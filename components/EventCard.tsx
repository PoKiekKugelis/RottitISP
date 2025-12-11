"use server";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { UserRepository } from "@/repositories/user.repository";

interface EventCardProps {
  event: any;
  community: any;
}

export default async function EventCard({
  event,
  community
}: EventCardProps) {

  const user = await UserRepository.findOne(event.creatorUserId);

  return (
    <div className="bg-primary">
    <Card className="p-4 hover:border-primary/50 transition-colors">
      <div className="flex gap-3">
        {/* Event content */}
        <div className="flex-1">
          <Link href={`/rot/${community.name}`}>
            <Badge variant="outline" className="text-xs mb-1 hover:bg-background cursor-pointer">
              rot/{community.name}
            </Badge>
          </Link>

          <Link
            href={`/rot/${community.name}/event/${event.id}`}
            className="hover:underline"
          >
            <h2 className="text-lg font-semibold mb-1">
              {event.title}
            </h2>
          </Link>

          <p className="text-sm text-muted-foreground mb-2">
            {event.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Posted by u/{user?.username}</span>
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
}