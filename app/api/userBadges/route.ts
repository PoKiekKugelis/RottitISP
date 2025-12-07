import { BadgeRepository } from "@/repositories/badge.repository";
import { BadgeService } from "@/services/badge.service";
import { CreateUserBadge } from "@/models/userBadge/schemas/userBadge.schema";
import { requireAuth } from "@/lib/auth"

export async function GET(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    const id = parseInt(userId);
    const badgesIds = await BadgeRepository.findAllByUser(id);

    //badgesIds.forEach((value) => )
    return Response.json(badgesIds, { status: 200 });
  }
  catch (error: any) {
    return Response.json({ error: "Failed to get badges" }, { status: 400 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    if (session instanceof Response) return session

    const body = await req.json();
    const validationResult = CreateUserBadge.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        { error: "Invalid input", details: validationResult.error.issues },
        { status: 422 }
      );
    }

    const badge = await BadgeService.buyBadge(body.userId, body.badgeId);
    if (badge == null) {
      return Response.json({ error: "You already have this badge" }, { status: 400 })
    }
    return Response.json(badge, { status: 201 });
  }
  catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}