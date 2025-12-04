import { requireAdmin, requireAuth, requireModerator } from "@/lib/auth";
import { CommunityRepository } from "@/repositories/community.repository";
import { CommunityService } from "@/services/community.service";

export async function POST(
  req: Response,
  { params }: { params: { communityId: string } }
) {
  const communityId = parseInt(params.communityId);
  const session = await requireAuth();
  if (session instanceof Response) return session;

  if (isNaN(communityId)) {
    return Response.json(
      { error: "Invalid community ID" }, { status: 400 });
  }

  const community = await CommunityRepository.findOne(communityId);
  if (!community) {
    return Response.json({ error: "Community not found" }, { status: 404 })
  }
  const userId = parseInt(session.user.id);

  try {
    await CommunityService.joinCommunity(userId, communityId);
    return Response.json({ message: "Successfully added member" }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { error: error.message }, { status: 400 }
    );
  }
}

export async function DELETE(
  req: Response,
  { params }: { params: { communityId: string } }
) {
  const session = await requireAuth();
  if (session instanceof Response) return session;

  const communityId = parseInt(params.communityId);
  const userId = parseInt(session.user.id);

  if (isNaN(communityId)) {
    return Response.json(
      { error: "Invalid community ID" }, { status: 400 });
  }

  const community = CommunityRepository.findOne(communityId);
  if (!community) {
    return Response.json({ error: "Community not found" }, { status: 404 })
  }
  try {
    await CommunityService.leaveCommunity(userId, communityId);
    return Response.json({ message: "Member deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { error: error.message }, { status: 400 }
    );
  }
}
