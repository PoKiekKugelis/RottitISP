"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Community } from "@/models/community/entities/community.entity";
import { Checkbox } from "@/components/ui/checkbox";

interface EditCommunityProps {
  community: Community
}

export function EditCommunityForm({ community }: EditCommunityProps) {
  const router = useRouter();
  const [name, setName] = useState(community.name)
  const [description, setDescription] = useState(community.description);
  const [avatar, setAvatar] = useState(community.avatar);
  const [header, setHeader] = useState(community.header);
  const [ageRestriction, setAgeRestriction] = useState(community.ageRestriction)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("")
    setIsLoading(true)
    try {

      const data = {
        name,
        description,
        avatar,
        header,
        ageRestriction
      }
      const response = await fetch(`/api/communities/${community.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error);
        console.log(result.error);
        return;
      }
      router.push(`/rot/${community.name}`);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit rot/{community.name}</CardTitle>
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
              checked={ageRestriction}
              onCheckedChange={(e) => setAgeRestriction(!!e)}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {isLoading ? " Loading..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/rot/${name}`)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
