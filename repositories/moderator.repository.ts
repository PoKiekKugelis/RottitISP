import { prisma } from "@/lib/prisma"

export class ModeratorRepository {
  static async create(userId: number, communityId: number, assignedBy: string) {
    return await prisma.moderator.create({
      data: {
        id: userId,
        communityId,
        assignedBy
      }
    });
  }
}
