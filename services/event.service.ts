
import { EventRepository } from "@/repositories/event.repository";

export class EventService {
    static async create(data: {
        title: string,
        description: string,
        startsAt: string,
        endsAt: string,
        address: string,
        communityId: number,
        creatorUserId: number,
        creatorCommunityId: number
    }) {
        return await EventRepository.create(data);
    }
}
