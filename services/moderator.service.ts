import { prisma } from "@/lib/prisma";
import { CommunityRepository } from "@/repositories/community.repository";
import { CommunityService } from "./community.service";
import { ModeratorRepository } from "@/repositories/moderator.repository";

export class ModeratorService {
  static async assignModerator(
    userId: number,
    communityId: number,
    assignedBy: string
  ) {
    const isMember = await CommunityRepository.isMember(userId, communityId);
    if (!isMember) {
      await CommunityService.joinCommunity(userId, communityId);
    }
    return await ModeratorRepository.create(userId, communityId, assignedBy);
  }
}
