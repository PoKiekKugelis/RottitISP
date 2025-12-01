import { CommunityRepository } from "@/repositories/community.repository";
import { CommunityService } from "@/services/community.service";
import { UpdateCommunity } from "@/models/community/schemas/community.schema";

export async function GET(req: Request, { params }: { params: Promise<{ communityId: string }> }) {
  try {
    const { communityId } = await params;
    const id = parseInt(communityId);
    const community = await CommunityRepository.findOne(id);
    return Response.json(community, { status: 200 });
  }
  catch (error: any) {
    return Response.json({ error: "Failed to get community" }, { status: 400 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ communityId: string }> }) {
  try {
    const { communityId } = await params;
    const id = parseInt(communityId);

    if (isNaN(id)) {
      return Response.json({ error: "Invalid community ID" }, { status: 400 })
    }
    const community = CommunityRepository.findOne(id);
    if (!community) {
      return Response.json({ error: "Community not found" }, { status: 404 })
    }

    const body = await req.json();
    const validationResult = UpdateCommunity.safeParse(body);
    if (!validationResult.success) {
      return Response.json(
        { error: "Invalid input", details: validationResult.error.issues }, { status: 422 }
      );
    }
    const updatedCommunity = CommunityRepository.update(id, validationResult.data);
    return Response.json(updatedCommunity, { status: 200 })
  } catch (error: any) {
    return Response.json({ error: "Failed to update community" }, { status: 400 })
  }
}
export async function DELETE(
  request: Response,
  { params }: { params: Promise<{ communityId: string }> }
) {
  try {
    const { communityId } = await params;
    const id = parseInt(communityId);

    if (isNaN(id)) {
      return Response.json(
        { error: "Invalid community ID" }, { status: 400 });
    }

    const community = CommunityRepository.findOne(id);
    if (!community) {
      return Response.json({ error: "Community not found" }, { status: 404 })
    }
    CommunityRepository.delete(id);

    return Response.json({ message: "Community deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to delete community", details: (error as { meta?: unknown })?.meta },
      { status: 400 }
    );
  }
}
