import { UpdateEvent } from "@/models/event/schemas/event.schema";
import { EventService } from "@/services/event.service"
import { EventRepository } from "@/repositories/event.repository";
import { requireModerator, requireAdmin } from "@/lib/auth"

export async function GET(req: Request, { params }: { params: Promise<{ eventId: string }> }) {
    try {
        const { eventId } = await params;
        const id = parseInt(eventId);
        const event = await EventRepository.findOne(id);
        return Response.json(event, { status: 200 });
    }
    catch (error: any) {
        return Response.json({ error: "Failed to get event" }, { status: 400 })
    }
}

export async function PUT(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const eventId = searchParams.get("eventId");
        if (!eventId) {
            return Response.json(
                { error: `Event id not found in params: ${eventId}` },
                { status: 404 }
            );
        }
        //Checks if event exists and gets communityId
        const id = parseInt(eventId);
        if (isNaN(id)) {
            return Response.json({ error: "Invalid event ID" }, { status: 400 })
        }
        const event = await EventRepository.findOne(id);
        if (!event) {
            return Response.json({ error: "Event not found" }, { status: 404 })
        }

        const session = await requireModerator(event.communityId);
        if (session instanceof Response) return session

        const creator = await EventRepository.isCreator(parseInt(session.user.id), id)
        if (!creator) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json();
        const validationResult = UpdateEvent.safeParse(body);
        if (!validationResult.success) {
            return Response.json(
                { error: "Invalid input", details: validationResult.error.issues },
                { status: 422 }
            );
        }
        const updatedEvent = await EventRepository.update(id, validationResult.data);
        return Response.json(updatedEvent, { status: 201 });
    }
    catch (error: any) {
        return Response.json({ error: "Failed to update event" }, { status: 400 })
    }
}

export async function DELETE(request: Response, { params }: { params: Promise<{ eventId: string }> }) {
    try {
        const { eventId } = await params;
        const id = parseInt(eventId);
        const session = await requireAdmin();
        if (session instanceof Response) return session

        if (isNaN(id)) {
            return Response.json(
                { error: "Invalid event ID" }, { status: 400 });
        }

        const event = EventRepository.findOne(id);
        if (!event) {
            return Response.json({ error: "Event not found" }, { status: 404 })
        }
        EventRepository.delete(id);

        return Response.json({ message: "Event deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return Response.json(
            { error: "Failed to delete event", details: (error as { meta?: unknown })?.meta },
            { status: 400 }
        );
    }
}