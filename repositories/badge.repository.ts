import { prisma } from "@/lib/prisma"

export class BadgeRepository {
  static async findAll() {
    return await prisma.badge.findMany({
      orderBy: { price: 'asc' }
    });
  }
  static async findOne(id: number) {
    return await prisma.badge.findUnique({
      where: { id: id }
    });
  }
  static async findAllByUser(id: number) {
    const userBadges = await prisma.userBadge.findMany({
      where: { userId: id }
    });
    const badgeIds = userBadges.map((badge) => badge.badgeId);

    return await prisma.badge.findMany({
      orderBy: { price: 'asc' },
      where: { id: { in: badgeIds } }
    });
  }
  static async findOneByUser(id: number, badgeId: number) {
    return await prisma.userBadge.findFirst({
      where: { userId: id, badgeId: badgeId }
    });
  }
}