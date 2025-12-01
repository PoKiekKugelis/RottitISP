
import { EventRepository } from "@/repositories/event.repository";

export class EventService {
    static async create(data: {
        title: string,
        description: string,
        startsAt: Date,
        endsAt: Date,
        address: string,
        communityId: number,
        creatorId: number
    }) {
        await EventRepository.create(data);
    }
}
