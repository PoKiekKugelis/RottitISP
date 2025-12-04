import { prisma } from "@/lib/prisma"
import { ModeratorRepository } from "./moderator.repository";

export class CommunityRepository {
  static async create(data: any) {
    return await prisma.community.create({
      data: data
    });
  }
  static async findOne(id: number) {
    return await prisma.community.findUnique({
      where: { id: id },
      include: {
        _count: {
          select: { members: true }
        }
      }
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
      where: { name: title },
      include: {
        members: {
          include: {
            user: true
          }
        },
        tags: {
          include: {
            tag: true
          }
        }
      }
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
    if (await prisma.moderator.findFirst({
      where: { userId, communityId }
    })) {
      ModeratorRepository.delete(userId, communityId)
    }
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
  static async findByMembers(amount: number) {
    return await prisma.community.findMany({
      take: amount,
      orderBy: {
        members: {
          _count: 'desc'
        }
      },
      include: {
        _count: {
          select: { members: true }
        }
      }
    })
  }
  static async addTag(communityId: number, tagId: number) {
    return await prisma.communityTag.create({
      data: { tagId: tagId, communityId: communityId }
    })
  }
  static async deleteTag(communityId: number, tagId: number) {
    return await prisma.communityTag.delete({
      where: { communityId_tagId: { communityId: communityId, tagId: tagId } }
    })
  }
  static async findTag(communityId: number, tagId: number) {
    return await prisma.communityTag.findFirst({
      where: { tagId: tagId, communityId: communityId }
    })
  }
  static async findAllTags(communityId: number) {
    return await prisma.communityTag.findMany({
      where: { communityId: communityId }
    })
  }
}
