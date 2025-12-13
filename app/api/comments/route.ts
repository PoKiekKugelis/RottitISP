import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

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

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content, postId, parentId } = await req.json();

  if (!content || !postId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      parentId: parentId ?? null,
      creatorId: user.id
    }
  });

  return NextResponse.json(comment);
}
