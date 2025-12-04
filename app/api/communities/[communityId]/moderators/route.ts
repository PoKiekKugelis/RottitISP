import { ModeratorService } from "@/services/moderator.service";
import { requireModerator } from "@/lib/auth";
import { CommunityRepository } from "@/repositories/community.repository";
import { ModeratorRepository } from "@/repositories/moderator.repository";

export async function POST(
  req: Response, { params }: { params: Promise<{ communityId: string }> }
) {
  const { communityId } = await params;
  const id = parseInt(communityId);
  const session = await requireModerator(id);
  if (session instanceof Response) return session;

  if (isNaN(id)) {
    return Response.json(
      { error: "Invalid community ID" }, { status: 400 });
  }

  const community = await CommunityRepository.findOne(id);
  if (!community) {
    return Response.json({ error: "Community not found" }, { status: 404 })
  }

  // if (community?.creatorId !== session.user.id) {
  //   return Response.json(
  //     { error: "Only creator can assign moderators" }, { status: 403 }
  //   );
  // }

  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return Response.json(
        { error: "user ID required" },
        { status: 400 }
      );
    }
    const moderator = await ModeratorService.assignModerator(
      parseInt(userId),
      id,
      session.user.username
    );
    if (moderator == null) {
      return Response.json({ error: "Not a member or is moderator already" }, { status: 400 })
    }
    return Response.json({ message: "Moderator created successfully" }, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 }
    );
  }
}

export async function GET(
  req: Response,
  { params }: { params: Promise<{ communityId: string }> }
) {
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
  const moderators = await ModeratorRepository.findAll(id);

  return Response.json(moderators, { status: 200 });
}
