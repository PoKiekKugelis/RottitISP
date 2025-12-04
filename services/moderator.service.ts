import { CommunityRepository } from "@/repositories/community.repository";
import { ModeratorRepository } from "@/repositories/moderator.repository";
import { isModerator } from "@/lib/auth";

export class ModeratorService {
  static async assignModerator(
    userId: number,
    communityId: number,
    assignedBy: string
  ) {
    const isMember = await CommunityRepository.isMember(userId, communityId);
    const isMod = await isModerator(userId, communityId)
    console.log(isMod)
    if (!isMember || isMod) {
      return null
    }
    return await ModeratorRepository.create(userId, communityId, assignedBy);
  }
}
