import EditEventForm from "@/components/EditEventForm";
import { CommunityRepository } from "@/repositories/community.repository";
import { EventRepository } from "@/repositories/event.repository";
import { requireModerator, requireAdmin } from "@/lib/auth"

export default async function EditEventPage({ params }: {
  params: Promise<{ communityName: string, eventId: string }>
}) {
  const { communityName } = await params;
  const { eventId } = await params;

  const event = await EventRepository.findOne(parseInt(eventId));
  if (!event) {
    return (<div>Event not found</div>)
  }
  const community = await CommunityRepository.findByName(communityName);
  if (!community) {
    return <div>Community not found</div>;
  }

  const title = event.title;
  const startDate = event.startsAt;
  const endDate = event.endsAt;
  const location = event.address;
  const description = event.description;

  return (
    <div className="flex-1">
      <EditEventForm
        communityName={communityName} eventId={parseInt(eventId)} titlePrev={title} startDatePrev={startDate}
        endDatePrev={endDate} locationPrev={location} descriptionPrev={description}
      ></EditEventForm>
    </div>
  );
}