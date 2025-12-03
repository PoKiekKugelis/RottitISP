import { prisma } from "@/lib/prisma"

export class EventRepository {
  static async create(data: any) {
    return await prisma.event.create({
      data: data
    });
  }
  static async findOne(id: number) {
    return await prisma.event.findUnique({
      where: { id }
    });
  }
  static async findAll() {
    return await prisma.event.findMany();
  }
  static async findAllByCommunity(communityId: number) {
    return await prisma.event.findMany({
      where: { communityId: communityId }
    });
  }
  static async findAllByCreator(creatorId: number) {
    return await prisma.event.findMany({
      where: { creatorUserId: creatorId }
    });
  }
  static async update(id: number, data: any) {
    return await prisma.event.update({
      where: { id },
      data: data,
    });
  }
  static async delete(id: number) {
    return await prisma.event.delete({
      where: { id }
    });
  }
  static async isCreator(userId: number, eventId: number) {
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });
    return event?.creatorUserId === userId
  }
}
