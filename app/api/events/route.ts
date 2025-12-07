import { CreateEvent } from "@/models/event/schemas/event.schema";
import { EventService } from "@/services/event.service"
import { EventRepository } from "@/repositories/event.repository";
import { CommunityRepository } from "@/repositories/community.repository";
import { requireModerator } from "@/lib/auth"

export async function GET(req: Request, { params }: { params: Promise<{ communityName: string }> }) {
    try {
        //Gets community Id by community Name
        const { communityName } = await params;
        const community = await CommunityRepository.findByName(communityName);
        if (!community) {
            return Response.json(
                { error: "Community not found" },
                { status: 404 }
            );
        }
        const communityid = community?.id;
        if (!communityid) {
            return Response.json(
                { error: "Invalid community ID" },
                { status: 422 }
            );
        }
        //Finds all events by community Id
        const events = await EventRepository.findAllByCommunity(communityid);
        return Response.json(events, { status: 200 });
    }
    catch (error: any) {
        return Response.json({ error: "Failed to get events" }, { status: 400 })
    }
}

export async function POST(req: Request) {
    try {
        //Gets community Id by community Name
        const { searchParams } = new URL(req.url);
        const communityName = searchParams.get("communityName");
        if (!communityName) {
            return Response.json(
                { error: `Community name not found in params: ${communityName}` },
                { status: 404 }
            );
        }
        const community = await CommunityRepository.findByName(communityName);
        if (!community) {
            return Response.json(
                { error: "Community not found" },
                { status: 404 }
            );
        }
        const communityid = community?.id;
        if (!communityid) {
            return Response.json(
                { error: "Invalid community ID" },
                { status: 422 }
            );
        }
        //Checks if user is moderator of the community
        const session = await requireModerator(communityid);
        if (session instanceof Response) return session

        //Creates event with the given data if it is valid
        const body = await req.json();
        const validationResult = CreateEvent.safeParse(body);
        if (!validationResult.success) {
            return Response.json(
                { error: "Invalid input " + body.startsAt, details: validationResult.error.issues },
                { status: 422 }
            );
        }
        const event = await EventService.create({ ...validationResult.data, communityId: communityid, creatorUserId: parseInt(session.user.id), creatorCommunityId: communityid });
        return Response.json(event, { status: 201 });
    }
    catch (error: any) {
        return Response.json({ error: error.message }, { status: 400 })
    }
}