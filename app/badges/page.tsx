"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AvatarImg from "@/components/Avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Profile() {
  const [username, setUsername] = useState("Nickas");
  const [karmaPoints, setKarmaPoints] = useState(1000);
  const [badges, setBadges] = useState(["Vienas","Du","Trys"]);

  const imageSrc = "https://github.com/shadcn.png";
  const imageAlt = "@shadcn";
  const imageFallBack = "CN";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href='/profile';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Set Badges
          </h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-row items-left justify-left w-1/2 gap-x-5">
                <CardTitle className="text-2xl">{username}</CardTitle>
                <AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack}/>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-left text-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-row items-left justify-left w-1/2 gap-x-3">
                    <h1>Karma points:</h1>
                    <p>{karmaPoints}</p>
                </div>
              <div className="space-y-2">
                <Label htmlFor="badges">Choose badges</Label>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choose a badge" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Badges</SelectLabel>
                            <SelectItem value={badges[0]}>{badges[0]}</SelectItem>
                            <SelectItem value={badges[1]}>{badges[1]}</SelectItem>
                            <SelectItem value={badges[2]}>{badges[2]}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
            <br></br>
            <Link href="/profile"><Button>Cancel</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}