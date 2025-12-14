import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

/* =======================
   GET — fetch comments
   ======================= */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = Number(searchParams.get("postId"));

  if (!postId) {
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  }

  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      creator: {
        select: { id: true, username: true }
      }
    },
    orderBy: { createdAt: "asc" }
  });

  return NextResponse.json(comments);
}

/* =======================
   POST — create comment
   ======================= */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content, postId, parentId } = await req.json();

  if (!content || !postId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Create comment / reply
  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      parentId: parentId ?? null,
      creatorId: user.id
    }
  });

  // ✅ ADD 25 KARMA
  await prisma.user.update({
    where: { id: user.id },
    data: {
      karma: {
        increment: 25
      }
    }
  });

  return NextResponse.json(comment);
}
