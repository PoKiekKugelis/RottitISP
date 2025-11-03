"use client";

import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import EventFeed from "@/components/EventFeed";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { use } from "react";

export default function CommunityPage({ params }: {
  params: Promise<{ communityName: string }>
}) {
  const { communityName } = use(params);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">rot/{communityName}</h1>
          <Link href={`/rot/${communityName}/edit`}>
            <Button variant="secondary" size="sm">
              Edit Community
            </Button>
          </Link>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <div className="flex-1">
          <EventFeed communityName={communityName} />
          <PostFeed communityName={communityName} />
        </div>
        <aside>
          <SideBar />
        </aside>
      </main>
    </div>
  );
}
