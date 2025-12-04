"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeletePopUp from "./DeletePopUp";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { use } from "react";
import { Community } from "@/models/community/entities/community.entity";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"
import { CommunityMemberButton } from "./CommunityMemberButton";

interface SideBarProps {
  activeCommunity?: Community;
  communities: Promise<(Community & { _count: { members: number } })[]>;
  userCommunityRole: string;
}

export default function SideBarContent({ activeCommunity, communities, userCommunityRole }: SideBarProps) {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsedCom, setIsCollapsedCom] = useState(false);
  const session = useSession()
  const globalRole = session.data?.user.role

  const allCommunities = use(communities);

  const handleDelete = async () => {
    const response = await fetch(`/api/communities/${activeCommunity?.id}`, {
      method: "DELETE"
    })
    const result = await response.json()
    if (!response.ok) {
      console.log(result.error)
      return;
    }
    router.push("/")
  }

  const SidebarContent = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Popular Communities</CardTitle>
        </CardHeader>
        <CardContent>
          {allCommunities.map((community) => (
            <Link
              key={community.name}
              href={`/rot/${community.name}`}
              className="flex items-center p-1 hover:underline"
            >
              <div className="flex-1">
                <p className="font-medium text-sm">rot/{community.name}</p>
                <p className="text-xs text-muted-foreground">
                  {community._count.members.toLocaleString()} members
                </p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Community</CardTitle>

            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setIsCollapsedCom(!isCollapsedCom)}
            >
              {isCollapsedCom ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>

        {!isCollapsedCom && (
          <CardContent className="flex flex-col gap-2 pt-0">
            {activeCommunity ? (
              <>
                {globalRole && userCommunityRole != "RANDOM" && (<Link href={`/rot/${activeCommunity.name}/addPost`}>
                  <Button className="w-full cursor-pointer">Add Post</Button>
                </Link>
                )}
                {(userCommunityRole == "MODERATOR" || globalRole == "ADMIN") && (<>
                  <Link href={`/rot/${activeCommunity.name}/createEvent`}>
                    <Button className="w-full cursor-pointer">Create Event</Button>
                  </Link>
                  <Link href={`/rot/${activeCommunity.name}/edit`}>
                    <Button className="w-full cursor-pointer">Edit Community</Button>
                  </Link>
                </>)}
                <CommunityMemberButton
                  communityId={activeCommunity.id}
                  communityName={activeCommunity.name}
                  isMember={userCommunityRole != "RANDOM"} />
                {globalRole == "ADMIN" && (
                  <>
                    <hr />
                    <DeletePopUp
                      title="Delete Community"
                      description={`Are you sure you want to delete rot/${activeCommunity.name}? This will permanently delete all posts, events, and members. This action cannot be undone.`}
                      onConfirm={handleDelete}
                      trigger={
                        <Button variant="destructive" className="w-full cursor-pointer">
                          Delete Community
                        </Button>
                      }
                    />
                  </>
                )}
              </>
            ) : (
              <Link href="/community/create">
                <Button className="w-full cursor-pointer">Create Community</Button>
              </Link>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute -left-3 top-4 h-8 w-8 rounded-full"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <div
        className={`transition-all duration-300 overflow-hidden ${isCollapsed ? "w-0" : "w-80"
          }`}
      >
        <div className={isCollapsed ? "invisible" : "visible"}>
          <SidebarContent />
        </div>
      </div>
    </div>
  );
}
