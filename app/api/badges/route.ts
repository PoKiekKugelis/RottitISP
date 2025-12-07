import { BadgeRepository } from "@/repositories/badge.repository";

export async function GET(req: Request) {
  try {
    const badges = await BadgeRepository.findAll();
    return Response.json(badges, { status: 200 });
  }
  catch (error: any) {
    return Response.json({ error: "Failed to get badges" }, { status: 400 })
  }
}