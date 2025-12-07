
import React from "react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AvatarImg from "@/components/Avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventRepository } from "@/repositories/event.repository";
import { UserRepository } from "@/repositories/user.repository";
import { CommunityRepository } from "@/repositories/community.repository";

export default async function EventPage({ params }: {
  params: Promise<{ communityName: string, eventId: string }>
}) {
  const { communityName, eventId } = await params;

  const event = await EventRepository.findOne(parseInt(eventId))
  if (!event) {
    return (<div>Event not found</div>)
  }
  const community = await CommunityRepository.findOne(event.communityId)
  if (!community) {
    return <div>Community not found</div>;
  }
  const user = await UserRepository.findOne(event.creatorUserId)
  if (!user) {
    return <div>Creator not found</div>;
  }

  const imageSrc = user.avatar;
  const imageAlt = "@shadcn";
  const imageFallBack = "CN";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="my-auto gap-x-5">
        <Link href={`../`}>
          <div className="hover:underline">← Back</div>
        </Link>
      </div>
      <main className="max-w-5xl mx-auto px-4 py-6 flex gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-row items-left justify-left w-1/2 gap-x-2">
              <Link href={`/profiles/${user?.id}`} ><AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack} size={"size-9"}/></Link>
              <CardTitle className="text-md">{user?.username}</CardTitle>
              <Link href={`/rot/${communityName}`}>
                <Badge variant="outline" className="text-xs mb-1 hover:bg-background cursor-pointer">
                  rot/{communityName}
                </Badge>
              </Link>
              <div className="absolute ml-130">
                <Link href={`/rot/${communityName}/event/${eventId}/edit`}><Button className="float-right">Edit</Button></Link>
              </div>
            </div>
            <CardDescription>
              <div className="flex gap-2 items-left justify-left">
                <p>Created at {event.createdAt.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric" })}</p>
                <p>{event.editStatus ? "•Edited" : ""}</p>
              </div>
            </CardDescription>
            <div>
              <h1 className="text-2xl font-bold">{event.title}</h1>
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-w-xl max-w-5xl">
              <p className="text-fuchsia-700 font-bold">Starts: {event.startsAt.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })}</p>
              <p className="text-fuchsia-700 font-bold">Ends: {event.endsAt.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })}</p>
              <p className="text-fuchsia-700 font-bold">Location: {event.address}</p>
              <br></br>
              <p>{event.description}</p>
            </div>
          </CardContent>
        </Card>
        <aside>
          <SideBar activeCommunity={community} />
        </aside>
      </main>
    </div>
  );
}
