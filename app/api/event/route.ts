import { CreateEvent } from "@/models/event/schemas/event.schema";
import { EventService } from "@/services/event.service"
import { EventRepository } from "@/repositories/event.repository";
import { requireModerator } from "@/lib/auth"

export async function GET(req: Request, { params }: { params: Promise<{ communityId: string }> }) {
    try {
        const { communityId } = await params;
        const communityid = parseInt(communityId);
        const events = await EventRepository.findAllByCommunity(communityid);
        return Response.json(events, { status: 200 });
    }
    catch (error: any) {
        return Response.json({ error: "Failed to get events" }, { status: 400 })
    }
}

export async function POST(req: Request, { params }: { params: Promise<{ communityId: string }> }) {
    const { communityId } = await params;
    const communityid = parseInt(communityId);
    const session = await requireModerator(communityid);
    if (session instanceof Response) return session
    try {
        const body = await req.json();
        const validationResult = CreateEvent.safeParse(body);

        if (!validationResult.success) {
            return Response.json(
                { error: "Invalid input", details: validationResult.error.issues },
                { status: 422 }
            );
        }
        const event = await EventService.create({ ...validationResult.data, communityId:communityid, creatorUserId: parseInt(session.user.id), creatorCommunityId: communityid});
        return Response.json(event, { status: 201 });
    }
    catch (error: any) {
        return Response.json({ error: error.message }, { status: 400 })
    }
}