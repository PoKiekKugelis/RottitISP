"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/DateTimePicker";
import { prisma } from "@/lib/prisma";
import { z } from 'zod';
import { CreateEvent, CreateEventSchema } from "@/models/event/schemas/event.schema";

export default function createEvent() {
  const community = "programming";
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const communityId = 2; //Get from URL
  const creatorId = 1; //Get from session?

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Creates possible event entry with the given data
    const event: CreateEvent = {
      title: title,
      description: description,
      startsAt: startDate,
      endsAt: endDate,
      address: location,
      communityId: communityId,
      creatorId: creatorId
    }

    // Creates entry in the event table with the given data if data is valid
    await createEventEntry(event);
    //window.location.href = '../programming/event/1';
  };

  const createEventEntry = async (eventData: CreateEvent) => {
    // Checks if the attribute values are valid
    try {
      CreateEventSchema.parse(eventData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.issues);
      }
    }

    console.log("\n\nThe start date is:" + eventData.startsAt + "\n\n");
    /*
    // Creates entry in the event table with the given data
    await prisma.event.create({
      data: {
        title: eventData.title,
        description: eventData.description,
        startsAt: eventData.startsAt,
        endsAt: eventData.endsAt,
        address: eventData.address,
        communityId: eventData.communityId,
        creatorId: eventData.creatorId
      }
    });*/
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
      <div className="">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Create Event
          </h1>
        </div>
        <div className="min-w-xl max-w-xl flex items-center justify-center">
          <Card className="min-w-xl max-w-xl">
            <CardContent>
              <div className="text-left text-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-xl">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Please write the title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="startDate" className="text-xl">Start date</Label>
                    </div>
                    <DateTimePicker date={startDate} setDate={setStartDate}></DateTimePicker>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="endDate" className="text-xl">End date</Label>
                    </div>
                    <DateTimePicker date={endDate} setDate={setEndDate}></DateTimePicker>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-xl">Location</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Please write where the event is happening"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="description" className="text-xl">Description</Label>
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Write a description about the event"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Save
                  </Button>
                </form>
                <br></br>
                <Link href={`/rot/${community}`}><Button>Cancel</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
