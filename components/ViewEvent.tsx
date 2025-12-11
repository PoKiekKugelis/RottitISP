"use client";

import React from "react";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AvatarImg from "@/components/Avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Event } from "@/models/event/entities/event.entity"
import { Community } from "@/models/community/entities/community.entity"
import { User } from "@/models/user/entities/user.entity"
import { useRouter } from "next/navigation";

interface ViewEventProps {
    event: Event;
    community: Community;
    creator: User;
    user: User | null;
}

export default function ViewEventPage({
    event,
    community,
    creator,
    user
}: ViewEventProps) {

    const router = useRouter();
    const imageSrc = creator.avatar;
    const imageAlt = "@shadcn";
    const imageFallBack = "CN";
    const [showMap, setShowMap] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [isMap, setIsMap] = useState(false);
    const [location, setLocation] = useState([55, 23]);

    const viewMap = async () => {
        const address = event.address;

        try {
            const response = await fetch(`/api/map?address=${encodeURIComponent(address)}`, {
                method: "GET"
            })
            const result = await response.json()
            console.log(result)

            if (!response.ok) {
                console.log(response);
                return;
            }

            if ((result.length == 0)) {
                setIsMap(false);
            }
            else {
                setIsMap(true);
                setLocation([result[0].lat, result[0].lon]);
                console.log("Coordinates: ", result[0].lat, " ", result[0].lon);
            }

        } catch (error: any) {
            console.error(error);
        }

        setShowMap(true);
    }

    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <p>Loading...</p>,
            ssr: false
        }
    ), [])

    const deleteEvent = async () => {

        try {
            const response = await fetch(`/api/events/${event.id}`, {
                method: "DELETE"
            })
            const result = await response.json()
            console.log(result)

            if (!response.ok) {
                console.log(response);
                return;
            }

            router.push(`/`);

        } catch (error: any) {
            console.error(error);
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-row items-left justify-left w-1/2 gap-x-2">
                    <Link href={`/profiles/${creator?.id}`} ><AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack} size={"size-9"} /></Link>
                    <CardTitle className="text-md">{creator?.username}</CardTitle>
                    <Link href={`/rot/${community.name}`}>
                        <Badge variant="outline" className="text-xs mb-1 hover:bg-background cursor-pointer">
                            rot/{community.name}
                        </Badge>
                    </Link>
                    {user?.id != null && user?.id == creator.id ?
                        <div className="absolute">
                            <div className="absolute ml-110">
                                <Link href={`/rot/${community.name}/event/${event.id}/edit`}><Button className="float-right">Edit</Button></Link>
                            </div>
                            <div className="absolute ml-125">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button >Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure you want to delete this event?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the event.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteEvent()}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                        : ""
                    }
                </div>
                <CardDescription>
                    <div className="flex gap-2 items-left justify-left">
                        <p>Created at {event.createdAt.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric" })}</p>
                        <p>{event.editStatus ? "•Edited" : ""}</p>
                    </div>
                </CardDescription>

                {/* Shows delete confirmation */}
                {showDelete ?
                    <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>Are you sure you want to delete this event?</AlertTitle>
                        <AlertDescription>
                            <Button>Confirm</Button>
                            <Button onClick={() => setShowDelete(false)}>Cancel</Button>
                        </AlertDescription>
                    </Alert>
                    : ""
                }

                <div>
                    <h1 className="text-2xl font-bold">{event.title}</h1>
                </div>
            </CardHeader>
            <CardContent>
                <div className="min-w-xl max-w-5xl">
                    <p className="text-fuchsia-700 font-bold">Starts: {event.startsAt.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })}</p>
                    <p className="text-fuchsia-700 font-bold">Ends: {event.endsAt.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })}</p>
                    <p className="text-fuchsia-700 font-bold">Location: {event.address}</p>
                    <div className="">
                        <Button className="float-left w-25 h-5" onClick={() => viewMap()}>View in map</Button>
                    </div>
                    <br></br>

                    {/* Shows location in map */}
                    {showMap ?
                        isMap ?
                            <Card>
                                <CardContent>
                                    <div>
                                        <Map position={[location[0], location[1]]} zoom={17}></Map>
                                    </div>
                                </CardContent>
                            </Card>
                            :
                            <Card>
                                <CardContent>
                                    <div>
                                        <h1>We are unable to show the given location on the map</h1>
                                    </div>
                                </CardContent>
                            </Card> : ""
                    }

                    <br></br>
                    <p>{event.description}</p>
                </div>
            </CardContent>
        </Card>
    );
}
