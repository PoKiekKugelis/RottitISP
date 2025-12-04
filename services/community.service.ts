
import { CommunityRepository } from "@/repositories/community.repository";
import { ModeratorService } from "./moderator.service";
import { UserRepository } from "@/repositories/user.repository";
import { UserService } from "./user.service";

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
    const community = await CommunityRepository.create(data);
    await CommunityService.joinCommunity(data.creatorId, community.id)
    await ModeratorService.assignModerator(data.creatorId, community.id, "System")
    return community;
  }
  static async update(id: number, data: {
    name: string,
    description: string,
    avatar: string,
    header: string,
    ageRestriction: boolean
  }
  ) {
    const existing = await CommunityRepository.findByName(data.name);
    if (existing && existing.id != id) {
      return null
    }
    return await CommunityRepository.update(id, data)
  }

  static async joinCommunity(userId: number, communityId: number) {
    const existing = await CommunityRepository.findMember(userId, communityId);
    if (existing) {
      throw new Error("Already a member");
    }

    return await CommunityRepository.createMember(userId, communityId);
  }

  static async leaveCommunity(userId: number, communityId: number) {
    if (await CommunityRepository.isCreator(userId, communityId)) {
      throw new Error("Creator cannot leave community");
    }
    const existing = await CommunityRepository.findMember(userId, communityId)
    if (existing) {
      return await CommunityRepository.deleteMember(userId, communityId);
    }
    throw new Error("Already not a member");
  }
}
