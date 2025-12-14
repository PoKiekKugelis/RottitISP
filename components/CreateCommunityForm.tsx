"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tag } from "@/models/tag/entities/tag.entity";
import { Community } from "@/models/community/entities/community.entity";

interface CreateCommunityProps {
  allTags: Tag[]
}
export async function uploadFile(
  file: File,
  communityId: number,
  type: "avatar" | "header"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("communityId", String(communityId));
  formData.append("type", type);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload ${type}`);
  }

  const { url } = await response.json();
  return url;
};

export default function CreateCommunityForm({ allTags }: CreateCommunityProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [header, setHeader] = useState<File | null>(null);
  const [ageRestriction, setAgeRestriction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [tagsToAdd, setTagsToAdd] = useState<number[]>([]);

  const handleAddTag = (tagId: string) => {
    const id = parseInt(tagId);
    if (!tagsToAdd.includes(id)) {
      setTagsToAdd([...tagsToAdd, id]);
    }
  };

  const handleRemoveTag = (tagId: number) => {
    setTagsToAdd(tagsToAdd.filter(id => id !== tagId));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {

      const data = {
        name,
        description,
        avatar: null,
        header: null,
        ageRestriction,
      };
      const response = await fetch('/api/communities', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
      const result = await response.json()
      console.log(result)

      if (!response.ok) {
        console.log(response)
        setError(result.error)
        return;
      }
      const communityId = result.id
      let avatarUrl = "";
      let headerUrl = "";

      if (avatar) {
        avatarUrl = await uploadFile(avatar, communityId, "avatar");
      }

      if (header) {
        headerUrl = await uploadFile(header, communityId, "header");
      }
      if (avatarUrl || headerUrl) {
        const updateResponse = await fetch(`/api/communities/${communityId}`, {
          method: "PUT",
          body: JSON.stringify({
            avatar: avatarUrl || result.avatar,
            header: headerUrl || result.header,
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (!updateResponse.ok) {
          const result = await updateResponse.json()
          setError(result.error);
          return;
        }
      }
      for (const tag of tagsToAdd) {
        const tagResponse = await fetch(`/api/communities/${result.id}/tags`, {
          method: "POST",
          body: JSON.stringify(tag),
          headers: { "Content-Type": "application/json" }
        });

        if (!tagResponse.ok) {
          const result = await tagResponse.json();
          setError(`Failed to add tag ${tag}: ` + result.error);
          return;
        }
      }
      router.push(`/rot/${name}`);
    } catch (error: any) {
      console.error(error);
      setError(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              className="cursor-pointer"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="header">Community header picture</Label>
            <Input
              id="header"
              type="file"
              className="cursor-pointer"
              onChange={(e) => setHeader(e.target.files?.[0] as File)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="ageRestriction">Age restriction (18+)</Label>
            <Checkbox
              id="ageRestriction"
              className="cursor-pointer"
              checked={ageRestriction}
              onCheckedChange={(e) => setAgeRestriction(!!e)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Add Tags</Label>
            <select
              name="tags"
              value=""
              onChange={(e) => handleAddTag(e.target.value)}
              className="border rounded p-2 w-full cursor-pointer"
            >
              <option value="">Select Tags</option>
              {allTags
                .filter(t =>
                  !tagsToAdd.includes(t.id)
                )
                .map((t) => (
                  <option key={t.id} value={String(t.id)}>
                    {t.name}
                  </option>
                ))}
            </select>

            {tagsToAdd.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tagsToAdd.map(id => {
                  const tag = allTags.find(t => t.id === id)
                  return (
                    <Card
                      key={id}
                      className="px-3 py-1.5 inline-flex items-center gap-2 w-fit hover:bg-destructive/10 cursor-pointer"
                      onClick={() => handleRemoveTag(id)}
                    >
                      <span className="text-sm font-medium">
                        {tag?.name}
                      </span>
                    </Card>
                  );
                })}
              </div>
            )}
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
  );
}
