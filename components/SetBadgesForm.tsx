"use client";

import { useState } from "react";
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
import { User } from "@/models/user/entities/user.entity"
import { Badge } from "@/models/badge/entities/badge.entity"
import { useRouter } from "next/navigation";

interface SetBadgesProps {
    user: User;
    allBadges: any[];
    userBadges: any[];
}

export default function SetBadgesForm({
    user,
    allBadges,
    userBadges
}: SetBadgesProps) {
    const router = useRouter();
    const userBadgeNames = userBadges.map((badge) => badge.name);
    const username = user.username;
    const [karmaPoints, setKarmaPoints] = useState(user.karma);
    //const [badges, setBadges] = useState(["1", "2", "3", "4", "5", "6"]); //Badge Ids
    const badges = allBadges;
    const [selectedBadge, setSelectedBadge] = useState<number>(0); //Badge Id
    const [badgeName, setBadgeName] = useState("");
    const [badgeDescription, setBadgeDescription] = useState("");
    const [badgeAvatar, setBadgeAvatar] = useState("");
    const [badgePrice, setBadgePrice] = useState(10);
    const [badgeRarity, setBadgeRarity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const imageSrc = user.avatar;
    const imageAlt = "@shadcn";
    const imageFallBack = "CN";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //router.push(`/profiles/${user.id}/badges`);
    };

    const selectBadge = async (badge: Badge) => {
        setSelectedBadge(badge.id);
        setBadgeName(badge.name);
        setBadgeAvatar(badge.avatar);
        setBadgeDescription(badge.description);
        setBadgeRarity(badge.rarity);
        setBadgePrice(badge.price);
    }

    const buyBadge = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = {
                userId: user.id,
                badgeId: selectedBadge
            }
            const response = await fetch(`/api/userBadges`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
            const result = await response.json()
            console.log(result)

            if (!response.ok) {
                console.log(response);
                setError(result.error);
                setIsLoading(false);
                return;
            }
            console.log("Badge bought: " + selectedBadge);
            router.refresh();

        } catch (error: any) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
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
                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}
                    <CardContent>
                        <div className="text-left text-lg">
                            <div className="flex flex-row items-left justify-left w-1/2 gap-x-3 space-y-4">
                                <h1>Karma points:</h1>
                                <p>{karmaPoints}</p>
                            </div>

                            {/* Shows selected badge's attributes */}
                            {selectedBadge != 0 ?
                                <Card>
                                    <CardHeader>
                                        <div className="flex flex-row items-left justify-left w-1/2 gap-x-5">
                                            <AvatarImg src={badgeAvatar} alt={imageAlt} fallBack={imageFallBack} size={"size-15"} />
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
                                            {userBadgeNames.indexOf(badgeName) > -1 ?
                                                "" :
                                                <Button type="submit" className="w-1/5 mt-5">
                                                    {isLoading ? "Loading..." : "Buy"}
                                                </Button>
                                            }
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
                                                                <AvatarImage src={badge.avatar} alt={imageAlt} />
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
                            </form>

                            <br></br>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}>
                                Go back
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}