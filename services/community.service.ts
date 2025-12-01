
import { CommunityRepository } from "@/repositories/community.repository";

export class CommunityService {
  static async register(data: {
    name: string,
    description: string,
    avatar: string,
    header: string,
    ageRestriction: boolean,
    creatorId: number

  }) {
    const existing = await CommunityRepository.findByName(data.name)
    if (existing) {
      return null
    }
    return await CommunityRepository.create(data);
  }
  static async joinCommunity(userId: number, communityId: number) {
    const existing = await CommunityRepository.findMember(userId, communityId)
    if (existing) {
      throw new Error("Already a member");
    }
    return await CommunityRepository.createMember(userId, communityId)
  }

  static async leaveCommunity(userId: number, communityId: number) {
    if (await CommunityRepository.isCreator(userId, communityId)) {
      throw new Error("Creator cannot leave community");
    }
    return await CommunityRepository.deleteMember(userId, communityId);
  }
}
