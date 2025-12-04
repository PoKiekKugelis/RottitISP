import { requireAdmin, requireModerator } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CommunityRepository } from "@/repositories/community.repository";
import TagRepository from "@/repositories/tag.repository";

export async function POST(req: Response, { params }: { params: Promise<{ communityId: string }> }) {
  try {
    const { communityId } = await params;
    const id = parseInt(communityId);
    let session = await requireModerator(id);
    if (session instanceof Response) { // scuffed ah admin patikrinimas
      session = await requireAdmin()
      if (session instanceof Response) return session
    }

    if (isNaN(id)) {
      return Response.json({ error: "Invalid community ID" }, { status: 400 })
    }
    const community = CommunityRepository.findOne(id);
    if (!community) {
      return Response.json({ error: "Community not found" }, { status: 404 })
    }
    const tagId = parseInt(await req.json());
    if (isNaN(tagId)) {
      return Response.json({ error: "Invalid tag ID" }, { status: 400 })
    }
    const tag = TagRepository.findOne(id);
    if (!tag) {
      return Response.json({ error: "Tag not found" }, { status: 404 })
    }

    const updatedCommunity = await CommunityRepository.addTag(id, tagId);
    return Response.json(updatedCommunity, { status: 200 })
  } catch (error: any) {
    return Response.json({ error: "Failed to update community" }, { status: 400 })
  }
}


export async function GET(req: Response, { params }: { params: Promise<{ communityId: string }> }) {
  const { communityId } = await params;
  const id = parseInt(communityId);
  if (isNaN(id)) {
    return Response.json(
      { error: "Invalid community ID" }, { status: 400 });
  }
  const community = await CommunityRepository.findOne(id);
  if (!community) {
    return Response.json({ error: "Community not found" }, { status: 404 })
  }
  const moderators = await CommunityRepository.findAllTags(id);

  return Response.json(moderators, { status: 200 });
}
