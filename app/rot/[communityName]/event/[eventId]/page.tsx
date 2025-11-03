"use client";

import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { use } from "react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AvatarImg from "@/components/Avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function EventPage({ params }: {
  params: Promise<{ communityName: string, eventId: number }>
}) {
  const { communityName } = use(params);
  const { eventId } = use(params);

  const imageSrc = "https://github.com/shadcn.png";
  const imageAlt = "@shadcn";
  const imageFallBack = "CN";

  const [username, setUsername] = useState("admin");
  const [creationDate, setCreationDate] = useState("2025-11-02");
  const [title, setTitle] = useState("Susitikimas!");
  const [startDate, setStartDate] = useState("2025-11-18 at 18:00");
  const [endDate, setEndDate] = useState("2025-11-18 at 22:00");
  const [location, setLocation] = useState("Lithuania, Kaunas, studentų g. 67");
  const [description, setDescription] = useState("Sveiki, norėjau pranešti, kad vyksta bendruomenės susitikimas. "+
    "Bus maisto ir gėrimų bei visokių įdomybių. Kviečiami visi!");

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
            <AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack}/>
            <CardTitle className="text-md">{username}</CardTitle>
            <Link href={`/rot/${communityName}`}>
            <Badge variant="outline" className="text-xs mb-1 hover:bg-background cursor-pointer">
              rot/{communityName}
            </Badge>
          </Link>
          </div>
          <CardDescription>
            <p>Created at {creationDate}</p>
          </CardDescription>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
         </CardHeader>
         <CardContent>
          <div className="min-w-xl max-w-5xl">
            <p className="text-fuchsia-700 font-bold">Starts: {startDate}</p>
            <p className="text-fuchsia-700 font-bold">Ends: {endDate}</p>
            <p className="text-fuchsia-700 font-bold">Location: {location}</p>
            <br></br>
            <p>{description}</p>
          </div>
         </CardContent>
      </Card>
        <aside>
          <SideBar />
        </aside>
      </main>
    </div>
  );
}