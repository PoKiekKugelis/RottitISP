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
  static async delete(userId: number, commmunityId: number) {
    return await prisma.moderator.delete({
      where: { userId_communityId: { userId: userId, communityId: commmunityId } }
    })
  }
  static async findAll(communityId: number) {
    return await prisma.moderator.findMany({
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
  }
}
