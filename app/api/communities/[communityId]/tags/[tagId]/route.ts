import { requireAdmin, requireModerator } from "@/lib/auth";
import { CommunityRepository } from "@/repositories/community.repository";

export async function DELETE(req: Response, { params }: { params: Promise<{ communityId: string, tagId: string }> }
) {
  try {
    const { communityId, tagId } = await params;
    const id = parseInt(communityId);
    let session = await requireModerator(id);
    if (session instanceof Response) { // scuffed ah admin patikrinimas
      session = await requireAdmin()
      if (session instanceof Response) return session
    }

    if (isNaN(id)) {
      return Response.json(
        { error: "Invalid community ID" }, { status: 400 });
    }
    const community = CommunityRepository.findOne(id);
    if (!community) {
      return Response.json({ error: "Community not found" }, { status: 404 })
    }
    const idTag = parseInt(tagId)
    if (isNaN(idTag)) {
      return Response.json({ error: "Invalid tag ID" }, { status: 400 })
    }
    const tag = CommunityRepository.findTag(id, idTag);
    if (!tag) {
      return Response.json({ error: "Tag not found in community" }, { status: 404 })
    }
    await CommunityRepository.deleteTag(id, idTag);

    return Response.json({ message: "Community deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to delete community", details: (error as { meta?: unknown })?.meta },
      { status: 400 }
    );
  }
}
