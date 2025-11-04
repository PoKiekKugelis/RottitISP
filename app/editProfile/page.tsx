"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AvatarImg from "@/components/Avatar";

export default function Profile() {
  const [username, setUsername] = useState("Nickas");
  const [country, setCountry] = useState("Lithuania");
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [bio, setBio] = useState("Ay, Im walking 'ere");

  const imageSrc = "https://github.com/shadcn.png";
  const imageAlt = "@shadcn";
  const imageFallBack = "CN";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/profile';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Edit Profile
          </h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-row items-left justify-left w-1/2 gap-x-5">
              <CardTitle className="text-2xl">{username}</CardTitle>
              <AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-left text-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Please write your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <Label htmlFor="country">Country</Label>
                  </div>
                  <Input
                    id="country"
                    type="text"
                    placeholder="What country are you from?"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <Label htmlFor="birthDate">Date of Birth</Label>
                  </div>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <Label htmlFor="bio">Description</Label>
                  </div>
                  <Textarea
                    id="bio"
                    placeholder="Write a description about yourself"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Save
                </Button>
              </form>
              <br></br>
              <div className="flex gap-2">
                <Link href="/changePassword"><Button>Change password</Button></Link>
                <Link href="/profile"><Button>Cancel</Button></Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
