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

interface CreateCommunityProps {
  allTags: Tag[]
}

export default function CreateCommunityForm({ allTags }: CreateCommunityProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [header, setHeader] = useState("");
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
      console.log(result)

      if (!response.ok) {
        console.log(response)
        setError(result.error)
        return;
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
          <div className="space-y-2">
            <Label htmlFor="tags">Add Tags</Label>
            <select
              name="tags"
              value=""
              onChange={(e) => handleAddTag(e.target.value)}
              className="border rounded p-2 w-full"
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
