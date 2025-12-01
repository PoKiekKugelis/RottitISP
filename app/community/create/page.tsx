"use client";

import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCommunityPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [header, setHeader] = useState("");
  const [ageRestriction, setAgeRestriction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const data = {
        name,
        description,
        avatar,
        header,
        ageRestriction,
      };
      const response = await fetch('/api/communities', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
      const result = await response.json()
      if (!response.ok) {
        console.log(response)
        setError(result.error)
        return;
      }
      router.push(`/rot/${name}`);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Create a Community</CardTitle>
            </CardHeader>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Community Name</Label>
                  <Input
                    id="name"
                    placeholder="programming"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What is this community about?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar">Community icon</Label>
                  <Input
                    id="avatar"
                    type="file"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="header">Community header picture</Label>
                  <Input
                    id="header"
                    type="file"
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                  />
                </div>

                <div className="space-y-2 left">
                  <Label htmlFor="ageRestriction">Age restriction</Label>
                  <Checkbox
                    id="ageRestriction"
                    onCheckedChange={(e) => setAgeRestriction(!!e)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {isLoading ? "Loading..." : "Create Community"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <aside>
          <SideBar />
        </aside>
      </main>
    </div>
  );
}
