"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface SideBarProps {
  activeCommunity?: string;
}

export default function SideBar({ activeCommunity }: SideBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsedCom, setIsCollapsedCom] = useState(false);

  const communities = [
    { name: "programming", members: 5234 },
    { name: "gaming", members: 3421 },
    { name: "cooking", members: 2156 },
    { name: "fitness", members: 1892 },
    { name: "itsjoever", members: 42069 },
  ];

  const SidebarContent = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Popular Communities</CardTitle>
        </CardHeader>
        <CardContent>
          {communities.map((community) => (
            <Link
              key={community.name}
              href={`/rot/${community.name}`}
              className="flex items-center p-1 hover:underline">
              <div className="flex-1">
                <p className="font-medium text-sm">rot/{community.name}</p>
                <p className="text-xs text-muted-foreground"> {community.members.toLocaleString()} members</p>
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
                <Link href={`/rot/${activeCommunity}/addPost`}>
                  <Button className="w-full">
                    Add post
                  </Button>
                </Link>
                <Link href={`/rot/${activeCommunity}/createEvent`}>
                  <Button className="w-full">
                    Create Event
                  </Button>
                </Link>
                <Link href={`/rot/${activeCommunity}/edit`}>
                  <Button className="w-full">
                    Edit Community
                  </Button>
                </Link>

              </>
            ) : (
              <Link href="/community/create">
                <Button className="w-full">
                  Create Community
                </Button>
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
        className={`transition-all duration-300 overflow-hidden ${isCollapsed ? "w-0" : "w-80"}`}>
        <div className={isCollapsed ? "invisible" : "visible"}>
          <SidebarContent />
        </div>
      </div>
    </div>
  );
}
