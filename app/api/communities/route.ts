import { CreateCommunity } from "@/models/community/schemas/community.schema";
import { CommunityService } from "@/services/community.service"
import { CommunityRepository } from "@/repositories/community.repository";
import { requireAuth } from "@/lib/auth"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const top = searchParams.get("top");
  try {
    if (top) {
      const communities = await CommunityRepository.findByMembers(parseInt(top));
      return Response.json(communities, { status: 200 });
    }
    if (name) {
      const communities = await CommunityRepository.findByName(name)
      return Response.json(communities, { status: 200 });
    }
    const communities = await CommunityRepository.findAll();
    return Response.json(communities, { status: 200 });
  }
  catch (error: any) {
    return Response.json({ error: "Failed to get communities" }, { status: 400 })
  }
}

export async function POST(req: Request) {
  const session = await requireAuth()
  if (session instanceof Response) return session
  try {
    const body = await req.json();
    const validationResult = CreateCommunity.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        { error: "Invalid input", details: validationResult.error.issues },
        { status: 422 }
      );
    }
    const community = await CommunityService.register({ ...validationResult.data, creatorId: parseInt(session.user.id) });
    if (community == null) {
      return Response.json({ error: "Community with this name already exists" }, { status: 409 })
    }
    return Response.json(community, { status: 201 });
  }
  catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
