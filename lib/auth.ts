import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.user?.id) return null;

  return await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) }
  });
}

export async function isAdmin(userId: number) {
  const admin = await prisma.administrator.findUnique({
    where: { id: userId }
  });
  return !!admin;
}

export async function isModerator(userId: number, communityId: number) {
  const moderator = await prisma.moderator.findFirst({
    where: {
      id: userId,
      communityId: communityId
    }
  });
  return !!moderator;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session instanceof Response) return session;

  const isAdminUser = await isAdmin(parseInt(session.user.id));
  if (!isAdminUser) {
    return Response.json(
      { error: "Forbidden - no permissions" },
      { status: 403 }
    );
  }
  return session;
}

export async function requireModerator(communityId: number) {
  const session = await requireAuth();
  if (session instanceof Response) return session;

  const userId = parseInt(session.user.id);
  const isAdminUser = await isAdmin(userId);
  const isModUser = await isModerator(userId, communityId);

  if (!isAdminUser && !isModUser) {
    return Response.json(
      { error: "Forbidden - no permissions" },
      { status: 403 }
    );
  }
  return session;
}
