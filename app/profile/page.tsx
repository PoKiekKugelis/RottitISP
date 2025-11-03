"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AvatarImg from "@/components/Avatar";

export default function Profile() {
  const [username, setUsername] = useState("Nickas");
  const [country, setCountry] = useState("Lithuania");
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [karmaPoints, setKarmaPoints] = useState(1000);
  const [bio, setBio] = useState("Ay, Im walking 'ere");

  const imageSrc = "https://github.com/shadcn.png";
  const imageAlt = "@shadcn";
  const imageFallBack = "CN";

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
      <div className="max-w-md w-full">
        <div className="flex text-center gap-x-5">
          <div className="my-auto gap-x-5">
            <Link href="/">
              <div className="hover:underline">← Back to Home</div>
            </Link>
          </div>
          <div className="gap-x-5 mb-2">
            <h1 className="text-4xl font-bold text-primary">
              My Profile
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-row items-left justify-left w-1/2 gap-x-5">
              <CardTitle className="text-2xl">{username}</CardTitle>
              <AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-left text-lg">
              <div className="flex flex-row items-left justify-left w-1/2 gap-x-3">
                <h1>Country:</h1>
                <p>{country}</p>
              </div>
              <div className="flex flex-row items-left justify-left gap-x-3">
                <h1>Date of birth:</h1>
                <p>{birthDate}</p>
              </div>
              <div className="flex flex-row items-left justify-left w-1/2 gap-x-3">
                <h1>Karma points:</h1>
                <p>{karmaPoints}</p>
              </div>
              <div className="flex flex-row items-left justify-left gap-x-3">
                <h1>Description:</h1>
                <p>{bio}</p>
              </div>
              <br></br>
              <div className="flex gap-3">
                <Link href="/editProfile"><Button>Edit Profile</Button></Link>
                <Link href="/badges"><Button>Set Badges</Button></Link>
                <div className="ml-auto">
                  <Link href="/logout"><Button className="float-right">Log out</Button></Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
