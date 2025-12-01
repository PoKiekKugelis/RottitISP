import { prisma } from "@/lib/prisma"

export class ModeratorRepository {
  static async create(userId: number, communityId: number, assignedBy: string) {
    return await prisma.moderator.create({
      data: {
        userId: userId,
        communityId,
        assignedBy
      }
    });
  }
  static async findAll(communityId: number) {
    const moderators = await prisma.moderator.findMany({
      where: { communityId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });
    console.log('Moderators:', moderators);
    return moderators
  }
}
