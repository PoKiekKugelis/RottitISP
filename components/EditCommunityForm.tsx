"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Community } from "@/models/community/entities/community.entity";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { Tag } from "@/models/tag/entities/tag.entity";
import { uploadFile } from "@/components/CreateCommunityForm"

interface EditCommunityProps {
  community: Community;
  allTags: Tag[];
}

export function EditCommunityForm({ community, allTags }: EditCommunityProps) {
  const router = useRouter();
  const [name, setName] = useState(community.name);
  const [description, setDescription] = useState(community.description);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [header, setHeader] = useState<File | null>(null);
  const [ageRestriction, setAgeRestriction] = useState(community.ageRestriction);
  const [isLoading, setIsLoading] = useState(false);
  const [moderators, setModerators] = useState<number[]>([]);
  const [existingModerators, setExistingModerators] = useState<number[]>([]);
  const [tagsToAdd, setTagsToAdd] = useState<number[]>([]);
  const [existingTags, setExistingTags] = useState<number[]>([]);
  const [tagsToRemove, setTagsToRemove] = useState<number[]>([]);
  const [error, setError] = useState("");
  const session = useSession();
  const sessionId = session.data?.user.id;

  useEffect(() => {
    fetch(`/api/communities/${community.id}/moderators`)
      .then(res => res.json())
      .then(mods => {
        const modIds = mods.map((m: any) => m.userId || m.id);
        setExistingModerators(modIds);
      });
  }, [community.id]);

  useEffect(() => {
    fetch(`/api/communities/${community.id}/tags`)
      .then(res => res.json())
      .then(tags => {
        const tagIds = tags.map((t: any) => t.tagId);
        setExistingTags(tagIds);
      });
  }, [community.id]);

  const handleAddModerator = (userId: string) => {
    const id = parseInt(userId);
    if (!moderators.includes(id) && !existingModerators.includes(id)) {
      setModerators([...moderators, id]);
    }
  };

  const handleRemoveModerator = (userId: number) => {
    if (userId != community.creatorId) {
      setModerators(moderators.filter(id => id !== userId));
      setExistingModerators(existingModerators.filter(id => id !== userId))
    }
  };

  const handleAddTag = (tagId: string) => {
    const id = parseInt(tagId);
    if (tagsToRemove.includes(id)) {
      setTagsToRemove(tagsToAdd.filter(tid => tid !== id));
    }
    if (!tagsToAdd.includes(id) && !existingTags.includes(id)) {
      setTagsToAdd([...tagsToAdd, id]);
    }
  };

  const handleRemoveTag = (tagId: number) => {
    if (existingTags.includes(tagId) && !tagsToRemove.includes(tagId)) {
      setTagsToRemove([...tagsToRemove, tagId])
    } else {
      setTagsToAdd(tagsToAdd.filter(id => id !== tagId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);


    try {
      let avatarUrl = community.avatar;
      let headerUrl = community.header;

      if (avatar) {
        avatarUrl = await uploadFile(avatar, community.id, "avatar");
      }

      if (header) {
        headerUrl = await uploadFile(header, community.id, "header");
      }

      const data = { name, description, avatar: avatarUrl, header: headerUrl, ageRestriction };
      const communityResponse = await fetch(`/api/communities/${community.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });

      const result = await communityResponse.json();
      if (!communityResponse.ok) {
        setError(result.error);
        return;
      }

      for (const userId of moderators) {
        const modResponse = await fetch(`/api/communities/${community.id}/moderators`, {
          method: "POST",
          body: JSON.stringify({ userId: userId }),
          headers: { "Content-Type": "application/json" }
        });

        if (!modResponse.ok) {
          const result = await modResponse.json();
          setError(`Failed to add moderator ${userId}: ` + result.error);
          return;
        }
      }
      for (const tag of tagsToAdd) {
        const tagResponse = await fetch(`/api/communities/${community.id}/tags`, {
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
      for (const tag of tagsToRemove) {
        const tagResponse = await fetch(`/api/communities/${community.id}/tags/${tag}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });

        if (!tagResponse.ok) {
          const result = await tagResponse.json();
          setError(`Failed to remove tag ${tag}: ` + result.error);
          return;
        }
      }

      router.push(`/rot/${name}`);
    } catch (error: any) {
      console.error(error);
      setError("Failed to update community");
    } finally {
      setIsLoading(false);
    }
  };

  const allModeratorIds = [...existingModerators, ...moderators];
  const allTagIds = [...existingTags.filter(id => !tagsToRemove.includes(id)), ...tagsToAdd];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit rot/{community.name}</CardTitle>
      </CardHeader>
      {error && (
        <div className="text-red-500 text-sm text-center mb-4 px-6">{error}</div>
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
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Community icon</Label>
            <Input
              id="avatar"
              type="file"
              className="cursor-pointer"
              onChange={(e) => setAvatar(e.target.files?.[0] as File | null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="header">Community header picture</Label>
            <Input
              id="header"
              type="file"
              className="cursor-pointer"
              onChange={(e) => setHeader(e.target.files?.[0] as File | null)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="ageRestriction">Age restriction (18+)</Label>
            <Checkbox
              id="ageRestriction"
              checked={ageRestriction}
              className="cursor-pointer"
              onCheckedChange={(checked) => setAgeRestriction(!!checked)}
            />
          </div>

          <hr />

          <div className="space-y-2">
            <Label htmlFor="moderators">Add moderators</Label>
            <select
              name="moderators"
              value=""
              onChange={(e) => handleAddModerator(e.target.value)}
              className="border rounded p-2 w-full cursor-pointer"
            >
              <option value="">Select members</option>
              {community.members
                ?.filter(m =>
                  m.userId !== parseInt(sessionId!) &&
                  !allModeratorIds.includes(m.userId)
                )
                .map((m) => (
                  <option key={m.userId} value={String(m.userId)}>
                    {m.user?.username}
                  </option>
                ))}
            </select>

            {moderators.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {moderators.map(id => {
                  const user = community.members?.find(m => m.userId === id);
                  return (
                    <Card
                      key={id}
                      className="px-3 py-1.5 inline-flex items-center gap-2 w-fit hover:bg-destructive/10 cursor-pointer"
                      onClick={() => handleRemoveModerator(id)}
                    >
                      <span className="text-sm font-medium">
                        {user?.user?.username}
                      </span>
                    </Card>
                  );
                })}
              </div>
            )}
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
                  !allTagIds.includes(t.id)
                )
                .map((t) => (
                  <option key={t.id} value={String(t.id)}>
                    {t.name}
                  </option>
                ))}
            </select>

            {allTagIds.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {allTagIds.map(id => {
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
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/rot/${name}`)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
