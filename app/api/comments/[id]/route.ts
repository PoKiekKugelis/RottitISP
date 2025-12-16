import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params

  const commentId = Number(id);
  const { content } = await req.json();

  const comment = await prisma.comment.findUnique({
    where: { id: commentId }
  });

  if (!comment || comment.creatorId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.comment.update({
    where: { id: commentId },
    data: {
      content,
      editStatus: true
    }
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params


  const commentId = Number(id);

  const isModerator = await prisma.moderator.findFirst({
    where: { userId: user.id }
  });

  if (!isModerator) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.comment.delete({
    where: { id: commentId }
  });

  return NextResponse.json({ success: true });
}
