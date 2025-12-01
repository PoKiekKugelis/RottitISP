"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AvatarImg from "@/components/Avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Profile() {
  const [username, setUsername] = useState("Nickas");
  const [karmaPoints, setKarmaPoints] = useState(1000);
  const [badges, setBadges] = useState(["1", "2", "3", "4", "5", "6"]);
  const [selectedBadge, setSelectedBadge] = useState<string>("");

  const imageSrc = "https://github.com/shadcn.png";
  const imageAlt = "@shadcn";
  const imageFallBack = "CN";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //window.location.href='/profile';
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
              <AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack} size={"size-9"} />
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
                  {/*Shows all badges*/}
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full max-w-sm"
                  >
                    <CarouselContent>
                      {badges.map((badge, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                          <div className="p-1 aspect-square">
                            <AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack} size={"size-15"}/>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
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