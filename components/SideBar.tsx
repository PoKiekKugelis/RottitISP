"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        <CardContent>
          <h3 className="font-bold mb-2">Create Community</h3>
          <Button className="w-full">
            Create Community
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="absolute -left-3 top-4 h-8 w-8 rounded-full "
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
