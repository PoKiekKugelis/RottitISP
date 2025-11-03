"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditEvent() {
  const event = "../1";
  const [title, setTitle] = useState("Susitikimas!");
  const [startDate, setStartDate] = useState("2025-11-18");
  const [endDate, setEndDate] = useState("2025-11-18");
  const [location, setLocation] = useState("Lithuania, Kaunas, studentų g. 67");
  const [description, setDescription] = useState("Sveiki, norėjau pranešti, kad vyksta bendruomenės susitikimas. "+
    "Bus maisto ir gėrimų bei visokių įdomybių. Kviečiami visi!");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href='../1';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
      <div className="">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Edit Event
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
                  placeholder="Write a description about yourself"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
            <br></br>
            <Link href={event}><Button>Cancel</Button></Link>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}