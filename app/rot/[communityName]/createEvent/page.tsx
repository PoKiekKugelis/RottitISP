"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateEvent() {
  const community = "../programming";
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState("2000-01-01");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href='../programming';
  };

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
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div>
                  <Label htmlFor="endDate" className="text-xl">End date</Label>
                </div>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
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
            <Link href={`../${community}`}><Button>Cancel</Button></Link>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
