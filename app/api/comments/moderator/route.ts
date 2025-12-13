import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ isModerator: false });
  }

  const isModerator = await prisma.moderator.findFirst({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json({
    isModerator: Boolean(isModerator),
  });
}
