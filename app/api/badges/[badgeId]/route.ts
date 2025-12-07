import { BadgeRepository } from "@/repositories/badge.repository";

export async function GET(req: Request, { params }: { params: Promise<{ badgeId: string }> }) {
  try {
    const { badgeId } = await params;
    const id = parseInt(badgeId);
    const badge = await BadgeRepository.findOne(id);
    return Response.json(badge, { status: 200 });
  }
  catch (error: any) {
    return Response.json({ error: "Failed to get badge" }, { status: 400 })
  }
}