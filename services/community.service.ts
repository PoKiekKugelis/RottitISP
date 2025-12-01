
import { CommunityRepository } from "@/repositories/community.repository";

export class CommunityService {
  static async join() {
    //TODO
  }
  static async leave() {
    //TODO
  }
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
}
