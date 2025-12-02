"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/DateTimePicker";
import { use } from "react";
import { useRouter } from "next/navigation";

export default function createEvent({ params }: {
  params: Promise<{ communityName: string }>
}) {
  const router = useRouter();
  const { communityName } = use(params);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>("");
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = {
        title,
        description,
        startsAt: new Date(startDate.toLocaleString("lt-LT", {year:"numeric", month:"numeric", day:"numeric"})+"T"+startTime+":00").toISOString(),
        endsAt: new Date(endDate.toLocaleString("lt-LT", {year:"numeric", month:"numeric", day:"numeric"})+"T"+endTime+":00").toISOString(),
        address: location
      }
      const response = await fetch(`/api/events?communityName=${communityName}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        console.log(response);
        setError(result.error);
        return;
      }
      router.push(`/rot/${communityName}/event/${result.id}`);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
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
                    <DateTimePicker date={startDate} time={startTime} setDate={setStartDate} setTime={setStartTime}></DateTimePicker>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="endDate" className="text-xl">End date</Label>
                    </div>
                    <DateTimePicker date={endDate} time={endTime} setDate={setEndDate} setTime={setEndTime}></DateTimePicker>
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
                    {isLoading ? "Loading..." : "Save"}
                  </Button>
                </form>
                <br></br>
                <Link href={`/rot/${communityName}`}><Button>Cancel</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
