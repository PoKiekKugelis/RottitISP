
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AvatarImg from "@/components/Avatar";
import { UserRepository } from "@/repositories/user.repository";
import { BadgeRepository } from "@/repositories/badge.repository";
import { getCurrentUser } from "@/lib/auth";
import { Label } from "@/components/ui/label";
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
import { nan } from "zod";

export default async function ProfilePage({ params }: {
  params: Promise<{ userId: string }>
}) {

  const { userId } = await params;
  const user = await UserRepository.findOne(parseInt(userId))
  if (!user) {
    return (<div>User not found</div>)
  }
  const badges = await BadgeRepository.findAllByUser(parseInt(userId))
  const currentUser = await getCurrentUser();

  const imageSrc = user.avatar;
  const imageAlt = "@shadcn";
  const imageFallBack = "CN";

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
      <div className="max-w-lg w-full">
        <div className="flex text-center gap-x-5">
          <div className="my-auto gap-x-5">
            <Link href="/">
              <div className="hover:underline">← Back to Home</div>
            </Link>
          </div>
          <div className="gap-x-5 mb-2">
            {currentUser == null || currentUser?.id != user.id ?
              <h1 className="text-4xl font-bold text-primary ml-7">
                User Profile
              </h1> :
              <h1 className="text-4xl font-bold text-primary ml-9">
                My Profile
              </h1>
            }
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-row items-left justify-left w-1/2 gap-x-5">
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack} size={"size-9"} />
            </div>
            <CardDescription>
              <div className="flex gap-2 items-left justify-left">
                <p>Created at {user.createdAt.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric" })}</p>
                {user.status ? <p className="text-green-500">•Online</p> : <p className="text-red-500">•Offline</p>}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-left text-lg">

              {/* Shows all badges */}
              {badges.length > 0 ?
                <div className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="badges">Badges:</Label>
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
                                <Avatar className="size-15">
                                  <AvatarImage src={badge.avatar} alt={imageAlt} />
                                  <AvatarFallback>{imageFallBack}</AvatarFallback>
                                </Avatar>
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {badges.length > 5 ?
                        <CarouselPrevious />
                        : ""
                      }
                      {badges.length > 5 ?
                        <CarouselNext />
                        : ""
                      }
                    </Carousel>
                  </div>
                </div>
                : ""
              }

              <div className="flex flex-row items-left justify-left w-1/2 gap-x-3">
                <h1>Country:</h1>
                <p>{user.country}</p>
              </div>

              <div className="flex flex-row items-left justify-left gap-x-3">
                <h1>Date of birth:</h1>
                <p>{user.birthdate.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric" })}</p>
              </div>

              <div className="flex flex-row items-left justify-left w-1/2 gap-x-3">
                <h1>Karma points:</h1>
                <p>{user.karma}</p>
              </div>

              <div className="flex flex-row items-left justify-left gap-x-3">
                <h1>Description:</h1>
                <p>{user.bio}</p>
              </div>

              <br></br>
              {currentUser == null || currentUser?.id != user.id ?
                "" :
                <div className="flex gap-3">
                  <Link href={`/profiles/${user.id}/edit`}><Button>Edit Profile</Button></Link>
                  <Link href={`/profiles/${user.id}/badges`}><Button>Set Badges</Button></Link>
                  <div className="ml-auto">
                    <Link href="/logout"><Button className="float-right">Log out</Button></Link>
                  </div>
                </div>
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
