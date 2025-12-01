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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function Profile() {
  const [username, setUsername] = useState("Nickas");
  const [karmaPoints, setKarmaPoints] = useState(1000);
  const [badges, setBadges] = useState(["1", "2", "3", "4", "5", "6"]); //Badge Ids
  const [selectedBadge, setSelectedBadge] = useState<string>(""); //Badge Id
  const [badgeName, setBadgeName] = useState("Badge");
  const [badgeDescription, setBadgeDescription] = useState("This certainly is a badge");
  const [badgeAvatar, setBadgeAvatar] = useState("");
  const [badgePrice, setBadgePrice] = useState(10);
  const [badgeRarity, setBadgeRarity] = useState("Common");

  const imageSrc = "https://github.com/shadcn.png";
  const imageAlt = "@shadcn";
  const imageFallBack = "CN";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/profile';
  };

  const selectBadge = async (badge: string) => {
    setSelectedBadge(badge);
    setBadgeName(badge);
    //Set the other usestate values to the ones from DB
  }

  const buyBadge = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Badge bought: " + selectedBadge);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
      <div className="max-w-lg w-full">
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
                <div className="flex flex-row items-left justify-left w-1/2 gap-x-3 space-y-4">
                  <h1>Karma points:</h1>
                  <p>{karmaPoints}</p>
                </div>

                {/* Shows selected badge's attributes */}
                {selectedBadge != "" ?
                  <Card>
                    <CardHeader>
                      <div className="flex flex-row items-left justify-left w-1/2 gap-x-5">
                        <AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack} size={"size-15"} />
                        <CardTitle className="text-2xl">{badgeName}</CardTitle>
                      </div>
                    </CardHeader>
                    <form onSubmit={buyBadge} className="space-y-4">
                      <CardContent>
                        <div className="flex flex-row items-left justify-left w-full gap-x-3">
                          <h1>Description:</h1>
                          <p>{badgeDescription}</p>
                        </div>
                        <div className="flex flex-row items-left justify-left w-full gap-x-3">
                          <h1>Rarity:</h1>
                          <p>{badgeRarity}</p>
                        </div>
                        <div className="flex flex-row items-left justify-left w-full gap-x-3">
                          <h1>Price:</h1>
                          <p>{badgePrice}</p>
                        </div>
                        {/* Need to make it so that it only shows button if user doesn't have the badge */}
                        <Button type="submit" className="w-1/5 mt-5">
                          Buy
                        </Button>
                      </CardContent>
                    </form>
                  </Card> : ""
                }

                {/* Shows all badges */}
                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="badges">Choose badges</Label>
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full max-w-sm ml-10"
                  >
                    <CarouselContent>
                      {badges.map((badge, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                          <div className="p-1 aspect-square">
                            <div className="flex flex-row flex-wrap items-center gap-12">
                              <Avatar className="size-15 hover:cursor-pointer" onClick={() => selectBadge(badge)}>
                                <AvatarImage src={imageSrc} alt={imageAlt} />
                                <AvatarFallback>{imageFallBack}</AvatarFallback>
                              </Avatar>
                            </div>
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