import { prisma } from "@/lib/prisma"

export class CommunityRepository {
  static async create(data: any) {
    return await prisma.community.create({
      data: data
    });
  }
  static async findOne(id: number) {
    return await prisma.community.findUnique({
      where: { id: id }
    });
  }
  static async findAll() {
    return await prisma.community.findMany();
  }
  static async update(id: number, data: any) {
    return await prisma.community.update({
      where: { id },
      data: data,
    });
  }
  static async delete(id: number) {
    return await prisma.community.delete({
      where: { id }
    });
  }
  static async findByName(title: string) {
    return await prisma.community.findUnique({
      where: { name: title }
    })
  }
  static async findMember(userId: number, communityId: number) {
    return await prisma.communityMember.findUnique({
      where: {
        communityId_userId: { communityId, userId }
      }
    });
  }
  static async createMember(userId: number, communityId: number) {
    return await prisma.communityMember.create({
      data: { userId, communityId }
    });
  }
  static async isCreator(userId: number, communityId: number) {
    const community = await prisma.community.findUnique({
      where: { id: communityId }
    });
    return community?.creatorId === userId
  }
  static async deleteMember(userId: number, communityId: number) {
    return await prisma.communityMember.delete({
      where: {
        communityId_userId: { communityId, userId }
      }
    });
  }
  static async getMembers(communityId: number) {
    return await prisma.communityMember.findMany({
      where: { communityId },
      include: { user: true }
    });
  }

  static async isMember(userId: number, communityId: number) {
    const member = await prisma.communityMember.findUnique({
      where: {
        communityId_userId: { communityId, userId }
      }
    });
    return !!member;
  }
}
